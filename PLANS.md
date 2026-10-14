# Frame/Shift Portfolio Roadmap

This is the repository's only canonical roadmap. Historical planning documents are retained in `docs/archive/legacy-planning/` for context and must not be treated as current instructions.

## Product goal

Build an evidence-led portfolio for Mark Daniel Iguban, an automation specialist and full-stack engineer open to freelance automation projects and relevant engineering roles. A visitor should understand the work, its evidence, and the contact path quickly, without fabricated metrics or unfinished product theater.

## Decisions

- Projects is one four-card section: Automation groups AutoDev Lead Intake and Job Hunt Automation; Development groups Relay and Frozen Shoulder DSS. All cards remain visible, with category jump links rather than filters. No separate "More engineering work" tier is needed until new maintained work justifies it.
- Accounting Modernization and Resource Hive are removed from portfolio content; their independent repositories are unaffected.
- Automation claims remain literal: AutoDev uses rule-based n8n workflows and Job Hunt uses deterministic Python rules. Neither demonstrates production AI.
- Automation homepage posters are labeled stills from user-activated illustrative films, never run evidence. Real captures remain available in the case studies, which must be understandable without playing the films.
- The AutoDev source link stays withheld until public main matches the documented version; the live-demo link stays withheld until hosted acceptance. Job Hunt source may be linked now.
- Frame/Shift is an internal design-system name; the public identity is Mark's full name.
- Public positioning uses the durable title "computer science graduate" rather than "recent graduate"; the graduation date remains supporting evidence in Education and the résumé.
- The site is static/server-first, database-free, CMS-free, supports accessible System/Light/Dark appearance choices, and is hosted on Vercel. An existing Light or Dark override remains respected until System is selected.
- Typed local content under `src/data` is the source of truth.
- Only evidence marked `verified` may ship. Pending or withheld evidence is excluded from the public UI.
- Quantitative claims require a measurement method, denominator or baseline, supporting artifact, and explicit approval.
- Real project assets are a release gate. Development previews may use clearly labeled composition placeholders.
- Case studies use a concise recruiter-first structure: compact project introduction, immediate Showcase when verified media exists, then Challenge, Approach, and Result.
- Case-study role, period, and stack facts stay at a fixed top alignment beside the desktop introduction, independent of copy length; smaller screens keep them after the introduction in reading order.
- Automation cards use reviewed film-still posters in 16:9 frames matching the source videos; Relay and Frozen Shoulder retain verified real-capture covers. The older project covers are no longer homepage lead media, and role/evidence detail stays in the case studies rather than repeating on every card.
- Relay is an equal two-person collaboration in which both contributors worked full stack.
- Relay is the public product name. Its public case study uses `/work/relay` and its live demo uses `relay-portfolio-demo.vercel.app`; `/work/projtrack` permanently redirects to the renamed route. The screenshot directory, evidence IDs, and repository URL retain the original technical identifier until those remaining assets are deliberately migrated.
- The interactive credential remains in Contact as a bounded personality moment. The lanyard/Y2K background experiment was rejected and must not return without a new explicit design decision.
- The homepage sequence is Home, Projects, Skills, Experience, Education, Contact. The hero supplies the concise first-person identity; a standalone About block was removed as redundant. The primary navigation remains six links, and the legacy `#about` hash still lands at Skills. Skills use three accessible tabs for tools and methods Mark confirms he has used, including those not shown in the featured projects; AWS re/Start coursework remains explicitly in progress. Experience separates GYG professional work from AWS re/Start training; cloud engineering and solutions architecture remain future directions, not current titles or certifications. Floating contact/social controls remain excluded.
- Featured Projects keeps four visible case studies in the existing order. Desktop category jumps sit in a right-side, section-bound rail; smaller screens keep them inline. Each card is one case-study link surface with a separate user-activated film control.
- The project-category rail stays compact so the four-card grid remains visually centered. Core Skills uses a narrower, centered three-tab inventory; Experience retains native lists with visible markers. The mobile menu is a full-screen, keyboard-operable dialog with GitHub, LinkedIn, and the résumé download.
- The centered desktop navigation uses one viewport-tracked cobalt underline; the accessible menu takes over before six links become cramped. Legacy `#work` and `#about` hashes continue to land at Projects and Skills.
- AWS re/Start is training, not employment: FutureSmart Year 2 Batch 31 began October 2026; the 12-week cohort selected 60 scholars from 800+ applicants according to AWS Siklab Pilipinas. CLF-C02 preparation is ongoing, not an earned certification.
- The owner-confirmed Batch 31 Facebook post resolves but blocks logged-out readers with a sign-in modal. The AWS CTA therefore links to the official AWS re/Start overview and is labeled as a program overview, not a cohort announcement.
- Dark mode uses warm charcoal surfaces and a deeper large cobalt panel; brighter cobalt is reserved for links, focus, and compact signals.
- Contact uses a plain selectable address, `Copy email` as the primary utility, and a friendlier `Open Gmail` web composer as the distinct secondary path; visible `mailto:` actions are excluded because they depend on local handler configuration and duplicate the same destination.
- Long case studies use a labeled closing `Back to top` link instead of a persistent floating control; the sticky header remains the always-available navigation surface.
- Unknown case-study slugs continue through the page-level `notFound()` path instead of `dynamicParams = false` while Next.js issue `vercel/next.js#90537` remains open; permanent tests enforce the same 404 outcome without false-positive server errors.
- Vercel remains the primary host for v1 because it provides the least provider-specific path for the current Next.js application. Git-connected previews precede production, `https://markiguban.dev` is the canonical public domain, `www.markiguban.dev` permanently redirects to the apex, and generated `.vercel.app` URLs remain deployment aliases.
- The domain remains registered with Name.com and uses Name.com DNS records pointed to Vercel. Auto-renew is disabled by owner choice, so manual renewal reminders are required to protect the public URL and accumulated search signals.
- Vercel Web Analytics and Speed Insights packages remain installed, but neither integration is imported or rendered until Mark gives the required product-specific confirmation. Speed Insights remains optional because Vercel identifies activation as potentially billable. Reconsider Cloudflare Workers only if cost or edge-platform requirements justify maintaining the OpenNext adapter.

