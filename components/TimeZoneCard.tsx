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
  isSelected?: boolean;
  onClick?: () => void;
}

export default function TimeZoneCard({ city, timezone, flag, offset, isSelected = false, onClick }: TimeZoneCardProps) {
  const locale = useLocale();
  const timestamp = useClock(1000);
  const timeInZone = useTimezone(timezone, timestamp);

  // 如果时间还未初始化，显示加载状态
  if (!timeInZone) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
        className={'backdrop-blur-sm rounded-lg p-2 sm:p-3 border transition-all bg-white/80 dark:bg-gray-800/80 border-gray-100 dark:border-gray-700 shadow-md'}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <span className="text-lg sm:text-xl">{flag}</span>
        </div>
        <div className="space-y-1">
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-2.5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </motion.div>
    );
  }

  const dayjsLocale = locale === 'zh' ? 'zh-cn' : 'en';
  const time = timeInZone.format('HH:mm:ss');
  const date = timeInZone.locale(dayjsLocale).format('ddd, MMM D');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`backdrop-blur-sm rounded-lg p-2 sm:p-3 border transition-all cursor-pointer group ${
        isSelected
          ? 'bg-indigo-50/90 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-600 shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/50'
          : 'bg-white/80 dark:bg-gray-800/80 border-gray-100 dark:border-gray-700 shadow-md hover:shadow-lg'
      }`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate flex-1 mr-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {city}
        </h3>
        <span className="text-lg sm:text-xl shrink-0">{flag}</span>
      </div>

      <div className="space-y-0.5">
        <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums leading-tight">
          {time}
        </div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs">
          <span className="text-gray-600 dark:text-gray-400 truncate flex-1">
            {date}
          </span>
          <span className="text-gray-500 dark:text-gray-500 text-[9px] sm:text-[10px] ml-1.5 shrink-0">
            UTC{offset}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
