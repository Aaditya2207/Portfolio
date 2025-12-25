export const runtime = "nodejs";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Server configuration error. Please contact the administrator." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if recipient email is configured
    if (!process.env.RESEND_TO_EMAIL) {
      console.error("RESEND_TO_EMAIL is not configured");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Server configuration error. Please contact the administrator." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { email, subject, message } = await req.json();

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

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL,
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

    if (result.error) {
      console.error("Resend API error:", result.error);
      throw new Error("Failed to send email");
    }

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

