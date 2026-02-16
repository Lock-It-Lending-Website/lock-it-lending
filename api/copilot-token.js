function parseTokenEndpoint(tokenEndpoint) {
  const baseIdx = tokenEndpoint.indexOf('/powervirtualagents');
  if (baseIdx === -1) throw new Error("Token endpoint must include '/powervirtualagents'.");

  const base = tokenEndpoint.slice(0, baseIdx);

  const match = tokenEndpoint.match(/api-version=([^&]+)/);
  if (!match) throw new Error("Token endpoint must include 'api-version='.");
  const apiVersion = match[1];

  return { base, apiVersion };
}

function getAllowedOrigins() {
  // Set in Vercel as: https://www.lockitlending.com,https://lockitlending.com,http://localhost:5173
  const raw = process.env.ALLOWED_ORIGINS || '';
  const list = raw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  // Fallback (still recommend setting ALLOWED_ORIGINS in Vercel)
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

module.exports = async (req, res) => {
  const allowed = getAllowedOrigins();
  const origin = req.headers.origin || '';

  // IMPORTANT: actually BLOCK disallowed origins (CORS headers alone don’t stop abuse)
  // Note: If you want OPTIONS preflight to work even when origin is missing, keep the origin check below
  if (!origin || !allowed.has(origin)) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 403;
    return res.end(JSON.stringify({ error: 'Forbidden origin' }));
  }

  // If allowed, set CORS headers
  setCors(res, origin);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'POST only' }));
  }

  try {
    const secret = process.env.COPILOT_WEB_SECRET;
    const tokenEndpoint = process.env.COPILOT_TOKEN_ENDPOINT;

    if (!secret || !tokenEndpoint) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 500;
      return res.end(
        JSON.stringify({
          error: 'Missing env vars: COPILOT_WEB_SECRET and/or COPILOT_TOKEN_ENDPOINT',
        })
      );
    }

    const { base, apiVersion } = parseTokenEndpoint(tokenEndpoint);
    const url = `${base}/copilotstudio/directline/token?api-version=${apiVersion}`;

    // Timeout to avoid hanging functions
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const resp = await fetch(url, {
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
      // Don’t leak upstream details in production
      const isProd = process.env.VERCEL_ENV === 'production';
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 502;
      return res.end(
        JSON.stringify({
          error: 'Token exchange failed',
          status: resp.status,
          ...(isProd ? {} : { details: text.slice(0, 500) }),
        })
      );
    }

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    return res.end(text);
  } catch (e) {
    const msg = e?.name === 'AbortError' ? 'Upstream timeout' : e?.message || 'Server error';
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 502;
    return res.end(JSON.stringify({ error: msg }));
  }
};
