# TEDxDSCE — Rise of the Domino

The public website for TEDxDSCE, built with Next.js (App Router) and Tailwind CSS v4. All content — hero copy, speakers, team, sponsors, gallery, FAQs, etc. — is admin-editable and stored in Supabase; this app renders it, and a separate admin dashboard (`TedX_Admin`) writes to it.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** — design tokens and utilities live in `app/globals.css`
- **Supabase** — Postgres for content/applications, Storage for uploaded images
- **Resend** — transactional email (speaker application notifications, newsletter confirmations)

## Project structure

```
app/
  api/
    newsletter/            POST — saves a subscriber, sends a confirmation email
    speaker-application/   POST — validates + saves an application, notifies the organizers
  components/               All homepage sections (Hero, Speakers, Team, Faq, ...)
  hooks/                     useCountdown, useNetworkCanvas, useReveal
  lib/
    content.ts               Fetches all homepage content from Supabase (server-only)
    contentDefaults.ts        Fallback copy used until the DB rows exist
    database.types.ts         Hand-written types mirroring supabase.sql
    supabaseAdmin.ts          Service-role Supabase client (server-only, bypasses RLS)
    email.ts                  Resend senders
    validateSpeakerApplication.ts
  speaker-application/       /speaker-application page + form
  page.tsx                   Homepage — force-dynamic, reads Supabase on every request
  layout.tsx                 Fonts (Archivo / Inter Tight / JetBrains Mono) + metadata
supabase.sql                 Full schema: 15 tables, RLS, indexes, storage bucket
```

## Prerequisites

- Node.js **22+** recommended (`@supabase/supabase-js` warns on Node 20, which still works but is deprecated upstream)
- A Supabase project
- A Resend account + API key

## Environment variables

Create `.env.local` at the project root (already gitignored — `.env*` is excluded, so **none of this ships with the repo and must be configured again wherever you deploy**):

| Variable | Used for | Notes |
|---|---|---|
| `SUPABASE_URL` | Server-side Supabase client | Project URL, e.g. `https://xxxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase client | **Service role key** — bypasses RLS. Never expose client-side, never commit. |
| `RESEND_API_KEY` | Sending email | From the Resend dashboard |
| `NOTIFY_EMAIL` | Speaker application notifications | Where new speaker applications get emailed |
| `NOTIFY_FROM_EMAIL` | "From" address for both emails | See the Resend section below — this is the one thing likely to bite you in production |

## First-time setup (required before anything works)

1. **Run the schema.** Open the Supabase dashboard → SQL Editor → paste the entire contents of `supabase.sql` → run it. This creates all 15 content tables plus the `content-images` storage bucket. It's idempotent (`create table if not exists`, `on conflict do nothing`), safe to re-run.
2. **Seed nav links.** The schema only creates table structure, not rows — `nav_links` starts empty, which means the header renders with a gap where the links should be. Add rows via the admin dashboard's Nav Links tab (or insert directly), pointing at the section IDs already on the page: `#about`, `#speakers`, `#event`, `#team`, `#contact`.
3. **Everything else** (hero copy, speakers, team, sponsors, etc.) also starts empty and falls back to the placeholder copy in `contentDefaults.ts` until populated from the admin dashboard.

## Resend / email setup

By default, without a verified domain, Resend runs your account in **sandbox mode**: you can only send email to the address that owns the Resend account, not to arbitrary recipients. This directly affects the two email flows differently:

- **Speaker application notifications** always go to the fixed `NOTIFY_EMAIL` address — if that's your Resend account's own email, this works even in sandbox mode.
- **Newsletter confirmations** go to whatever email a site visitor enters — **these will silently fail for every visitor except the account owner** until a domain is verified. The signup is still saved to Supabase either way (the email failure is caught and logged, not surfaced to the visitor), so this fails quietly rather than loudly.

To fix before going live:
1. Resend dashboard → Domains → verify a domain you own (adds a couple of DNS records at your registrar).
2. Set `NOTIFY_FROM_EMAIL` to an address on that domain, e.g. `TEDxDSCE <hello@tedxdsce.com>`, instead of the shared `onboarding@resend.dev` sandbox sender.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The homepage (`app/page.tsx`) is `export const dynamic = "force-dynamic"`, so it re-fetches Supabase on every request — no rebuild needed to see content changes made from the admin dashboard.

