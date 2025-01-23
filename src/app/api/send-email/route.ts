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
        pass: process.env.EMAIL_PASS,
      },
    });

    // Determine email type and set subject/content accordingly
    const isReservation = 'date' in body;
    
    const subject = isReservation 
      ? `Nouvelle réservation de ${body.name}`
      : `Nouveau message de ${body.firstName} ${body.lastName}`;

    const text = isReservation 
      ? `
        Nouvelle réservation:
        
        Nom: ${body.name}
        Email: ${body.email}
        Téléphone: ${body.phone}
        Date souhaitée: ${body.date}
        Heure souhaitée: ${body.time}
        Message: ${body.message}
      `
      : `
        Nouveau message:
        
        Nom: ${body.firstName} ${body.lastName}
        Email: ${body.email}
        Message: ${body.message}
      `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'minduse04@gmail.com',
      subject,
      text
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
