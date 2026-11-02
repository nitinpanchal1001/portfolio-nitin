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

The contact form posts opt-in visitor details through the same-origin `/api/enquiry` Vercel Function, which validates the payload and forwards it to FormSubmit at `panchalnitin1001@gmail.com`. The proxy avoids a browser cross-origin preflight and records delivery success, failure, and duration in Vercel Logs without logging the visitor's email or message. FormSubmit sends a one-time activation email after the first test submission; approve it before relying on the form for leads.

The form includes an explicit consent checkbox and a honeypot field. It does not silently collect names, email addresses, or other personally identifying information.
