// Debug log
console.log('copilot-token hit', {
  method: req.method,
  origin: req.headers.origin,
  referer: req.headers.referer,
  host: req.headers.host,
});

// api/copilot-token.js

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';

  const allowed = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  // If there's an Origin header, enforce allowlist and set CORS headers
  if (origin) {
    const isAllowed =
      !allowed.length ||
      allowed.includes(origin) ||
      // optional: allow any Vercel preview origin for your dev project
      (/^https:\/\/.*\.vercel\.app$/i.test(origin) && process.env.ALLOW_VERCEL_PREVIEWS === 'true');

    if (!isAllowed) {
      // IMPORTANT: even on 403, still send CORS so browser can read it
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      return res.status(403).json({ error: 'Forbidden origin', origin });
    }

    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
  }

  // Handle preflight BEFORE anything else
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  res.setHeader('Cache-Control', 'no-store');

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
        error: 'Token exchange failed',
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
