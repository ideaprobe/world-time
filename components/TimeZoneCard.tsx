'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import 'dayjs/locale/zh-cn';
import { useClock } from '@/hooks/useClock';
import { useTimezone } from '@/hooks/useTimezone';

interface TimeZoneCardProps {
  city: string;
  timezone: string;
  flag: string;
  offset: string;
}

export default function TimeZoneCard({ city, timezone, flag, offset }: TimeZoneCardProps) {
  const locale = useLocale();
  const timestamp = useClock(1000);
  const timeInZone = useTimezone(timezone, timestamp);

  // 如果时间还未初始化，显示加载状态
  if (!timeInZone) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <span className="text-3xl">{flag}</span>
        </div>
        <div className="space-y-2">
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </motion.div>
    );
  }
  
  const dayjsLocale = locale === 'zh' ? 'zh-cn' : 'en';
  const time = timeInZone.format('HH:mm:ss');
  const date = timeInZone.locale(dayjsLocale).format('ddd, MMM D, YYYY');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {city}
        </h3>
        <span className="text-3xl">{flag}</span>
      </div>

      <div className="space-y-2">
        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 font-mono">
          {time}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {date}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          UTC{offset}
        </div>
      </div>
    </motion.div>
  );
}
