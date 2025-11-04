import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

// 预加载所有语言文件
const messages = {
  en: () => import('./messages/en.json').then(m => m.default),
  zh: () => import('./messages/zh.json').then(m => m.default),
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) as Locale;

  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: await messages[locale](),
  };
});
