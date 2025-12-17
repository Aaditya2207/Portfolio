import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    if (!email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing fields" }),
        { status: 400 }
      );
    }

    // ✅ Outlook / Office 365 SMTP configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // MUST be false
      auth: {
        user: process.env.EMAIL_USER, // aadityak22@outlook.com
        pass: process.env.EMAIL_PASS, // Outlook App Password
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // 👉 email comes to Outlook
      replyTo: email, // reply goes to sender
      subject: `Portfolio: ${subject}`,
      text: `📩 From: ${email}\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully (Outlook)!");
    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error("❌ Email send error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Internal Server Error",
      }),
      { status: 500 }
    );
  }
}
