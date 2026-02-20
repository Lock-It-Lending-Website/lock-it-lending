export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowed = new Set(
    (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
  );

  // CORS + Origin gate
  if (!origin || !allowed.has(origin)) {
    return res.status(403).json({ error: 'Forbidden origin', origin });
  }

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const tokenEndpoint = process.env.COPILOT_TOKEN_ENDPOINT;
  const secret = process.env.COPILOT_WEB_SECRET;

  if (!tokenEndpoint || !secret) {
    console.error('Missing env vars', { hasEndpoint: !!tokenEndpoint, hasSecret: !!secret });
    return res.status(500).json({ error: 'Missing env vars' });
  }

  try {
    console.log('Calling token endpoint:', tokenEndpoint);

    const resp = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
    });

    const text = await resp.text();
    console.log('Upstream status:', resp.status);
    console.log('Upstream body (first 300):', text.slice(0, 300));

    if (!resp.ok) {
      return res.status(502).json({
        error: 'Token exchange failed',
        status: resp.status,
        details: text.slice(0, 500),
      });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(text);
  } catch (err) {
    console.error('Fetch crashed:', err);
    return res.status(502).json({ error: 'Upstream request crashed' });
  }
}
