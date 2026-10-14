export type PublicationState = 'verified' | 'withheld' | 'pending';
export type SocialPlatform = 'linkedin' | 'github' | 'instagram' | 'facebook';

export interface SocialProfile {
  platform: SocialPlatform;
  label: string;
  handle: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  headline: string;
  introduction: string;
  description: string;
  email: string;
  location: string;
  opportunity: string;
  socialProfiles: SocialProfile[];
  siteUrl: string;
  resumePath: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  description: string;
  publicationState: PublicationState;
  quantitative?: boolean;
  method?: string;
  baseline?: string;
  artifact?: string;
  approvedForPublic?: boolean;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'case-study' | 'live' | 'source' | 'external';
  publicationState: PublicationState;
}

export interface MediaAsset {
  id: string;
  kind: 'image' | 'video' | 'diagram';
  src: string;
  alt: string;
  caption: string;
  label?: string;
  aspectRatio?: string;
  publicationState: PublicationState;
}

export interface PreviewVideo {
  src: string;
  poster: string;
  posterAlt: string;
  description?: string;
}

export interface CaseRecording extends PreviewVideo {
  title: string;
  context: string;
}

export interface ProjectSummary {
  slug: string;
  title: string;
  label: string;
  summary: string;
  role: string;
  year: string;
  technologies: string[];
  outcome: string;
  size: 'featured' | 'complementary' | 'supporting';
  links: ProjectLink[];
  evidence: EvidenceItem[];
  media: MediaAsset[];
  previewVideo?: PreviewVideo;
}

export interface CaseStudySection {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  points?: string[];
}

export interface CaseStudy extends ProjectSummary {
  opening: string;
  sections: CaseStudySection[];
  improvements: string[];
  recordings?: CaseRecording[];
  nextSlug?: string;
}

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteConfig: SiteConfig = {
  name: 'Mark Daniel Iguban',
  headline: 'I build reliable automations and full-stack tools for real workflows.',
  introduction:
    'I’m Mark Daniel Iguban, a computer science graduate in the Philippines. I build rule-based n8n and Python automations alongside full-stack tools, with clear handoffs for the people who use them.',
  description:
    'Mark Daniel Iguban is a Philippines-based software engineer focused on workflow automation and full-stack development. Explore his n8n, Python, and Next.js case studies.',
  email: 'igubanmark0@gmail.com',
  location: 'Philippines / remote',
  opportunity: 'Open to freelance automation projects and relevant engineering roles',
  socialProfiles: [
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      handle: 'Mark Daniel Iguban',
      href: 'https://www.linkedin.com/in/mark-daniel-iguban-aa07751b6/',
    },
    {
      platform: 'github',
      label: 'GitHub',
      handle: '@SAIKO0000',
      href: 'https://github.com/SAIKO0000',
    },
    {
      platform: 'instagram',
      label: 'Instagram',
      handle: '@sircartierr0',
      href: 'https://www.instagram.com/sircartierr0/',
    },
    {
      platform: 'facebook',
      label: 'Facebook',
      handle: 'MarkDaniel.Iguban',
      href: 'https://www.facebook.com/MarkDaniel.Iguban',
    },
  ],
  siteUrl: configuredSiteUrl ?? 'https://markiguban.dev',
  resumePath: '/Mark-Daniel-Iguban-Resume.pdf',
};

