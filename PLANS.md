# Frame/Shift Portfolio Roadmap

This is the repository's only canonical roadmap. Historical planning documents are retained in `docs/archive/legacy-planning/` for context and must not be treated as current instructions.

## Product goal

Build an evidence-led recruiter portfolio for Mark Daniel Iguban, a computer science graduate pursuing full-time software-engineering roles in the Philippines and remotely. A visitor should understand Mark's focus, strongest work, and contact path within one screen, then be able to inspect deeper technical evidence without encountering fabricated metrics or unfinished product theater.

## Decisions

- Relay leads selected work because it most directly demonstrates full-stack product engineering.
- Frozen Shoulder DSS follows as the applied-computer-vision differentiator.
- Accounting Modernization and Resource Hive remain concise supporting work.
- Frame/Shift is an internal design-system name; the public identity is Mark's full name.
- Public positioning uses the durable title "computer science graduate" rather than "recent graduate"; the graduation date remains supporting evidence in About and the résumé.
- The site is static/server-first, database-free, CMS-free, supports an accessible light/dark appearance, and is hosted on Vercel.
- Typed local content under `src/data` is the source of truth.
- Only evidence marked `verified` may ship. Pending or withheld evidence is excluded from the public UI.
- Quantitative claims require a measurement method, denominator or baseline, supporting artifact, and explicit approval.
- Real project assets are a release gate. Development previews may use clearly labeled composition placeholders.
- Case studies use a concise recruiter-first structure: compact project introduction, immediate Showcase when verified media exists, then Challenge, Approach, and Result.
- Abstract homepage project covers are identity and hierarchy devices. Their varied typography must communicate real project scope, mode, and collaboration context; verified interface evidence belongs inside the corresponding case study.
- Relay is an equal two-person collaboration in which both contributors worked full stack.
- Relay is the public product name. Its public case study uses `/work/relay` and its live demo uses `relay-portfolio-demo.vercel.app`; `/work/projtrack` permanently redirects to the renamed route. The screenshot directory, evidence IDs, and repository URL retain the original technical identifier until those remaining assets are deliberately migrated.
- The interactive credential remains in Contact as a bounded personality moment. The lanyard/Y2K background experiment was rejected and must not return without a new explicit design decision.
- Dark mode uses warm charcoal surfaces and a deeper large cobalt panel; brighter cobalt is reserved for links, focus, and compact signals.
- Contact uses a plain selectable address, `Copy email` as the primary utility, and a friendlier `Open Gmail` web composer as the distinct secondary path; visible `mailto:` actions are excluded because they depend on local handler configuration and duplicate the same destination.
- Vercel remains the primary host for v1 because it provides the least provider-specific path for the current Next.js application. Git-connected previews precede production, `https://markiguban.dev` is the canonical public domain, `www.markiguban.dev` permanently redirects to the apex, and generated `.vercel.app` URLs remain deployment aliases.
- The domain remains registered with Name.com and uses Name.com DNS records pointed to Vercel. Auto-renew is disabled by owner choice, so manual renewal reminders are required to protect the public URL and accumulated search signals.
- Vercel Web Analytics remains gated behind Mark's required interactive confirmation. Speed Insights remains optional because Vercel identifies activation as potentially billable. Reconsider Cloudflare Workers only if cost or edge-platform requirements justify maintaining the OpenNext adapter.

## Now — review checkpoint

- [ ] Review the revised Relay case study at desktop and mobile sizes, focusing on the immediate full-width Showcase, readable screenshots, concise Challenge → Approach → Result flow, and viewport-safe chapter navigation. Verification: explicit approve/revise decision from Mark.
- [ ] Approve, revise, or reject the shifted-aperture identity candidate after reviewing the 16px, 24px, header, and favicon applications. Verification: recorded identity decision.
- [ ] If the mark is rejected, compare only two focused alternatives—a custom MI monogram and a tactile frame-switch emblem—without changing the approved page system. Verification: one selected direction or a documented decision to remain wordmark-only.

## Next — production evidence and repository truth

