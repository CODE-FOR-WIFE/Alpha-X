'use client'

import { ArrowDown, Pause, Phone, Play } from 'lucide-react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

// Each story owns a moving video, portrait version, and matching first-frame poster.
// Build media with scripts/build-hero-clips.sh. Advance only when playback ends.
// Six lifestyle stories: car, yacht, aircraft, property, watch and art.
const slides = [
  {
    media: 'automotive',
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
    media: 'marine',
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
    media: 'aircraft',
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
    media: 'property',
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
    category: 'Watch Collection',
    media: 'watch',
    product: 'Luxury Watch',
    lede: 'For those who recognise the extraordinary in every detail. Exceptional timepieces, chosen with passion and held across generations.',
    title: (
      <>
        Precision,
        <br />
        <em>Preserved</em>
      </>
    ),
  },
  {
    category: 'Art Collection',
    media: 'art',
    product: 'Art',
    lede: 'An eye for the exceptional. A connection that deepens with every work. Art collected with conviction, and a legacy shaped by you.',
    title: (
      <>
        A life
        <br />
        <em>Curated</em>
      </>
    ),
  },
]

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

function subscribeViewport(callback: () => void) {
  const query = window.matchMedia('(max-width: 767px)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [failed, setFailed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [explicitPlay, setExplicitPlay] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [revision, setRevision] = useState(0)
  const video = useRef<HTMLVideoElement>(null)
  const reducedMotion = useSyncExternalStore(subscribeMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches, () => true)
  const mobile = useSyncExternalStore(subscribeViewport,
    () => window.matchMedia('(max-width: 767px)').matches, () => false)
  const shouldPause = paused || (reducedMotion && !explicitPlay)
  const playbackWanted = useRef(false)

  const startPlayback = (element: HTMLVideoElement) => {
    // Safari needs the DOM properties set as well as the muted attribute.
    element.muted = true
    element.defaultMuted = true
    element.play().catch((error: DOMException) => {
      // A source switch or pause normally aborts the previous play promise.
      // It must never pause the next story or poison its autoplay state.
      if (error.name === 'AbortError' || video.current !== element || !playbackWanted.current) return
      setBlocked(true)
    })
  }

  useEffect(() => {
    const element = video.current
    if (!element) return
    playbackWanted.current = !shouldPause
    if (shouldPause) element.pause()
    else startPlayback(element)
    return () => { playbackWanted.current = false }
  }, [index, shouldPause, revision, mobile])

  const active = slides[index]
  const mediaVersion = active.media === 'art' ? '20261011-art-renaissance' : '20261011-luxury'

  const goTo = (i: number, selected = false) => {
    // Selecting a story is an explicit request to play, even after a pause/error.
    if (selected) { setExplicitPlay(true); setPaused(false) }
    setProgress(0)
    setFailed(false)
    setBlocked(false)
    setIndex(i)
    setRevision((value) => value + 1)
  }

  return (
    <section aria-label="Featured" aria-roledescription="carousel" className={`hero section-dark${active.media === 'art' ? ' hero--art' : ''}`}>
      <div className="hero__visual" aria-hidden="true">
        <video
          key={`${active.media}-${revision}-${mobile}`}
          src={`/assets/hero-${active.media}${mobile ? '-mobile' : ''}.mp4?v=${mediaVersion}`}
          autoPlay={!shouldPause}
          muted
          onCanPlay={(e) => {
            if (!shouldPause) startPlayback(e.currentTarget)
          }}
          onPlaying={() => setBlocked(false)}
          onEnded={() => { if (!shouldPause) goTo((index + 1) % slides.length) }}
          onTimeUpdate={(e) => {
            const { currentTime, duration } = e.currentTarget
            setProgress(duration > 0 ? currentTime / duration : 0)
          }}
          onError={(e) => {
            if (e.currentTarget !== video.current || !e.currentTarget.error) return
            setFailed(true)
            setPaused(true)
          }}
          playsInline
          poster={`/assets/hero-${active.media}-poster.jpg?v=${mediaVersion}`}
          preload="auto"
          ref={video}
        />
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
                onClick={() => goTo(i, true)}
                type="button"
              >
                <span className="hero__pager-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="hero__pager-track">
                  <span style={{ width: `${i === index ? progress * 100 : 0}%` }} />
                </span>
              </button>
            ))}
            <button
              className="hero__playback"
              aria-label={shouldPause || blocked ? 'Play featured video' : 'Pause featured video'}
              onClick={() => {
                const resume = shouldPause || blocked
                setExplicitPlay(true)
                setBlocked(false)
                if (failed) { video.current?.load(); setFailed(false) }
                setPaused(!resume)
                playbackWanted.current = resume
                if (resume && video.current) startPlayback(video.current)
                else video.current?.pause()
              }}
              type="button"
            >
              {shouldPause || blocked ? <Play size={16} /> : <Pause size={16} />}
            </button>
          </div>
          {failed && <p role="status">Video unavailable. Choose another story or press play to retry.</p>}
        </div>
      </div>

      <a className="hero__scroll" href="#expertise">
        Explore <ArrowDown aria-hidden="true" />
      </a>
    </section>
  )
}