const autodev: CaseStudy = {
  slug: 'autodev',
  title: 'AutoDev Lead Intake',
  label: 'n8n workflow automation',
  summary: 'A rule-based intake system that accepts service requests, stores a verifiable receipt, and routes a human-review queue into private follow-up workflows.',
  opening: 'I designed the web entry and shared n8n intake, then connected an owner-only review queue to Sheets, alerts, and reminders. Workflow captures and full local-test recordings show the handoff; Messenger was tested only with an app-role account, and there is no public hosted demo yet.',
  role: 'Sole designer and developer',
  year: '2026',
  technologies: ['n8n', 'Next.js', 'Google Sheets', 'Telegram'],
  outcome: 'Controlled local runs demonstrated web intake, stored receipt readback, private follow-up, and deletion; public hosting remains pending.',
  size: 'featured',
  links: [],
  evidence: [],
  previewVideo: {
    src: '/projects/autodev/illustrative-film.mp4',
    poster: '/projects/autodev/illustrative-film-poster.png',
    posterAlt: 'AutoDev animated overview poster with the message “Two ways in. One clear next step.”',
    description: 'This animation explains the intake journey; it is not a recording of a live run. The case study shows screenshots from controlled local tests.',
  },
  media: [
    { id: 'autodev-intake', kind: 'image', src: '/projects/autodev/intake-workflow.png', alt: 'n8n Lead Intake canvas with validation, deduplication, storage, and routing nodes.', caption: 'Shared rule-based intake validates, deduplicates, stores, and routes test requests.', label: 'Lead Intake workflow', aspectRatio: '16 / 9', publicationState: 'verified' },
    { id: 'autodev-architecture', kind: 'diagram', src: '/projects/autodev/autodev-system-overview.png', alt: 'Illustrated AutoDev system diagram connecting web and app-role Messenger intake to n8n, private integrations, and human review.', caption: 'Illustrated system map; the connected workflow captures supply run evidence.', label: 'System architecture', aspectRatio: '16 / 9', publicationState: 'verified' },
    { id: 'autodev-operations', kind: 'image', src: '/projects/autodev/lead-operations-workflow.png', alt: 'Complete n8n Lead Operations canvas, from webhook and scheduled checks through private alerts, reminders, Sheet updates, and cleanup.', caption: 'Full workflow map of private follow-up, including alerts, reminders, Sheet updates, and cleanup.', label: 'Lead Operations', aspectRatio: '15 / 7', publicationState: 'verified' },
    { id: 'autodev-messenger', kind: 'image', src: '/projects/autodev/messenger-intake-workflow.png', alt: 'n8n Messenger Intake canvas connected to the shared intake workflow.', caption: 'App-role Messenger intake hands requests to the same rule-based path; public access is not approved.', label: 'Messenger Intake', aspectRatio: '16 / 9', publicationState: 'verified' },
    { id: 'autodev-queue', kind: 'image', src: '/projects/autodev/human-review-queue.png', alt: 'Cropped n8n queue row showing review destination, routing reason, and pending status.', caption: 'A stored test row reaches a pending human-review queue; routing is illustrative.', label: 'Human-review queue', aspectRatio: '31 / 7', publicationState: 'verified' },
    { id: 'autodev-sheet', kind: 'image', src: '/projects/autodev/private-sheet.png', alt: 'Cropped private Google Sheet showing a fictional request row and staff follow-up columns.', caption: 'A fictional request appears in the owner-only Sheet with follow-up fields.', label: 'Private Sheet', aspectRatio: '53 / 6', publicationState: 'verified' },
    { id: 'autodev-telegram', kind: 'image', src: '/projects/autodev/telegram-owner-alert.png', alt: 'Frame from a controlled local recording showing AutoDev web and Messenger owner alerts in Telegram, with unrelated chats blurred.', caption: 'Telegram received owner alerts for both entry channels; unrelated chats are blurred.', label: 'Telegram alerts', aspectRatio: '16 / 9', publicationState: 'verified' },
    { id: 'autodev-calendar', kind: 'image', src: '/projects/autodev/calendar-reminder.png', alt: 'Calendar event created for next-day owner follow-up in a controlled local run.', caption: 'The controlled run produced a next-day reminder for the owner.', label: 'Calendar reminder', aspectRatio: '16 / 9', publicationState: 'verified' },
    { id: 'autodev-ledger', kind: 'image', src: '/projects/autodev/operations-ledger.png', alt: 'n8n operations ledger table showing controlled follow-up state with masked identifiers.', caption: 'The operations ledger records follow-up state so handoffs and cleanup can be inspected.', label: 'Operations ledger', publicationState: 'verified' },
    { id: 'autodev-retention', kind: 'image', src: '/projects/autodev/retention-workflow.png', alt: 'n8n Data Retention workflow canvas showing the request lifecycle cleanup path.', caption: 'A separate retention workflow defines cleanup beyond the initial handoff.', label: 'Retention workflow', aspectRatio: '16 / 9', publicationState: 'verified' },
    { id: 'autodev-inventory', kind: 'image', src: '/projects/autodev/workflow-inventory.png', alt: 'Cropped n8n inventory listing ten AutoDev workflows without instance-wide execution statistics.', caption: 'The inventory shows the project’s workflow scope; it is not an execution or outcome metric.', label: 'Workflow inventory', publicationState: 'verified' },
  ],
  recordings: [
    { title: 'Web intake run', src: '/projects/autodev/web-intake-local-demo.mp4', poster: '/projects/autodev/web-intake-local-poster.png', posterAlt: 'Web intake form from a controlled local AutoDev run.', context: 'Controlled local test · web channel' },
    { title: 'Messenger intake run', src: '/projects/autodev/messenger-app-role-local-demo.mp4', poster: '/projects/autodev/messenger-app-role-local-poster.png', posterAlt: 'AutoDev Messenger chat from an app-role test account.', context: 'Controlled local test · app-role account' },
  ],
  sections: [
    { id: 'challenge', label: 'Challenge', title: 'A service request needs a trustworthy handoff, not another lost inbox message.', paragraphs: ['AutoDev explores how a small service business could collect web and Messenger requests, show what happened to each submission, and keep follow-up visible to its owner. The boundary is deliberate: routing rules organize work, while a person reviews and decides what to do next.'] },
    { id: 'approach', label: 'Approach', title: 'One intake path records the request and returns a verifiable receipt.', paragraphs: ['I built the web entry and shared n8n intake workflow, then connected an owner-only queue to Google Sheets, Telegram, Brevo fallback, and a next-day Calendar reminder. Validation, duplicate prevention, stored readback, redacted proof, deletion, and retention behavior were exercised with fictional requests.'], points: ['Messenger was demonstrated only through an app-role account, not public Meta access.', 'Routing categories are illustrative rules, not AI qualification or CRM synchronization.', 'A private human-review queue remains the operational handoff.'] },
    { id: 'result', label: 'Result', title: 'Controlled local runs showed the complete handoff and its limits.', paragraphs: ['The workflow canvases show how the system is built. The queue, Sheet, Telegram, Calendar, and ledger captures show observed states from controlled local tests; the system map is an illustration, not run evidence. The two full-length recordings show the web and app-role Messenger entry paths and private follow-up. There is no public hosted demo yet, and hosted acceptance remains the next gate.'] },
  ],
  improvements: ['Complete hosted acceptance and only then publish a live-demo link.', 'Bring the public source repository up to the documented version before adding a source link.', 'Add a narrated end-to-end test walkthrough as a later milestone.'],
  nextSlug: 'job-hunt-automation',
};

