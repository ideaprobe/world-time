'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import TimeZoneCard from './TimeZoneCard';
import TimezoneSearch from './TimezoneSearch';
import { popularTimezones, timezoneLocales } from '@/lib/timezones';

export default function WorldClock() {
  const locale = useLocale() as 'zh' | 'en';
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>(popularTimezones);

  return (
    <div className="space-y-8">
      {/* 搜索框 */}
      <div className="flex justify-center">
        <TimezoneSearch
          onSelect={setSelectedTimezones}
          selectedTimezones={selectedTimezones}
        />
      </div>

      {/* 已选择的时区提示 */}
      {selectedTimezones.length > 0 && (
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          {locale === 'zh' ? '显示' : 'Showing'} {selectedTimezones.length} {locale === 'zh' ? '个时区' : 'timezones'}
        </div>
      )}

      {/* 时区卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {selectedTimezones.map((timezone) => {
          const localeData = timezoneLocales[timezone];
          return (
            <TimeZoneCard
              key={timezone}
              city={localeData[locale]}
              timezone={timezone}
              flag={localeData.flag}
              offset={localeData.offset}
            />
          );
        })}
      </div>

      {selectedTimezones.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          {locale === 'zh' ? '请搜索并选择时区' : 'Please search and select timezones'}
        </div>
      )}
    </div>
  );
}
