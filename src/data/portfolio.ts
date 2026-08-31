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
  publicationState: PublicationState;
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
}

export interface CaseStudySection {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  points?: string[];
}

export interface CaseStudy extends ProjectSummary {
  sections: CaseStudySection[];
  improvements: string[];
  nextSlug?: string;
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  evidenceProjectSlug: string;
}

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteConfig: SiteConfig = {
  name: 'Mark Daniel Iguban',
  headline: 'I build dependable software for complex, real-world workflows.',
  introduction:
    'I’m Mark Daniel Iguban, a computer science graduate working across full-stack products and applied computer vision.',
  description:
    'Portfolio of Mark Daniel Iguban, a software engineer focused on full-stack products, applied computer vision, and dependable backend systems.',
  email: 'igubanmark0@gmail.com',
  location: 'Philippines / remote',
  opportunity: 'Seeking full-time software-engineering roles',
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
  siteUrl: configuredSiteUrl ?? 'http://localhost:3000',
  resumePath: '/Mark-Daniel-Iguban-Resume.pdf',
};

const relay: CaseStudy = {
  slug: 'relay',
  title: 'Relay',
  label: 'Full-stack product engineering',
  summary:
    'A project-operations workspace built for an electrical-engineering company, carrying schedules, tasks, responsibilities, and reporting between teams.',
  role: 'Full-stack co-developer · Equal two-person build',
  year: '2025',
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
  role: 'Researcher and software developer',
  year: '2026',
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
  nextSlug: 'relay',
};

export const caseStudies: CaseStudy[] = [relay, frozenShoulder];

export const supportingProjects: ProjectSummary[] = [
  {
    slug: 'accounting-modernization',
    title: 'Accounting Modernization',
    label: 'Backend and data systems',
    summary:
      'A .NET and PostgreSQL modernization effort centered on financial correctness, auditability, and clearer system boundaries.',
    role: 'Software developer',
    year: '2026',
    technologies: ['.NET', 'C#', 'PostgreSQL'],
    outcome: 'Focused on reliable backend behavior and traceable changes in a legacy-system context.',
    size: 'supporting',
    links: [
      {
        label: 'View repository',
        href: 'https://github.com/SAIKO0000/accounting-system',
        kind: 'source',
        publicationState: 'verified',
      },
    ],
    evidence: [],
    media: [],
  },
  {
    slug: 'resource-hive',
    title: 'Resource Hive',
    label: 'Booking workflow',
    summary:
      'A Firebase-backed room-reservation product shaped around booking flow, shared-resource visibility, and team delivery.',
    role: 'Developer and project contributor',
    year: '2025',
    technologies: ['JavaScript', 'Tailwind CSS', 'Firebase'],
    outcome: 'Practiced translating a shared-resource process into a usable end-to-end booking flow.',
    size: 'supporting',
    links: [
      {
        label: 'View repository',
        href: 'https://github.com/SAIKO0000/Resource-Hive',
        kind: 'source',
        publicationState: 'verified',
      },
    ],
    evidence: [],
    media: [],
  },
];

export const capabilities: Capability[] = [
  {
    id: 'full-stack',
    title: 'Full-stack product engineering',
    description: 'I connect user workflows, typed interfaces, application behavior, and persistent data.',
    evidenceProjectSlug: 'relay',
  },
  {
    id: 'computer-vision',
    title: 'Applied computer vision',
    description: 'I turn uncertain visual input into conservative, inspectable product feedback.',
    evidenceProjectSlug: 'frozen-shoulder-dss',
  },
  {
    id: 'backend-data',
    title: 'Backend and data systems',
    description: 'I care about correctness, auditability, and clear boundaries in data-heavy systems.',
    evidenceProjectSlug: 'accounting-modernization',
  },
];

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

export function getProjectTitle(slug: string): string {
  return [...caseStudies, ...supportingProjects].find((project) => project.slug === slug)?.title ?? slug;
}
