import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Force dynamic runtime for this route
export const dynamic = 'force-dynamic';

// Setup email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'mail.tadeasfort.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USERNAME || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
});

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body
    const body = await request.json();
    const { to, subject, formData, formId } = body;

    // Validate required fields
    if (!to || !subject || !formData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the form data into a readable HTML format
    const formDataHtml = Object.entries(formData)
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join('');

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'books@tadeasfort.com',
      to,
      subject,
      html: `
        <h1>New Form Submission</h1>
        <p>You have received a new submission from the form: <strong>${subject}</strong></p>
        ${formId ? `<p>Form ID: ${formId}</p>` : ''}
        <div style="margin-top: 20px; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
          ${formDataHtml}
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          This is an automated message. Please do not reply to this email.
        </p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Notification sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending notification:', error);
    
    // Improved error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: 'Failed to send notification', details: errorMessage },
      { status: 500 }
    );
  }
} 