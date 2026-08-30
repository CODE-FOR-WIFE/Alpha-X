'use client'

import { ArrowDown, Phone } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

/**
 * ponytail: crossfade ธรรมดา ไม่ลง scroll-snap/embla — hero มี 3 สไลด์ตายตัว
 * รูปทั้ง 3 gen จาก gpt-image-2 ผ่าน gen-hero-images.mjs ที่ root — art direction ล็อกให้เป็นชุดเดียวกัน
 * subject ถูกสั่งให้อยู่ขวาของเฟรม เพราะ .hero__shade ทับซ้ายมือไว้ที่ opacity 98% ให้ headline อ่านออก
 */
// 5 สินเชื่อตาม sitemap หน้า 02 Our Products — Car / Yacht-River Boat / Aircraft / Property / Gold
// (Big Bike ที่เคยอยู่ตรงนี้ไม่มีใน sitemap ของลูกค้า เอาออกแล้ว)
const slides = [
  {
    category: 'Vehicle Financing',
    product: 'Luxury Car',
    image: '/assets/hero-automotive.jpg',
    lede: 'Beyond wealth lies what moves you. We shape financial possibilities around the life, objects and experiences that matter most.',
    title: (
      <>
        Wealth with
        <br />
        <em>Passion</em>
      </>
    ),
  },
  {
    category: 'Marine Financing',
    product: 'Yacht / River Boat',
    image: '/assets/hero-marine.jpg',
    lede: 'Specialist structures for yachts and riverboats, arranged with the discretion a vessel of this order deserves.',
    title: (
      <>
        Beyond the
        <br />
        <em>Horizon</em>
      </>
    ),
  },
  {
    category: 'Aviation Financing',
    product: 'Aircraft',
    image: '/assets/hero-aircraft.jpg',
    lede: 'Private aviation financed for owners who measure distance in hours saved rather than miles travelled.',
    title: (
      <>
        Time, on
        <br />
        <em>Your Terms</em>
      </>
    ),
  },
  {
    category: 'Property Financing',
    product: 'Luxury Property',
    image: '/assets/hero-property.jpg',
    lede: 'Residences and landmark addresses held as part of a wider portfolio, structured without disturbing the rest of it.',
    title: (
      <>
        Address as
        <br />
        <em>Legacy</em>
      </>
    ),
  },
  {
    category: 'Gold-backed Finance',
    product: 'Gold-backed Finance',
    image: '/assets/hero-gold.jpg',
    lede: 'Liquidity released against gold you already hold—without giving up the position you took it for.',
    title: (
      <>
        Liquidity,
        <br />
        <em>Unbroken</em>
      </>
    ),
  },
]

const INTERVAL = 6500

export function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // เคารพ prefers-reduced-motion — ไม่เลื่อนเอง ให้ผู้ใช้กด dot แทน
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL)
    return () => clearInterval(id)
  }, [index])

  const active = slides[index]

  return (
    <section aria-label="Featured" aria-roledescription="carousel" className="hero section-dark">
      <div className="hero__visual" aria-hidden="true">
        {slides.map((slide, i) => (
          <Image
            alt=""
            className={i === index ? 'is-active' : undefined}
            fill
            key={slide.category}
            priority={i === 0}
            sizes="100vw"
            src={slide.image}
            style={{ objectPosition: '62% center' }}
          />
        ))}
        <div className="hero__shade" />
      </div>

      <div className="shell hero__copy">
        <p className="eyebrow">SCBX Private Financial Solutions</p>
        {/* key={index} = remount เพื่อให้ animation slide-in เล่นใหม่ทุกครั้งที่เปลี่ยนสไลด์ */}
        <div className="hero__slide" key={index}>
          <h1>{active.title}</h1>
          <p className="hero__lede">{active.lede}</p>
          {/* CTA คู่ตาม sitemap หน้า Home: Discover More ทอดสายตาลง Expertise · Contact Us ต่อสายตรง
              ประโยค "Beyond imagination. Beyond lifestyle." ที่ sitemap อยากได้ วางเป็นบรรทัดนำเหนือปุ่ม
              ไม่ยัดลงในปุ่ม — ปุ่มยาวเป็นประโยคอ่านยากและกดยากบนมือถือ */}
          <p className="hero__cta-line">Beyond imagination. Beyond lifestyle.</p>
          <div className="hero__cta">
            <a className="button" href="#expertise">
              Discover more <ArrowDown aria-hidden="true" />
            </a>
            <a className="button button--outline" href="tel:+6620095200">
              <Phone aria-hidden="true" /> Contact us
            </a>
          </div>
        </div>
        {/* ไม่ใช้ role=tablist — ไม่มี tabpanel จริง ARIA ผิดแย่กว่าไม่ใส่ ปุ่มธรรมดา + aria-current พอ */}
        <div aria-label="Choose a featured story" className="hero__pager" role="group">
          <p className="hero__pager-label">{active.product}</p>
          <div className="hero__pager-row">
            {slides.map((slide, i) => (
              <button
                aria-current={i === index || undefined}
                aria-label={`${slide.category} — ${slide.product}`}
                className={i === index ? 'is-active' : undefined}
                key={slide.category}
                onClick={() => setIndex(i)}
                type="button"
              >
                <span className="hero__pager-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="hero__pager-track">
                  {/* animationDuration ผูกกับ INTERVAL ตัวเดียวกับ setInterval — แถบวิ่งเต็มพอดีตอนสไลด์เปลี่ยน */}
                  <span style={{ animationDuration: `${INTERVAL}ms` }} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#expertise">
        Explore <ArrowDown aria-hidden="true" />
      </a>
    </section>
  )
}
