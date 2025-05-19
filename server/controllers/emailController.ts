import sgMail from '@sendgrid/mail';
import emailQueue from './emailQueue';
import { Request, Response } from 'express';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (req: Request, res: Response) => {
  const data = req.body as Record<string, string>;

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

  const msg = {
    to: process.env.GMAIL_RECEIVER || process.env.FROM_EMAIL!,
    from: {
      name: 'Lock It Lending Form',
      email: process.env.FROM_EMAIL!,
    },
    subject,
    text: plainText,
    html: htmlContent,
  };

  try {
    // Add the email-sending task to the queue
    await emailQueue.add({ msg });
    res.status(200).json({ message: 'Form submitted successfully! Email will be sent shortly.' });
  } catch (error: any) {
    console.error('❌ Failed to queue email:', error);
    res.status(500).json({
      error: 'Failed to queue email',
      detail: error?.message || error,
    });
  }
};