const jobHunt: CaseStudy = {
  slug: 'job-hunt-automation',
  title: 'Job Hunt Automation',
  label: 'Local Python automation',
  summary: 'A daily local assistant that gathers approved job feeds, applies deterministic fit and deduplication rules, and prepares a Google Sheets queue for manual review.',
  opening: 'I built the Windows-scheduled Python collector and rule-based review pipeline. Local dashboard and queue captures show its output; applications and outreach stay manual, and the optional AI paths are disabled.',
  role: 'Sole designer and developer',
  year: '2026',
  technologies: ['Python', 'Google Sheets', 'Windows Task Scheduler', 'Himalayas', 'Jobicy'],
  outcome: 'A working local run produces a reviewable opportunity queue while applications and messages remain manual.',
  size: 'complementary',
  links: [{ label: 'View source', href: 'https://github.com/SAIKO0000/jobhunt-automation', kind: 'source', publicationState: 'verified' }],
  evidence: [],
  previewVideo: {
    src: '/projects/job-hunt-automation/illustrative-film.mp4',
    poster: '/projects/job-hunt-automation/illustrative-film-poster.png',
    posterAlt: 'Job Hunt animated overview poster with the message “Too many listings.”',
    description: 'This animation explains the workflow; it is not a recording of a live run. The dashboard captures are real, and applications remain manual.',
  },
  media: [
    { id: 'job-dashboard', kind: 'image', src: '/projects/job-hunt-automation/dashboard.png', alt: 'Google Sheets dashboard showing local run health, opportunity counts, and manual pipeline navigation.', caption: 'October 7, 2026 dashboard capture from a local run; counts are a point-in-time queue, not hiring outcomes.', label: 'Dashboard', aspectRatio: '16 / 9', publicationState: 'verified' },
    { id: 'job-review', kind: 'image', src: '/projects/job-hunt-automation/review-queue.png', alt: 'Google Sheets technical opportunity queue with fields for fit, review, and next actions.', caption: 'Human-readable opportunity queue for manual review and application decisions.', label: 'Review queue', aspectRatio: '16 / 9', publicationState: 'verified' },
    { id: 'job-architecture', kind: 'diagram', src: '/projects/job-hunt-automation/architecture.png', alt: 'Architecture diagram showing scheduled local feed collection, deterministic processing, Google Sheets, and human review.', caption: 'Architecture overview: scheduled collection and rule-based processing stop at a human review boundary.', label: 'Architecture', aspectRatio: '16 / 9', publicationState: 'verified' },
  ],
  sections: [
    { id: 'challenge', label: 'Challenge', title: 'Finding relevant openings should not consume the time needed to evaluate them.', paragraphs: ['Repeatedly checking job boards creates duplicates and context switching. I wanted a local assistant that prepares a consistent review queue without deciding where to apply or contacting employers on my behalf.'] },
    { id: 'approach', label: 'Approach', title: 'A scheduled Python run applies explicit rules before writing to Sheets.', paragraphs: ['A daily Windows run collects listings from the approved Himalayas and Jobicy feeds, normalizes them, applies deterministic fit rules and deduplication, and updates a Google Sheets workbook. The dashboard, technical queue, and pipeline make the next human action visible.'], points: ['No automatic application, message, or outreach is sent.', 'Optional Gemini and Ollama paths are disabled, not active production AI.', 'The workbook supports manual review, status tracking, and follow-up.'] },
    { id: 'result', label: 'Result', title: 'The local workflow makes the search reviewable while keeping the final decision manual.', paragraphs: ['The October 7 screenshots show a working local dashboard and queue. They are not evidence of interviews or offers. The architecture diagram explains how data reaches the workbook and where automation stops.'] },
  ],
  improvements: ['Continue reviewing feed quality and rule drift as sources change.', 'Keep manual decisions explicit if new integrations are added.'],
  nextSlug: 'relay',
};

