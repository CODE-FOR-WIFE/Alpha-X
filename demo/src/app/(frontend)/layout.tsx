import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Reveal } from '@/components/reveal'

import './styles.css'

export const metadata: Metadata = {
  title: 'ALPHA X — Wealth with Passion',
  description: 'Curated financial solutions for the passions that define you.',
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
