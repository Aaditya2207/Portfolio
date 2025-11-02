import nodemailer from "nodemailer";

export async function POST(req) {
  const { email, subject, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: email,
    to: "aadityaakshat304@gmail.com", // your inbox
    subject,
    text: `From: ${email}\n\n${message}`,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
