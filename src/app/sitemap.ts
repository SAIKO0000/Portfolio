import type { MetadataRoute } from 'next';
import { caseStudies, siteConfig } from '@/data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/privacy', ...caseStudies.map((study) => `/work/${study.slug}`)];

  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
  }));
}
