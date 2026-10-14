# Search visibility and AI-answer readiness

Reviewed 14 October 2026. This release changes portfolio case-study copy and layout; it does not edit external profiles or Search Console settings.

## Goal and limits

An employer searching **Mark Daniel Iguban** should find a current, credible account of his work. An AI Overview is neither guaranteed nor a controllable measure of success. [Google's AI-feature guidance](https://developers.google.com/search/docs/appearance/ai-features) says ordinary Search indexing and helpful, crawlable content are the foundation; there is no special AI markup to add. Google's [generative-search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) favors original, first-hand content over pages written solely for AI systems.

The [GEO research](https://arxiv.org/html/2311.09735v3) measured visibility gains in its experimental setting, not a promise of Google AI Overview placement, traffic, or hiring outcomes. [Ahrefs' October 2026 branded-query study](https://ahrefs.com/blog/ai-overviews-on-branded-searches/) found AI Overviews increasingly common in its brand-query sample, but that does not predict a result for this personal-name query.

## Site foundation and this change

- The homepage hero names Mark, describes his computer science background and rule-based n8n/Python work, while the page title and metadata use Software Engineer / Workflow Automation. The existing project cards link to AutoDev, Job Hunt Automation, Relay, and Frozen Shoulder DSS. The case-study openings pair the problem with personal contribution, working evidence, and an important limit; AutoDev and Job Hunt are not described as production AI. A separate About block was removed because it repeated the hero rather than adding useful evidence.
- The existing `Person` and `WebSite` structured data use the same visible name and role. Case studies reference the same person and site. The canonical origin is `https://markiguban.dev`; the sitemap lists the homepage, privacy page, and four case studies without invented modification dates.
- `robots.ts` allows production crawling only when `NEXT_PUBLIC_ENABLE_INDEXING=true`. The published site's crawl state must be checked independently after deployment; a local build with the flag unset correctly disallows indexing.
- Metadata and structured data support discovery and identity consistency, not an AI Overview guarantee. Do not add `llms.txt`, artificial AI chunks, generic FAQ pages, or keyword-stuffed biographies.

## External identity to reconcile

A public snapshot of the [Himalayas profile](https://himalayas.app/@MarkIguban) still shows older positioning, an unsupported 75% Relay productivity claim, and outdated education wording. The [Jobicy profile](https://jobicy.com/u/id77844) also shows the unsupported 75% and 40–50% claims and older project positioning. Correct these in the accounts before relying on them as citations. Compare exact dates with the approved résumé. LinkedIn's actual account should be inspected before changing AWS re/Start classification; public directory snippets alone are insufficient. AWS re/Start is current training and CLF-C02 preparation, not employment or earned certification. GitHub and job-board descriptions should use the same name, domain, role, and project boundaries. The site work here does not edit external accounts.

## Owner checklist after deployment

1. Confirm `https://markiguban.dev/robots.txt` permits crawling and `https://markiguban.dev/sitemap.xml` lists the canonical routes; inspect the rendered homepage and case studies logged out.
2. In the verified [Search Console property](https://search.google.com/search-console), submit the sitemap and use URL Inspection for `/`, `/work/autodev`, `/work/job-hunt-automation`, `/work/relay`, and `/work/frozen-shoulder-dss`. Check indexing, selected canonical, and rendered text; request recrawling where needed.
3. Monthly, review branded-query impressions, clicks, and indexing. Check Search Console's [Generative AI performance report](https://support.google.com/webmasters/answer/16984139) if available; low-volume properties may not show enough data. [Bing Webmaster Tools AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) is a secondary signal, not a Google proxy.
4. Compare public LinkedIn, GitHub, Himalayas, other job-board profiles, and the downloadable résumé against the visible portfolio. Make account-level edits only with Mark's review.

## Analytics status

Opt-in GA4 with Measurement ID `G-D8BD8TFGQY` was deployed on 13 October 2026. The site requests no Google tag until a visitor accepts the optional analytics panel; visitors can change that choice in the footer. Search Console measures discovery, while GA4 measures consented on-site behavior. GA4 does not improve rankings or cause an AI Overview. Verify live event collection and duplicate-pageview behavior in GA4 Realtime separately; no analytics account settings were changed in this work.
