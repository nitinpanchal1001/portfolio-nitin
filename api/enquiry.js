const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 5000;
const DELIVERY_TIMEOUT_MS = 8000;

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sendJson(response, status, payload) {
  response.setHeader('Cache-Control', 'no-store');
  response.status(status).json(payload);
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { success: false, message: 'Method not allowed' });
  }

  const body = request.body && typeof request.body === 'object' ? request.body : {};

  // Silently accept honeypot submissions so bots do not learn how they were detected.
  if (cleanText(body._honey, 200)) {
    return sendJson(response, 200, { success: true });
  }

  const name = cleanText(body.name, MAX_NAME_LENGTH);
  const email = cleanText(body.email, MAX_EMAIL_LENGTH);
  const company = cleanText(body.company, MAX_COMPANY_LENGTH);
  const message = cleanText(body.message, MAX_MESSAGE_LENGTH);
  const consent = body.consent === 'yes';
  const pageUrl = cleanText(body.pageUrl, 500);

  if (!name || !isValidEmail(email) || !message || !consent) {
    return sendJson(response, 400, {
      success: false,
      message: 'Please complete the required fields with a valid email address.',
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DELIVERY_TIMEOUT_MS);
  const startedAt = Date.now();

  try {
    const deliveryResponse = await fetch('https://formsubmit.co/ajax/panchalnitin1001@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        company,
        message,
        consent: 'yes',
        _subject: 'New portfolio enquiry',
        _template: 'table',
        _url: pageUrl,
      }),
      signal: controller.signal,
    });

    const result = await deliveryResponse.json().catch(() => null);
    const delivered = deliveryResponse.ok && (result?.success === true || result?.success === 'true');

    if (!delivered) {
      console.warn('enquiry_delivery_rejected', {
        durationMs: Date.now() - startedAt,
        upstreamStatus: deliveryResponse.status,
      });
      return sendJson(response, 502, { success: false, message: 'Delivery service rejected the enquiry.' });
    }

    console.log('enquiry_delivery_succeeded', {
      durationMs: Date.now() - startedAt,
      hasCompany: Boolean(company),
    });
    return sendJson(response, 200, { success: true });
  } catch (error) {
    const timedOut = error?.name === 'AbortError';
    console.error(timedOut ? 'enquiry_delivery_timeout' : 'enquiry_delivery_failed', {
      durationMs: Date.now() - startedAt,
    });
    return sendJson(response, timedOut ? 504 : 502, {
      success: false,
      message: timedOut ? 'Delivery timed out.' : 'Delivery failed.',
    });
  } finally {
    clearTimeout(timeout);
  }
}
