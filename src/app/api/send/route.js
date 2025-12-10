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

    // ✅ Create transporter using Gmail + App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Use your Gmail as the sender (not user input)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "aadityaakshat304@gmail.com", // your inbox
      replyTo: email, // allows reply to sender’s email
      subject: `Portfolio: ${subject}`,
      text: `📩 From: ${email}\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
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