const relay: CaseStudy = {
  slug: 'relay',
  title: 'Relay',
  label: 'Full-stack product engineering',
  summary:
    'A project-operations workspace for GYG Power Systems that connects schedules, tasks, responsibilities, and reporting in one workflow.',
  opening: 'As one of two full-stack developers, I worked across project views, shared data models, and report exports. The public demo uses synthetic records so the product can be inspected; it does not establish quantified productivity gains.',
  role: 'Full-stack co-developer',
  year: 'Jul 2025–Aug 2026',
  technologies: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Firebase'],
  outcome:
    'The work strengthened my approach to translating operational rules into understandable interfaces and maintainable data flows.',
  size: 'featured',
  links: [
    {
      label: 'Open Relay Demo',
      href: 'https://relay-portfolio-demo.vercel.app',
      kind: 'live',
      publicationState: 'verified',
    },
    {
      label: 'View source',
      href: 'https://github.com/SAIKO0000/projtrack-portfolio-demo',
      kind: 'source',
      publicationState: 'withheld',
    },
  ],
  evidence: [
    {
      id: 'projtrack-live-demo',
      title: 'Public product demo',
      description: 'A working deployment is available for direct inspection.',
      publicationState: 'verified',
      artifact: 'https://relay-portfolio-demo.vercel.app',
      approvedForPublic: true,
    },
  ],
  media: [
    {
      id: 'projtrack-dashboard',
      kind: 'image',
      src: '/projtrack-portfolio-screenshots/01-dashboard-overview.png',
      alt: 'Relay demo dashboard showing project totals, progress trends, status distribution, and project navigation.',
      caption: 'Dashboard overview with project status, ownership, and progress signals. Public demo with synthetic, browser-local records.',
      publicationState: 'verified',
    },
    {
      id: 'projtrack-portfolio',
      kind: 'image',
      src: '/projtrack-portfolio-screenshots/02-project-portfolio.png',
      alt: 'Relay demo project portfolio showing search, status filters, review assignment, project metrics, and project cards.',
      caption: 'Project portfolio view with search, status filters, review assignment, and project cards.',
      publicationState: 'verified',
    },
    {
      id: 'projtrack-create',
      kind: 'image',
      src: '/projtrack-portfolio-screenshots/03-create-project-workflow.png',
      alt: 'Relay demo create-project form showing client, location, status, team size, and schedule fields.',
      caption: 'A structured create-project workflow that collects ownership, schedule, location, and delivery context.',
      publicationState: 'verified',
    },
    {
      id: 'projtrack-gantt',
      kind: 'image',
      src: '/projtrack-portfolio-screenshots/04-gantt-project-timeline.png',
      alt: 'Relay demo Gantt chart showing task filters, assignees, progress states, and a monthly project timeline.',
      caption: 'Monthly Gantt workflow with task filters, owners, progress states, and completion windows.',
      publicationState: 'verified',
    },
    {
      id: 'projtrack-calendar',
      kind: 'image',
      src: '/projtrack-portfolio-screenshots/05-calendar-scheduling.png',
      alt: 'Relay demo scheduling calendar showing project filters and upcoming engineering events.',
      caption: 'Scheduling calendar that connects project filters, delivery dates, and upcoming engineering events.',
      publicationState: 'verified',
    },
    {
      id: 'projtrack-documents',
      kind: 'image',
      src: '/projtrack-portfolio-screenshots/06-reports-document-control.png',
      alt: 'Relay demo document-control workspace showing report approval states, reviewer notes, filters, and file actions.',
      caption: 'Document-control workspace with approval status, reviewer context, filters, and file actions.',
      publicationState: 'verified',
    },
  ],
  sections: [
    {
      id: 'challenge',
      label: 'Challenge',
      title: 'Project information loses value when the workflow around it is fragmented.',
      paragraphs: [
        'Planning, scheduling, progress updates, and reports are closely related, but they are often handled as separate documents. That makes ownership harder to see and turns routine coordination into manual reconciliation.',
        "Relay's name reflects that role: like an electrical relay passing a signal onward, the workspace carries tasks, milestones, and reporting context between teams.",
        'The interface therefore had to expose project context, responsibility, and next actions without turning every screen into a dense administrative dashboard.',
      ],
      points: [
        'Keep role-dependent actions and ownership understandable.',
        'Keep schedules, project records, and reports consistent.',
        'Support detailed operational work without losing scanability.',
      ],
    },
    {
      id: 'approach',
      label: 'Approach',
      title: 'Typed product states connected information to the actions people needed to take.',
      paragraphs: [
        'The Next.js and React interface models projects, schedules, reporting actions, and role-aware states explicitly. TypeScript keeps those contracts visible across views, while hosted services support persistence and product integrations.',
      ],
      points: [
        'Organized navigation around user jobs rather than implementation modules.',
        'Used shared typed models so status and schedule data retain the same meaning across views.',
        'Designed responsive behavior as part of each workflow instead of treating it as a final visual pass.',
      ],
    },
    {
      id: 'result',
      label: 'Result',
      title: 'The result is a working product demo—and a clearer approach to operational software.',
      paragraphs: [
        'The public demo makes the core project, timeline, document, and reporting workflows available for direct inspection. It demonstrates the product as a connected system without relying on unsupported productivity metrics.',
        'Building Relay made the cost of ambiguous state visible: a polished screen is not enough when people cannot tell who owns the next action or how one update affects the wider project.',
      ],
    },
  ],
  improvements: [
    'Formalize the domain and access models earlier, alongside each workflow.',
    'Add structured usability and performance validation before publishing numerical outcome claims.',
  ],
  nextSlug: 'frozen-shoulder-dss',
};

