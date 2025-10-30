'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import Fuse from 'fuse.js';
import { timezoneKeys, timezoneLocales } from '@/lib/timezones';

interface TimezoneSearchProps {
  onSelect: (timezones: string[]) => void;
  selectedTimezones: string[];
}

export default function TimezoneSearch({ onSelect, selectedTimezones }: TimezoneSearchProps) {
  const locale = useLocale() as 'zh' | 'en';
  const [searchQuery, setSearchQuery] = useState('');

  // 准备搜索数据
  const searchData = useMemo(() => {
    return timezoneKeys.map(tz => ({
      timezone: tz,
      name: timezoneLocales[tz][locale],
      enName: timezoneLocales[tz].en,
      zhName: timezoneLocales[tz].zh,
      region: timezoneLocales[tz].region,
      regionZh: timezoneLocales[tz].regionZh,
    }));
  }, [locale]);

  // 配置 Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(searchData, {
      keys: ['timezone', 'name', 'enName', 'zhName', 'region', 'regionZh'],
      threshold: 0.3,
      includeScore: true,
    });
  }, [searchData]);

  // 搜索结果
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    return fuse.search(searchQuery).slice(0, 10);
  }, [searchQuery, fuse]);

  const handleToggleTimezone = (timezone: string) => {
    if (selectedTimezones.includes(timezone)) {
      onSelect(selectedTimezones.filter(tz => tz !== timezone));
    } else {
      onSelect([...selectedTimezones, timezone]);
    }
    setSearchQuery('');
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={locale === 'zh' ? '搜索时区...' : 'Search timezone...'}
          className="w-full px-4 py-2.5 sm:py-3 pl-11 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 focus:ring-indigo-400 dark:focus:ring-indigo-500 focus:border-indigo-400 dark:focus:border-indigo-500 transition-all shadow-sm focus:shadow-md"
        />
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* 搜索结果下拉框 */}
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
          {searchResults.map(({ item }) => {
            const isSelected = selectedTimezones.includes(item.timezone);
            return (
              <button
                key={item.timezone}
                onClick={() => handleToggleTimezone(item.timezone)}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700/50 last:border-b-0 transition-colors ${
                  isSelected ? 'bg-indigo-50/80 dark:bg-indigo-900/20' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <span className="text-xl sm:text-2xl shrink-0">{timezoneLocales[item.timezone].flag}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">
                        {item.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        {item.timezone} • UTC{timezoneLocales[item.timezone].offset}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 shrink-0 ml-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
