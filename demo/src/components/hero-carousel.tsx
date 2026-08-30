'use client'

import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

/**
 * ponytail: crossfade ธรรมดา ไม่ลง scroll-snap/embla — hero มี 3 สไลด์ตายตัว
 * รูปทั้ง 3 gen จาก gpt-image-2 ผ่าน gen-hero-images.mjs ที่ root — art direction ล็อกให้เป็นชุดเดียวกัน
 * subject ถูกสั่งให้อยู่ขวาของเฟรม เพราะ .hero__shade ทับซ้ายมือไว้ที่ opacity 98% ให้ headline อ่านออก
 */
// 3 ผลิตภัณฑ์จริงตาม alphaxclub.com — Vehicle / Motorcycle / Marine Financing
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
    category: 'Motorcycle Financing',
    product: 'Big Bike',
    image: '/assets/hero-bigbike.jpg',
    lede: 'Financing built for the machines that turn an ordinary road into the reason you left the house at all.',
    title: (
      <>
        Freedom in
        <br />
        <em>Motion</em>
      </>
    ),
  },
  {
    category: 'Marine Financing',
    product: 'Yacht / Riverboat',
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
