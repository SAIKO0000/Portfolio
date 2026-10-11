# Frame/Shift Design System

Status: recruiter-flow redesign implemented and browser-reviewed; the supplied cat mark is active in the header for review; final project assets remain a production gate.

Frame/Shift is an internal working name, not visitor-facing branding. The public identity is **Mark Daniel Iguban**. The previous boxed MI monogram was removed because it read as a generic initial badge. The header now pairs the full-name wordmark with Mark's transparent cat SVG: charcoal variant `11` on light and near-white variant `10` on dark. The full name remains primary.

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
| Paper | `#F5F2EA` | `#181815` | Dominant page field |
| Surface | `#FFFFFF` | `#22221E` | Necessary panels and section contrast |
| Graphite | `#171717` | `#F1EEE6` | Primary text, keylines, and controls |
| Signal cobalt | `#2457E6` | `#7C9AFF` | Links, focus, and small signals |
| Inverse cobalt | `#2457E6` | `#2048BD` | Hero evidence panel and white-on-cobalt surfaces |

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
- Selected work: two seven/five rows, with AutoDev and Relay in the larger columns and Job Hunt and Frozen Shoulder in the smaller columns.
- Mobile semantic order: AutoDev, Job Hunt, Relay, Frozen Shoulder.
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

1. Navigation: centered Home, Projects, Skills, Experience, Education, Contact; appearance control at right. The résumé download remains on the homepage, not in the header.
2. Split hero with the site's only inverse-cobalt panel.
3. Featured Projects: four screenshot-led cards in two visible groups, Automation and Development, with right-side desktop category jumps and inline mobile links rather than hidden filters. Each full card links to its case study except its independent video control.
4. Skills: three keyboard-accessible AI & Data, Development, and Delivery tabs with user-confirmed tools and methods; AWS re/Start coursework stays explicitly in progress.
5. Experience: GYG professional role and a separate AWS re/Start current-training entry.
6. Education: Cavite State University degree and August 2026 graduation.
7. Direct contact.
8. Minimal footer.

The hero evidence index contains focus, graduate status, location/remote availability, freelance and relevant-role availability, and the résumé action. Do not add a separate proof strip.

The homepage omits numbered chapter labels. Plain section names make the page easier to scan, while project numbers remain legitimate identity and ordering devices. At 390x844, the headline, introduction, and primary action must fit before the evidence panel. At 1280x720, the entire split hero must fit. At 1440x900, the selected-work heading and the beginning of project evidence should also be visible.

The header stays available while scrolling. Six centered section links share one cobalt underline that follows the viewport, direct hashes, and clicks. The résumé link is absent from desktop and mobile header navigation; the homepage download remains available. At narrower widths the existing accessible menu replaces the crowded desktop links. The complete mark-and-name lockup is the persistent home control: selecting it on the homepage returns to the absolute top, while selecting it from another route returns to the homepage at the top. Same-page movement is smooth unless reduced motion is requested; cross-route movement is immediate. Legacy `#work` and `#about` anchors land at Projects and Skills.

The former About bento and interest tiles are removed. Experience keeps GYG work and AWS re/Start visually and semantically distinct: the latter is a 12-week training program, not employment or an earned certification. Skills include tools Mark has used beyond the current four projects; their presence does not imply professional proficiency or project evidence. Current AWS re/Start coursework remains clearly marked. Education contains both the computer-science degree and senior high school.

Contact combines the site's interactive developer credential with a conversion-first action sequence: a visible selectable email address, a compact primary `Copy email` action with an in-button success state, a friendlier `Open Gmail` web-composer link, and the Elsewhere social index. The visible address is intentionally plain text so it does not duplicate the Gmail action or rely on an operating-system `mailto:` handler. The contact utility uses a dependable two-tier structure: the address receives the full first row, followed by two balanced actions. Only exceptionally narrow screens stack the actions. Case-study closing actions route to this section with the label `Start a conversation`. Do not add a lanyard, global background treatment, or ambient decoration around the credential.

