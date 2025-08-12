import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import type { RequestHandler } from 'express';
import { requireEnv } from '../env/envBuild'; // adjust path if needed

// ---- Validate and initialize once at startup
const SENDGRID_API_KEY = requireEnv('SENDGRID_API_KEY');
const FROM_EMAIL = requireEnv('FROM_EMAIL');
const GMAIL_RECEIVER = process.env.GMAIL_RECEIVER; // optional
const SECURE_APP_TO = process.env.SECURE_APP_RECEIVER; // optional
const SSN_ENC_KEY_B64 = process.env.SSN_ENC_KEY; // validated when used

sgMail.setApiKey(SENDGRID_API_KEY);

/** ---------------- Generic handler (rates / refinance / etc.) ---------------- */
export const sendEmail: RequestHandler = async (req, res) => {
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
        .map(([k, v]) => `<li><strong>${k}:</strong> ${String(v).replace(/\n/g, '<br>')}</li>`)
        .join('')}
    </ul>`;

  const plainText = Object.entries(data)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  const to = GMAIL_RECEIVER || FROM_EMAIL;

  try {
    await sgMail.send({
      to,
      from: { name: 'Lock It Lending Form', email: FROM_EMAIL },
      subject,
      text: plainText,
      html: htmlContent,
    });
    res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error('❌ EMAIL SEND ERROR:', error?.response?.body || error);
    res.status(500).json({ ok: false, error: 'Email failed to send' });
  }
};

/** ---------------- Secure Apply handler (NO SSN IN EMAIL) ------------------- */
function getEncKey(): Buffer {
  const b64 = SSN_ENC_KEY_B64;
  if (!b64) throw new Error('Missing required environment variable: SSN_ENC_KEY');
  const key = Buffer.from(b64, 'base64');
  if (key.length !== 32) throw new Error('SSN_ENC_KEY must be a base64-encoded 32-byte key');
  return key;
}

function encryptSSN(ssn: string) {
  const ENC_KEY = getEncKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', ENC_KEY, iv);
  const ct = Buffer.concat([cipher.update(ssn, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { iv: iv.toString('base64'), ct: ct.toString('base64'), tag: tag.toString('base64') };
}

const last4 = (s: string) => s.replace(/\D/g, '').slice(-4);

export const sendSecureApp: RequestHandler = async (req, res) => {
  try {
    const { fullName, email, phone, ssn, officer } = req.body ?? {};
    if (!fullName || !email || !phone || !ssn) {
      res.status(400).json({ ok: false, error: 'Missing required fields' });
      return;
    }
    if (!/^\d{3}-?\d{2}-?\d{4}$/.test(String(ssn))) {
      res.status(400).json({ ok: false, error: 'Invalid SSN format' });
      return;
    }

    const enc = encryptSSN(String(ssn));
    const ref = `APP-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const l4 = last4(String(ssn));

    // TODO: persist securely (ref, applicant fields, enc.ct/iv/tag, l4, createdAt)
    // NEVER log raw SSN

    const to = SECURE_APP_TO || GMAIL_RECEIVER || FROM_EMAIL;

    await sgMail.send({
      to,
      from: { name: 'Secure Application', email: FROM_EMAIL },
      subject: `New secure application ${ref}`,
      text: `Applicant: ${fullName}\nPhone: ${phone}\nOfficer: ${officer || '-'}\nRef: ${ref}\nSSN last4: ${l4}`,
      html: `<p><b>Applicant:</b> ${fullName}</p>
             <p><b>Phone:</b> ${phone}</p>
             <p><b>Officer:</b> ${officer || '-'}</p>
             <p><b>Ref:</b> ${ref}</p>
             <p><b>SSN last4:</b> ${l4}</p>`,
    });

    res.status(201).json({ ok: true, ref, last4: l4 });
  } catch (e: any) {
    console.error('❌ SECURE APP ERROR:', e?.response?.body || e);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
};
