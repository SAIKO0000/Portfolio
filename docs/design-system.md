# Frame/Shift Design System

Status: recruiter-flow redesign implemented and browser-reviewed; shifted-aperture identity candidate is in review; final project assets remain a production gate.

Frame/Shift is an internal working name, not visitor-facing branding. The public identity is **Mark Daniel Iguban**. The previous boxed MI monogram was removed because it read as a generic initial badge. The current v0 pairs the full-name wordmark with a shifted-aperture candidate; the full name remains primary and the compact mark is not final until Mark approves it.

## Design intent

The site is an evidence-led **Modern Tool portfolio** with a selective micro-bento project composition, restrained editorial typography, and coordinated light and dark material palettes. It should feel calm, technical, direct, and recognizably personal without behaving like a magazine, dashboard, or 3D showcase.

Recruiter conventions control the journey: a sticky navigation bar, one-screen positioning and action, plainly named sections, linear mobile order, visible case-study links, and direct contact. The seven/five selected-work composition creates hierarchy without turning every section into a grid. Editorial devices are limited to the oversized hero statement, mono annotations, keylines, and asymmetric project emphasis.

### Design calibration

- Visual variance: 6/10 - one cobalt signal, asymmetric selected work, and expressive project-specific cover typography within a consistent system.
- Motion intensity: 3/10 - one entrance and short state changes; no ambient or scroll-led spectacle.
- Information density: 4/10 - concise evidence-led summaries with only decision-relevant technical depth.
- Asset dependence: 9/10 - real interfaces and diagrams are essential to production credibility and case-study hierarchy.
- Fidelity target: 9/10 - spacing, line length, focus, responsive order, media legibility, and evidence accuracy are release concerns.

### 21st.dev reference signals

Mark's 46 saved components consistently favor tactile controls, retro hardware, dot or line grids, large typography, layered cards, spatial depth, and restrained luminous feedback. The portfolio should translate those preferences rather than copy entire components.

- Carry forward: a quiet canvas, one structural grid language, layered project evidence, and a compact tactile interaction.
- Consider selectively: dock-like responsiveness, gentle card depth, keyboard or shift behavior, and one controlled glow or highlight using the existing cobalt.
- Do not import wholesale: full-screen 3D worlds, liquid-glass surfaces, autorotating globes, continuous background animation, novelty cursor effects, or multiple competing glow treatments.
- Identity exploration should feel mechanical and responsive without becoming a literal keyboard logo or another boxed-initial badge.

## Tokens

### Color

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| Paper | `#F5F2EA` | `#11110F` | Dominant page field |
| Surface | `#FFFFFF` | `#1A1A17` | Necessary panels and section contrast |
| Graphite | `#171717` | `#F3F0E8` | Primary text, keylines, and controls |
| Signal cobalt | `#2457E6` | `#7C9AFF` | Links, focus, and small signals |
| Inverse cobalt | `#2457E6` | `#2457E6` | Hero evidence panel and white-on-cobalt surfaces |

Use white text on the inverse cobalt panel. Never place graphite body text on that panel. Surface and paper need a graphite keyline when their boundary matters. Cobalt links require an underline or another non-color cue. Focus must remain visible without hover. Project screenshots retain their source colors and are never filtered to imitate the selected theme.

### Typography

- Archivo Variable: headings and body.
- IBM Plex Mono: metadata, technical annotations, and genuine chapter labels.
- Hero: `clamp(3rem, 5.2vw, 5rem)` so the statement and primary action remain visible in the initial viewport.
- Section heading: `clamp(2.25rem, 4.4vw, 3.5rem)`.
- Subheading: 24–32px.
- Body: 17–18px with approximately 1.6 line height.
- Metadata: 12–13px.
- Case-study prose: 60–72 characters per line.

Prefer left alignment. Centered text is reserved for an earned pull quote or closing statement.

### Grid and spacing

- Mobile: 4 columns, 16px gutters.
- Tablet: 6 columns, 24px gutters.
- Desktop: 12 columns, 32px gutters.
- Maximum content width: 1240px.
- Desktop hero: seven-column statement and five-column evidence index.
- Selected work: ProjTrack seven columns and Frozen Shoulder five columns.
- Mobile semantic order: ProjTrack, Frozen Shoulder, Accounting, Resource Hive.
- Homepage section rhythm favors `48 / 64 / 72`; case studies may use `96 / 128` where long-form reading earns it.
- Macro spacing tokens remain `8 / 16 / 24 / 32 / 48 / 64 / 96 / 128`.
- `4` and `12` are limited to component internals or optical correction.

### Geometry

- Editorial panels have square corners.
- Interactive controls have at most a 4px radius.
- Do not use decorative shadows.
- Use alignment, keylines, whitespace, and media for structure.
- Chapter numbers must map to real anchors or be omitted.

## Composition

Homepage order:

1. Navigation: Work, About, Résumé, Contact.
2. Split hero with the site's only inverse-cobalt panel.
3. Selected work: ProjTrack then Frozen Shoulder DSS.
4. Supporting work: Accounting Modernization and Resource Hive as editorial rows.
5. Evidence-linked capabilities.
6. About and education.
7. Direct contact.
8. Minimal footer.

The hero evidence index contains role, graduate status, location/remote availability, full-time opportunity status, and the résumé action. Do not add a separate proof strip.

The homepage omits numbered chapter labels. Plain section names make the page easier to scan, while project numbers remain legitimate identity and ordering devices. At 390x844, the headline, introduction, and primary action must fit before the evidence panel. At 1280x720, the entire split hero must fit. At 1440x900, the selected-work heading and the beginning of project evidence should also be visible.

