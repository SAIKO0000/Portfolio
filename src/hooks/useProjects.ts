import { useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string;
  featured?: boolean;
  category: 'web' | 'mobile' | 'ai' | 'tool';
  completedDate: string;
}

export interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  featuredProjects: Project[];
  projectsByCategory: Record<string, Project[]>;
  getProjectById: (id: string) => Project | undefined;
}

// Sample project data - replace with actual data source
const sampleProjects: Project[] = [
  {
    id: 'ai-portfolio',
    title: 'AI-Enhanced Developer Portfolio',
    description: 'A cutting-edge portfolio showcasing AI-integrated development workflow using MCP tools, modern React patterns, and performance optimization.',
    technologies: ['Next.js 15.5.2', 'React 19.1.1', 'TypeScript 5.9.2', 'Tailwind CSS 4.1.13', 'Motion 12.23.12'],
    githubUrl: 'https://github.com/username/ai-portfolio',
    liveUrl: 'https://ai-portfolio.vercel.app',
    imageUrl: '/projects/ai-portfolio.png',
    featured: true,
    category: 'web',
    completedDate: '2025-09-08'
  },
  {
    id: 'class-schedule',
    title: 'Interactive Class Schedule',
    description: 'Responsive HTML/CSS timetable with color-coded classes and mobile-optimized design.',
    technologies: ['HTML5', 'CSS3', 'Responsive Design'],
    githubUrl: 'https://github.com/username/class-schedule',
    imageUrl: '/projects/class-schedule.png',
    featured: false,
    category: 'web',
    completedDate: '2025-09-07'
  }
];

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, this would be an API call:
        // const response = await fetch('/api/projects');
        // const projectData = await response.json();
        
        setProjects(sampleProjects);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Derived state and helper functions
  const featuredProjects = projects.filter(project => project.featured);
  
  const projectsByCategory = projects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id === id);
  };

  return {
    projects,
    loading,
    error,
    featuredProjects,
    projectsByCategory,
    getProjectById
  };
}
