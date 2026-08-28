'use client'

import { useEffect } from 'react'

/**
 * Scroll reveal ตาม motion spec ของโปรเจกต์:
 *   duration 1000ms · easing ease-out-quart · เล่นครั้งเดียวตอน element เข้า viewport จากด้านล่าง
 * ponytail: observer ตัวเดียวจับ [data-reveal] ทั้งหน้า ไม่ต้อง wrap ทีละ element
 */
export function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          io.unobserve(entry.target) // ไม่เล่นย้อนกลับ — ยิงครั้งเดียวจบ
        }
      },
      { threshold: 0 },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
