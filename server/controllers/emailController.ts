import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import { Request, Response } from 'express';

export const sendEmail = async (req: Request, res: Response) => {
  const data = req.body as Record<string, string>;

  const transporter = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API_KEY!,
      },
    })
  );

  const subjectMap: Record<string, string> = {
    purchase: 'New Purchase Form Submission',
    refinance: 'New Refinance Form Submission',
    question: 'New Customer Question Submission',
    rates: 'New Rate Quote Inquiry Submission',
  };

  const subject = subjectMap[data.formType] || 'New Form Submission';

  const htmlContent = `
    <h2>New Form Submission</h2>
    <ul>
      ${Object.entries(data)
        .map(([key, val]) => `<li><strong>${key}:</strong> ${String(val).replace(/\n/g, '<br>')}</li>`)
        .join('')}
    </ul>
  `;

  const plainText = Object.entries(data)
    .map(([key, val]) => `${key}: ${val}`)
    .join('\n');

  const mailOptions = {
    from: `"Lock It Lending Form" <${process.env.FROM_EMAIL}>`,
    to: process.env.GMAIL_RECEIVER || process.env.FROM_EMAIL,
    subject,
    text: plainText,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error: any) {
    console.error('❌ EMAIL SEND ERROR:', error?.response || error);
    res.status(500).json({
      error: 'Failed to send email',
      detail: error?.response || error?.message || error,
    });
  }
};
