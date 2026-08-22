# Mark Daniel Iguban — Portfolio

An evidence-led software-engineering portfolio built with Next.js, React, TypeScript, and Tailwind CSS. The Frame/Shift design system presents selected work through recruiter-friendly summaries and deeper technical case studies.

## Architecture

- Next.js App Router with static/server-rendered content.
- Typed portfolio content in `src/data/portfolio.ts`.
- No database, CMS, analytics, or hosted contact form.
- Client JavaScript is limited to navigation, copy-email feedback, and restrained reveal behavior.
- Project evidence has an explicit publication state; only verified evidence is eligible for production.

## Routes

- `/` — homepage and selected work.
- `/work/projtrack` — flagship full-stack case study.
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

The planned acceptance phase will add `pnpm test:e2e`. Its permanent Playwright suite will cover the homepage and both case studies at the four approved viewports.

## Content and evidence

Update site identity, capabilities, projects, links, and case studies in `src/data/portfolio.ts`. Do not add quantitative claims unless their method, baseline, artifact, and public approval are documented. Pending or withheld evidence must not appear in a production build.

The source résumé DOCX is private and ignored. Only the reviewed PDF may be published at `public/Mark-Daniel-Iguban-Resume.pdf`.

## Documentation

- `PLANS.md` — the only canonical roadmap.
- `docs/design-system.md` — Frame/Shift visual rules, motion limits, and asset registry.
- `docs/archive/legacy-planning/` — non-canonical historical documents.

## Deployment

Deploy the production build to Vercel. Set `NEXT_PUBLIC_SITE_URL` to the verified stable production alias; previews remain non-indexed until visual, accessibility, evidence, and link acceptance is complete.

```bash
pnpm build
```

Custom domains, analytics, dark mode, a CMS, and additional case studies are intentionally deferred.
