'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

const links = [
  { href: '/', label: 'Home' },
  { href: '/#expertise', label: 'Expertise' },
  { href: '/#about', label: 'About' },
  { href: '/club', label: 'Alpha X Club' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        aria-controls="site-menu-panel"
        aria-expanded={open}
        aria-label="Open navigation"
        className="menu-trigger"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu aria-hidden="true" />
      </button>

      <div className={`menu-panel${open ? ' menu-panel--open' : ''}`} aria-hidden={!open} id="site-menu-panel">
        <div className="menu-panel__inner">
          {/* ปุ่มปิดอยู่ใน panel ไม่ใช่ใน nav — จะได้เลื่อนเข้าออกพร้อม drawer ตัวเดียวกัน */}
          <button aria-label="Close navigation" className="menu-trigger menu-close" onClick={() => setOpen(false)} type="button">
            <X aria-hidden="true" />
          </button>
          <p className="eyebrow muted">Menu</p>
          <div className="hairline" />
          <nav aria-label="Primary navigation" className="menu-panel__links">
            {links.map((link, index) => (
              <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="menu-panel__contact">
            <p className="eyebrow muted">Private consultation</p>
            <a href="mailto:contact@alphaxclub.com">contact@alphaxclub.com</a>
          </div>
        </div>
      </div>

      <Button asChild className="nav-cta">
        <Link href="/#contact">Private consultation</Link>
      </Button>
    </>
  )
}
