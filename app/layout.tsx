import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://world-time-nine.vercel.app'),
  title: {
    default: 'World Time - Global Time Zone Converter',
    template: '%s | World Time',
  },
  description: 'View current time across different time zones around the world. Beautiful world clock with real-time updates.',
  keywords: [
    'world clock',
    'time zones',
    'current time',
    'timezone converter',
    'global time',
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
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'World Time',
    title: 'World Time - Global Time Zone Converter',
    description: 'View current time across different time zones around the world',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World Time - Global Time Zone Converter',
    description: 'View current time across different time zones around the world',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
