# Portfolio Roadmap

## Product Direction

Build a fast, memorable portfolio for recruiters, collaborators, and potential clients. The site should prove capability through a small number of real case studies, clear technical decisions, polished interaction design, and working contact paths rather than through feature volume.

Success means:

- A visitor can understand Mark's focus and strongest work within one screen.
- Every featured project uses truthful copy, working links, and evidence of impact or learning.
- The site is responsive, keyboard accessible, motion-safe, and production-build clean.
- Routine content changes remain simple enough to make directly in the repository.

## Architecture Decisions

- **Static-first content:** Keep portfolio copy, projects, skills, and links in typed local modules under `src/data`. A dedicated database is not justified for the current read-heavy site.
- **Add services only for a concrete capability:** Use a narrowly scoped hosted form or serverless handler when the contact form becomes real; use privacy-conscious analytics only when there is a defined question to answer.
- **Server-first by default:** Prefer App Router server components for static sections and isolate client components to theme controls, forms, measurement, and interactions that genuinely require browser state.
- **One roadmap:** This file is the canonical product and engineering plan. Update it as implementation changes.
- **Design authority:** `.agents/skills/web-design-engineer` is the master layout and visual-design skill for future portfolio work.

## Now

- [ ] Replace implementation-status/demo content with a focused hero, selected-work narrative, about section, and direct contact path. Verification: every homepage section communicates visitor value rather than internal development progress.
- [ ] Turn each featured project into a concise case study with problem, role, decisions, outcome, screenshots, and verified repository/live links. Verification: no placeholder URLs, invented metrics, or unsupported claims remain.
- [ ] Define a small portfolio design system before the redesign: typography, color tokens, spacing scale, layout grid, surface treatment, and motion intensity. Verification: the tokens are documented and used consistently across the homepage.
- [ ] Make contact behavior real or explicitly use a mail link until a form service is selected. Verification: a production visitor can successfully contact Mark and no simulated success state remains.

## Next

- [ ] Refactor static sections into server components and keep client boundaries narrow.
- [ ] Remove or replace the internal MCP demo and performance overlay unless they support the visitor-facing story.
- [ ] Add real project imagery with descriptive alternative text and stable aspect ratios.
- [ ] Audit responsive layout, keyboard navigation, focus states, contrast, and reduced-motion behavior.
- [ ] Replace placeholder SEO values and missing social preview assets with verified production metadata.
- [ ] Add lightweight automated checks for content integrity, type safety, linting, and production builds.

## Later

- [ ] Add privacy-conscious analytics only after defining the decisions those measurements will inform.
- [ ] Add a writing section only when at least three useful, original articles are ready.
- [ ] Add a CMS or database only if non-developer editing, multi-author workflows, or genuinely dynamic content becomes a recurring requirement.
- [ ] Add testimonials only when real, attributable quotes are available.

## Risks and Open Questions

- The current interface emphasizes tools and implementation progress more than Mark's professional story.
- Project dates, outcomes, individual responsibilities, and final production URLs still need owner verification.
- The current contact form simulates delivery and could mislead visitors if exposed unchanged.
- Several planning documents under `docs/` overlap or describe older directions; consolidate them after the new narrative is approved.
- The deployed domain and social-profile URLs need confirmation before final SEO work.

## Completed

- [x] Adopted a static-first content architecture for portfolio projects and site identity.
- [x] Removed the Supabase client, schema, connection tests, environment variables, MCP configuration, setup guide, and direct dependencies.
- [x] Installed a repository-local master layout skill with explicit accessible micro-interaction rules.
- [x] Installed and adapted the repository-local project planner to maintain this canonical `PLANS.md`.