The Skills section owns technical positioning. Group user-confirmed tools under AI & Data, Development, and Delivery without evidence links. Labels carry meaning; monochrome icons or restrained abbreviations are secondary scanning aids. Do not add proficiency percentages, years-of-experience badges, or imply that every tool runs in the featured projects.

Homepage automation cards use 16:9 posters from user-activated animated overviews, labeled as animations rather than live demos. Relay and Frozen Shoulder use verified real interface captures. Small project-specific identity strips distinguish each card without covering the image, inventing results, or introducing a new palette. The case studies carry real screenshots, process, role, and limitation detail.

### Case-study composition

- Project introduction: project name, one-sentence value proposition, role and collaboration context, year, stack, and available public action.
- Showcase: verified interface evidence immediately after the introduction; omit it when no approved media exists.
- Challenge: the problem and the few constraints that materially shaped the work.
- Approach: one architecture explanation and up to three consequential decisions.
- Result: working artifact, lessons, and two concrete improvements without fabricated metrics.

Relay's Showcase spans the full 1240px content width before the narrower reading column. Its custom Frame/Shift Product Theater keeps the 16:10 screenshot dominant, uses a thin graphite frame with one 6px cobalt offset, and avoids stock laptop shells, decorative controls, or perspective effects. Desktop uses a six-item vertical feature rail beside the screenshot. Mobile and tablet follow the semantic reading order of active-feature summary, horizontally scrollable tabs, screenshot, then previous/next controls. Every tab retains a valid tab-panel relationship, and a direct full-resolution image link remains available because dense desktop interfaces cannot remain fully legible at phone width.

Desktop chapter navigation starts below the 72px sticky header, fits within the remaining viewport, and marks the active chapter. Mobile uses a non-sticky `Jump to` disclosure instead of consuming viewport height with a second sticky bar.

## Interaction and motion

- The header appearance controls pair the original sun/moon manual switch with a computer icon for System. System follows the operating-system preference; choosing sun/moon saves the opposite of the current visible theme, while choosing the computer clears the manual override.
- The appearance icons use the existing 220ms response timing; palette changes are immediate to avoid low-contrast intermediate states, and reduced motion makes the icon response effectively immediate.
- 140ms: press and focus response.
- 220ms: hover and frame-offset response.
- 360ms: one restrained entrance transition.
- Maximum translation: 4px.
- Animate only `transform` and `opacity`.
- A frame keyline may move 2–4px to expose cobalt on hover or focus.
- The Relay product theater uses labeled tabs, previous/next controls, one visible counter, and a 220ms crossfade with a 2–4px frame offset.
- On mobile and tablet, the Relay tab strip remains manually scrollable and automatically centers the active feature after tab, arrow, or keyboard selection. The first and last items clamp to the strip edges, proximity snapping assists manual swipes, and reduced motion makes repositioning immediate.
- Product tours never autoplay. Engineering captures remain contained in a stable image canvas; the whole image opens an accessible fit/actual-size dialog. AutoDev's full-length local recordings retain their audio and load only on click, with unrelated chat lists blurred in the Messenger recording.
- Long case studies end with a labeled `Back to top` link targeting a true page-top anchor. Do not add an always-visible floating return control while the sticky header and closing action provide the same route with less visual obstruction.
- The credential may be dragged to orbit or clicked to reverse. No ambient spin, physics simulation, lanyard treatment, or global background motion is allowed.
- Desktop media uses a custom graphite product frame with one cobalt offset layer; mobile reduces decorative framing while preserving the screenshot and controls.
- Do not use parallax, scroll hijacking, cursor following, magnetic controls, ambient loops, large reveal travel, or card scaling.
- Reduced motion uses immediate state changes or opacity-only feedback.

## Error recovery

