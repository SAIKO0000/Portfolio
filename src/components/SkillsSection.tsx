'use client';

import { skills, type Skill, type SkillCategory } from '@/data/portfolio';
import { useTheme } from '@/hooks/useTheme';
import AnimatedSection from './AnimatedSection';

const categoryNames: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools',
  ai: 'AI & MCP',
};

const progressColors: Record<SkillCategory, string> = {
  frontend: 'bg-blue-500',
  backend: 'bg-green-500',
  tools: 'bg-purple-500',
  ai: 'bg-orange-500',
};

const groupedSkills = skills.reduce<Record<SkillCategory, Skill[]>>(
  (groups, skill) => {
    groups[skill.category].push(skill);
    return groups;
  },
  { frontend: [], backend: [], tools: [], ai: [] },
);

export default function SkillsSection() {
  const { isDark } = useTheme();

  const categoryColor = (category: SkillCategory) => {
    const colors: Record<SkillCategory, string> = {
      frontend: isDark ? 'text-blue-400' : 'text-blue-600',
      backend: isDark ? 'text-green-400' : 'text-green-600',
      tools: isDark ? 'text-purple-400' : 'text-purple-600',
      ai: isDark ? 'text-orange-400' : 'text-orange-600',
    };
    return colors[category];
  };

  return (
    <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <AnimatedSection>
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">Technology Stack</h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Modern tools and frameworks used across the featured work
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {Object.entries(groupedSkills).map(([categoryKey, categorySkills], index) => {
          const category = categoryKey as SkillCategory;

          return (
            <AnimatedSection key={category} delay={index + 1}>
              <section
                className={`rounded-lg border p-6 ${
                  isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-white'
                }`}
              >
                <h3 className={`mb-4 text-xl font-semibold ${categoryColor(category)}`}>
                  {categoryNames[category]}
                </h3>

                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="min-w-10 text-xs font-semibold uppercase opacity-60" aria-hidden="true">
                            {skill.icon}
                          </span>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className={`text-sm font-medium ${categoryColor(category)}`}>
                          {skill.level}%
                        </span>
                      </div>

                      <div
                        className={`h-2 w-full overflow-hidden rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}
                        role="progressbar"
                        aria-label={`${skill.name} proficiency`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={skill.level}
                      >
                        <div
                          className={`h-full origin-left rounded-full transition-transform duration-700 motion-reduce:transition-none ${progressColors[category]}`}
                          style={{ transform: `scaleX(${skill.level / 100})` }}
                        />
                      </div>

                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
