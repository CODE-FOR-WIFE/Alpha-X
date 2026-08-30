'use client'

import { CirclePlay, X } from 'lucide-react'
import { useRef } from 'react'

/**
 * ponytail: <dialog showModal()> ของ browser เอง — ได้ Esc ปิด, focus trap, inert หลังฉาก
 * และ ::backdrop มาให้ฟรี ไม่ต้องลง modal library หรือเขียน keydown handler เอง
 */
export function VideoLightbox() {
  const dialog = useRef<HTMLDialogElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  // ไม่พึ่ง event 'close' — เบราว์เซอร์ที่เทสต์ไม่ยิงให้ (แต่ 'cancel' ตอนกด Esc ยิงปกติ)
  // เลยรวม cleanup ไว้ที่ฟังก์ชันเดียวแล้วเรียกจากทุกทางที่ปิดได้แทน
  const close = () => {
    dialog.current?.close()
    document.body.style.overflow = ''
    const v = video.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }

  return (
    <>
      <button
        aria-label="Play the ALPHA X story"
        className="film__play"
        onClick={() => {
          dialog.current?.showModal()
          document.body.style.overflow = 'hidden'
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
        <video controls poster="/assets/hero-automotive.jpg" preload="none" ref={video}>
          <source src="/assets/alpha-x-story.mp4" type="video/mp4" />
        </video>
      </dialog>
    </>
  )
}
