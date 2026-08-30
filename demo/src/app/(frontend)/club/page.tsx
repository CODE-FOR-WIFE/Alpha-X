import { ArrowLeft, ArrowUpRight, Bookmark, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { SiteMenu } from '@/components/site-menu'

const logo = '/assets/alpha-x-logo.png'

// 3 เสาตาม sitemap 03 — แต่ละเสามีคำอธิบายของตัวเองแล้วค่อยตามด้วยบทความ
// จัดแบบนี้เพราะลูกค้าอ่าน sitemap แล้วต้องเห็นว่าเสาไหนอยู่ตรงไหนทันที
const pillars = [
  {
    name: 'The Collector',
    blurb: 'Watches, art and classic cars — provenance, asset spotlights and the case for objects as collateral.',
    stories: [
      ['Objects with a story worth preserving', '/assets/hero-story-collector.jpg'],
      ['Design, provenance and enduring value', '/assets/hero-story-provenance.jpg'],
    ],
  },
  {
    name: 'The Explorer',
    blurb: 'Private golf clubs, hidden destinations and the journeys worth clearing a week for.',
    stories: [['The roads that reward taking your time', '/assets/hero-story-explorer.jpg']],
  },
  {
    name: 'The Connoisseur',
    blurb: 'Dining, whisky and the rooms where the right introductions happen.',
    stories: [['A quieter definition of rarity', '/assets/hero-story-connoisseur.jpg']],
  },
] as const

// Alpha Events ตาม sitemap 03 — ข่าวบริษัทและหมุดหมาย PR แยกจากบทความไลฟ์สไตล์
const events = [
  ['12 September 2026', 'Alpha X at the Bangkok Concours', 'A weekend of rare machinery, hosted alongside the collectors who keep them running.'],
  ['28 August 2026', 'Partnership — Private Aviation Network', 'Direct access to aircraft management and acquisition specialists across the region.'],
  ['05 August 2026', 'Alpha X Plus opens to members', 'The wider platform behind the club, now open to existing clients by invitation.'],
] as const

const slug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function ClubPage() {
  return (
    <main className="club-page section-light">
      <header className="site-nav">
        <div className="shell site-nav__grid">
          <SiteMenu />
          <Link aria-label="ALPHA X home" className="brand" href="/"><Image alt="ALPHA X" height={27} priority src={logo} width={124} /></Link>
        </div>
      </header>
      <section className="club-hero shell">
        <Link className="back-link" href="/"><ArrowLeft aria-hidden="true" /> Home</Link>
        <p className="eyebrow accent">Alpha X Club · Issue 01</p>
        <h1>A life well considered.</h1>
        <p>Perspectives on objects, journeys and rituals chosen with intention.</p>
      </section>
      {pillars.map((pillar) => (
        <section className="club-pillar shell" key={pillar.name}>
          <div className="club-pillar__head">
            <h2>{pillar.name}</h2>
            <p>{pillar.blurb}</p>
          </div>
          <div className="club-grid">
            {pillar.stories.map(([title, image], index) => (
              <article className={pillar.stories.length === 1 ? 'club-story club-story--lead' : 'club-story'} key={title}>
                <div className="club-story__image">
                  <Image alt="" fill sizes={pillar.stories.length === 1 ? '100vw' : '50vw'} src={image} />
                </div>
                <p className="eyebrow muted">{pillar.name} · 0{index + 1}</p>
                <h3>{title}</h3>
                <div className="club-story__actions">
                  <Link href={`/club/${slug(title)}`}>Read story <ArrowUpRight aria-hidden="true" /></Link>
                  {/* share + save ตาม sitemap 03 — ปุ่มจริงต่อ API ตอน build เต็ม */}
                  <button aria-label={`Share ${title}`} type="button"><Share2 aria-hidden="true" /></button>
                  <button aria-label={`Save ${title} for later`} type="button"><Bookmark aria-hidden="true" /></button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="club-events">
        <div className="shell">
          <div className="hairline" />
          <div className="club-events__head">
            <div>
              <p className="eyebrow accent">Alpha Events</p>
              <h2>Company news &amp; milestones</h2>
            </div>
            <p>Where the club meets in person, and what the platform behind it is building next.</p>
          </div>
          <div className="club-events__list">
            {events.map(([date, title, body]) => (
              <article key={title}>
                <p className="eyebrow muted">{date}</p>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
