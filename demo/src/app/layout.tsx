import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Reveal } from '@/components/reveal'

import './(frontend)/styles.css'

const title = 'ALPHA X — Wealth with Passion'
const description = 'Curated financial solutions for the passions that define you.'
// เดโมยังไม่ขึ้นโดเมนจริง — ตั้ง metadataBase ไว้ให้ OG url เป็น absolute เสมอ
// เปลี่ยนเป็นโดเมนจริงตอน go-live แล้วรูปจะตามไปเอง
const site = 'https://www.alphaxclub.com'

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: 'ALPHA X',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'ALPHA X — Wealth with Passion' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.jpg'],
  },
}

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  )
}
