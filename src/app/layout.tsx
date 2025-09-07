import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WebVitals from "@/components/WebVitals";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-q1ik41oiz-mark-daniel-igubans-projects.vercel.app'),
  title: {
    default: "AI-Enhanced Developer Portfolio | Modern React & Next.js",
    template: "%s | AI Portfolio"
  },
  description: "Full-stack developer showcasing AI-integrated projects with Next.js 15.5.2, React 19.1.1, TypeScript, and MCP tools integration. Professional portfolio with performance optimization and modern development practices.",
  keywords: [
    "Next.js Developer",
    "React Developer", 
    "TypeScript Developer",
    "AI Integration",
    "MCP Tools",
    "Full-Stack Developer",
    "Frontend Developer",
    "Web Development",
    "JavaScript Developer",
    "Modern Web Development"
  ],
  authors: [{ name: "Mark Daniel Iguban", url: "https://portfolio-q1ik41oiz-mark-daniel-igubans-projects.vercel.app" }],
  creator: "Mark Daniel Iguban",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-q1ik41oiz-mark-daniel-igubans-projects.vercel.app",
    title: "AI-Enhanced Developer Portfolio | Modern React & Next.js",
    description: "Professional developer portfolio showcasing AI-integrated projects, modern React patterns, and cutting-edge web technologies.",
    siteName: "AI Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI-Enhanced Developer Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Enhanced Developer Portfolio",
    description: "Professional developer portfolio with AI integration and modern web technologies",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="person" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
