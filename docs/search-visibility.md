# Search visibility and AI-answer readiness

Reviewed 12 October 2026. Scope: the portfolio at `https://markiguban.dev`; no account, DNS, external-profile, commit, or deployment changes were made as part of this audit.

## Honest target

The useful outcome is that an employer searching **Mark Daniel Iguban** finds an accurate, current homepage, credible case studies, and consistent third-party profiles. An AI Overview is not a controllable feature or a reliable success metric. [Google says](https://developers.google.com/search/docs/appearance/ai-features) its AI features use normal Search eligibility, need no special schema or AI file, and appear only when Google judges an overview useful for the query. [Ahrefs' large query study](https://ahrefs.com/blog/insights-from-56-million-ai-overviews/) found AI Overviews less common for branded and short queries in its sample; trigger rates can change.

## Current findings

1. The site already has descriptive page titles, canonical URLs, a sitemap, robots rules, case-study text, and `Person` structured data. It did **not** declare a `WebSite` name, and the homepage's visible introduction was less specific than the current automation-first work.
2. A public search snapshot still surfaced an earlier full-stack/computer-vision homepage and earlier Relay page. This suggests delayed recrawling or stale search presentation, not proof that the live site is wrong. Only a verified [Search Console URL inspection](https://support.google.com/webmasters/answer/10351509) can show Google's current crawl/index state.
3. Search snapshots of the [Himalayas profile](https://himalayas.app/@markiguban) show older full-stack positioning and an apparent GYG date range that differs from the current résumé. Some LinkedIn directory snippets place AWS under experience, but the actual profile could not be inspected here. Review these accounts directly before editing; do not turn training into employment.
4. The previous sitemap emitted a fixed `2026-10-09` modification date for every page and frequency/priority hints. [Google asks for verifiably accurate significant-change dates](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and does not use frequency or priority hints. The sitemap now lists canonical URLs only.

## Changes made locally

- The visible introduction and meta description state Mark's degree, location, workflow-automation focus, and actual n8n/Python/full-stack work without calling the local projects production AI.
- The homepage declares a `WebSite` with the preferred site name and a stable `Person` identity; case studies reference that same person and site. This helps disambiguation, but [structured data must match visible content](https://developers.google.com/search/docs/appearance/ai-features) and does not buy an AI Overview.
- The canonical URL fallback is the production domain, not localhost. Production still needs the configured domain checked after deployment.
- Removed the keyword meta list because [Google does not use it for indexing or ranking](https://developers.google.com/search/docs/crawling-indexing/special-tags).

## Account work required after deployment

1. Open the [Google Search Console property selector](https://search.google.com/search-console) and look for the **Domain property** `markiguban.dev`. A public DNS lookup on 12 October 2026 found a `google-site-verification` TXT record, but that cannot establish which Google account currently has access. In the property, check **Settings → Ownership verification** and **Settings → Users and permissions**. A URL-prefix property such as `https://markiguban.dev/` covers a narrower scope; do not share account passwords or verification tokens.
2. Submit `https://markiguban.dev/sitemap.xml`; inspect `/`, `/work/autodev`, `/work/job-hunt-automation`, `/work/relay`, and `/work/frozen-shoulder-dss`. Check fetch success, selected canonical, indexing status, and rendered text. Request indexing for priority pages only after confirming the live deployment.
3. Compare the current public résumé, LinkedIn, GitHub, and job-board profiles against the same name, role wording, project names, dates, and training status. Correct stale external copy in the accounts you control; avoid fabricated endorsements or paid link schemes.
4. Track branded query impressions/clicks and indexed pages monthly in Search Console. Search results and AI features can vary by place, account, device, and time; manually sample the name query without treating one screenshot as a stable ranking.

## GA4 decision

[Google distinguishes](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console) Search Console (search queries, impressions, clicks, indexing) from GA4 (post-click behavior). GA4 does **not** improve rankings or cause an AI Overview. For this small portfolio, Search Console is the first necessary measurement tool. GA4 becomes useful if there is a specific question about which case studies visitors open or which traffic channels lead to contact actions.

The site owner created a separate portfolio Web stream and approved **opt-in GA4**, Measurement ID `G-D8BD8TFGQY`. The local integration uses a small consent panel, a footer setting to change the choice, and a [portfolio privacy notice](/privacy). The Google tag is not requested before acceptance; on consent, it queues denied advertising consent and granted analytics consent before loading the script. Its config disables Google Signals and ad-personalization signals. On withdrawal, it disables the tag, attempts to remove Analytics cookies, and reloads so the tag is absent. This follows [Google's basic consent-mode distinction](https://support.google.com/analytics/answer/14009635). No manual page-view events are sent; GA4's enhanced measurement handles initial and history-change page views. Verify this and duplicate counts in Analytics Realtime after deployment. The existing Vercel Analytics dependency remains inactive and requires separate approval.

This integration is **local only as of 13 October 2026**; the published website will not collect GA4 data until these changes are reviewed and deployed. Focused browser tests intercept Google requests so local QA does not create production Analytics visits. Google Analytics does not improve ranking or trigger an AI Overview.

## What not to do

- No promise that a name search will show an AI Overview, knowledge panel, or particular summary.
- No `llms.txt`, FAQ-schema spray, keyword stuffing, synthetic reviews, mass-produced biography pages, or fabricated backlinks. [Google's generative-AI guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) cautions against special-markup hacks and recommends original, useful, crawlable content.
- Treat practitioner discussions as ideas, not proof. A [recent SEO forum discussion](https://www.reddit.com/r/SEO/comments/1vfs44o/how_much_seo_do_you_do_for_ai/) similarly emphasizes consistent names/descriptions and accessible original pages, but that is anecdotal and less authoritative than Search Central documentation.
