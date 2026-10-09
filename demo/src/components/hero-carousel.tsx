'use client'

import { ArrowDown, Phone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/**
 * ponytail: วิดีโอ (hero.mp4 desktop / hero-mobile.mp4 แนวตั้ง — render ด้วย scripts/build-hero-video.sh) ต่อ 5 ช็อตเรียงตาม slides ช็อตละ SLIDE วินาที
 * crossfade อบในไฟล์แล้ว — ข้อความอ่าน index จาก currentTime ไม่มี timer แยก เลยไม่มีทางหลุดจังหวะกับภาพ
 * ความมืดฝั่งซ้ายมาจาก .hero__shade ทับอยู่ ไม่ได้อบลงวิดีโอ — ปรับใน CSS ได้โดยไม่ต้อง render ใหม่
 * ฟุตเทจ: Car/Aircraft/Property จาก Magnific Stock, Yacht/Gold จาก Mixkit (free license) — ไฟล์ดิบอยู่ footage/raw (gitignored)
 */
// 5 สินเชื่อตาม sitemap หน้า 02 Our Products — Car / Yacht-River Boat / Aircraft / Property / Gold
// (Big Bike ที่เคยอยู่ตรงนี้ไม่มีใน sitemap ของลูกค้า เอาออกแล้ว)
const slides = [
  {
    category: 'Vehicle Financing',
    product: 'Luxury Car',
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

// ต้องตรงกับ offset ของ xfade ตอน render hero.mp4 (ช็อตละ 6.5 วิ, fade 1 วิ)
const SLIDE = 6.5
const INTERVAL = SLIDE * 1000

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // เคารพ prefers-reduced-motion — ไม่เล่นเอง ค้างที่ poster ให้ผู้ใช้กดเลขเลือกช็อตแทน
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.current?.play().catch(() => {})
  }, [])

  const active = slides[index]

  const goTo = (i: number) => {
    // +1 ข้ามช่วง crossfade ไปลงภาพเต็มของช็อตนั้นเลย
    if (video.current) video.current.currentTime = i * SLIDE + 1
    setIndex(i)
  }

  return (
    <section aria-label="Featured" aria-roledescription="carousel" className="hero section-dark">
      <div className="hero__visual" aria-hidden="true">
        <video
          loop
          muted
          // -0.5 = เปลี่ยนข้อความกลางช่วง fade 1 วิ ไม่ใช่ตอนเริ่ม (ไม่งั้นข้อความนำภาพไปครึ่งวิ)
          onTimeUpdate={(e) =>
            setIndex(Math.min(slides.length - 1, Math.max(0, Math.floor((e.currentTarget.currentTime - 0.5) / SLIDE))))
          }
          playsInline
          poster="/assets/hero-poster.jpg"
          preload="auto"
          ref={video}
        >
          {/* มือถือได้ไฟล์ตัดแนวตั้งแยก (~6MB) — คมกว่าให้ CSS crop จากไฟล์ 16:9 และเบากว่าครึ่งหนึ่ง
              เบราว์เซอร์เลือก source ตอนโหลดครั้งเดียว หมุน/ย่อจอทีหลังไม่สลับไฟล์ ซึ่งไม่เป็นไรเพราะ cover ทั้งคู่ */}
          <source media="(max-width: 767px)" src="/assets/hero-mobile.mp4" type="video/mp4" />
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
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
                onClick={() => goTo(i)}
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
