import { ImageResponse } from 'next/og';

export const alt = 'Mark Daniel Iguban — software engineer portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: '#F5F2EA',
          color: '#171717',
          fontFamily: 'Arial, sans-serif',
          border: '20px solid #171717',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>Mark Daniel Iguban</div>
        </div>
        <div style={{ display: 'flex', maxWidth: 970, fontSize: 72, lineHeight: 1.02, letterSpacing: '-3px', fontWeight: 700 }}>
          I build dependable software for complex, real-world workflows.
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22 }}>
          <span>Full-stack products · Applied computer vision</span>
          <span>Philippines / remote</span>
        </div>
      </div>
    ),
    size,
  );
}