## Now — review checkpoint

- [ ] Review the remodeled Projects, Skills, Experience, and Education sections at desktop and mobile sizes, including image legibility, AutoDev's leading hierarchy, category jumps, theme selection, navigation underline, and the distinction between screenshots and illustrative films. Verification: explicit approve/revise decision from Mark.

- [ ] Review the revised Relay case study at desktop and mobile sizes, focusing on the immediate full-width Showcase, readable screenshots, concise Challenge → Approach → Result flow, and viewport-safe chapter navigation. Verification: explicit approve/revise decision from Mark.
- [ ] Review the supplied cat mark across the header and browser tab at 16px/24px, then decide whether the 404 artwork should retain the aperture or use the cat. Verification: recorded identity decision and cross-theme legibility check.

## Next — production evidence and repository truth

- [ ] Complete hosted acceptance for AutoDev before publishing its demo URL; bring its public source main up to the documented version before exposing the source link. Consider a narrated test walkthrough as a separate milestone; the architecture diagram is already in the case study.

- [ ] Review future Skills additions against Mark's confirmed hands-on familiarity. Keep labels primary and monochrome icons secondary; do not imply project evidence, employment, proficiency levels, or certification from a tool listing alone.
- [ ] After identity approval, propagate the final mark consistently to the 404 artwork, Open Graph image, and identity registry; do not treat the current header-and-favicon selection as final before review.
- [ ] Complete the remaining minimum asset pack listed in `docs/design-system.md`; Relay dashboard, Gantt, document-control, and portfolio captures are now verified and published, while focused report-editing and responsive/detail captures remain pending.
- [ ] Review the Relay repository separately: rename its public product identity, remove placeholder identity and URLs, repair screenshot references, add approved captures, correct metadata, and document architecture truthfully before exposing its repository link.
- [ ] Review future résumé changes against approved evidence and publish only the reviewed PDF at `public/Mark-Daniel-Iguban-Resume.pdf`.
- [x] Complete restrained motion and core interactive states, including reduced-motion equivalents.

## Acceptance and launch

