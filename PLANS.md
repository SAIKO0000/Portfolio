# Frame/Shift Portfolio Roadmap

This is the repository's only canonical roadmap. Historical planning documents are retained in `docs/archive/legacy-planning/` for context and must not be treated as current instructions.

## Product goal

Build an evidence-led recruiter portfolio for Mark Daniel Iguban, a recent computer science graduate pursuing full-time software-engineering roles in the Philippines and remotely. A visitor should understand Mark's focus, strongest work, and contact path within one screen, then be able to inspect deeper technical evidence without encountering fabricated metrics or unfinished product theater.

## Decisions

- ProjTrack leads selected work because it most directly demonstrates full-stack product engineering.
- Frozen Shoulder DSS follows as the applied-computer-vision differentiator.
- Accounting Modernization and Resource Hive remain concise supporting work.
- Frame/Shift is an internal design-system name; the public identity is Mark's full name.
- The site is static/server-first, database-free, CMS-free, light-only, and hosted on Vercel.
- Typed local content under `src/data` is the source of truth.
- Only evidence marked `verified` may ship. Pending or withheld evidence is excluded from the public UI.
- Quantitative claims require a measurement method, denominator or baseline, supporting artifact, and explicit approval.
- Real project assets are a release gate. Development previews may use clearly labeled composition placeholders.

## Now — viewable redesign checkpoint

- [x] Preserve the pre-redesign worktree in baseline commit `6d77d6f` and branch from it.
- [x] Consolidate project documentation and record the Frame/Shift design system. Verified by the root roadmap, archive notice, and `docs/design-system.md`.
- [x] Replace the implementation-demo homepage with the approved recruiter-oriented hierarchy. Verified in the first local desktop and mobile visual inspection.
- [x] Add typed local models for site configuration, capabilities, project summaries, case studies, links, media, and evidence publication state.
- [x] Add static ProjTrack and Frozen Shoulder case-study routes driven by their slugs.
- [x] Replace the simulated contact form with a mail link and copy-address control.
- [x] Run lint, type checking, and a production build before presenting the visual checkpoint.

## Next — approval and evidence production

- [ ] Review the viewable Frame/Shift checkpoint with Mark and incorporate one coherent feedback pass.
- [ ] Produce, sanitize, caption, and obtain approval for the minimum asset pack listed in `docs/design-system.md`.
- [ ] Review the ProjTrack repository separately: remove placeholder identity and URLs, repair screenshot references, add approved captures, correct metadata, and document architecture truthfully before exposing its repository link.
- [ ] Review résumé wording against approved evidence and publish only `public/Mark-Daniel-Iguban-Resume.pdf`.
- [ ] Replace every development placeholder with approved evidence before production launch.
- [ ] Complete restrained motion and all interactive states, including reduced-motion equivalents.

## Acceptance and launch

- [ ] Add permanent Playwright smoke and accessibility checks for `/`, `/work/projtrack`, and `/work/frozen-shoulder-dss`.
- [ ] Test 390×844, 768×1024, 1280×720, and 1440×900 viewports.
- [ ] Verify navigation, Escape behavior, skip link, focus order, copy-email feedback, reduced motion, metadata, structured data, internal links, external-link safety, media alternatives, and horizontal overflow.
- [ ] Confirm no console, hydration, font, asset, clipping, critical accessibility, or design-token failures.
- [ ] Capture acceptance screenshots at all four viewports as review records.
- [ ] Centralize and verify a stable Vercel production alias, then enable production indexing only after acceptance.

## Later

- Custom domain and Cloudflare DNS.
- Privacy-conscious analytics tied to a specific decision.
- Dark mode, additional case studies, and writing.
- A CMS or database only if recurring non-developer editing or genuinely dynamic content makes it necessary.

## Risks and gates

- ProjTrack's public repository currently contains placeholder metadata and broken screenshot references; keep its source link withheld until the separate cleanup is approved.
- Frozen Shoulder material may contain sensitive health or participant data; only synthetic, deliberately re-enacted, or sanitized material can be public.
- Project outcome metrics remain excluded until their methods, baselines, artifacts, and public approval are documented.
- Resource Hive's production URL needs verification before it is published.
- The current Vercel URL is not yet accepted as a stable canonical production alias; previews remain non-indexed.

## Completed

- Adopted a static-first architecture and removed the previous Supabase design.
- Installed the repository-local `web-design-engineer` and `project-planner` skills.
- Confirmed the Frame/Shift design direction, palette, typography, grid, hierarchy, motion limits, and evidence policy.
- Confirmed Mark's public identity, role target, project order, and contact information from the supplied résumé and repository review.
