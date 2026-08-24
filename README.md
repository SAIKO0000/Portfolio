# Mark Daniel Iguban — Portfolio

An evidence-led software-engineering portfolio built with Next.js, React, TypeScript, and Tailwind CSS. The Frame/Shift design system presents selected work through recruiter-friendly summaries and deeper technical case studies.

## Architecture

- Next.js App Router with static/server-rendered content.
- Typed portfolio content in `src/data/portfolio.ts`.
- No database, CMS, or hosted contact form.
- Vercel Web Analytics and Speed Insights provide privacy-conscious traffic and real-user performance measurement.
- Client JavaScript is limited to navigation, the persistent light/dark appearance control, active case-study chapter tracking, the manual product tour, copy-email feedback, and restrained reveal behavior.
- Project evidence has an explicit publication state; only verified evidence is eligible for production.

## Routes

- `/` — homepage and selected work.
- `/work/relay` — Relay, the flagship full-stack case study. The retired `/work/projtrack` route permanently redirects here.
- `/work/frozen-shoulder-dss` — applied-computer-vision case study.

## Local setup

Requirements: Node.js 22 and pnpm 10.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. If that port is occupied, Next.js will choose another local port and print it in the terminal.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

The permanent Playwright suite covers the homepage and both case studies in Chrome at 390x844, 768x1024, 1280x720, and 1440x900. It includes recruiter-flow, responsive-overflow, runtime, reduced-motion, mobile-navigation, and automated accessibility checks. Run it against a production build in a second terminal:

```bash
pnpm build
pnpm exec next start --hostname 127.0.0.1 --port 4180
```

```bash
pnpm test:e2e
```

Set `PLAYWRIGHT_BASE_URL` to use another already-running deployment.

## Content and evidence

Update site identity, capabilities, projects, links, and case studies in `src/data/portfolio.ts`. Do not add quantitative claims unless their method, baseline, artifact, and public approval are documented. Pending or withheld evidence must not appear in a production build.

The source résumé DOCX is private and ignored. Only the reviewed PDF may be published at `public/Mark-Daniel-Iguban-Resume.pdf`.

## Documentation

- `PLANS.md` — the only canonical roadmap.
- `docs/design-system.md` — Frame/Shift visual rules, motion limits, and asset registry.
- `docs/archive/legacy-planning/` — non-canonical historical documents.

## Deployment

Deploy through the Git-connected Vercel project with `https://markiguban.dev` as the canonical production domain. The `www` variant permanently redirects to the apex domain, while generated `.vercel.app` URLs remain deployment aliases. Production uses `NEXT_PUBLIC_SITE_URL=https://markiguban.dev` and `NEXT_PUBLIC_ENABLE_INDEXING=true` after unauthenticated route, metadata, robots, sitemap, and HTTPS acceptance.

Keep the current combined `NEXT_PUBLIC_ENABLE_OBSERVABILITY=false` unless both Web Analytics and Speed Insights are intentionally enabled. If only free Web Analytics is approved, split this combined gate into separate analytics and Speed Insights flags before redeploying; this avoids loading a product whose billing terms were not accepted.

```bash
pnpm build
```

Web Analytics requires an explicit account confirmation. Speed Insights remains optional because Vercel identifies its activation as potentially billable. A CMS and additional case studies remain intentionally deferred.
