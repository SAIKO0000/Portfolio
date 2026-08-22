# Frame/Shift Design System

Status: approved design direction; implementation and asset approval are in progress.

Frame/Shift is an internal working name, not visitor-facing branding. The public identity is **Mark Daniel Iguban**, with a compact MI frame mark used only as a home control, favicon, or small identity asset when it remains legible.

## Design intent

The site should feel like a precise editorial case-study index: calm, technical, direct, and recognizably personal. Its job is to help a recruiter scan quickly and give an engineer enough structure to inspect decisions and evidence. It is a micro-interactive bento composition, not a dashboard and not a 3D showcase.

## Tokens

### Color

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#F5F2EA` | Approximately 75% of page area |
| White | `#FFFFFF` | 15–20%; real media and necessary surfaces |
| Graphite | `#171717` | Primary text, keylines, and controls |
| Signal cobalt | `#2457E6` | Under 5%, except the hero evidence panel |

Use white text on cobalt. Never place graphite body text on cobalt. White and paper need a graphite keyline when their boundary matters. Cobalt links require an underline or another non-color cue. Focus must remain visible without hover.

### Typography

- Archivo Variable: headings and body.
- IBM Plex Mono: metadata, technical annotations, and genuine chapter labels.
- Hero: `clamp(3.5rem, 8vw, 6.5rem)`.
- Section heading: `clamp(2.25rem, 5vw, 3.5rem)`.
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
- Macro spacing: `8 / 16 / 24 / 32 / 48 / 64 / 96 / 128`.
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

## Interaction and motion

- 140ms: press and focus response.
- 220ms: hover and frame-offset response.
- 360ms: one restrained entrance transition.
- Maximum translation: 4px.
- Animate only `transform` and `opacity`.
- A frame keyline may move 2–4px to expose cobalt on hover or focus.
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
| ProjTrack | Dashboard capture | Pending | Real, accurate, no private user data |
| ProjTrack | Gantt or scheduling capture | Pending | Real, accurate, no private user data |
| ProjTrack | Report-editing workflow | Pending | Real, accurate, no private user data |
| ProjTrack | Responsive/detail capture | Pending | Real, accurate, no private user data |
| Frozen Shoulder | Analysis frame | Pending | Synthetic or deliberately re-enacted |
| Frozen Shoulder | Session/report output | Pending | Sanitized; no participant identifiers |
| Frozen Shoulder | Processing-pipeline diagram | Pending | Accurate to reviewed implementation |
| Frozen Shoulder | Short demo recording | Pending | Sanitized and approved |
| Accounting | Architecture/data-flow diagram | Pending | Accurate to public repository |
| Accounting | API, migration, audit, or ledger artifact | Pending | Real and safe to disclose |
| Resource Hive | Product capture | Pending | Real and free of personal data |
| Portfolio | MI mark and favicon | In review | Legible at 16px and 24px |
| Portfolio | Open Graph image | Pending | Uses approved identity and canonical URL |
| Portfolio | Résumé PDF | Pending | Reviewed; phone only inside PDF |

Development previews may use clearly labeled 16:10 composition placeholders. Every placeholder blocks production launch.

## Identity assets

- Full-name wordmark is primary.
- The MI mark is a compact corner-frame monogram, never a mascot or project-specific symbol.
- Test the MI mark at 16px and 24px. Remove it if either size becomes ambiguous.
- Open Graph artwork should use the headline, name, paper field, graphite frame, and one cobalt signal.
