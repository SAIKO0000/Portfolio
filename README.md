# Mark Daniel Iguban — Portfolio

An evidence-led automation and software-engineering portfolio built with Next.js, React, TypeScript, and Tailwind CSS. The Frame/Shift design system presents four projects through recruiter-friendly summaries and deeper technical case studies.

## Architecture

- Next.js App Router with static/server-rendered content.
- Typed portfolio content in `src/data/portfolio.ts`.
- No database, CMS, or hosted contact form.
- Vercel Web Analytics and Speed Insights packages remain installed for a future owner-approved activation, but neither integration is imported or rendered in the current application.
- Client JavaScript is limited to navigation, System/Light/Dark controls, project previews that load video only after a click, accessible evidence galleries and image dialogs, the skills tabs, copy-email feedback, and restrained reveal behavior.
- Project evidence has an explicit publication state; only verified evidence is eligible for production.

## Routes

- `/` — homepage with Featured Projects, Core Skills, Experience, Education, and Contact.
- `/work/autodev` — rule-based lead-intake automation case study.
- `/work/job-hunt-automation` — local Python job-search automation case study.
- `/work/relay` — Relay, the flagship full-stack case study. The retired `/work/projtrack` route permanently redirects here.
- `/work/frozen-shoulder-dss` — applied-computer-vision case study.
- `/job-hunt-automation` and `/job-hunt-automation/privacy` — public tool information and privacy policy.
- Unmatched paths return the branded, recovery-focused 404 page.

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

The permanent Playwright suite covers the homepage, all four case studies, the Job Hunt transparency pages, and the custom 404 in Chrome at 390x844, 768x1024, 1280x720, 1440x900, and 1920x1080. It includes recruiter-flow, responsive-overflow, gallery, video-loading, runtime, reduced-motion, mobile-navigation, recovery, and automated accessibility checks. Run it against a production build in a second terminal:

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

Do not reintroduce either observability component until its product is explicitly approved. If only free Web Analytics is approved, add Analytics alone; keep Speed Insights absent unless its billing terms are separately accepted.

```bash
pnpm build
```

Web Analytics requires an explicit account confirmation. Speed Insights remains optional because Vercel identifies its activation as potentially billable. A CMS and additional case studies remain intentionally deferred.
