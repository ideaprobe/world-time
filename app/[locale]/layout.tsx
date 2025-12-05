import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Analytics from '@/components/Analytics';
import '../globals.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('title');
  const description = t('description');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://world-time-nine.vercel.app';

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: [
      'world clock',
      'time zones',
      'current time',
      'timezone converter',
      '世界时钟',
      '时区',
      '当前时间',
      '时区转换器',
    ],
    authors: [{ name: 'World Time' }],
    creator: 'World Time',
    publisher: 'World Time',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'zh': '/zh',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      url: `${siteUrl}/${locale}`,
      title,
      description,
      siteName: title,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/apple-icon.svg', type: 'image/svg+xml' },
      ],
    },
    manifest: '/site.webmanifest',
    verification: {
      google: '1VrMDcQ0pK0iwcz45ZzCK9qg6jSpnJRMX0DTjLM5Vs0',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
