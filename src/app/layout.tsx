import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import { AnalyticsConsent } from '@/components/site/AnalyticsConsent';
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
    default: `${siteConfig.name} — Software Engineer | Workflow Automation`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
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
    title: `${siteConfig.name} — Software Engineer | Workflow Automation`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Software Engineer | Workflow Automation`,
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
        <AnalyticsConsent />
      </body>
    </html>
  );
}
