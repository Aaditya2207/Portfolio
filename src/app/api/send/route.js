export const runtime = "nodejs";

import { Resend } from "resend";

// Simple HTML sanitization function to prevent XSS
function sanitizeHtml(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Rate limiting (simple in-memory store - for production, use Redis or similar)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per minute per IP

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

export async function POST(req) {
  try {
    // Get client IP for rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';

    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Too many requests. Please try again later." 
        }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": "60"
          },
        }
      );
    }

    // Get environment variables - check multiple possible names for Vercel compatibility
    const apiKey = (
      process.env.RESEND_API_KEY || 
      process.env.NEXT_PUBLIC_RESEND_API_KEY || 
      ''
    ).trim();
    
    const recipientEmail = (
      process.env.RESEND_TO_EMAIL || 
      process.env.NEXT_PUBLIC_RESEND_TO_EMAIL || 
      ''
    ).trim();

    // Debug logging (only in development or if explicitly enabled)
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_ENV === 'true') {
      console.log("Environment variables check:", {
        hasRESEND_API_KEY: !!process.env.RESEND_API_KEY,
        apiKeyLength: apiKey.length,
        hasRESEND_TO_EMAIL: !!process.env.RESEND_TO_EMAIL,
        recipientEmailLength: recipientEmail.length,
        allEnvKeys: Object.keys(process.env).filter(k => k.toUpperCase().includes('RESEND'))
      });
    }

    // Check if API key is configured
    if (!apiKey || apiKey === 'undefined' || apiKey.length < 10) {
      console.error("RESEND_API_KEY is missing or invalid");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Email service configuration is missing. Please ensure RESEND_API_KEY is set in Vercel environment variables." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if recipient email is configured
    if (!recipientEmail || recipientEmail === 'undefined' || !recipientEmail.includes('@')) {
      console.error("RESEND_TO_EMAIL is missing or invalid");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Email service configuration is missing. Please ensure RESEND_TO_EMAIL is set in Vercel environment variables." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Resend client inside the function to avoid build-time issues
    const resend = new Resend(apiKey);

    // Parse request body
    let email, subject, message;
    try {
      const body = await req.json();
      email = body.email;
      subject = body.subject;
      message = body.message;
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Input validation
    if (!email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate input lengths to prevent abuse
    if (email.length > 254 || subject.length > 200 || message.length > 5000) {
      return new Response(
        JSON.stringify({ success: false, error: "Input too long" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Sanitize inputs to prevent XSS
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedSubject = sanitizeHtml(subject);
    const sanitizedMessage = sanitizeHtml(message);

    // Send email using Resend
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev",
      to: recipientEmail,
      replyTo: email, // Use original email for reply-to (safe as it's validated)
      subject: `Portfolio: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3 style="color: #333;">New Portfolio Message</h3>
          <p><strong>From:</strong> ${sanitizedEmail}</p>
          <p><strong>Subject:</strong> ${sanitizedSubject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });

    // Handle Resend API response
    // Resend can return: { data: {...}, error: null } or { data: null, error: {...} }
    if (result.error) {
      console.error("Resend API error:", JSON.stringify(result.error, null, 2));
      throw new Error(result.error.message || "Failed to send email");
    }

    // Success - check if we have data or if result itself indicates success
    if (result.data || result.id) {
      const emailId = result.data?.id || result.id;
      console.log("Email sent successfully:", emailId);
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // If we get here, log the unexpected response for debugging
    console.warn("Unexpected Resend response format:", JSON.stringify(result, null, 2));
    // Still return success if no error was thrown
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("❌ Error sending email:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to send message. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

