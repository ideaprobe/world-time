'use client';

import dynamic from 'next/dynamic';

// 动态导入 Analytics 组件，减少初始加载
const VercelAnalytics = dynamic(
  () => import('@vercel/analytics/react').then((mod) => mod.Analytics),
  { ssr: false }
);

const VercelSpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((mod) => mod.SpeedInsights),
  { ssr: false }
);

export default function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <VercelSpeedInsights />
    </>
  );
}
