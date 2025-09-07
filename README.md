# 🚀 AI-Enhanced Developer Portfolio

A modern, high-performance developer portfolio built with cutting-edge technologies and AI-enhanced development workflows. Features real-time performance monitoring, Web Vitals tracking, and comprehensive SEO optimization.

## ✨ Features

### 🎯 Core Features
- **AI-Enhanced Development**: Showcases integration with MCP (Model Context Protocol) tools
- **Real-time Performance Monitoring**: Live Web Vitals tracking with performance dashboard
- **Professional Contact Form**: Validated form with submission handling
- **Theme Management**: Dark/light mode with smooth transitions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Comprehensive metadata, structured data, and social media integration

### 🏗️ Architecture
- **Custom Hooks Architecture**: 5+ custom hooks for state management
- **Component-based Design**: Modular, reusable components
- **Performance Optimized**: Lazy loading, code splitting, and bundle optimization
- **Type-safe**: Full TypeScript implementation with strict typing

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.2** - React framework with Turbopack
- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.9.2** - Type-safe development
- **Tailwind CSS 4.1.13** - Utility-first CSS framework

### Tools & Libraries
- **Shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful SVG icons
- **Vercel** - Deployment and hosting platform

### Development Tools
- **MCP Tools Integration** - AI-enhanced development workflow
- **Web Vitals API** - Performance monitoring
- **ESLint & Prettier** - Code quality and formatting

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SAIKO0000/ai-enhanced-portfolio.git
   cd ai-enhanced-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with SEO
│   └── page.tsx           # Main portfolio page
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── AnimatedSection.tsx
│   ├── ContactForm.tsx
│   ├── MCPDemo.tsx
│   ├── PerformanceDashboard.tsx
│   ├── SkillsSection.tsx
│   ├── StructuredData.tsx
│   ├── ThemeToggle.tsx
│   └── WebVitals.tsx
├── hooks/                # Custom React hooks
│   ├── useAnimation.ts
│   ├── useContactForm.ts
│   ├── useProjects.ts
│   ├── useScrollPosition.ts
│   └── useTheme.tsx
└── lib/                  # Utility functions
    └── utils.ts
```

## 🎨 Custom Hooks

- **`useProjects`** - Project data management and filtering
- **`useTheme`** - Dark/light theme management with persistence
- **`useAnimation`** - Scroll-based animations and transitions
- **`useContactForm`** - Form state management and validation
- **`useScrollPosition`** - Scroll position tracking

## 📊 Performance Features

### Web Vitals Monitoring
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)

### Performance Dashboard
- Real-time metrics visualization
- Performance status indicators
- Memory usage tracking
- Analytics overview

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings (auto-detected)
3. Deploy with zero configuration

### Manual Deployment
```bash
npm run build
npm run start
```

## 🎯 Performance Metrics

- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: All metrics in "Good" range
- **Bundle Size**: Optimized with code splitting
- **Loading Speed**: Sub-second initial load

## 🔍 SEO Features

- **Structured Data**: Schema.org markup for better search visibility
- **Open Graph**: Social media optimization
- **Meta Tags**: Comprehensive metadata
- **Sitemap**: Auto-generated sitemap
- **Performance**: Fast loading for better search rankings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For excellent deployment platform
- **Shadcn** - For beautiful UI components
- **Tailwind CSS** - For utility-first CSS framework

## 📞 Contact

- **Portfolio**: [Live Demo](https://portfolio-4v8rtx80c-mark-daniel-igubans-projects.vercel.app)
- **GitHub**: [@SAIKO0000](https://github.com/SAIKO0000)

---

Built with ❤️ using AI-enhanced development workflows and modern web technologies.
