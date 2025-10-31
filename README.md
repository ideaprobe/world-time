# World Time 🌍

A modern, responsive world clock application built with Next.js 16, featuring real-time timezone display and beautiful analog clocks.

## Features

- 🌐 Multi-language support (English & Chinese)
- 🕐 Beautiful analog clock display
- 🔍 Fuzzy search for timezones
- 📱 Fully responsive design
- 🎨 Dark mode support
- ⚡ Fast and optimized with Vercel Analytics
- 🔍 SEO optimized with sitemap and metadata

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Internationalization**: next-intl
- **Animation**: Framer Motion
- **Search**: Fuse.js
- **Date/Time**: Day.js
- **Analytics**: Vercel Analytics & Speed Insights
- **Code Quality**: ESLint with @stylistic/eslint-plugin

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <your-repo-url>
   cd world-time
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Create environment file:
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

4. Update the site URL in \`.env.local\`:
   \`\`\`
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   \`\`\`

### Development

Run the development server:
\`\`\`bash
pnpm dev
\`\`\`

Open [http://localhost:3778](http://localhost:3778) in your browser.

### Build

Build for production:
\`\`\`bash
pnpm build
\`\`\`

Start production server:
\`\`\`bash
pnpm start
\`\`\`

### Linting

Run ESLint:
\`\`\`bash
pnpm lint
\`\`\`

## Project Structure

\`\`\`
world-time/
├── app/
│ ├── [locale]/ # Localized routes
│ │ ├── layout.tsx # Root layout with metadata
│ │ └── page.tsx # Home page
│ ├── sitemap.ts # Dynamic sitemap
│ ├── robots.ts # Robots.txt
│ └── globals.css # Global styles
├── components/ # React components
│ ├── AnalogClock.tsx
│ ├── TimeZoneCard.tsx
│ ├── TimezoneSearch.tsx
│ ├── WorldClock.tsx
│ └── LanguageSwitcher.tsx
├── hooks/ # Custom React hooks
├── lib/ # Utility functions
├── messages/ # i18n translations
└── public/ # Static assets
\`\`\`

## SEO Features

- ✅ Dynamic metadata generation
- ✅ Open Graph tags
- ✅ Twitter Card support
- ✅ Sitemap generation
- ✅ Robots.txt
- ✅ Multi-language support with hreflang
- ✅ Web manifest for PWA support
- ✅ Structured data ready

## Analytics

The app includes:

- **Vercel Analytics**: Track page views and user interactions
- **Speed Insights**: Monitor Core Web Vitals

Analytics are automatically enabled when deployed on Vercel.

## Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set the environment variable \`NEXT_PUBLIC_SITE_URL\`
4. Deploy!

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
