
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email credentials in environment variables');
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This should be an App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'minduse04@gmail.com',
      subject: `Nouvelle réservation de ${body.name}`,
      text: `
        Nouvelle réservation:
        
        Nom: ${body.name}
        Email: ${body.email}
        Téléphone: ${body.phone}
        Date souhaitée: ${body.date}
        Heure souhaitée: ${body.time}
        Message: ${body.message}
      `
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}