## Build & run

```bash
npm run build
npm run start
```

`npm run lint` runs ESLint; `npx tsc --noEmit` type-checks.

## Deploying on AWS

This is a standard Node.js Next.js app — **not** a static export (the homepage and both API routes render per-request), so it needs a long-running Node process or an SSR-aware host, not plain static file hosting (e.g. an S3 bucket alone won't work).

### What every option needs, regardless of which one you pick

1. **Node 22+** on the runtime, running `npm run build` then `npm run start` (or an equivalent process manager invoking that start command). The app listens on port 3000 by default — set `PORT` if your platform expects a different one.
2. **All five environment variables** from the table above, set in the hosting platform's own config — never in the repo. `.env.local` is gitignored and does not deploy with the code, so this has to be redone at the platform level.
3. **Outbound HTTPS (443)** to `*.supabase.co` and `api.resend.com`. Both are HTTPS REST APIs, not raw SMTP, so AWS's well-known default block on outbound port 25 for EC2 does **not** affect either of them — no security group changes needed beyond the default outbound-allow most AWS setups already have.
4. **The Supabase schema already applied** (see First-time setup above) — a one-time step against your Supabase project, independent of where the app is hosted.
5. **A verified Resend domain**, if you want newsletter confirmations to reach real visitors and not just the account owner (see Resend section above).

### Option A — AWS Amplify Hosting (recommended, least ops)

Amplify has built-in support for Next.js SSR — no Dockerfile, no server to patch, HTTPS and a CDN come for free, and it redeploys automatically on every push. This repo includes an `amplify.yml` build spec already, so Amplify just needs to be pointed at it:

1. Push this repo to GitHub (or GitLab/Bitbucket/CodeCommit) if it isn't already.
2. AWS Console → **Amplify** → **New app** → **Host web app** → connect the git provider → pick this repo and branch.
3. Amplify detects `amplify.yml` and the Next.js framework automatically — accept the defaults.
4. Before the first deploy, go to **App settings → Environment variables** and add all five variables from the table above.
5. Click **Save and deploy**. Amplify runs `npm ci` → `npm run build`, provisions CloudFront + the SSR compute behind it, and gives you an `https://<branch>.<app-id>.amplifyapp.com` URL.
6. Custom domain: **App settings → Domain management** → add your domain — Amplify provisions the ACM certificate and the DNS records for you (or gives you records to add if the domain isn't on Route 53).
7. From then on, every push to the connected branch redeploys automatically. Update environment variables any time from the same console page — no code change or redeploy trigger needed for that step itself, but Amplify does need a redeploy for the new values to take effect (there's a "Redeploy this version" button).

### Option B — EC2 (manual, full control)

More setup and ongoing maintenance (OS patching, process supervision, TLS), but useful if you need full control or already run other infra on EC2:

1. Launch an EC2 instance (Amazon Linux 2023 or Ubuntu 22.04+), install Node 22 (e.g. via `nvm` or the NodeSource repo).
2. `git clone` this repo, `npm ci`, `npm run build`.
3. Create a `.env.local` (or export the vars via systemd's `EnvironmentFile=`) with all five variables.
4. Run it under a process supervisor so it survives reboots/crashes — either `pm2 start npm --name tedxdsce -- start`, or a systemd unit running `npm run start`.
5. Put nginx (or an Application Load Balancer) in front for TLS termination and to proxy port 80/443 → the app's port 3000. If using an ALB, request an ACM certificate for your domain and attach it to the listener; if using nginx directly on the box, `certbot` handles the certificate.
6. Security group: inbound 80/443 from the internet, outbound 443 open (default) for the Supabase/Resend calls in point 3 above.

Everything else — schema setup, nav links, Resend domain verification — is identical regardless of which option you choose, since it's all on the Supabase/Resend side, not the hosting side.

## Companion admin dashboard

Content management lives in a separate Next.js app (`TedX_Admin`), not in this repo. It talks to the same Supabase project via `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`, so writes made there (speakers, team, hero copy, image uploads, etc.) appear on this site immediately — no shared code or deploy dependency between the two, only the shared database.
