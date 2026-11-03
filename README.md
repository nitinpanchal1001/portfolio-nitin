# Nitin Panchal — Portfolio

React + Vite portfolio for Nitin Panchal, deployed on Vercel.

## Local development

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm run build
```

## Visitor analytics

The site uses Vercel Web Analytics through `@vercel/analytics`. The tracking is cookie-free and anonymized. After deploying, open the Vercel project dashboard, go to **Analytics**, and enable Web Analytics if it is not already enabled.

- Use **Analytics → Visitors** for unique visitor counts and breakdowns by page, referrer, country, browser, OS, and device.
- Use **Logs** with the production environment and `/api/visit` route filters to inspect recent anonymous visit events. Search for `portfolio_visit` to see the path, referrer hostname, and country. Runtime-log retention depends on the Vercel plan.

Visit logs do not contain a visitor's name, email address, or a full IP address. A person's identity is available only when they explicitly provide it through the enquiry form.

## Enquiry form

The contact form posts opt-in visitor details through the same-origin `/api/enquiry` Vercel Function. After validation, the function sends the enquiry directly through Resend and returns success only after Resend accepts the email. The request has a six-second timeout and uses an idempotency key to prevent duplicate delivery.

Required Vercel environment variable:

- `RESEND_API_KEY` - private Resend API key. The official Resend Vercel integration can add this automatically.

Optional Vercel environment variables:

- `RESEND_FROM_EMAIL` - verified sender, defaulting to `Nitin Portfolio <onboarding@resend.dev>` for initial testing.
- `RESEND_TO_EMAIL` - enquiry recipient, defaulting to `panchalnitin1001@gmail.com`.

Search Vercel Logs for `enquiry_email_sent`, `enquiry_email_rejected`, `enquiry_email_timeout`, or the enquiry ID. Submitted details are recorded as `enquiry_received` before the delivery attempt.

The form includes an explicit consent checkbox and a honeypot field. It does not silently collect names, email addresses, or other personally identifying information.
