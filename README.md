# 🌍 World Time - 世界时间

一个使用 Next.js 和 next-intl 构建的世界时间应用，支持中英文国际化。

## ✨ 特性

- 🕐 圆形模拟时钟显示本地时间
- 🔍 智能搜索功能（使用 Fuse.js）
- 🌐 支持全球 418 个时区
- 🌍 支持中英文切换（使用 next-intl）
- 🎨 现代化 UI 设计，支持深色模式
- ⚡ 使用 Framer Motion 实现流畅动画
- 📱 完全响应式设计
- ⏰ 使用 Day.js 进行时间格式化

## 🚀 快速开始

安装依赖：

```bash
pnpm install
```

运行开发服务器：

```bash
pnpm dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 🏗️ 技术栈

- **Next.js 16** - React 框架
- **next-intl** - 国际化解决方案
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **Day.js** - 时间处理库
- **Fuse.js** - 模糊搜索引擎
- **TypeScript** - 类型安全

## 📁 项目结构

```
├── app/
│   └── [locale]/          # 国际化路由
│       ├── layout.tsx     # 布局组件
│       └── page.tsx       # 主页面
├── components/            # React 组件
│   ├── WorldClock.tsx     # 世界时钟主组件
│   ├── TimeZoneCard.tsx   # 时区卡片组件
│   └── LanguageSwitcher.tsx # 语言切换器
├── messages/              # 国际化翻译文件
│   ├── en.json           # 英文
│   └── zh.json           # 中文
├── i18n.ts               # next-intl 配置
└── middleware.ts         # 国际化中间件
```

## 🌏 支持的时区

应用支持所有 **417 个** IANA 时区，默认显示 18 个热门城市：

- 🇨🇳 上海 / Shanghai
- 🇯🇵 东京 / Tokyo
- 🇰🇷 首尔 / Seoul
- 🇭🇰 香港 / Hong Kong
- 🇸🇬 新加坡 / Singapore
- 🇦🇪 迪拜 / Dubai
- 🇬🇧 伦敦 / London
- 🇫🇷 巴黎 / Paris
- 🇩🇪 柏林 / Berlin
- 🇷🇺 莫斯科 / Moscow
- 🇺🇸 纽约 / New York
- 🇺🇸 洛杉矶 / Los Angeles
- 🇺🇸 芝加哥 / Chicago
- 🇨🇦 多伦多 / Toronto
- 🇲🇽 墨西哥城 / Mexico City
- 🇧🇷 圣保罗 / São Paulo
- 🇦🇺 悉尼 / Sydney
- 🇳🇿 奥克兰 / Auckland

所有时区数据通过 `Intl.supportedValuesOf('timeZone')` 自动生成。

## 📝 License

MIT
