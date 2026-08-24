---
name: identity-sync
description: Reconcile Mark Daniel Iguban's public identity and links across the portfolio, resume, GitHub, LinkedIn, deployment metadata, and project repositories. Use when names, role labels, domains, contact details, project names, or profile links change; external accounts remain read-only unless the user explicitly authorizes updates.
---

# Identity Sync

Use the current portfolio configuration and the user's latest explicit approval as the canonical source, then compare every in-scope surface.

## Canonical identity

- Name: Mark Daniel Iguban
- Professional label: Software Engineer
- Background wording: computer science graduate
- Primary domain: `https://markiguban.dev`
- Email: `igubanmark0@gmail.com`
- GitHub: `https://github.com/SAIKO0000`
- LinkedIn: `https://www.linkedin.com/in/mark-daniel-iguban-aa07751b6/`
- Public flagship project name: Relay; `/work/projtrack` is compatibility-only.
- Phone number appears only in the reviewed resume PDF.

## Workflow

1. Inventory identity-bearing fields in typed site data, metadata, JSON-LD, sitemap, README, resume files, repository metadata, and user-approved external profiles.
2. Report conflicts before changing ambiguous information.
3. Update only the surfaces authorized by the request. Never infer permission to edit external profiles, repositories, DNS, or deployments.
4. Preserve working redirects and historical technical identifiers when removing them would break compatibility or misrepresent repository history.
5. Verify links, published assets, canonical URLs, and visible labels after changes.

Do not expose private resume source files, hidden document metadata, credentials, or phone numbers outside the approved PDF.
