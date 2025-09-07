'use client';

import { useTheme } from '@/hooks/useTheme';
import AnimatedSection from './AnimatedSection';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'ai';
  icon: string;
  description: string;
}

const skills: Skill[] = [
  // Frontend
  { name: 'React 19', level: 95, category: 'frontend', icon: '⚛️', description: 'Latest concurrent features and hooks' },
  { name: 'Next.js 15', level: 90, category: 'frontend', icon: '🚀', description: 'App Router and server components' },
  { name: 'TypeScript 5.9', level: 88, category: 'frontend', icon: '📘', description: 'Advanced type systems and inference' },
  { name: 'Tailwind CSS 4', level: 92, category: 'frontend', icon: '🎨', description: 'Oxide engine and modern utilities' },
  
  // Backend & Tools  
  { name: 'Node.js', level: 85, category: 'backend', icon: '🟢', description: 'Server-side JavaScript runtime' },
  { name: 'Git & GitHub', level: 90, category: 'tools', icon: '🐙', description: 'Version control and collaboration' },
  { name: 'VS Code', level: 95, category: 'tools', icon: '💙', description: 'Extensions and advanced workflows' },
  { name: 'pnpm', level: 85, category: 'tools', icon: '📦', description: 'Fast package management' },
  
  // AI & MCP
  { name: 'MCP Tools', level: 88, category: 'ai', icon: '🤖', description: 'Model Context Protocol integration' },
  { name: 'AI-Enhanced Development', level: 90, category: 'ai', icon: '🧠', description: 'Copilot and intelligent workflows' },
];

export default function SkillsSection() {
  const { isDark } = useTheme();

  const getProgressBarColor = (category: Skill['category']) => {
    switch (category) {
      case 'frontend': return 'bg-blue-500';
      case 'backend': return 'bg-green-500';
      case 'tools': return 'bg-purple-500';
      case 'ai': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: Skill['category']) => {
    switch (category) {
      case 'frontend': return isDark ? 'text-blue-400' : 'text-blue-600';
      case 'backend': return isDark ? 'text-green-400' : 'text-green-600';
      case 'tools': return isDark ? 'text-purple-400' : 'text-purple-600';
      case 'ai': return isDark ? 'text-orange-400' : 'text-orange-600';
      default: return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getCategoryName = (category: Skill['category']) => {
    switch (category) {
      case 'frontend': return 'Frontend';
      case 'backend': return 'Backend';
      case 'tools': return 'Tools';
      case 'ai': return 'AI & MCP';
      default: return category;
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <AnimatedSection>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">🛠️ Technology Stack</h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Modern tools and frameworks powering this portfolio
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
          <AnimatedSection key={category} delay={categoryIndex + 1}>
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-700' : 'bg-white'} border ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <h3 className={`text-xl font-semibold mb-4 ${getCategoryColor(category as Skill['category'])}`}>
                {getCategoryName(category as Skill['category'])}
              </h3>
              
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className={`text-sm font-medium ${getCategoryColor(category as Skill['category'])}`}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className={`w-full bg-gray-200 rounded-full h-2 ${isDark ? 'bg-gray-600' : ''}`}>
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${getProgressBarColor(category as Skill['category'])}`}
                        data-width={skill.level}
                      ></div>
                    </div>
                    
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Technology Highlights */}
      <AnimatedSection delay={3}>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-center mb-6">🌟 Portfolio Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-gray-700' : 'bg-white'} border ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-medium mb-1">Performance First</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Optimized with Turbopack and modern React patterns
              </div>
            </div>
            
            <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-gray-700' : 'bg-white'} border ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <div className="text-2xl mb-2">🤖</div>
              <div className="font-medium mb-1">AI-Enhanced</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Built with MCP tools and intelligent workflows
              </div>
            </div>
            
            <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-gray-700' : 'bg-white'} border ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-medium mb-1">Modern Design</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Responsive design with smooth animations
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
