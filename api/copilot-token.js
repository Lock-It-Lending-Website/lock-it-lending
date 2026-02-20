function getAllowedOrigins() {
  const raw = process.env.ALLOWED_ORIGINS || '';
  const list = raw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  if (list.length === 0) {
    return new Set([
      'http://localhost:5173',
      'http://localhost:3000',
      'https://lockitlending.com',
      'https://www.lockitlending.com',
    ]);
  }

  return new Set(list);
}

function setCors(res, origin) {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Cache-Control', 'no-store');
}

export default async function handler(req, res) {
  const allowed = getAllowedOrigins();
  const origin = req.headers.origin || '';

  if (!origin || !allowed.has(origin)) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }

  setCors(res, origin);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const secret = process.env.COPILOT_WEB_SECRET;
    const tokenEndpoint = process.env.COPILOT_TOKEN_ENDPOINT;

    if (!secret || !tokenEndpoint) {
      return res.status(500).json({
        error: 'Missing env vars: COPILOT_WEB_SECRET and/or COPILOT_TOKEN_ENDPOINT',
      });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const resp = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

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
    const msg = e?.name === 'AbortError' ? 'Upstream timeout' : e?.message || 'Server error';
    return res.status(502).json({ error: msg });
  }
}