- [x] Add permanent Playwright smoke and accessibility checks for `/`, `/work/relay`, and `/work/frozen-shoulder-dss`, plus redirect coverage for the retired `/work/projtrack` route.
- [x] Test 390×844, 768×1024, 1280×720, 1440×900, and 1920×1080 viewports.
- [x] Verify primary navigation, mobile Escape behavior, focus return, reduced motion, route rendering, media alternatives, and horizontal overflow in the permanent suite.
- [x] Confirm no runtime, hydration, clipping, serious/critical automated accessibility, or design-token failures in the implemented feedback pass.
- [x] Capture acceptance screenshots at all four viewports as local review records.
- [ ] After Mark's required interactive Vercel confirmation, reintroduce only the approved Web Analytics integration and verify its script without console errors. Keep Speed Insights absent unless Mark separately accepts its billing terms. Verification: analytics appears in the Vercel dashboard, production loads the analytics script, and no Speed Insights script loads.
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
- The AutoDev public repository trails its local documented version; do not expose a source CTA or infer public parity until verified.
- The AutoDev Messenger path has only app-role demonstration; do not present it as publicly available.
- The supplied automation source bundles are stored outside `public/`; do not move their internal Markdown, unselected captures, or review-only Job Hunt image back into web-served paths.
- Domain auto-renew is disabled. Missing the manual renewal window would interrupt the portfolio and could weaken accumulated search signals; maintain independent 60-day and 30-day reminders.

## Completed

- [x] Deployed commit `ec9b522` through the Git-connected Vercel production project as `dpl_HxkTFm4zbkNDmjAJ5dVRcfhsHB1h` on 2026-10-14. Verified all public routes and case-study canonical URLs, production robots and six-route sitemap, `www` and retired ProjTrack 308 redirects, résumé SHA-256 parity, and eight live mobile/desktop case-study browser checks. The Vercel CLI connection worked for deployment inspection.

- [x] Added evidence-bound openings to all four case studies and top-aligned desktop role, period, and stack facts so longer introductions cannot push them down. Restored the existing homepage introduction. Evidence: lint, typecheck, production build, desktop/mobile visual checks, and 43 passing focused browser tests on 2026-10-14; release separately authorized by Mark.

- [x] Replaced the website résumé download with Mark's final automation-focused PDF and checked that its hash matches the local final copy, its PDF page tree contains one page, and the homepage download serves it. The editable source remains local and ignored. Evidence: file hash, PDF `/Count 1`, and Playwright download checks on 2026-10-12.
- [x] Added AutoDev's architecture diagram, selected n8n and integration captures, and full-length opt-in web and app-role Messenger recordings to the case study; preserved the illustrative homepage film separately. Evidence: the selected public assets, case-study copy, and Playwright media-loading checks on 2026-10-12.

- [x] Refined the Projects rail, centered and compacted Core Skills, restored Experience list markers, removed the desktop theme separator, and replaced the mobile dropdown with a full-screen accessible menu carrying social links and the résumé action. Replaced the sign-in-gated cohort post link with the official AWS program overview. Prepared `resume.v3-chronological-automation.docx` with GYG, AutoDev, Job Hunt, Frozen Shoulder, and ongoing AWS training, removing the old projects and unsupported GYG percentages. Evidence: lint, typecheck, production build, 22 focused browser passes across mobile/tablet/desktop with five breakpoint skips, desktop/mobile visual captures, and Word one-page count on 2026-10-09. The public PDF was not replaced because Word PDF export hung; local only, no commit or deployment.

- Refined Featured Projects, expanded user-confirmed Skills into three accessible tabs, removed the header résumé shortcut, and strengthened Experience and Education. Verification: lint, typecheck, and production build passed; the fresh port-4189 preview passed 25 focused mobile/desktop Playwright checks with three breakpoint-specific skips, plus a focused visual pass on 2026-10-09. No commit or deployment.

- Remodeled the local homepage into Projects, Skills, Experience, Education, and Contact; added visible Automation/Development jumps, a centered six-section desktop navigation with moving underline, evidence-linked skill tiles, separate AWS training, and legacy hash anchors. Preserved all four case studies, the Frame/Shift identity, theme behavior, and click-to-play films. Verification: full lint, typecheck, production build, 107 initial full-matrix passes plus the five corrected 404 checks, focused category/header/tablet tests, and reviewed light/dark captures at mobile, tablet, laptop, desktop, and wide-desktop sizes on 2026-10-09. Local only, not committed or deployed.
- Prepared a minimal, one-page AWS re/Start addition in `resume.v3-chronological-aws.docx`, preserving the source résumé's GYG wording and removing the redundant Leadership Experience section. Microsoft Word reports one page; PDF export remains a separate review gate because this environment's Word automation hangs on both the edited and untouched source DOCX.

