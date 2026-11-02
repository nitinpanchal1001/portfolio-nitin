function cleanPath(value) {
  if (typeof value !== 'string') return '/';
  const path = value.trim().slice(0, 300);
  return path.startsWith('/') ? path : '/';
}

function cleanReferrer(value) {
  if (typeof value !== 'string' || !value.trim()) return 'direct';

  try {
    return new URL(value).hostname.slice(0, 200) || 'direct';
  } catch {
    return 'direct';
  }
}

function sendJson(response, status, payload) {
  response.setHeader('Cache-Control', 'no-store');
  response.status(status).json(payload);
}

export default function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { success: false });
  }

  const body = request.body && typeof request.body === 'object' ? request.body : {};

  console.log('portfolio_visit', {
    path: cleanPath(body.path),
    referrer: cleanReferrer(body.referrer),
    country: cleanTextHeader(request.headers['x-vercel-ip-country']),
  });

  return sendJson(response, 200, { success: true });
}

function cleanTextHeader(value) {
  return typeof value === 'string' ? value.slice(0, 8) : 'unknown';
}
