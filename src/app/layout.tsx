import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import { siteConfig } from '@/data/portfolio';
import './globals.css';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} — Automation Specialist & Full-stack Engineer`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  keywords: [
    'Automation Specialist',
    'Workflow Automation',
    'n8n Developer',
    'Python Automation',
    'Software Engineer',
    'Full-stack Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Computer Vision',
    'Philippines',
  ],
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/icons/oneworks-avatar-cat-256%20(11).svg', type: 'image/svg+xml' },
      { url: '/icons/oneworks-avatar-cat-256%20(10).svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: `${siteConfig.name} — Automation Specialist & Full-stack Engineer`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Automation Specialist & Full-stack Engineer`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#FAF9F6',
};

const themeInitializer = `
  (function () {
    var storedTheme;
    try { storedTheme = window.localStorage.getItem('portfolio-theme'); } catch (_) {}
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : systemDark ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#181815' : '#FAF9F6');
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