- [ ] Audit the résumé and public project repositories for a verified technology inventory, then design a compact Toolkit extension inside the existing evidence-linked capabilities section. Group by practical use, keep labels primary and monochrome icons secondary, and omit unverified familiarity or a standalone logo cloud. Verification: every published technology maps to résumé or project evidence and remains readable without icons.
- [ ] After identity approval, propagate the final mark to the Open Graph image and identity registry; do not treat the current v0 candidate as final before review.
- [ ] Complete the remaining minimum asset pack listed in `docs/design-system.md`; Relay dashboard, Gantt, document-control, and portfolio captures are now verified and published, while focused report-editing and responsive/detail captures remain pending.
- [ ] Review the Relay repository separately: rename its public product identity, remove placeholder identity and URLs, repair screenshot references, add approved captures, correct metadata, and document architecture truthfully before exposing its repository link.
- [ ] Review résumé wording against approved evidence and publish only `public/Mark-Daniel-Iguban-Resume.pdf`.
- [ ] Add approved evidence to every production case study; abstract homepage covers may remain because they are not presented as product evidence.
- [x] Complete restrained motion and core interactive states, including reduced-motion equivalents.

## Acceptance and launch

- [x] Add permanent Playwright smoke and accessibility checks for `/`, `/work/relay`, and `/work/frozen-shoulder-dss`, plus redirect coverage for the retired `/work/projtrack` route.
- [x] Test 390×844, 768×1024, 1280×720, and 1440×900 viewports.
- [x] Verify primary navigation, mobile Escape behavior, focus return, reduced motion, route rendering, media alternatives, and horizontal overflow in the permanent suite.
- [x] Confirm no runtime, hydration, clipping, serious/critical automated accessibility, or design-token failures in the implemented feedback pass.
- [x] Capture acceptance screenshots at all four viewports as local review records.
- [ ] Split the combined observability gate, enable Web Analytics through Mark's required interactive Vercel confirmation, and verify only its approved script without console errors. Keep Speed Insights disabled unless Mark separately accepts its billing terms. Verification: analytics appears in the Vercel dashboard, production loads the analytics script, and no Speed Insights script loads.
- [x] Attach and verify `markiguban.dev`, redirect `www` permanently to the apex, rebuild with the custom canonical URL, and enable production indexing after unauthenticated acceptance. Verification: all five public endpoints return `200`, `www` returns `308`, robots permits crawling, sitemap and route canonicals use the apex, and both domains report valid Vercel configuration on 2026-08-25.

## Later

- Consider Cloudflare DNS only if a concrete DNS, security, or edge requirement justifies migrating from the working Name.com DNS configuration.
- Consider Speed Insights only after reviewing current pricing and accepting the account-level billing terms.
- Additional case studies and writing.
- A CMS or database only if recurring non-developer editing or genuinely dynamic content makes it necessary.

## Risks and gates

- Relay's linked repository still uses the original ProjTrack technical identity and contains placeholder metadata and broken screenshot references; keep its source link withheld until the separate cleanup is approved.
- Frozen Shoulder material may contain sensitive health or participant data; only synthetic, deliberately re-enacted, or sanitized material can be public.
- Project outcome metrics remain excluded until their methods, baselines, artifacts, and public approval are documented.
- Resource Hive's production URL needs verification before it is published.
- Domain auto-renew is disabled. Missing the manual renewal window would interrupt the portfolio and could weaken accumulated search signals; maintain independent 60-day and 30-day reminders.

## Completed

