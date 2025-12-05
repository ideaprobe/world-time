'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import WorldClock from '@/components/WorldClock';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import AnalogClock from '@/components/AnalogClock';

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
