'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import TimeZoneCard from './TimeZoneCard';
import TimezoneSearch from './TimezoneSearch';
import { popularTimezones, timezoneLocales } from '@/lib/timezones';

interface WorldClockProps {
  onTimezoneSelect: (timezone: string) => void;
  selectedTimezone: string;
}

export default function WorldClock({ onTimezoneSelect, selectedTimezone }: WorldClockProps) {
  const locale = useLocale() as 'zh' | 'en';
  // 初始化：本地时区 + 热门时区
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return [localTimezone, ...popularTimezones.filter(tz => tz !== localTimezone)];
    }
    return popularTimezones;
  });

  // 处理时区选择/取消
  const handleTimezoneToggle = (timezones: string[]) => {
    setSelectedTimezones(timezones);
    // 选择第一个时区（新添加或移到第一位的）
    if (timezones.length > 0) {
      onTimezoneSelect(timezones[0]);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 搜索框 */}
      <div className="flex justify-center">
        <TimezoneSearch
          onSelect={handleTimezoneToggle}
          selectedTimezones={selectedTimezones}
        />
      </div>

      {/* 时区卡片网格 - 优化移动端显示 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3">
        {selectedTimezones.map((timezone) => {
          const localeData = timezoneLocales[timezone];
          if (!localeData) return null;

          const isSelected = timezone === selectedTimezone;

          return (
            <TimeZoneCard
              key={timezone}
              city={localeData.name[locale]}
              timezone={timezone}
              flag={localeData.flag}
              offset={localeData.offset}
              isSelected={isSelected}
              onClick={() => onTimezoneSelect(timezone)}
            />
          );
        })}
      </div>

      {selectedTimezones.length === 0 && (
        <div className="text-center py-8 sm:py-12 text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {locale === 'zh' ? '请搜索并选择时区' : 'Please search and select timezones'}
        </div>
      )}

      {/* 已选择的时区提示 */}
      {selectedTimezones.length > 0 && (
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
          <div className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium">
            {selectedTimezones.length} {locale === 'zh' ? '个时区' : 'timezones'}
          </div>
        </div>
      )}
    </div>
  );
}
