'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === 'en' ? 'zh' : 'en';

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
    >
      <span>{locale === 'en' ? '🇨🇳' : '🇺🇸'}</span>
      <span>{locale === 'en' ? '中文' : 'English'}</span>
    </Link>
  );
}
