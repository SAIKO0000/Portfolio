'use client';

import { useProjects } from '@/hooks/useProjects';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedSection from '@/components/AnimatedSection';
import MCPDemo from '@/components/MCPDemo';
import SkillsSection from '@/components/SkillsSection';
import PerformanceDashboard from '@/components/PerformanceDashboard';

function PortfolioContent() {
  const { projects, loading, error, featuredProjects } = useProjects();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <ThemeToggle />
      
      <main className="container mx-auto px-4 py-20">
        <div className="text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI-Enhanced Developer Portfolio
            </h1>
            <p className={`text-xl mb-8 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Showcasing cutting-edge development with MCP tools and modern React patterns
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={1}>
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                🚀 Next.js 15.5.2
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                ⚛️ React 19.1.1
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                🎨 Tailwind CSS 4.1.13
              </span>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                🤖 MCP Tools
              </span>
            </div>
          </AnimatedSection>
          
          {/* Projects Section */}
          <AnimatedSection delay={2}>
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
              {loading && (
                <div className="text-lg">Loading projects...</div>
              )}
              {error && (
                <div className="text-red-600">{error}</div>
              )}
              {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredProjects.map((project, index) => (
                    <AnimatedSection key={project.id} delay={3 + index}>
                      <div className={`rounded-lg p-6 text-left transition-all duration-300 hover:scale-105 ${
                        isDark 
                          ? 'bg-gray-800 hover:bg-gray-700' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}>
                        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                        <p className={`mb-4 ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}>{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`px-4 py-2 rounded text-sm transition-colors ${
                              isDark
                                ? 'bg-gray-700 text-white hover:bg-gray-600'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                            }`}
                          >
                            GitHub
                          </a>
                          {project.liveUrl && (
                            <a 
                              href={project.liveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-500 transition-colors"
                            >
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Implementation Status */}
          <AnimatedSection delay={5}>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Implementation Status</h2>
              <div className={`rounded-lg p-6 ${
                isDark ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <div className="space-y-3 text-left">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span>Next.js 15.5.2 with React 19.1.1 setup</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span>Custom hooks architecture (useProjects + useTheme working!)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span>Theme switching with animations</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span>Intersection observer animations</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span>Project data loading: {projects.length} projects</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-2">🔧</span>
                    <span>MCP Demo component coming next</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Custom Hooks Status */}
          <AnimatedSection delay={6}>
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Custom Hooks Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium">useProjects ✅</h4>
                  <p className="text-sm text-gray-600">Project data management - Working!</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium">useTheme ✅</h4>
                  <p className="text-sm text-gray-600">Dark/light mode - Working!</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium">useAnimation ✅</h4>
                  <p className="text-sm text-gray-600">Scroll animations - Working!</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium">useScrollPosition</h4>
                  <p className="text-sm text-gray-600">Ready to integrate</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium">useContactForm</h4>
                  <p className="text-sm text-gray-600">Ready to integrate</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* MCP Tools Demo */}
          <AnimatedSection delay={7}>
            <div className="mt-16">
              <MCPDemo />
            </div>
          </AnimatedSection>

          {/* Skills Section */}
          <AnimatedSection delay={8}>
            <div className="mt-16">
              <SkillsSection />
            </div>
          </AnimatedSection>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <PerformanceDashboard />
      <PortfolioContent />
    </ThemeProvider>
  );
}