- Migrated Relay's public case-study route from `/work/projtrack` to `/work/relay`, updated all generated navigation, metadata, structured data, and sitemap consumers through the typed slug, and retained a permanent compatibility redirect from the retired path. Evidence: lint, type checking, production build, and 28 passing Playwright tests across four viewports on 2026-08-25.
- Connected the Name.com-registered `markiguban.dev` domain to the Git-connected Vercel project using project-specific apex A records and a `www` CNAME, configured a permanent `www`-to-apex redirect, updated the production canonical environment, enabled indexing, and verified HTTPS, HSTS, all public routes, robots, sitemap, structured data, and route canonicals without authentication. Evidence: production deployment `dpl_BpUENCDo7LfNhnDAF7LUDVkkQLgP` and live checks on 2026-08-25.
- Promoted the approved portfolio checkpoint to GitHub `main`, created a separate Git-connected Vercel project named `mark-daniel-iguban-portfolio`, configured the canonical and release gates, deployed the current static build, verified all five production endpoints and canonical metadata through Vercel's authenticated path, moved the clean alias, and permanently removed the legacy Vercel project. Evidence: commit `769d8b5`, Vercel deployment `dpl_DmAeJ7qDpzh8BSJS9jFeptzvwFEY`, and successful route checks on 2026-08-24.
- Preserved the pre-experiment dark-mode appearance in commit `c6a496e` and local branch `backup/pre-about-credential-redesign`. The subsequent lanyard experiment was reviewed and rejected; the credential returned to Contact while the warm-charcoal palette, copy-first email controls, and case-study routing back to Contact were retained.
- Added a dependency-free Frame/Shift dark mode that follows the operating-system preference on first visit, persists an explicit choice, updates browser chrome, and remains accessible from desktop and mobile navigation. Evidence: lint, type checking, production build, and permanent Playwright coverage for toggling and persistence.
- Adopted a static-first architecture and removed the previous Supabase design.
- Installed the repository-local `web-design-engineer` and `project-planner` skills.
- Confirmed the Frame/Shift design direction, palette, typography, grid, hierarchy, motion limits, and evidence policy.
- Confirmed Mark's public identity, role target, project order, and contact information from the supplied résumé and repository review.
- Preserved the pre-redesign worktree in baseline commit `6d77d6f`, consolidated documentation, and archived superseded planning material.
- Replaced the implementation-demo homepage with the approved recruiter-oriented hierarchy, typed local content, static Relay and Frozen Shoulder routes, and direct email contact.
- Compacted the hero and homepage rhythm, added a visible primary action and sticky active navigation, removed repeated chapter labels, and strengthened the selected-work hierarchy.
- Added permanent Playwright smoke and accessibility coverage at 390×844, 768×1024, 1280×720, and 1440×900. Evidence: 16 passing tests, lint, type checking, production build, and local acceptance captures.
- Removed the generic boxed MI mark and unnecessary footer tagline, then added a shifted-aperture v0 candidate as the compact header control and favicon while retaining the full name as the primary identity.
- Connected the official 21st.dev CLI to Mark's account and reviewed all 46 saved components. Their transferable signals informed the layered evidence frames, tactile primary action, and restrained CSS-only motion; heavyweight 3D and decorative effects remain excluded.
- Verified the public Relay demo and reviewed the eight supplied demo-mode captures for disclosure, visible personal data, and public branding approval.
- Reworked both case studies into concise recruiter-first narratives, corrected Relay attribution to an equal two-person full-stack collaboration, restored project-specific editorial homepage covers, and promoted an accessible four-workflow Frame/Shift product theater ahead of Relay's written process.
- Renamed ProjTrack's public portfolio identity to Relay and documented the electrical-engineering handoff rationale while preserving stable technical routes and asset identifiers. Evidence: type checking, lint, production build, and four viewport-specific Playwright checks for the existing route.
- Selected Vercel as the v1 host after comparing its native Next.js deployment path with Cloudflare Workers/OpenNext; connected `SAIKO0000/Portfolio`, configured the canonical/indexing/observability gates, and created a protected preview at `portfolio-aq1v7tuir-mark-daniel-igubans-projects.vercel.app`. Added the official Web Analytics and Speed Insights integrations behind the activation gate. Evidence: provider documentation, Vercel build, protected route and metadata checks, and 24 passing Playwright tests.
- Upgraded the deployment baseline to Next.js 16.3.2 and React 19.2.8 after Vercel blocked the vulnerable Next.js 15 build; migrated ESLint to the supported flat configuration and removed legacy compatibility code. Evidence: zero production dependency advisories, lint, type checking, and production build.
