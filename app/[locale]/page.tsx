'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const WorldClock = dynamic(() => import('@/components/WorldClock'), {
  ssr: false,
  loading: () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-center">
        <div className="h-12 w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="backdrop-blur-sm rounded-lg p-2 sm:p-3 border bg-white/80 dark:bg-gray-800/80 border-gray-100 dark:border-gray-700 shadow-md">
            <div className="flex items-center justify-between mb-1.5">
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <span className="text-lg sm:text-xl">⏳</span>
            </div>
            <div className="space-y-1">
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-2.5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});

const LanguageSwitcher = dynamic(() => import('@/components/LanguageSwitcher'), {
  ssr: false,
  loading: () => (
    <div className="px-6 py-3 bg-indigo-600 rounded-lg flex items-center gap-2 animate-pulse">
      <span className="w-16 h-5 bg-indigo-500 rounded" />
    </div>
  ),
});

const AnalogClock = dynamic(() => import('@/components/AnalogClock'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-3">
      <div style={{ width: 180, height: 180 }} className="rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
      <div className="text-center space-y-1.5">
        <div className="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
        <div className="h-7 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
        <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
      </div>
    </div>
  ),
});

export default function Home() {
  const t = useTranslations();
  // 初始化为本地时区
  const [selectedTimezone, setSelectedTimezone] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    return 'UTC';
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <header className="flex justify-between items-center mb-4 sm:mb-6 gap-2">
          <div className='flex-1'>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1">
              {t('title')}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {t('description')}
            </p>
          </div>
          <LanguageSwitcher />
        </header>

        <main>
          {/* 圆形时钟 - 显示选中的时区 */}
          {selectedTimezone && (
            <section className="mb-6 sm:mb-8">
              <h2 className="sr-only">{t('selectedClock')}</h2>
              <div className="flex justify-center">
                <AnalogClock timezone={selectedTimezone} size={180} />
              </div>
            </section>
          )}

          <section>
            <h2 className="sr-only">{t('timezonesTitle')}</h2>
            <WorldClock
              onTimezoneSelect={setSelectedTimezone}
              selectedTimezone={selectedTimezone}
            />
          </section>
        </main>

        <footer className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <p>{t('footer')}</p>
        </footer>

      </div>
    </div>
  );
}
