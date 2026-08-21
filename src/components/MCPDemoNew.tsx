'use client';

import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import AnimatedSection from './AnimatedSection';

interface MCPTool {
  name: string;
  description: string;
  status: 'active' | 'demo' | 'planned';
  icon: string;
  features: string[];
  usedInProject: boolean;
}

const mcpTools: MCPTool[] = [
  {
    name: 'Context7 MCP',
    description: 'Library documentation and code examples retrieval',
    status: 'active',
    icon: '📚',
    features: ['Real-time documentation lookup', 'Code snippet generation', 'Library compatibility checks'],
    usedInProject: true
  },
  {
    name: 'Sequential Thinking MCP',
    description: 'AI-powered decision analysis and problem solving',
    status: 'active', 
    icon: '🧠',
    features: ['Multi-step reasoning', 'Decision tree analysis', 'Solution verification'],
    usedInProject: true
  },
  {
    name: 'Memory MCP',
    description: 'Knowledge graph for tracking development decisions',
    status: 'active',
    icon: '🧩',
    features: ['Entity relationship mapping', 'Technical decision tracking', 'Project knowledge retention'],
    usedInProject: true
  },
  {
    name: 'GitHub MCP',
    description: 'Repository management and automated workflows',
    status: 'demo',
    icon: '🐙',
    features: ['Issue creation', 'PR management', 'Workflow automation'],
    usedInProject: false
  },
  {
    name: 'Playwright MCP',
    description: 'Automated testing and browser interaction',
    status: 'planned',
    icon: '🎭',
    features: ['E2E testing', 'UI automation', 'Performance monitoring'],
    usedInProject: false
  }
];

export default function MCPDemo() {
  const { isDark } = useTheme();
  const [selectedTool, setSelectedTool] = useState<MCPTool | null>(null);
  const [isRunningDemo, setIsRunningDemo] = useState(false);

  const runDemo = async (tool: MCPTool) => {
    setIsRunningDemo(true);
    setSelectedTool(tool);
    
    // Simulate MCP tool execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRunningDemo(false);
  };

  const getStatusColor = (status: MCPTool['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'demo': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <AnimatedSection>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">🤖 MCP Tools Integration</h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Model Context Protocol tools powering this AI-enhanced development workflow
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mcpTools.map((tool, index) => (
          <AnimatedSection key={tool.name} delay={index + 1}>
            <div className={`rounded-lg p-6 border transition-all duration-300 hover:scale-105 cursor-pointer ${
              isDark 
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            } ${selectedTool?.name === tool.name ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => runDemo(tool)}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{tool.icon}</span>
                <div className="flex flex-col gap-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tool.status)}`}>
                    {tool.status}
                  </span>
                  {tool.usedInProject && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Used Here
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {tool.description}
              </p>
              
              <div className="space-y-1">
                {tool.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-xs">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Demo Results Section */}
      {selectedTool && (
        <AnimatedSection delay={0.5}>
          <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-700' : 'bg-white'} border ${
            isDark ? 'border-gray-600' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                {selectedTool.icon} {selectedTool.name} Demo
              </h3>
              {isRunningDemo && (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                  <span className="text-sm text-blue-500">Running...</span>
                </div>
              )}
            </div>
            
            {!isRunningDemo && (
              <div className="space-y-3">
                {selectedTool.usedInProject ? (
                  <>
                    <div className={`p-3 rounded ${isDark ? 'bg-gray-600' : 'bg-green-50'} border-l-4 border-green-500`}>
                      <div className="text-sm">
                        <span className="text-green-600 font-medium">✓ Active in this project:</span> {selectedTool.name} was used to build this portfolio
                      </div>
                    </div>
                    <div className={`p-3 rounded ${isDark ? 'bg-gray-600' : 'bg-blue-50'}`}>
                      <div className="text-sm font-mono space-y-1">
                        {selectedTool.name === 'Context7 MCP' && (
                          <div>📚 Researched Next.js 15, React 19, and Tailwind CSS 4 best practices</div>
                        )}
                        {selectedTool.name === 'Sequential Thinking MCP' && (
                          <div>🧠 Analyzed portfolio architecture decisions and implementation strategies</div>
                        )}
                        {selectedTool.name === 'Memory MCP' && (
                          <div>🧩 Created knowledge graph with 5 entities and 5 relationships</div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`p-3 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <div className="text-sm font-mono">
                        <span className="text-green-500">✓</span> {selectedTool.name} initialized
                      </div>
                    </div>
                    <div className={`p-3 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <div className="text-sm font-mono">
                        <span className="text-blue-500">ℹ</span> Demo mode - {selectedTool.features.length} features available
                      </div>
                    </div>
                  </>
                )}
                <div className="text-sm text-center mt-4">
                  <button 
                    onClick={() => setSelectedTool(null)}
                    className={`px-4 py-2 rounded transition-colors ${
                      isDark 
                        ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                  >
                    Close Demo
                  </button>
                </div>
              </div>
            )}
          </div>
        </AnimatedSection>
      )}

      {/* Usage Statistics */}
      <AnimatedSection delay={1}>
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-4">MCP Integration Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} border ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <div className="text-2xl font-bold text-blue-500">{mcpTools.length}</div>
              <div className="text-sm">MCP Tools</div>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} border ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <div className="text-2xl font-bold text-green-500">
                {mcpTools.filter(t => t.status === 'active').length}
              </div>
              <div className="text-sm">Active</div>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} border ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <div className="text-2xl font-bold text-purple-500">
                {mcpTools.reduce((acc, tool) => acc + tool.features.length, 0)}
              </div>
              <div className="text-sm">Features</div>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} border ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <div className="text-2xl font-bold text-orange-500">
                {mcpTools.filter(t => t.usedInProject).length}
              </div>
              <div className="text-sm">Used Here</div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
