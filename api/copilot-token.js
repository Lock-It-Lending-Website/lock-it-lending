// api/copilot-token.js

module.exports = async function handler(req, res) {
  try {
    const origin = req.headers.origin || '';

    // Comma-separated allowlist (exact matches)
    const allowed = (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    // Allow Vercel preview origins without listing each one
    const isVercelPreview = /^https:\/\/.*\.vercel\.app$/.test(origin);

    const isAllowed = !origin || allowed.includes(origin) || isVercelPreview;

    // Always set CORS headers when Origin exists (including OPTIONS)
    if (origin) {
      if (!isAllowed) {
        // Still return CORS headers so the browser can read the 403
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'content-type');
        return res.status(403).json({ error: 'Forbidden origin', origin });
      }

      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'content-type');
    }

    res.setHeader('Cache-Control', 'no-store');

    // Preflight must exit cleanly
    if (req.method === 'OPTIONS') return res.status(204).end();

    if (req.method !== 'GET' && req.method !== 'POST') {
      return res.status(405).json({ error: 'GET or POST only' });
    }

    const tokenEndpoint = (process.env.COPILOT_TOKEN_ENDPOINT || '').trim();
    if (!tokenEndpoint) {
      return res.status(500).json({ error: 'Missing COPILOT_TOKEN_ENDPOINT' });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const upstream = await fetch(tokenEndpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    const text = await upstream.text();

    if (!upstream.ok) {
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
    // IMPORTANT: even errors should return JSON (and not crash OPTIONS)
    const msg = e?.name === 'AbortError' ? 'Upstream timeout' : e?.message || 'Server error';
    return res.status(500).json({ error: msg });
  }
};
