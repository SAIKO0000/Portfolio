import { projects, type Project } from '@/data/portfolio';

export type { Project } from '@/data/portfolio';

export interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  featuredProjects: Project[];
  projectsByCategory: Record<string, Project[]>;
  getProjectById: (id: string) => Project | undefined;
}

export function useProjects(): UseProjectsReturn {
  const featuredProjects = projects.filter((project) => project.featured);

  const projectsByCategory = projects.reduce<Record<string, Project[]>>((grouped, project) => {
    (grouped[project.category] ??= []).push(project);
    return grouped;
  }, {});

  return {
    projects,
    loading: false,
    error: null,
    featuredProjects,
    projectsByCategory,
    getProjectById: (id) => projects.find((project) => project.id === id),
  };
}
