import { ArrowUpRight, Phone, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { HeroCarousel } from '@/components/hero-carousel'
import { SiteMenu } from '@/components/site-menu'
import { VideoLightbox } from '@/components/video-lightbox'
import { Button } from '@/components/ui/button'

const logo = '/assets/alpha-x-logo.png'
const showcaseCar = '/assets/showcase-car.png'

// รูปชุดเดียวกับ hero carousel (gen จาก gen-hero-images.mjs)
// การ์ดเป็นกรอบ 4:5 แต่ต้นฉบับ 3:2 และ subject อยู่ขวาของเฟรม → ต้องดัน objectPosition ไป 70%
// ไม่งั้น crop กลางจะได้พื้นที่ว่างฝั่งซ้ายที่เว้นไว้ให้ headline แทนที่จะได้ตัว subject
const CARD_CROP = '70% center'

const expertise: Array<{ title: string; kicker: string; body: string; image: string }> = [
  {
    kicker: 'Vehicle Financing',
    title: 'Luxury Car',
    body: 'Financing structured around exceptional vehicles and the ambitions behind every acquisition.',
    image: '/assets/hero-automotive.jpg',
  },
  {
    kicker: 'Motorcycle Financing',
    title: 'Big Bike',
    body: 'Terms shaped for large-displacement machines, arranged as quickly as the decision to own one.',
    image: '/assets/hero-bigbike.jpg',
  },
  {
    kicker: 'Marine Financing',
    title: 'Yacht / Riverboat',
    body: 'Specialist guidance for vessels on open water and river, handled with absolute discretion.',
    image: '/assets/hero-marine.jpg',
  },
]

const socials = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/alphaxclub',
    path: 'M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z',
  },
  {
    label: 'X',
    href: 'https://x.com/alphaxclub',
    path: 'M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.6 3h6.2l4.2 5.6L17.5 3zm-1 16h1.6L8.1 4.7H6.4L16.5 19z',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/alphaxclub',
    path: 'M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.2-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.9s0-3.6.1-4.9C2.3 4 3.9 2.4 7.1 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.9a4.9 4.9 0 100 9.8 4.9 4.9 0 000-9.8zm0 8.1a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.1-8.3a1.1 1.1 0 100-2.3 1.1 1.1 0 000 2.3z',
  },
]

const insights = [
  {
    date: '26 August 2026',
    category: 'The Collector',
    title: 'The enduring value of objects chosen with conviction',
    body: 'A closer look at the relationship between provenance, personal meaning and long-term value.',
    image: '/assets/hero-story-collector.jpg',
  },
  {
    date: '18 August 2026',
    category: 'The Explorer',
    title: 'Why the journey remains the rarest luxury',
    body: 'The machines, places and decisions that turn movement into an expression of identity.',
    image: '/assets/hero-story-explorer.jpg',
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

      <HeroCarousel />

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
            {expertise.map((item) => (
              <article className="expertise-card" key={item.title}>
                <div className="expertise-card__image">
                  <Image
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    src={item.image}
                    style={{ objectPosition: CARD_CROP }}
                  />
                </div>
                <div className="expertise-card__content">
                  <p className="eyebrow muted">{item.kicker}</p>
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
          <Image alt="A journey shaped by personal ambition" data-reveal="zoom" fill sizes="100vw" src="/assets/hero-brand-film.jpg" />
          <div className="film__overlay" />
          <VideoLightbox />
        </div>
      </section>

      <section className="values section-light">
        <span aria-hidden="true" className="x-mark" />
        <div className="shell values__grid section-pad">
          <div className="values__statement" data-reveal>
            <p className="eyebrow accent">The ALPHA X standard</p>
            <h2 data-reveal="rise">Expertise that understands what is personal.</h2>
            <div className="values__image">
              <Image alt="A private consultation room at ALPHA X" fill sizes="(max-width: 991px) 100vw, 48vw" src="/assets/hero-brand-advisory.jpg" />
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
          <Image alt="" data-reveal="zoom" fill sizes="100vw" src="/assets/hero-marine.jpg" />
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
          <div className="footer__brand">
            <Image alt="ALPHA X" height={28} src={logo} width={130} />
            <p>Wealth with Passion.</p>
            <div className="footer__security">
              <ShieldCheck aria-hidden="true" />
              <span>Part of SCBX</span>
            </div>
          </div>

          <nav aria-label="Products">
            <p className="eyebrow muted">Our products</p>
            {expertise.map((item) => (
              <Link href="/#expertise" key={item.title}>
                {item.title}
              </Link>
            ))}
          </nav>

          <nav aria-label="Footer navigation">
            <p className="eyebrow muted">Company</p>
            <Link href="/#expertise">Expertise</Link>
            <Link href="/#about">About</Link>
            <Link href="/club">Alpha X Club</Link>
            <Link href="/#contact">Contact</Link>
          </nav>

          <address className="footer__contact">
            <p className="eyebrow muted">Contact</p>
            <p>
              888 Soi Lat Phrao 112, Khwaeng Phlabphla,
              <br />
              Wangthonglang, Bangkok 10310, Thailand
            </p>
            <a href="tel:+6620095200">
              <Phone aria-hidden="true" /> 02 009 5200
            </a>
            <a href="mailto:contact@alphaxclub.com">contact@alphaxclub.com</a>
            <div className="footer__social">
              {socials.map((social) => (
                <a aria-label={social.label} href={social.href} key={social.label} rel="noreferrer" target="_blank">
                  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </address>
        </div>
        <div className="shell footer__bottom">
          <span>© 2026 ALPHA X</span>
          {/* ข้อความบังคับของผู้ให้สินเชื่อไทย — เว็บจริงขึ้นไว้ท้ายหน้าเหมือนกัน */}
          <span>Borrow only what you need and can repay · Effective rate 4%–12% p.a.</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>
    </main>
  )
}
