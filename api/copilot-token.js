// api/copilot-token.js

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';

  const allowed = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const isAllowed =
    !origin || // non-browser (no Origin header)
    allowed.length === 0 ||
    allowed.includes(origin) ||
    /^https:\/\/.*\.vercel\.app$/.test(origin); // optional: allow Vercel previews

  // Always set CORS headers for browser requests (even on errors)
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', isAllowed ? origin : origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
  }

  res.setHeader('Cache-Control', 'no-store');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(isAllowed ? 204 : 403).end();
  }

  // Enforce allowlist
  if (origin && !isAllowed) {
    return res.status(403).json({ error: 'Forbidden origin', origin, allowed });
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'GET or POST only' });
  }

  const tokenEndpoint = (process.env.COPILOT_TOKEN_ENDPOINT || '').trim();
  if (!tokenEndpoint) {
    return res.status(500).json({ error: 'Missing COPILOT_TOKEN_ENDPOINT' });
  }

  try {
    const upstream = await fetch(tokenEndpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    const text = await upstream.text();

    if (!upstream.ok) {
      return res.status(502).json({
        error: 'Upstream failed',
        status: upstream.status,
        details: text.slice(0, 500),
      });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(text);
  } catch (e) {
    return res.status(502).json({ error: e?.message || 'Server error' });
  }
};
