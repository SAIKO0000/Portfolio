---
name: release-quality-gate
description: Validate this portfolio before a checkpoint, pull request, or deployment. Use when the user asks to release, deploy, push, perform final QA, or confirm production readiness; it coordinates repository safety, build checks, browser acceptance, metadata, assets, privacy, and post-deploy verification without granting commit or deployment authority by itself.
---

# Release Quality Gate

Run the smallest complete gate appropriate to the requested release. Never commit, push, deploy, change DNS, or mutate external services unless the user explicitly authorizes that action.

## Preflight

- Inspect branch, status, diff, ignored private files, and unrelated user changes.
- Confirm the canonical URL, indexing gate, observability choice, approved resume PDF, and public evidence states.
- Block release for exposed secrets, private participant data, broken required assets, fabricated claims, or pending evidence rendered publicly.

## Required checks

Run:

1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm build`
4. The permanent Playwright suite against a production-like server

Browser acceptance covers 390×844, 768×1024, 1280×720, 1440×900, and 1920×1080 in Chrome. Verify the homepage, Relay, Frozen Shoulder DSS, the retired ProjTrack redirect, and the custom 404. Check runtime errors, hydration, horizontal overflow, keyboard focus, mobile navigation, reduced motion, theme behavior, image/text clipping, external-link safety, metadata, structured data, sitemap, robots, resume delivery, and next-project scroll restoration.

Treat captured screenshots as visual-acceptance records unless a maintained baseline exists; do not call them visual regression tests.

## Release and verification

When release is authorized, deploy only the reviewed commit. Confirm deployment status, aliases, HTTPS, canonical metadata, robots and sitemap behavior, required routes, and production console health. Report the exact commit and deployment identifiers when available, plus any intentionally deferred checks.
