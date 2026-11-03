import { randomUUID } from 'node:crypto';

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 5000;
const DELIVERY_TIMEOUT_MS = 6000;
const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const DEFAULT_FROM_EMAIL = 'Nitin Portfolio <onboarding@resend.dev>';
const DEFAULT_TO_EMAIL = 'panchalnitin1001@gmail.com';

export const config = {
  maxDuration: 10,
};

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
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

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error('enquiry_email_not_configured');
    return sendJson(response, 503, {
      success: false,
      message: 'Email service is not configured.',
    });
  }

  const enquiryId = randomUUID();

  console.log('enquiry_received', {
    enquiryId,
    name,
    email,
    company,
    message,
    pageUrl,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DELIVERY_TIMEOUT_MS);
  const startedAt = Date.now();

  try {
    const deliveryResponse = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
        'Idempotency-Key': `portfolio-enquiry/${enquiryId}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL,
        to: [process.env.RESEND_TO_EMAIL || DEFAULT_TO_EMAIL],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company / context: ${company || 'Not provided'}`,
          `Page: ${pageUrl || 'Not provided'}`,
          '',
          message,
        ].join('\n'),
        html: `
          <h2>New portfolio enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company / context:</strong> ${escapeHtml(company || 'Not provided')}</p>
          <p><strong>Page:</strong> ${escapeHtml(pageUrl || 'Not provided')}</p>
          <hr />
          <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
        `,
      }),
      signal: controller.signal,
    });

    const result = await deliveryResponse.json().catch(() => null);

    if (!deliveryResponse.ok || !result?.id) {
      console.error('enquiry_email_rejected', {
        enquiryId,
        durationMs: Date.now() - startedAt,
        providerStatus: deliveryResponse.status,
        providerCode: cleanText(result?.name, 100),
      });
      return sendJson(response, 502, {
        success: false,
        message: 'Email provider rejected the enquiry.',
      });
    }

    console.log('enquiry_email_sent', {
      enquiryId,
      providerEmailId: result.id,
      durationMs: Date.now() - startedAt,
    });

    return sendJson(response, 200, {
      success: true,
      status: 'sent',
      enquiryId,
    });
  } catch (error) {
    const timedOut = error?.name === 'AbortError';
    console.error(timedOut ? 'enquiry_email_timeout' : 'enquiry_email_failed', {
      enquiryId,
      durationMs: Date.now() - startedAt,
    });
    return sendJson(response, timedOut ? 504 : 502, {
      success: false,
      message: timedOut ? 'Email delivery timed out.' : 'Email delivery failed.',
    });
  } finally {
    clearTimeout(timeout);
  }
}
