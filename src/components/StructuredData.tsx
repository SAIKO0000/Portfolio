interface StructuredDataProps {
  readonly type?: 'person' | 'portfolio' | 'project';
}

export default function StructuredData({ type = 'person' }: StructuredDataProps) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mark Daniel Iguban',
    jobTitle: 'Full-Stack Developer',
    description: 'AI-Enhanced Developer specializing in Next.js, React, TypeScript, and modern web technologies',
    url: 'https://portfolio-q1ik41oiz-mark-daniel-igubans-projects.vercel.app',
    sameAs: [
      // Add your social media profiles here
      // 'https://github.com/yourusername',
      // 'https://linkedin.com/in/yourusername',
      // 'https://twitter.com/yourusername'
    ],
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Web Development',
      'AI Integration',
      'MCP Tools',
      'Frontend Development',
      'Backend Development'
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Developer',
      occupationLocation: {
        '@type': 'Country',
        name: 'Philippines'
      },
      skills: [
        'Next.js 15.5.2',
        'React 19.1.1', 
        'TypeScript 5.9.2',
        'Tailwind CSS',
        'AI Tools Integration',
        'Performance Optimization',
        'SEO Implementation'
      ]
    }
  };

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'AI-Enhanced Developer Portfolio',
    description: 'Professional portfolio showcasing modern web development with AI integration',
    author: {
      '@type': 'Person',
      name: 'Mark Daniel Iguban'
    },
    dateCreated: '2025-09-08',
    programmingLanguage: [
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS'
    ],
    runtimePlatform: 'Next.js',
    codeRepository: 'https://github.com/yourusername/portfolio' // Update with actual repo
  };

  const getSchema = () => {
    switch (type) {
      case 'portfolio':
        return portfolioSchema;
      case 'person':
      default:
        return personSchema;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSchema())
      }}
    />
  );
}