const frozenShoulder: CaseStudy = {
  slug: 'frozen-shoulder-dss',
  title: 'Frozen Shoulder DSS',
  label: 'Applied computer vision',
  summary:
    'A rehabilitation decision-support prototype that turns pose observations into structured range-of-motion and exercise-session feedback.',
  opening: 'I built CPU-only pose processing and session-reporting components for this research prototype. Sanitized interface and report captures show the workflow; it has not been clinically validated.',
  role: 'Researcher and software developer',
  year: 'Dec 2025–May 2026',
  technologies: ['Python', 'OpenCV', 'MediaPipe', 'Computer vision'],
  outcome:
    'The project taught me to treat reliability, explainability, and privacy as product requirements—not post-processing details.',
  size: 'complementary',
  links: [],
  evidence: [],
  media: [
    {
      id: 'frozen-interface',
      kind: 'image',
      src: '/frozen-shoulder-dss/interface-calibration-demo.png',
      alt: 'Sanitized Frozen Shoulder DSS interface showing calibration, pose landmarks, exercise selection, and session state.',
      caption: 'A privacy-edited calibration and movement-analysis view using a synthetic participant identifier.',
      publicationState: 'verified',
    },
    {
      id: 'frozen-session-report',
      kind: 'image',
      src: '/frozen-shoulder-dss/session-report-demo.png',
      alt: 'Synthetic Frozen Shoulder DSS session report showing range of motion, repetitions, and compensation observations.',
      caption: 'Example reporting output generated from an approved simulated session; it demonstrates the reporting workflow rather than clinical performance.',
      publicationState: 'verified',
    },
    {
      id: 'frozen-processing-pipeline',
      kind: 'diagram',
      src: '/frozen-shoulder-dss/pose-processing-pipeline.svg',
      alt: 'Diagram showing frame input, landmark reliability checks, joint geometry, movement state, and session output.',
      caption: 'The processing checks that separate a detected pose from reviewable session feedback.',
      publicationState: 'pending',
    },
    {
      id: 'frozen-field-context',
      kind: 'image',
      src: '/frozen-shoulder-dss/field-prototype-context.png',
      alt: 'Privacy-edited photograph of the Frozen Shoulder DSS prototype running on ordinary laptop hardware during field testing.',
      caption: 'A privacy-edited field-testing view showing the prototype running on ordinary laptop hardware.',
      publicationState: 'verified',
    },
  ],
  sections: [
    {
      id: 'challenge',
      label: 'Challenge',
      title: 'Useful movement feedback depends on more than detecting a pose.',
      paragraphs: [
        'A rehabilitation tool must connect observed motion to a repeatable assessment workflow. It also needs to communicate uncertainty and avoid presenting a noisy estimate as a clinical fact.',
        'Camera position, occlusion, clothing, lighting, and movement pace can all affect landmark quality, while the system still needs to remain practical on ordinary CPU hardware.',
      ],
      points: [
        'Operate without requiring a dedicated GPU.',
        'Separate unstable observations from usable movement samples.',
        'Keep setup and session feedback understandable to a non-specialist user.',
      ],
    },
    {
      id: 'approach',
      label: 'Approach',
      title: 'Frame input becomes feedback through a sequence of explicit checks.',
      paragraphs: [
        'The working model captures a frame, estimates landmarks, assesses reliability, calculates joint geometry, updates movement state, detects compensation patterns, and records session output. Temporal state turns those observations into range-of-motion, repetition, and compensation feedback, while the reporting layer organizes the session into something a person can review.',
      ],
      points: [
        'Gate calculations using landmark reliability instead of accepting every frame.',
        'Use explicit state transitions for repetition counting.',
        'Keep compensation feedback separate from the primary movement signal.',
      ],
    },
    {
      id: 'result',
      label: 'Result',
      title: 'The project made reliability and evidence boundaries part of the product.',
      paragraphs: [
        'The prototype connects pose observations to a reviewable exercise-session workflow while remaining conservative about uncertain input and clinical interpretation.',
        'The strongest lesson was that evaluation design cannot be separated from implementation: the reference method, population, protocol, denominators, and error analysis must be defined before performance figures are presented.',
      ],
    },
  ],
  improvements: [
    'Validate reliability across more camera positions, movement conditions, and representative sessions.',
    'Define a formal reference protocol and error-analysis method before publishing performance metrics.',
  ],
  nextSlug: 'autodev',
};

export const caseStudies: CaseStudy[] = [autodev, jobHunt, relay, frozenShoulder];

export function isEvidencePublishable(item: EvidenceItem): boolean {
  if (item.publicationState !== 'verified' || !item.approvedForPublic) return false;
  if (!item.quantitative) return true;

  return Boolean(item.method && item.baseline && item.artifact);
}

export function verifiedLinks(links: ProjectLink[]): ProjectLink[] {
  return links.filter((link) => link.publicationState === 'verified');
}

export function verifiedEvidence(items: EvidenceItem[]): EvidenceItem[] {
  return items.filter(isEvidencePublishable);
}

export function verifiedMedia(items: MediaAsset[]): MediaAsset[] {
  return items.filter((item) => item.publicationState === 'verified');
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
