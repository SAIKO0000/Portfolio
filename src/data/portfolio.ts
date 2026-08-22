export type PublicationState = 'verified' | 'withheld' | 'pending';

export interface SiteConfig {
  name: string;
  shortName: string;
  headline: string;
  introduction: string;
  description: string;
  email: string;
  location: string;
  opportunity: string;
  githubUrl: string;
  linkedinUrl: string;
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
  sixtySecondSummary: string;
  sections: CaseStudySection[];
  limitations: string[];
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
  shortName: 'MI',
  headline: 'I build dependable software for complex, real-world workflows.',
  introduction:
    'I’m Mark Daniel Iguban, a recent computer science graduate working across full-stack products and applied computer vision.',
  description:
    'Portfolio of Mark Daniel Iguban, a software engineer focused on full-stack products, applied computer vision, and dependable backend systems.',
  email: 'igubanmark0@gmail.com',
  location: 'Philippines / remote',
  opportunity: 'Seeking full-time software-engineering roles',
  githubUrl: 'https://github.com/SAIKO0000',
  linkedinUrl: 'https://www.linkedin.com/in/mark-daniel-iguban-aa07751b6/',
  siteUrl: configuredSiteUrl ?? 'http://localhost:3000',
  resumePath: '/Mark-Daniel-Iguban-Resume.pdf',
};

