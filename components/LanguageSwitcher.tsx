'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === 'en' ? 'zh' : 'en';
  const [isPending, startTransition] = useTransition();

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      prefetch={true}
      onClick={() => {
        startTransition(() => {
          // Link 会自动处理导航
        });
      }}
      className={`px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 ${
        isPending ? 'opacity-70 cursor-wait' : ''
      }`}
      aria-disabled={isPending}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>{locale === 'en' ? '中文' : 'English'}</span>
        </div>
      ) : (
        <span>{locale === 'en' ? '中文' : 'English'}</span>
      )}
    </Link>
  );
}
