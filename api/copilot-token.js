module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';

  function setCORS() {
    const isVercelPreview = /^https:\/\/.*\.vercel\.app$/.test(origin);
    const allowed = (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const isAllowed = !origin || allowed.includes(origin) || isVercelPreview;

    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', isAllowed ? origin : '');
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'content-type');
    }
    return isAllowed;
  }

  // OPTIONS must be first — before try/catch, before everything
  if (req.method === 'OPTIONS') {
    setCORS();
    return res.status(204).end();
  }

  try {
    const isAllowed = setCORS();
    res.setHeader('Cache-Control', 'no-store');

    if (!isAllowed && origin) {
      return res.status(403).json({ error: 'Forbidden origin', origin });
    }

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
      });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(text);
  } catch (e) {
    setCORS();
    const msg = e?.name === 'AbortError' ? 'Upstream timeout' : e?.message || 'Server error';
    return res.status(500).json({ error: msg });
  }
};