const projTrack: CaseStudy = {
  slug: 'projtrack',
  title: 'ProjTrack',
  label: 'Full-stack product engineering',
  summary:
    'A project-operations workspace designed to make schedules, responsibilities, and reporting easier to coordinate.',
  role: 'Full-stack developer in a team project',
  year: '2025',
  technologies: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Firebase'],
  outcome:
    'The work strengthened my approach to translating operational rules into understandable interfaces and maintainable data flows.',
  size: 'featured',
  links: [
    {
      label: 'View live product',
      href: 'https://projtrack-portfolio-demo.vercel.app',
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
      artifact: 'https://projtrack-portfolio-demo.vercel.app',
      approvedForPublic: true,
    },
  ],
  media: [],
  sixtySecondSummary:
    'ProjTrack organizes project planning and reporting work in one product surface. My focus was the full-stack path from operational requirements to role-aware screens, data-backed workflows, and a deployment that another person can inspect.',
  sections: [
    {
      id: 'problem',
      label: 'Problem and context',
      title: 'Project information loses value when the workflow around it is fragmented.',
      paragraphs: [
        'Planning, scheduling, progress updates, and reports are closely related, but they are often handled as separate documents. That makes ownership harder to see and turns routine coordination into manual reconciliation.',
        'ProjTrack was shaped as a single operational workspace: the interface needed to expose the right project context without making every screen feel like an administrative dashboard.',
      ],
    },
    {
      id: 'role',
      label: 'Role and team',
      title: 'I worked across interface, application logic, and data-backed behavior.',
      paragraphs: [
        'This was a team-based project. My case study concentrates on the product-engineering work I can explain directly: shaping workflows, implementing responsive interfaces, connecting application state to hosted data services, and testing the resulting paths.',
      ],
    },
    {
      id: 'constraints',
      label: 'User and business constraints',
      title: 'The product had to stay legible while representing real operational rules.',
      paragraphs: [
        'Different responsibilities require different actions and levels of visibility. Scheduling information also needs to remain consistent with the project record and its reports.',
      ],
      points: [
        'Keep role-dependent actions understandable.',
        'Preserve clear status and ownership signals.',
        'Support planning and reporting without duplicating the same information.',
        'Maintain usable layouts across desktop and smaller screens.',
      ],
    },
    {
      id: 'architecture',
      label: 'Architecture and data flow',
      title: 'Typed UI boundaries kept product behavior close to the data it represents.',
      paragraphs: [
        'The React and Next.js interface models project records, schedules, and reporting actions as explicit product states. Hosted data services provide persistence, while TypeScript keeps the UI contracts visible during implementation.',
        'The public architecture diagram will be added after it is checked against the final repository structure. No diagram is shown in this preview as factual evidence yet.',
      ],
    },
    {
      id: 'decisions',
      label: 'Technical decisions',
      title: 'The most useful decisions reduced ambiguity in the workflow.',
      paragraphs: [],
      points: [
        'Organize navigation around jobs users perform, rather than around implementation modules.',
        'Use shared typed models so status and schedule data mean the same thing across views.',
        'Treat responsive behavior as part of the workflow, not a late visual adjustment.',
        'Keep the public demo separate from claims that require private project evidence.',
      ],
    },
    {
      id: 'reflection',
      label: 'Outcome and reflection',
      title: 'The strongest lesson was to design the handoff between information and action.',
      paragraphs: [
        'Building ProjTrack made the cost of ambiguous state visible. A polished screen is not enough when people cannot tell who owns the next action or how one update affects the wider project.',
        'A future iteration would formalize the domain model earlier and document the access model alongside each workflow before expanding the interface.',
      ],
    },
  ],
  limitations: [
    'The public repository link is withheld until placeholder metadata and broken screenshot references are corrected in a separate reviewed change.',
    'No quantitative outcome is published because a traceable measurement method and comparison baseline have not been approved.',
    'Interface captures are still moving through the asset review gate.',
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
  media: [],
  sixtySecondSummary:
    'Frozen Shoulder DSS explores how a CPU-friendly pose-processing pipeline can support rehabilitation assessment and reporting. I worked across research, application design, joint-angle logic, repetition and compensation signals, and the workflow that turns a session into a reviewable report.',
  sections: [
    {
      id: 'problem',
      label: 'Rehabilitation problem',
      title: 'Useful movement feedback depends on more than detecting a pose.',
      paragraphs: [
        'A rehabilitation tool must connect observed motion to a repeatable assessment workflow. It also needs to communicate uncertainty and avoid presenting a noisy estimate as a clinical fact.',
        'The prototype focused on making movement observations reviewable while keeping the system practical on ordinary CPU hardware.',
      ],
    },
    {
      id: 'role',
      label: 'Research and engineering role',
      title: 'I connected the research question to an end-to-end working pipeline.',
      paragraphs: [
        'My work covered the application flow, pose-landmark processing, range-of-motion calculations, repetition and compensation logic, reliability handling, and report-oriented outputs. I also treated evaluation design and public-data safety as part of the engineering problem.',
      ],
    },
    {
      id: 'constraints',
      label: 'CPU and usability constraints',
      title: 'The system had to remain understandable under imperfect input conditions.',
      paragraphs: [
        'Camera position, occlusion, clothing, lighting, and movement pace can all change landmark quality. The experience therefore needs observable reliability states and conservative feedback instead of silently accepting every frame.',
      ],
      points: [
        'Operate without requiring a dedicated GPU.',
        'Separate unstable observations from usable movement samples.',
        'Keep setup and session feedback understandable to a non-specialist user.',
        'Avoid exposing participant-identifying or health-sensitive material.',
      ],
    },
    {
      id: 'pipeline',
      label: 'Pose-processing pipeline',
      title: 'Frame input becomes feedback through a sequence of explicit checks.',
      paragraphs: [
        'The working model follows a staged flow: capture a frame, estimate landmarks, assess landmark reliability, calculate relevant joint geometry, update movement state, detect compensation patterns, and record session output.',
        'The public pipeline diagram and demonstration will use synthetic or deliberately re-enacted input after review.',
      ],
    },
    {
      id: 'logic',
      label: 'ROM, repetition, and reliability',
      title: 'Temporal state matters as much as any single angle.',
      paragraphs: [
        'Range-of-motion estimates become more useful when they are interpreted over a movement sequence. Repetition counting needs thresholds and state transitions, while compensation feedback requires its own conditions so it does not compete with the primary movement signal.',
      ],
    },
    {
      id: 'reporting',
      label: 'Reporting workflow',
      title: 'A session should end in something a person can review—not a stream of landmarks.',
      paragraphs: [
        'The reporting layer organizes recorded movement observations into a session-level artifact. Public examples will be sanitized and will avoid clinical claims beyond the verified scope of the prototype.',
      ],
    },
    {
      id: 'reflection',
      label: 'Evaluation and reflection',
      title: 'A decision-support system must make its evidence boundaries visible.',
      paragraphs: [
        'The project reinforced that evaluation design cannot be separated from implementation. Future validation should define the reference method, population, protocol, denominators, and error analysis before performance figures are presented publicly.',
      ],
    },
  ],
  limitations: [
    'No participant footage, health-sensitive data, disputed metric, or private repository link is published.',
    'The prototype is decision support, not a replacement for clinical judgment.',
    'Public visuals remain blocked until synthetic or re-enacted captures are reviewed for accuracy and privacy.',
  ],
  nextSlug: 'projtrack',
};

export const caseStudies: CaseStudy[] = [projTrack, frozenShoulder];

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
    evidenceProjectSlug: 'projtrack',
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

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getProjectTitle(slug: string): string {
  return [...caseStudies, ...supportingProjects].find((project) => project.slug === slug)?.title ?? slug;
}
