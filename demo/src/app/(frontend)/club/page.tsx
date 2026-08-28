import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { SiteMenu } from '@/components/site-menu'

const heroA = '/assets/hero-car-a.jpg'
const heroB = '/assets/hero-car-b.jpg'
const logo = '/assets/alpha-x-logo.png'

const stories = [
  ['The Collector', 'Objects with a story worth preserving', heroB],
  ['The Explorer', 'The roads that reward taking your time', heroA],
  ['The Connoisseur', 'A quieter definition of rarity', heroB],
  ['The Collector', 'Design, provenance and enduring value', heroA],
] as const

export default function ClubPage() {
  return (
    <main className="club-page section-light">
      <header className="site-nav site-nav--light">
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
      <section className="club-grid shell">
        {stories.map(([category, title, image], index) => (
          <article className={index === 0 ? 'club-story club-story--lead' : 'club-story'} key={title}>
            <div className="club-story__image"><Image alt="" fill sizes={index === 0 ? '100vw' : '50vw'} src={image} /></div>
            <p className="eyebrow muted">{category} · 0{index + 1}</p>
            <h2>{title}</h2>
            <Link href="#">Read story <ArrowUpRight aria-hidden="true" /></Link>
          </article>
        ))}
      </section>
    </main>
  )
}
