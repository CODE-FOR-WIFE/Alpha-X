import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Reveal } from '@/components/reveal'

import './(frontend)/styles.css'

const title = 'ALPHA X — Wealth with Passion'
const description = 'Curated financial solutions for the passions that define you.'
// ต้องเป็นโดเมนที่ไฟล์อยู่จริง ไม่งั้น og:image ชี้ไปที่ที่ไม่มีรูปแล้ว preview ไม่ขึ้น
// (เคยตั้งเป็น www.alphaxclub.com ซึ่งยังไม่ใช่เว็บนี้ — การ์ดใน LINE/Messenger เลยมีแต่ข้อความ)
// ตอน go-live ค่อยเปลี่ยนเป็นโดเมนจริง หรือส่งผ่าน NEXT_PUBLIC_SITE_URL ตอน build
const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://alpha-x-blond.vercel.app'

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
