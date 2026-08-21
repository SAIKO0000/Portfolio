# Portfolio Setup Instructions

## 🚀 Quick Start Guide (Latest Stable Versions)

Follow these steps to set up your developer portfolio with the cutting-edge tech stack:

### Latest Tech Stack (September 2025)
- **Next.js 15.5.2** - Latest with React 19 support
- **React 19.1.1** - Concurrent features and improved performance  
- **TypeScript 5.9.2** - Enhanced type inference and performance
- **Tailwind CSS 4.1.13** - Oxide engine with 10x faster compilation
- **Motion 12.23.12** - Latest animation library with React 19 compatibility
- **React Hook Form 7.62.0** - Enhanced TypeScript support
- **Lucide React 0.542.0** - 1000+ icons with better tree-shaking
- **shadcn/ui** - Latest component library

### Step 1: Run the Setup Script

```bash
# Make the script executable
chmod +x setup-portfolio.sh

# Run the setup script
./setup-portfolio.sh
```

### Step 2: Manual Configuration

After the script completes, you'll need to complete these manual steps:

1. **Navigate to project directory:**
   ```bash
   cd portfolio
   ```

2. **Initialize shadcn/ui:**
   ```bash
   pnpm dlx shadcn@latest init
   ```
   Choose these options:
   - TypeScript: **Yes**
   - Style: **Default**
   - Base color: **Slate**
   - CSS variables: **Yes**

3. **Install core shadcn/ui components:**
   ```bash
   # Essential components for MVP
   pnpm dlx shadcn@latest add button card badge avatar navigation-menu separator
   
   # Form components
   pnpm dlx shadcn@latest add form input textarea label alert progress
   
   # Advanced components (for later phases)
   pnpm dlx shadcn@latest add dialog sheet tabs tooltip popover accordion
   ```

4. **Start the development server:**
   ```bash
   pnpm run dev
   ```

### Step 3: Customization

Your portfolio will be available at `http://localhost:3000`. Now customize it:

1. **Update personal information in `src/app/layout.tsx`:**
   - Replace "Your Name" with your actual name
   - Update the description and keywords
   - Add your website URL and social media handles

2. **Customize the hero section in `src/components/sections/hero-section.tsx`:**
   - Replace "YN" with your initials
   - Update the title and description
   - Add your actual social media links

3. **Add your projects data:**
   - Create project data in `content/projects/`
   - Update the projects section component

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Layout components
│   │   ├── sections/           # Page sections
│   │   └── forms/              # Form components
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   └── types/
│       └── index.ts            # TypeScript types
├── content/
│   ├── projects/               # Project markdown files
│   └── blog/                   # Blog posts (future)
├── public/
│   ├── images/                 # Images and assets
│   └── documents/              # PDFs and documents
└── package.json
```

## 🎨 Tech Stack Included (Latest Versions)

- **Next.js 15.5.2** with App Router and React 19 support
- **React 19.1.1** with concurrent features and improved Suspense
- **TypeScript 5.9.2** with enhanced type inference
- **Tailwind CSS 4.1.13** with Oxide engine for faster compilation
- **shadcn/ui** component library (latest)
- **Motion 12.23.12** for smooth animations
- **React Hook Form 7.62.0** for form handling
- **Lucide React 0.542.0** for 1000+ professional icons
- **next-themes 0.4.4** for dark/light mode

## 🔧 Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint
- `pnpm run type-check` - Run TypeScript checks

## 📋 Next Steps (Week 1-2)

1. **Complete the setup** following the instructions above
2. **Customize the hero section** with your information
3. **Add your project data** and images
4. **Set up your domain** and deployment on Vercel
5. **Test mobile responsiveness** and accessibility

## 🚀 Phase 1 Development Tasks

After setup completion, follow your `ACTIONABLE_TASKS.md` document:

- **Week 1-2**: Complete project setup and research (this step)
- **Week 3-4**: Develop core pages (home, projects, about, contact)
- **Week 5-6**: Create detailed project case studies
- **Week 7-8**: Polish and optimize for launch

## 🎯 Success Criteria

Your portfolio setup is complete when:
- [ ] Development server runs without errors
- [ ] All shadcn/ui components are installed
- [ ] Hero section displays your information
- [ ] Mobile responsive design works
- [ ] Dark/light theme toggle functions
- [ ] TypeScript compiles without errors

## 🆘 Troubleshooting

### Common Issues:

1. **shadcn/ui init fails:**
   - Ensure you're in the correct directory
   - Check that Tailwind CSS is properly configured

2. **Import errors:**
   - Verify all dependencies are installed
   - Check the `@/*` import alias configuration

3. **Styling issues:**
   - Ensure `globals.css` includes shadcn/ui styles
   - Verify Tailwind CSS configuration

4. **Animation not working:**
   - Check Motion.dev import syntax
   - Ensure `"use client"` directive for client components

### Getting Help:

- Check the component documentation at [ui.shadcn.com](https://ui.shadcn.com)
- Review Motion.dev docs at [motion.dev](https://motion.dev)
- Refer to your `UI_LIBRARY_INTEGRATION.md` for detailed usage examples

Ready to build an amazing portfolio! 🌟
