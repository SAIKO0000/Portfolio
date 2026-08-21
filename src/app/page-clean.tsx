'use client';

import { Suspense } from 'react';
import { ThemeProvider } from '@/hooks/useTheme';
import { useProjects } from '@/hooks/useProjects';
import { useIntersectionAnimation } from '@/hooks/useAnimation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LazyMCPDemo } from '@/components/lazy';
import type { Project } from '@/data/portfolio';

function ProjectCard({ project }: { project: Project }) {
  const { ref, isVisible } = useIntersectionAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <Card 
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{project.title}</CardTitle>
          {project.featured && <Badge variant="default">Featured</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string) => (
            <Badge key={tech} variant="outline">{tech}</Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
          {project.liveUrl && (
            <Button size="sm" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectsSection() {
  const { projects, loading, error, featuredProjects } = useProjects();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Projects</h2>
        <p className="text-gray-600 text-center mb-12">
          Showcasing modern development practices and AI-enhanced workflows
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {projects.length > featuredProjects.length && (
          <div className="text-center mt-12">
            <Button variant="outline">
              View All Projects ({projects.length - featuredProjects.length} more)
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function HeroSection() {
  const { ref, isVisible } = useIntersectionAnimation<HTMLElement>({ threshold: 0.3 });

  return (
    <section 
      ref={ref}
      className={`py-20 text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6">
          AI-Enhanced Developer Portfolio
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Showcasing cutting-edge development with MCP tools, modern React patterns, 
          and performance optimization
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <Badge variant="outline" className="text-sm px-4 py-2">
            🚀 Next.js 15.5.2
          </Badge>
          <Badge variant="outline" className="text-sm px-4 py-2">
            ⚛️ React 19.1.1
          </Badge>
          <Badge variant="outline" className="text-sm px-4 py-2">
            🎨 Tailwind CSS 4.1.13
          </Badge>
          <Badge variant="outline" className="text-sm px-4 py-2">
            🤖 MCP Tools
          </Badge>
        </div>
        <Button size="lg">
          Explore the Portfolio
        </Button>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <HeroSection />
        
        <ProjectsSection />
        
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              AI-Enhanced Development Workflow
            </h2>
            <Suspense fallback={
              <div className="flex justify-center items-center py-20">
                <div className="text-lg">Loading MCP Demo...</div>
              </div>
            }>
              <LazyMCPDemo />
            </Suspense>
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
}
