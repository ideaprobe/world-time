import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'World Time - View current time across different time zones';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom right, #dbeafe, #e0e7ff)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <div style={{ fontSize: 80 }}>🌍</div>
        <div style={{ fontWeight: 'bold', color: '#1e293b' }}>
          {locale === 'zh' ? '世界时钟' : 'World Time'}
        </div>
        <div style={{ fontSize: 40, color: '#475569' }}>
          {locale === 'zh' ? '查看全球各地当前时间' : 'View current time across different time zones'}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
