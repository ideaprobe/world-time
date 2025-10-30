'use client';

import { useLocale } from 'next-intl';
import 'dayjs/locale/zh-cn';
import { timezoneLocales } from '@/lib/timezones';
import { useClock } from '@/hooks/useClock';
import { useTimezone } from '@/hooks/useTimezone';

interface AnalogClockProps {
  timezone: string;
  size?: number;
}

export default function AnalogClock({ timezone, size = 200 }: AnalogClockProps) {
  const locale = useLocale() as 'zh' | 'en';
  const timestamp = useClock(1000);
  const time = useTimezone(timezone, timestamp);

  // 如果时间还未初始化，显示加载状态
  if (!time) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse"
        />
        <div className="text-center space-y-1.5">
          <div className="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-7 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const seconds = time.second();
  const minutes = time.minute();
  const hours = time.hour() % 12;

  const secondAngle = (seconds * 6) - 90;
  const minuteAngle = (minutes * 6 + seconds * 0.1) - 90;
  const hourAngle = (hours * 30 + minutes * 0.5) - 90;

  const radius = size / 2;
  const center = radius;

  const dayjsLocale = locale === 'zh' ? 'zh-cn' : 'en';
  const formattedDate = time.locale(dayjsLocale).format('ddd, MMM D, YYYY');

  // 获取时区信息
  const timezoneInfo = timezoneLocales[timezone];
  const cityName = timezoneInfo ? timezoneInfo.name[locale as 'zh' | 'en'] : timezone;
  const utcOffset = timezoneInfo ? timezoneInfo.offset : time.format('Z');

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-lg"
      >
        {/* Clock face */}
        <circle
          cx={center}
          cy={center}
          r={radius - 4}
          fill="white"
          stroke="#e5e7eb"
          strokeWidth="4"
          className="dark:fill-gray-800 dark:stroke-gray-700"
        />

        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = center + (radius - 20) * Math.cos(angle);
          const y1 = center + (radius - 20) * Math.sin(angle);
          const x2 = center + (radius - 10) * Math.cos(angle);
          const y2 = center + (radius - 10) * Math.sin(angle);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#9ca3af"
              strokeWidth="2"
              className="dark:stroke-gray-600"
            />
          );
        })}

        {/* Hour hand */}
        <line
          x1={center}
          y1={center}
          x2={center + (radius * 0.5) * Math.cos(hourAngle * Math.PI / 180)}
          y2={center + (radius * 0.5) * Math.sin(hourAngle * Math.PI / 180)}
          stroke="#4f46e5"
          strokeWidth="6"
          strokeLinecap="round"
          className="dark:stroke-indigo-400"
        />

        {/* Minute hand */}
        <line
          x1={center}
          y1={center}
          x2={center + (radius * 0.7) * Math.cos(minuteAngle * Math.PI / 180)}
          y2={center + (radius * 0.7) * Math.sin(minuteAngle * Math.PI / 180)}
          stroke="#6366f1"
          strokeWidth="4"
          strokeLinecap="round"
          className="dark:stroke-indigo-500"
        />

        {/* Second hand */}
        <line
          x1={center}
          y1={center}
          x2={center + (radius * 0.8) * Math.cos(secondAngle * Math.PI / 180)}
          y2={center + (radius * 0.8) * Math.sin(secondAngle * Math.PI / 180)}
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          className="dark:stroke-red-400"
        />

        {/* Center dot */}
        <circle
          cx={center}
          cy={center}
          r="6"
          fill="#4f46e5"
          className="dark:fill-indigo-400"
        />
      </svg>

      <div className="text-center space-y-1">
        <div className="text-lg font-semibold text-gray-900 dark:text-white">
          {cityName}
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white font-mono">
          {time.format('HH:mm:ss')}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {formattedDate}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          {timezone} • UTC{utcOffset}
        </div>
      </div>
    </div>
  );
}
