# gylt‑landing‑page – Marketing & Waitlist

✨ Overview

gylt‑landing‑page is the public marketing site powering gylt.space. It captures emails for the private beta and explains the value proposition in <1 min.

Key facts :

Built with : v0.dev → React/Next.js export

Forms : Native <form> + Netlify Forms OR Google Apps Script (toggleable)

Analytics : Vercel Analytics + script sendToSheet.js (centralised waitlist)

🚀 Quick start

pnpm i
pnpm dev          # localhost:3000

🔧 Required env

Key

Example

Purpose

NEXT_PUBLIC_GA_ID

G‑XXXXXXX

Google Analytics

EMAIL_WEBHOOK_URL

https://script.google.com/…

Waitlist capture

✍️ Customisation tips

Modify content/home.tsx for hero copy & CTA labels.

Logos live in /public/assets/; optimise <100 KB for performance score 95 +.

Update meta tags in app/layout.tsx for SEO & social previews.

🌐 Deployment

Pushes to main auto‑deploy on Vercel → gylt.space. A staging branch (preview) is also configured.