Unknown routes use a branded but recovery-first 404 page. The page keeps the global header and footer, explains the missing route in plain language, and offers direct paths to the homepage and selected work. Its oversized `4 [Shift Mark] 4` graphic reuses the approved identity vocabulary without becoming a game, novelty interaction, or dead end. The composition uses existing tokens, includes no new dependency, supports both color modes, and preserves the framework-provided 404 status and `noindex` behavior.

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
| Relay | Dashboard capture | Verified | Public demo; synthetic, browser-local records; no personal contact data |
| Relay | Gantt or scheduling capture | Verified | Public demo; synthetic, browser-local records; no personal contact data |
| Relay | Document-control workspace | Verified | Public demo; synthetic, browser-local records; no personal contact data |
| Relay | Project portfolio capture | Verified | Public demo; synthetic, browser-local records; no personal contact data |
| Relay | Report-editing workflow | Pending | Real, accurate, no private user data |
| Relay | Responsive/detail capture | Pending | Real, accurate, no private user data |
| Frozen Shoulder | Sanitized interface/calibration capture | Verified | `public/frozen-shoulder-dss/interface-calibration-demo.png`; visible faces are pixelated and the participant identifier is synthetic (`DEMO-001`) |
| Frozen Shoulder | Synthetic session/report output | Verified | `public/frozen-shoulder-dss/session-report-demo.png`; approved simulated data, presented as workflow evidence rather than a clinical-performance claim |
| Frozen Shoulder | Pose-processing pipeline diagram | Pending | Recreate from the implemented reliability, geometry, state, and reporting flow; do not publish the low-resolution source figure directly |
| Frozen Shoulder | Field prototype context | Verified | `public/frozen-shoulder-dss/field-prototype-context.png`; the face visible on the laptop display is pixelated |
| Frozen Shoulder | Short demo recording | Pending | Sanitized and approved |
| Accounting | Architecture/data-flow diagram | Pending | Accurate to public repository |
| Accounting | API, migration, audit, or ledger artifact | Pending | Real and safe to disclose |
| Resource Hive | Product capture | Pending | Real and free of personal data |
| Portfolio | Header mark and favicon | Cat identity in review | Supplied charcoal/near-white variants now appear in the header and browser tab |
| Portfolio | Open Graph image | Pending | Uses approved identity and canonical URL |
| Portfolio | Résumé PDF | Pending | Reviewed; phone only inside PDF |

Development previews may use clearly labeled evidence placeholders inside case studies. Every evidence placeholder blocks production launch; intentional abstract homepage covers do not.

Raw thesis photographs and extracted figures are stored only under the ignored `.private-assets/frozen-shoulder-dss/` workspace folder. They must never remain under `public`, enter Git history, or be referenced by a production route. `image99.png`, `image136.png`, and `image79.png` remain private source references. Only the approved simulated graph and the two privacy-edited derivatives listed above are published; the original thesis assets remain excluded from v1.

## Identity assets

- Full-name wordmark remains the primary recognition asset and is paired with the supplied transparent cat mark in the home control and mobile menu. The same artwork is horizontally flipped in both themes.
- Do not restore a boxed-initial monogram or substitute another generic letter badge.
- The header uses `public/icons/oneworks-avatar-cat-256 (11).svg` in light mode and `(10).svg` in dark mode; these neutral variants fit the paper/graphite palettes without adding another accent color.
- The browser tab uses the same charcoal/near-white cat variants through color-scheme-aware icon links. The 404 artwork still uses the shifted-aperture candidate; review that remaining identity treatment and 16px/24px favicon legibility before production launch.
- Open Graph artwork should use the headline, name, paper field, graphite frame, and one cobalt signal.

## Current refinement: compact credentials and mobile navigation

- Keep the Frame/Shift paper/charcoal, cobalt, square-border, Archivo/IBM Plex Mono identity. The right-side Projects navigator should occupy a narrow column without pulling the four-card grid conspicuously off center.
- Core Skills uses a centered, narrower content area and compact, centered icon/label tiles. Preserve the three accessible tabs and the complete confirmed skills inventory.
- Experience uses semantic lists with visible cobalt markers. AWS re/Start remains clearly labeled as training, not employment or an earned certification.
- Below the desktop navigation breakpoint, use a full-viewport menu with restrained slide/fade motion, native modal focus behavior, reduced-motion support, the six section links, GitHub/LinkedIn, appearance controls, and a résumé download. Keep the desktop header free of the extra line before its theme controls.
