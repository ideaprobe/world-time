'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'zh' : 'en';

    startTransition(() => {
      router.push(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 relative"
    >
      {isPending ? (
        <>
          <span className="opacity-50">{locale === 'en' ? '🇨🇳' : '🇺🇸'}</span>
          <span className="opacity-50">{locale === 'en' ? '中文' : 'English'}</span>
        </>
      ) : (
        <>
          <span>{locale === 'en' ? '🇨🇳' : '🇺🇸'}</span>
          <span>{locale === 'en' ? '中文' : 'English'}</span>
        </>
      )}
    </button>
  );
}
