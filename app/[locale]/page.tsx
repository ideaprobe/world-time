import { useTranslations } from 'next-intl';
import WorldClock from '@/components/WorldClock';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import AnalogClock from '@/components/AnalogClock';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8 gap-2">
          <div className='flex-1'>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {t('title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {t('description')}
            </p>
          </div>
          <LanguageSwitcher />
        </header>

        {/* 圆形时钟 - 显示本地时区 */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
            <AnalogClock timezone={Intl.DateTimeFormat().resolvedOptions().timeZone} />
          </div>
        </div>

        <WorldClock />

        <footer className="mt-16 text-center text-gray-600 dark:text-gray-400">
          <p>{t('footer')}</p>
        </footer>
      </div>
    </div>
  );
}
