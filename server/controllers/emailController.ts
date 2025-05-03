import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

export const sendEmail = async (req: Request, res: Response) => {
  const data = req.body as Record<string, string>;

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.OUTLOOK_USER!,
      pass: process.env.OUTLOOK_PASS!,
    },
  });

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
        .map(
          ([key, val]) =>
            `<li><strong>${key}:</strong> ${String(val).replace(/\n/g, '<br>')}</li>`
        )
        .join('')}
    </ul>
  `;

  const plainText = Object.entries(data)
    .map(([key, val]) => `${key}: ${val}`)
    .join('\n');

  const mailOptions = {
    from: `"Lock It Lending Form" <${process.env.OUTLOOK_USER}>`,
    to: process.env.OUTLOOK_RECEIVER || process.env.OUTLOOK_USER,
    subject,
    text: plainText,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error: any) {
    console.error('❌ EMAIL SEND ERROR:', error);
    res.status(500).json({
      error: 'Failed to send email',
      detail: error?.response || error?.message || error,
    });
  }
};
