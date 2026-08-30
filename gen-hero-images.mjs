#!/usr/bin/env node
// สร้างรูป hero 3 หมวดด้วย OpenAI Images API
//
//   1) ใส่คีย์ลงไฟล์ .env.local ที่ root ของ repo (gitignore แล้ว):  OPENAI_API_KEY=sk-...
//   2) node --env-file=.env.local gen-hero-images.mjs
//      เจาะจงบางตัว:  node --env-file=.env.local gen-hero-images.mjs marine collectible
//
// ponytail: ไม่ลง SDK — endpoint เดียว fetch พอ, --env-file เป็นของ node เองไม่ต้องพึ่ง dotenv

import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const OUT_DIR = join(import.meta.dirname, 'demo/public/assets')
const MODEL = process.env.IMAGE_MODEL || 'gpt-image-2'

// art direction ของรูป hero — ล็อกให้ทุกใบดูเป็นชุดเดียวกัน ไม่ใช่คนละเว็บ
const HERO = [
  'Ultra-premium automotive-grade studio photography, cinematic and moody.',
  'Near-black environment (#050507), deep shadows swallowing most of the frame.',
  'Single crimson red rim light (#e4002d) tracing the subject silhouette as the only colour accent.',
  'Wet polished dark floor with subtle specular reflections beneath the subject.',
  'Subject sits in the RIGHT 55% of the frame; the LEFT 40% is near-empty darkness reserved for headline text.',
  'Wide cinematic framing, shallow depth of field, fine film grain, no lens flare.',
  'Absolutely no text, no lettering, no logos, no watermarks, no people, no visible branding.',
].join(' ')

// รูปบทความ (club / what's trending) คนละ register กับ hero: ไม่ใช่ product shot
// จัดกลางเฟรมเพราะการ์ดมีตัวหนังสืออยู่ใต้รูป ไม่ต้องเว้นที่ว่างให้ headline ทับ
const STORY = [
  'Editorial photography for a luxury lifestyle magazine, cinematic and restrained.',
  'Near-black scene (#050507), deep shadows, one soft pool of light on the subject.',
  'A single restrained crimson (#e4002d) accent somewhere in frame, never dominant.',
  'Centred composition with generous negative space, wide 16:9 crop.',
  'Shallow depth of field, fine film grain, no lens flare.',
  'Absolutely no text, no lettering, no logos, no watermarks, no visible branding.',
].join(' ')

// 5 หมวดตาม sitemap หน้า 02 Our Products — Car / Yacht-River Boat / Aircraft / Property / Gold
// (bigbike เก็บไว้เฉย ๆ ไม่มีใน sitemap แล้ว ไม่ได้ใช้ใน hero)
const SUBJECTS = {
  automotive: [HERO,
    'A low-slung modern luxury sports coupe seen from a low three-quarter rear angle, sculpted body panels catching a thin red light line along the roof and shoulder.'],
  bigbike: [HERO,
    'A premium large-displacement sport touring motorcycle standing at a three-quarter front angle, fuel tank and fairing edged by a thin red light line, wheel rim and exhaust catching faint highlights.'],
  marine: [HERO,
    'A sleek dark superyacht cutting through still black water at night, its bow and superstructure edged by a thin red light line, empty sky with no aircraft.'],
  aircraft: [HERO,
    'A private business jet parked on a dark wet apron at night seen from a low three-quarter front angle, fuselage and winglet edged by a thin red light line, airstair down, no ground crew and no other aircraft.'],
  property: [HERO,
    'A modern hillside villa at night seen from outside across a still black infinity pool, one warm interior glow behind full-height glass, roofline edged by a thin red light line, no people.'],
  gold: [HERO,
    'A precise stack of cast gold bullion bars on a dark polished stone surface, one thin red light line raking across the top bar, everything else falling into deep shadow, no text or stamps on the metal.'],

  // บทความ — ชื่อไฟล์ต้องตรงกับ key ใน stories/insights
  'story-collector': [STORY,
    'A still life of rare collected objects resting on a dark walnut surface: an open mechanical wristwatch showing its movement, a cut gemstone and a folded pair of reading glasses, lit by one narrow beam from the side.'],
  'story-explorer': [STORY,
    'An empty mountain road curving away into darkness at night, wet asphalt reflecting a single distant pair of red tail lights, mist over the ridgeline, no other vehicles.'],
  'story-connoisseur': [STORY,
    'An extreme close-up of a single crystal decanter and one glass on a dark stone counter, amber liquid catching a thin sliver of light, everything else falling into shadow.'],
  'story-provenance': [STORY,
    'A classic vintage grand tourer under a dust sheet pulled halfway back inside a dark private garage, chrome trim and one headlamp catching a shaft of light from a high window.'],

  // section เนื้อหา (ไม่ใช่ product / ไม่ใช่บทความ)
  'brand-advisory': [STORY,
    'Two empty leather armchairs facing each other across a small dark marble table in a private consultation room at night, a single low lamp between them, floor-to-ceiling window showing a blurred city far below.'],
  'brand-film': [STORY,
    'A wide cinematic film still: a dark luxury coupe alone on a wet empty road at night seen from far away, headlights off, a thin red light line along its silhouette, vast empty darkness around it.'],
}

const key = process.env.OPENAI_API_KEY
if (!key) {
  console.error('ไม่พบ OPENAI_API_KEY — ใส่คีย์ใน .env.local แล้วรันด้วย: node --env-file=.env.local gen-hero-images.mjs')
  process.exit(1)
}

const wanted = process.argv.slice(2)
const targets = wanted.length ? wanted : Object.keys(SUBJECTS)
const unknown = targets.filter((t) => !SUBJECTS[t])
if (unknown.length) {
  console.error(`ไม่รู้จักหมวด: ${unknown.join(', ')} — เลือกจาก ${Object.keys(SUBJECTS).join(', ')}`)
  process.exit(1)
}

for (const name of targets) {
  const [direction, subject] = SUBJECTS[name]
  const prompt = `${subject} ${direction}`
  process.stdout.write(`${name} … `)

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      size: '1536x1024', // landscape ที่ใหญ่สุด
      quality: 'high',
      n: 1,
    }),
  })

  if (!res.ok) {
    console.error(`\nพัง (${res.status}): ${await res.text()}`)
    process.exit(1)
  }

  const { data } = await res.json()
  const png = join(OUT_DIR, `hero-${name}.png`)
  writeFileSync(png, Buffer.from(data[0].b64_json, 'base64'))

  // แปลงเป็น jpg ด้วย sips (มากับ macOS) — PNG ภาพถ่ายขนาดนี้ ~3MB ต่อใบ หนักเกินสำหรับ hero
  // ถ้าไม่ใช่ mac ก็ปล่อยเป็น png ไป แล้วแก้ path ใน hero-carousel.tsx เอง
  try {
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', png, '--out', join(OUT_DIR, `hero-${name}.jpg`)], { stdio: 'ignore' })
    execFileSync('rm', [png])
    console.log(`→ demo/public/assets/hero-${name}.jpg`)
  } catch {
    console.log(`→ demo/public/assets/hero-${name}.png (ไม่มี sips เลยไม่ได้แปลงเป็น jpg)`)
  }
}

console.log('\nเสร็จ — รูปพร้อมใช้แล้ว ต่อไปแก้ path ใน demo/src/components/hero-carousel.tsx')