The header stays available while scrolling. Its active state may identify Work, About, or Contact, but the resume download must never appear active merely because no section is selected. Section-to-section movement is provided by the sticky navigation and hero action; redundant next-section buttons are not added.

Homepage project covers are intentional 16:10 Frame/Shift compositions, not evidence placeholders. Multiple type scales and asymmetric placement establish hierarchy, while every annotation names real project scope: ProjTrack uses project operations, live demo, core workflow, and equal two-person build context; Frozen Shoulder uses rehabilitation DSS, research, feedback workflow, and CPU-friendly computer-vision context. Real interface evidence appears inside each case study.

### Case-study composition

- Project introduction: project name, one-sentence value proposition, role and collaboration context, year, stack, and available public action.
- Showcase: verified interface evidence immediately after the introduction; omit it when no approved media exists.
- Challenge: the problem and the few constraints that materially shaped the work.
- Approach: one architecture explanation and up to three consequential decisions.
- Result: working artifact, lessons, and two concrete improvements without fabricated metrics.

ProjTrack's Showcase spans the full 1240px content width before the narrower reading column. Its custom Frame/Shift Product Theater keeps the 16:10 screenshot dominant, uses a thin graphite frame with one 4px cobalt offset, and avoids stock laptop shells, decorative controls, or perspective effects. Desktop tabs divide into four equal columns with no scrollbars. Mobile may scroll the tab labels horizontally without a visible scrollbar and always provides a direct full-resolution image link because dense desktop interfaces cannot remain fully legible at phone width.

Desktop chapter navigation starts below the 72px sticky header, fits within the remaining viewport, and marks the active chapter. Mobile uses a non-sticky `Jump to` disclosure instead of consuming viewport height with a second sticky bar.

## Interaction and motion

- The header appearance control follows the operating-system preference until the visitor makes an explicit choice; that choice persists locally without a theme-provider dependency.
- The appearance-control icon uses the existing 220ms response timing; palette changes are immediate to avoid low-contrast intermediate states, and reduced motion makes the icon response effectively immediate.
- 140ms: press and focus response.
- 220ms: hover and frame-offset response.
- 360ms: one restrained entrance transition.
- Maximum translation: 4px.
- Animate only `transform` and `opacity`.
- A frame keyline may move 2–4px to expose cobalt on hover or focus.
- The ProjTrack product theater uses labeled tabs, previous/next controls, one visible counter, and a 220ms crossfade with a 2–4px frame offset.
- Product tours never autoplay. Screenshots remain uncropped at 16:10 and include a direct full-resolution link.
- Desktop media uses a custom graphite product frame with one cobalt offset layer; mobile reduces decorative framing while preserving the screenshot and controls.
- Do not use parallax, scroll hijacking, cursor following, magnetic controls, ambient loops, large reveal travel, or card scaling.
- Reduced motion uses immediate state changes or opacity-only feedback.

## Evidence rules

Only items with `publicationState: "verified"` may ship. A quantitative claim also needs:

1. A defined measurement method.
2. A denominator or comparison baseline.
3. A supporting artifact.
4. Explicit approval for public use.

When any requirement is missing, omit the claim. Do not render pending evidence as a teaser, count, blurred artifact, or development-status message in production.

## Asset registry

| Project | Required asset | State | Public-safety requirement |
| --- | --- | --- | --- |
| ProjTrack | Dashboard capture | Verified | Public demo; synthetic, browser-local records; no personal contact data |
| ProjTrack | Gantt or scheduling capture | Verified | Public demo; synthetic, browser-local records; no personal contact data |
| ProjTrack | Document-control workspace | Verified | Public demo; synthetic, browser-local records; no personal contact data |
| ProjTrack | Project portfolio capture | Verified | Public demo; synthetic, browser-local records; no personal contact data |
| ProjTrack | Report-editing workflow | Pending | Real, accurate, no private user data |
| ProjTrack | Responsive/detail capture | Pending | Real, accurate, no private user data |
| Frozen Shoulder | Analysis frame | Pending | Synthetic or deliberately re-enacted |
| Frozen Shoulder | Session/report output | Pending | Sanitized; no participant identifiers |
| Frozen Shoulder | Processing-pipeline diagram | Pending | Accurate to reviewed implementation |
| Frozen Shoulder | Short demo recording | Pending | Sanitized and approved |
| Accounting | Architecture/data-flow diagram | Pending | Accurate to public repository |
| Accounting | API, migration, audit, or ledger artifact | Pending | Real and safe to disclose |
| Resource Hive | Product capture | Pending | Real and free of personal data |
| Portfolio | Distinctive identity mark and favicon | Candidate in review | Shifted-aperture v0 is implemented and scale-tested; approval pending |
| Portfolio | Open Graph image | Pending | Uses approved identity and canonical URL |
| Portfolio | Résumé PDF | Pending | Reviewed; phone only inside PDF |

Development previews may use clearly labeled evidence placeholders inside case studies. Every evidence placeholder blocks production launch; intentional abstract homepage covers do not.

## Identity assets

- Full-name wordmark remains the primary recognition asset and is paired with the shifted-aperture v0 in the home control.
- Do not restore a boxed-initial monogram or substitute another generic letter badge.
- The shifted-aperture candidate uses opposing graphite and cobalt frame corners around a central square to communicate structure and iteration without tying the identity to one project domain.
- Any final mark must be reviewed alongside the site, tested at 16px and 24px, and explicitly approved before production launch.
- Open Graph artwork should use the headline, name, paper field, graphite frame, and one cobalt signal.