- Replaced the two automation poster images with labeled frames from their illustrative films, matched player frames to the videos' native 16:9 ratio, and removed repetitive Role/Evidence rows from all four Selected Work cards. The underlying MP4s were not resized and remain click-to-load. Verification: browser-inspected source dimensions, typecheck, scoped lint, production build, and four focused desktop/mobile Playwright checks on 2026-10-09. Local only; not committed or deployed.

- Replaced the separate engineering-work list with full screenshot-led Relay and Frozen Shoulder cards; rebuilt About around an honest AWS re/Start learning chapter and personal interests; added explicit System/Light/Dark selection; and changed the desktop section indicator to follow viewport position. Verification: scoped ESLint, typecheck, production build, and 34 passing focused browser tests across mobile, tablet, and desktop on 2026-10-09; two desktop-only checks were skipped on smaller viewports. Not committed or deployed.

- Foregrounded AutoDev Lead Intake and Job Hunt Automation with real screenshot posters, opt-in illustrative films, full evidence-bound case studies, and links through the typed route system. Moved the supplied source bundles into ignored private storage and published only reviewed media. Relay and Frozen Shoulder now form the secondary tier; Accounting Modernization and Resource Hive are removed from the portfolio. Verification: scoped lint, typecheck, production build, and 18 focused desktop/mobile Playwright checks on 2026-10-09; visual captures reviewed at desktop and mobile sizes. Awaiting Mark's content/design approval before any commit or deployment.

- Improved case-study usability and technical correctness: repaired Relay's tablet hero and mobile reading/focus order, retained valid tab-panel relationships without preloading hidden screenshots, exposed Frozen Shoulder's full interface, added route-specific social images and unknown-slug 404 coverage, removed disabled observability imports and dead product-tour code, made the mobile menu opaque, tuned the favicon-scale mark, and added a tested closing `Back to top` action. Evidence: lint, type checking, production build, visual acceptance at 390×844, 768×1024, 1280×720, and 1440×900, plus 70 passing Playwright tests across five viewports on 2026-09-01.
- Added the focused repository-local skill stack for interface standards, React/Next.js performance, evidence-led portfolio copy, public-repository readiness, identity consistency, and release validation. Expanded the permanent Playwright matrix with Mark's 1920×1080 review environment. Evidence: all six skills pass the official validator; lint, type checking, production build, and 55 Playwright tests pass across five viewports on 2026-08-25.
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
- Replaced the header's aperture candidate with Mark's supplied transparent cat SVGs: charcoal variant `11` on light and near-white variant `10` on dark, matched across the desktop lockup and mobile menu. Evidence: at-size light/dark header captures, lint, type checking, and production build.
- Replaced the browser-tab aperture favicon with the same supplied cat variants, using color-scheme-aware icon links and retaining the separate 404 illustration for later review. Evidence: both SVG routes return 200, homepage metadata emits the light/dark icon links, and lint, type checking, and production build pass.
- Connected the official 21st.dev CLI to Mark's account and reviewed all 46 saved components. Their transferable signals informed the layered evidence frames, tactile primary action, and restrained CSS-only motion; heavyweight 3D and decorative effects remain excluded.
- Verified the public Relay demo and reviewed the eight supplied demo-mode captures for disclosure, visible personal data, and public branding approval.
- Reworked both case studies into concise recruiter-first narratives, corrected Relay attribution to an equal two-person full-stack collaboration, restored project-specific editorial homepage covers, and promoted an accessible four-workflow Frame/Shift product theater ahead of Relay's written process.
- Renamed ProjTrack's public portfolio identity to Relay and documented the electrical-engineering handoff rationale while preserving stable technical routes and asset identifiers. Evidence: type checking, lint, production build, and four viewport-specific Playwright checks for the existing route.
- Selected Vercel as the v1 host after comparing its native Next.js deployment path with Cloudflare Workers/OpenNext; connected `SAIKO0000/Portfolio`, configured the canonical/indexing/observability gates, and created a protected preview at `portfolio-aq1v7tuir-mark-daniel-igubans-projects.vercel.app`. Added the official Web Analytics and Speed Insights integrations behind the activation gate. Evidence: provider documentation, Vercel build, protected route and metadata checks, and 24 passing Playwright tests.
- Upgraded the deployment baseline to Next.js 16.3.2 and React 19.2.8 after Vercel blocked the vulnerable Next.js 15 build; migrated ESLint to the supported flat configuration and removed legacy compatibility code. Evidence: zero production dependency advisories, lint, type checking, and production build.
