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
- Case studies use a concise recruiter-first structure: compact project introduction, immediate Showcase when verified media exists, then Challenge, Approach, and Result.
- Abstract homepage project covers are identity and hierarchy devices. Their varied typography must communicate real project scope, mode, and collaboration context; verified interface evidence belongs inside the corresponding case study.
- ProjTrack is an equal two-person collaboration in which both contributors worked full stack.

## Now — review checkpoint

- [ ] Review the revised ProjTrack case study at desktop and mobile sizes, focusing on the immediate full-width Showcase, readable screenshots, concise Challenge → Approach → Result flow, and viewport-safe chapter navigation. Verification: explicit approve/revise decision from Mark.
- [ ] Approve, revise, or reject the shifted-aperture identity candidate after reviewing the 16px, 24px, header, and favicon applications. Verification: recorded identity decision.
- [ ] If the mark is rejected, compare only two focused alternatives—a custom MI monogram and a tactile frame-switch emblem—without changing the approved page system. Verification: one selected direction or a documented decision to remain wordmark-only.

## Next — production evidence and repository truth

- [ ] After identity approval, propagate the final mark to the Open Graph image and identity registry; do not treat the current v0 candidate as final before review.
- [ ] Complete the remaining minimum asset pack listed in `docs/design-system.md`; ProjTrack dashboard, Gantt, document-control, and portfolio captures are now verified and published, while focused report-editing and responsive/detail captures remain pending.
- [ ] Review the ProjTrack repository separately: remove placeholder identity and URLs, repair screenshot references, add approved captures, correct metadata, and document architecture truthfully before exposing its repository link.
- [ ] Review résumé wording against approved evidence and publish only `public/Mark-Daniel-Iguban-Resume.pdf`.
- [ ] Add approved evidence to every production case study; abstract homepage covers may remain because they are not presented as product evidence.
- [x] Complete restrained motion and core interactive states, including reduced-motion equivalents.

## Acceptance and launch

- [x] Add permanent Playwright smoke and accessibility checks for `/`, `/work/projtrack`, and `/work/frozen-shoulder-dss`.
- [x] Test 390×844, 768×1024, 1280×720, and 1440×900 viewports.
- [x] Verify primary navigation, mobile Escape behavior, focus return, reduced motion, route rendering, media alternatives, and horizontal overflow in the permanent suite.
- [x] Confirm no runtime, hydration, clipping, serious/critical automated accessibility, or design-token failures in the implemented feedback pass.
- [x] Capture acceptance screenshots at all four viewports as local review records.
- [ ] Complete final link, metadata, structured-data, copy-email, font, and asset acceptance after the approved evidence pack and canonical production URL are in place.
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
- Preserved the pre-redesign worktree in baseline commit `6d77d6f`, consolidated documentation, and archived superseded planning material.
- Replaced the implementation-demo homepage with the approved recruiter-oriented hierarchy, typed local content, static ProjTrack and Frozen Shoulder routes, and direct email contact.
- Compacted the hero and homepage rhythm, added a visible primary action and sticky active navigation, removed repeated chapter labels, and strengthened the selected-work hierarchy.
- Added permanent Playwright smoke and accessibility coverage at 390×844, 768×1024, 1280×720, and 1440×900. Evidence: 16 passing tests, lint, type checking, production build, and local acceptance captures.
- Removed the generic boxed MI mark and unnecessary footer tagline, then added a shifted-aperture v0 candidate as the compact header control and favicon while retaining the full name as the primary identity.
- Connected the official 21st.dev CLI to Mark's account and reviewed all 46 saved components. Their transferable signals informed the layered evidence frames, tactile primary action, and restrained CSS-only motion; heavyweight 3D and decorative effects remain excluded.
- Verified the public ProjTrack demo and reviewed the eight supplied demo-mode captures for disclosure, visible personal data, and public branding approval.
- Reworked both case studies into concise recruiter-first narratives, corrected ProjTrack attribution to an equal two-person full-stack collaboration, restored project-specific editorial homepage covers, and promoted an accessible four-workflow Frame/Shift product theater ahead of ProjTrack's written process.
