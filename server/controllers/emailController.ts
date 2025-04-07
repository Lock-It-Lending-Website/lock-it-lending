import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

export const sendEmail = async (req: Request, res: Response) => {
  const data = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'USER MISSING',
      pass: process.env.EMAIL_PASS || 'PASS MISSING',
    }
    
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: (() => {
      switch (data.formType) {
        case 'purchase':
          return 'New Purchase Form Submission';
        case 'refinance':
          return 'New Refinance Form Submission';
        case 'question':
          return 'New Customer Question Submission';
        case 'rates':
          return 'New Rate Quote Inquiry Submission';
        default:
          return 'New Form Submission';
      }
    })(),
    
    html: `
      <h2>New Submission</h2>
      <ul>
        ${Object.entries(data)
          .map(([key, val]) => `<li><strong>${key}:</strong> ${val}</li>`)
          .join('')}
      </ul>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
