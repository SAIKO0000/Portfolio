export type ProjectCategory = 'web' | 'mobile' | 'ai' | 'tool';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: ProjectCategory;
  completedDate: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'ai';

export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
  icon: string;
  description: string;
}

export const siteConfig = {
  name: 'Mark Daniel Iguban',
  title: 'AI-Enhanced Developer Portfolio',
  headline: 'Full-Stack Developer',
  description:
    'Building thoughtful web experiences with Next.js, React, TypeScript, and AI-enhanced development workflows.',
  email: 'main.markdaniel.iguban@cvsu.edu.ph',
  location: 'Philippines',
  availability: 'Open for freelance and full-time opportunities',
  githubUrl: 'https://github.com/SAIKO0000',
  repositoryUrl: 'https://github.com/SAIKO0000/ai-enhanced-portfolio',
  siteUrl: 'https://portfolio-4v8rtx80c-mark-daniel-igubans-projects.vercel.app',
} as const;

export const projects: Project[] = [
  {
    id: 'ai-enhanced-portfolio',
    title: 'AI-Enhanced Portfolio',
    description:
      'A modern developer portfolio built with typed local content, performance monitoring, accessible motion, and AI-enhanced workflows.',
    technologies: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'AI Tools'],
    githubUrl: 'https://github.com/SAIKO0000/ai-enhanced-portfolio',
    liveUrl: siteConfig.siteUrl,
    featured: true,
    category: 'web',
    completedDate: '2025',
  },
  {
    id: 'projtrack-demo',
    title: 'ProjTrack Demo',
    description:
      'A project-tracking application demonstrating a modern TypeScript architecture, relational data, and practical team workflows.',
    technologies: ['TypeScript', 'Next.js', 'React', 'SQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/SAIKO0000/projtrack-portfolio-demo',
    liveUrl: 'https://projtrack-portfolio-demo.vercel.app/',
    featured: true,
    category: 'web',
    completedDate: '2025',
  },
  {
    id: 'resource-hive',
    title: 'Resource Hive',
    description:
      'A room-reservation system with user management, live booking flows, and a Firebase-backed application architecture.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/SAIKO0000/Resource-Hive',
    liveUrl: 'https://resource-hive-ten.vercel.app/',
    featured: true,
    category: 'web',
    completedDate: '2025',
  },
];

export const skills: Skill[] = [
  { name: 'React 19', level: 95, category: 'frontend', icon: 'React', description: 'Modern components, hooks, and rendering patterns' },
  { name: 'Next.js 15', level: 90, category: 'frontend', icon: 'Next', description: 'App Router and server-first application design' },
  { name: 'TypeScript 5.9', level: 88, category: 'frontend', icon: 'TS', description: 'Type-safe application and data modeling' },
  { name: 'Tailwind CSS 4', level: 92, category: 'frontend', icon: 'CSS', description: 'Responsive interfaces and design systems' },
  { name: 'Node.js', level: 85, category: 'backend', icon: 'Node', description: 'Server-side JavaScript development' },
  { name: 'Git & GitHub', level: 90, category: 'tools', icon: 'Git', description: 'Version control and collaborative workflows' },
  { name: 'VS Code', level: 95, category: 'tools', icon: 'VS', description: 'Productive, extensible development workflows' },
  { name: 'pnpm', level: 85, category: 'tools', icon: 'pnpm', description: 'Fast, deterministic package management' },
  { name: 'MCP Tools', level: 88, category: 'ai', icon: 'MCP', description: 'Model Context Protocol integrations' },
  { name: 'AI-Enhanced Development', level: 90, category: 'ai', icon: 'AI', description: 'AI-assisted planning, implementation, and review' },
];
