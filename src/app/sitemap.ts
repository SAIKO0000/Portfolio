import type { MetadataRoute } from 'next';
import { caseStudies, siteConfig } from '@/data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', ...caseStudies.map((study) => `/work/${study.slug}`)];

  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date('2026-08-22'),
    changeFrequency: route ? 'monthly' : 'weekly',
    priority: route ? 0.8 : 1,
  }));
}
