import { ArrowDown, ArrowUpRight, CirclePlay, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { SiteMenu } from '@/components/site-menu'
import { Button } from '@/components/ui/button'

const heroA = '/assets/hero-car-a.jpg'
const heroB = '/assets/hero-car-b.jpg'
const currentSite = '/assets/current-site.png'
const logo = '/assets/alpha-x-logo.png'
const showcaseCar = '/assets/showcase-car.png'

const expertise: Array<{ title: string; body: string; image: string; position: string }> = [
  {
    title: 'Automotive',
    body: 'Financing structured around exceptional vehicles and the ambitions behind every acquisition.',
    image: heroA,
    position: 'center 58%',
  },
  {
    title: 'Marine & Aviation',
    body: 'Specialist guidance for private journeys across water and sky, handled with absolute discretion.',
    image: heroB,
    position: 'center 48%',
  },
  {
    title: 'Collectible Assets',
    body: 'Considered solutions for rare objects, meaningful collections and opportunities beyond convention.',
    image: currentSite,
    position: 'center 20%',
  },
]

const insights = [
  {
    date: '26 August 2026',
    category: 'The Collector',
    title: 'The enduring value of objects chosen with conviction',
    body: 'A closer look at the relationship between provenance, personal meaning and long-term value.',
    image: heroB,
  },
  {
    date: '18 August 2026',
    category: 'The Explorer',
    title: 'Why the journey remains the rarest luxury',
    body: 'The machines, places and decisions that turn movement into an expression of identity.',
    image: heroA,
  },
]

export default function HomePage() {
  return (
    <main>
      <header className="site-nav">
        <div className="shell site-nav__grid">
          <SiteMenu />
          <Link aria-label="ALPHA X home" className="brand" href="/">
            <Image alt="ALPHA X" height={27} priority src={logo} width={124} />
          </Link>
        </div>
      </header>

      <section className="hero section-dark">
        <div className="shell hero__copy">
          <p className="eyebrow">SCBX Private Financial Solutions</p>
          <h1>
            Wealth with <em>Passion</em>
          </h1>
          <p className="hero__lede">
            Beyond wealth lies what moves you. We shape financial possibilities around the life, objects and
            experiences that matter most.
          </p>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <Image alt="" fill priority sizes="100vw" src={heroA} />
          <div className="hero__shade" />
        </div>
        <a className="hero__scroll" href="#expertise">
          Explore <ArrowDown aria-hidden="true" />
        </a>
      </section>

      <section className="section-light ruled-section" id="expertise">
        <div className="shell section-pad">
          <div className="hairline" />
          <div className="split-heading" data-reveal>
            <div>
              <p className="eyebrow accent">Our expertise</p>
              <h2 data-reveal="rise">Solutions shaped around distinction.</h2>
            </div>
            <p>
              Access specialist financing designed for assets that demand deeper knowledge, personal attention and
              a different standard of service.
            </p>
          </div>

          <div className="expertise-grid" data-reveal>
            {expertise.map((item, index) => (
              <article className="expertise-card" key={item.title}>
                <div className="expertise-card__image">
                  <Image
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    src={item.image}
                    style={{ objectPosition: item.position }}
                  />
                </div>
                <div className="expertise-card__content">
                  <p className="eyebrow muted">0{index + 1}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <Link aria-label={`Explore ${item.title}`} href="/#contact">
                    Explore <ArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="film section-dark" id="about">
        <div className="shell film__frame">
          <Image alt="A journey shaped by personal ambition" data-reveal="zoom" fill sizes="100vw" src={heroB} />
          <div className="film__overlay" />
          <button aria-label="Play the ALPHA X story" className="film__play" type="button">
            <CirclePlay aria-hidden="true" />
            <span>Discover the ALPHA X story</span>
          </button>
        </div>
      </section>

      <section className="values section-light">
        <div className="shell values__grid section-pad">
          <div className="values__statement" data-reveal>
            <p className="eyebrow accent">The ALPHA X standard</p>
            <h2 data-reveal="rise">Expertise that understands what is personal.</h2>
            <div className="values__image">
              <Image alt="ALPHA X private financial expertise" fill sizes="(max-width: 991px) 100vw, 48vw" src={heroA} />
            </div>
          </div>
          <div className="values__list" data-reveal>
            <article>
              <span>01</span>
              <div><h3>Personal expertise</h3><p>Every opportunity is shaped around an individual ambition, never a standard profile.</p></div>
            </article>
            <article>
              <span>02</span>
              <div><h3>Curated access</h3><p>Specialist knowledge and a trusted network open possibilities beyond conventional finance.</p></div>
            </article>
            <article>
              <span>03</span>
              <div><h3>Privacy by design</h3><p>Discretion, governance and security are built into every conversation and transaction.</p></div>
            </article>
            <Button asChild>
              <Link href="/#contact">Speak with a specialist <ArrowUpRight aria-hidden="true" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="showcase section-light">
        <div className="shell showcase__intro">
          <h2 data-reveal="rise">Limitless Opulence</h2>
          <p data-reveal>
            Beyond the balance sheet lies the object itself. Our specialists structure financing around the
            vehicles, vessels and rare pieces that carry a life&apos;s ambition.
          </p>
        </div>
        <div className="showcase__stage" data-reveal="zoom">
          <Image alt="" sizes="100vw" src={showcaseCar} width={2100} height={813} />
        </div>
      </section>

      <section className="insights section-light" id="club">
        <div className="shell section-pad">
          <div className="hairline" />
          <div className="split-heading" data-reveal>
            <div>
              <p className="eyebrow accent">Alpha X Club</p>
              <h2 data-reveal="rise">What&apos;s trending</h2>
            </div>
            <p>
              Stories from the worlds of collecting, travel and refined living—selected for people whose interests
              extend far beyond the ordinary.
            </p>
          </div>
          <div className="insights-grid" data-reveal>
            {insights.map((item) => (
              <article className="insight-card" key={item.title}>
                <div className="insight-card__image">
                  <Image alt="" fill sizes="(max-width: 767px) 100vw, 50vw" src={item.image} />
                </div>
                <p className="eyebrow muted">{item.category} · {item.date}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <Link href="/club">Read the story <ArrowUpRight aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing section-dark" id="contact">
        <div className="shell closing__card">
          <Image alt="" data-reveal="zoom" fill sizes="100vw" src={heroB} />
          <div className="closing__overlay" />
          <div className="closing__content" data-reveal>
            <p className="eyebrow">Private consultation</p>
            <h2 data-reveal="rise">Begin with what matters to you.</h2>
            <p>Speak with an ALPHA X specialist for a discreet, considered conversation.</p>
            <Button asChild variant="outline">
              <a href="mailto:contact@alphaxclub.com">Contact ALPHA X <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="footer section-dark">
        <div className="shell footer__grid">
          <div>
            <Image alt="ALPHA X" height={28} src={logo} width={130} />
            <p>Wealth with Passion.</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/#expertise">Expertise</Link>
            <Link href="/#about">About</Link>
            <Link href="/club">Alpha X Club</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
          <div className="footer__security"><ShieldCheck aria-hidden="true" /><span>Part of SCBX</span></div>
        </div>
        <div className="shell footer__bottom"><span>© 2026 ALPHA X</span><span>Privacy · Terms</span></div>
      </footer>
    </main>
  )
}
