import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://worldtime.example.com';

  const routes = routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${siteUrl}/${l}`])
      ),
    },
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...routes,
  ];
}
