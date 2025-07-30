import { ImageResponse } from 'next/og'

// Icon component for generating favicon
export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#3B82F6',
          fontWeight: 'bold',
        }}
      >
        X
      </div>
    ),
    {
      ...size,
    }
  )
}