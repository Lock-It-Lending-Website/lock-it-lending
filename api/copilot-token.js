// api/copilot-token.js

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';

  const allowed = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  // If this is a browser call (Origin header exists), enforce allowlist + set CORS
  if (origin) {
    if (allowed.length && !allowed.includes(origin)) {
      return res.status(403).json({ error: 'Forbidden origin' });
    }

    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
  }

  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'GET or POST only' });
  }

  const tokenEndpoint = (process.env.COPILOT_TOKEN_ENDPOINT || '').trim();
  if (!tokenEndpoint) {
    return res.status(500).json({ error: 'Missing COPILOT_TOKEN_ENDPOINT' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    // Your observed working behavior: upstream token endpoint uses GET
    const upstream = await fetch(tokenEndpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    const text = await upstream.text();

    if (!upstream.ok) {
      console.error('Upstream status:', upstream.status);
      console.error('Upstream url:', upstream.url);
      console.error('Upstream body (first 300):', text.slice(0, 300));
      return res.status(502).json({
        error: 'Token exchange failed',
        status: upstream.status,
        details: text.slice(0, 500),
        finalUrl: upstream.url,
      });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(text);
  } catch (e) {
    const msg = e?.name === 'AbortError' ? 'Upstream timeout' : e?.message || 'Server error';
    return res.status(502).json({ error: msg });
  }
};
