import {NextResponse} from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const {name, email, message} = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        {message: "Name, email and message are required"},
        {status: 400}
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {message: "Email sent successfully"},
      {status: 200}
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({message: "Failed to send email"}, {status: 500});
  }
}
