import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { SiteMenu } from '@/components/site-menu'

const logo = '/assets/alpha-x-logo.png'

// หน้าที่อยู่ใน sitemap แต่ยังไม่ได้ทำในเดโมรอบนี้ — บอกตรง ๆ ว่าอยู่ระหว่างทำ
// ดีกว่าปล่อยลิงก์ตันหรือขึ้น 404 เปล่า ๆ ตอนลูกค้ากดสำรวจเอง
const upcoming = [
  { title: 'About Us', body: 'Brand story, milestones, awards and compliance' },
  { title: 'Our Products', body: 'Car · Yacht / River Boat · Aircraft · Property · Gold-backed' },
  { title: 'Contact & Inquiry', body: 'Inquiry form, direct channels and office location' },
]

export function ComingSoon() {
  return (
    <main className="notfound section-dark">
      <header className="site-nav">
        <div className="shell site-nav__grid">
          <SiteMenu />
          <Link aria-label="ALPHA X home" className="brand" href="/">
            <Image alt="ALPHA X" height={27} priority src={logo} width={124} />
          </Link>
        </div>
      </header>

      {/* motif ตัว X เดียวกับที่ใช้คั่น section ในหน้า Home — ที่นี่ปล่อยให้เป็นตัวเอกของหน้า */}
      <span aria-hidden="true" className="notfound__mark" />

      <div className="shell notfound__inner">
        <p className="eyebrow accent">Error 404</p>
        <h1>
          This page is still
          <br />
          <em>being written.</em>
        </h1>
        <p className="notfound__lede">
          The address is part of the Alpha X sitemap, but it sits outside the two pages built for this
          demonstration. Home and Alpha X Club are fully live—everything else is on the way.
        </p>

        <div className="notfound__actions">
          <Link className="button" href="/">
            <ArrowLeft aria-hidden="true" /> Back to home
          </Link>
          <Link className="button button--outline" href="/club">
            Alpha X Club <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="notfound__list">
          <p className="eyebrow muted">In the full build</p>
          {upcoming.map((item) => (
            <article key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
