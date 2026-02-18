export default async function handler(req, res) {
  const origin = req.headers.origin || '';

  const allowed = new Set(
    (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
  );

  // Block if origin missing/not allowed
  if (!origin || !allowed.has(origin)) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const secret = process.env.COPILOT_WEB_SECRET;
  const tokenEndpoint = process.env.COPILOT_TOKEN_ENDPOINT;

  if (!secret || !tokenEndpoint) {
    return res.status(500).json({
      error: 'Missing env vars: COPILOT_WEB_SECRET and/or COPILOT_TOKEN_ENDPOINT',
    });
  }

  try {
    const resp = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
    });

    const text = await resp.text();

    if (!resp.ok) {
      const isProd = process.env.VERCEL_ENV === 'production';
      return res.status(502).json({
        error: 'Token exchange failed',
        status: resp.status,
        ...(isProd ? {} : { details: text.slice(0, 500) }),
      });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(text);
  } catch (e) {
    return res.status(502).json({ error: e?.message || 'Server error' });
  }
}
