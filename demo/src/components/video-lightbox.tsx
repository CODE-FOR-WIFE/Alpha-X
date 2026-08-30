'use client'

import { CirclePlay, X } from 'lucide-react'
import { useRef, useState } from 'react'

const YOUTUBE_ID = 'urcyojOfou0'

/**
 * ponytail: <dialog showModal()> ของ browser เอง — ได้ Esc ปิด, focus trap, inert หลังฉาก
 * และ ::backdrop มาให้ฟรี ไม่ต้องลง modal library หรือเขียน keydown handler เอง
 *
 * วิดีโอเป็น YouTube embed: mount iframe เฉพาะตอนเปิด แล้ว unmount ตอนปิด
 * — วิธีนี้ทำให้ปิดแล้ววิดีโอหยุดเองโดยไม่ต้องยิง postMessage คุย YouTube API
 *   และหน้า Home ไม่ต้องโหลดสคริปต์ของ YouTube เลยจนกว่าจะมีคนกดเล่น
 */
export function VideoLightbox() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [playing, setPlaying] = useState(false)

  // ไม่พึ่ง event 'close' — เบราว์เซอร์ที่เทสต์ไม่ยิงให้ (แต่ 'cancel' ตอนกด Esc ยิงปกติ)
  // เลยรวม cleanup ไว้ที่ฟังก์ชันเดียวแล้วเรียกจากทุกทางที่ปิดได้แทน
  const close = () => {
    dialog.current?.close()
    document.body.style.overflow = ''
    setPlaying(false)
  }

  return (
    <>
      <button
        aria-label="Play the ALPHA X story"
        className="film__play"
        onClick={() => {
          dialog.current?.showModal()
          document.body.style.overflow = 'hidden'
          setPlaying(true)
        }}
        type="button"
      >
        <CirclePlay aria-hidden="true" />
        <span>Discover the ALPHA X story</span>
      </button>

      <dialog
        aria-label="The ALPHA X story"
        className="lightbox"
        // padding ของ dialog = 0 ทำให้ target ตรงกับตัว dialog เฉพาะตอนคลิกโดน backdrop เท่านั้น
        onCancel={close}
        onClick={(e) => e.target === dialog.current && close()}
        ref={dialog}
      >
        <div className="lightbox__bar">
          <button aria-label="Close video" onClick={close} type="button">
            <X aria-hidden="true" />
          </button>
        </div>
        {playing && (
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
            title="The ALPHA X story"
          />
        )}
      </dialog>
    </>
  )
}
