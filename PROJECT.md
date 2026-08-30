# Alpha X — Pitch Deck + Vercel Demo

> Working brief · vault index: `~/Documents/tanplanet/01 Projects/2026-alphax.md`
> Deadline: **5 ก.ย. 2026** · review กับ CFW ทุกสัปดาห์

## ดีล

- แทนรับ sub **UX/UI ทั้งหมด** จาก Code for Wife (หมิง + ไชน่า) — 30,000 บาท (มัดจำ 5,000 รับแล้ว · 25,000 เมื่อ pitch ชนะ)
- CFW เอางานนี้ไป **bidding แข่งกับบริษัทอื่น** เพื่อชิงงาน revamp www.alphaxclub.com
- เป้าหมายของงาน = **ทำให้ Alpha X เลือก CFW** ไม่ใช่ทำเว็บให้เสร็จ

## Deliverables

### 1. Pitch Deck (ทำใน Figma — เปลี่ยนวิธี 30 ส.ค. 2026)

เดิมเป็น `deck/deck.html` + export PNG — **ลบออกจาก repo แล้ว** เพราะจัด layout ใน Figma เร็วกว่าไล่แก้ HTML แล้ว re-export

- **เนื้อหา + สเปคทุกสไลด์:** `brief/deck-spec.md` — frame 1920×1080, token สี/ฟอนต์/type scale, copy ครบ 11 สไลด์, รายการ placeholder ที่ยังรอข้อมูล
- ปลายทางเดิมยังใช้ได้: [Google Slides](https://docs.google.com/presentation/d/1EDWQEQJYcsSbU3DSlH0KT0r8_xU3mAfaX52B2JFvlSk/edit) · [Drive — AlphaX Deck Assets](https://drive.google.com/drive/folders/1cjHvQbKdd3ynzMvzjGUS1Xm1F6DDGvgv)
- screenshot เว็บปัจจุบันสำหรับสไลด์ before/after: `brief/assets/current-site.png`

### 2. Vercel Demo — "หน้าบังหน้า กดได้จริง"

- Next.js + Tailwind (stack เดียวกับที่เสนอลูกค้า = proof ไปในตัว) · โฟลเดอร์ `demo/`
- ทำจริง: **Home** (hero cinematic + expertise trifold + What's Trending) + **Alpha X Club hub** (magazine grid)
- หน้าที่เหลือ: placeholder สวย ๆ ให้ nav กดแล้วไม่ตัน
- Mobile first 393 → 768 → 1440 · WCAG AA

## 🚫 กฎเหล็ก: ห้าม AI Slop (concern อันดับ 1 ของแทน)

> ทุกสไลด์/ทุกหน้า demo ต้อง**ดูไม่ออกว่าทำด้วย AI** — นี่คือแบรนด์ของคนระดับร้อยล้านพันล้าน จับได้ = แพ้ bidding

- **Typography คือด่านแรก:** ฟอนต์แบรนด์จริง (ALPHA X) + serif เบา ≤500 + tracking — ห้ามหัวหนาดำทุกหัว, ห้ามหน้าตา template
- **Layout:** asymmetric editorial grid — **ห้าม**การ์ด 3 ใบเท่ากันกลางจอซ้ำทุกสไลด์, whitespace ใจกว้าง, จังหวะแต่ละสไลด์ไม่ซ้ำกัน
- **ห้ามเด็ดขาด:** gradient ม่วง/ฟ้า, glassmorphism, มุมโค้งทั่วจอ, อีโมจิ, เงา default, icon โปรยเยอะ, bullet ยิงรัว
- **Icon = lucide (SVG import) เท่านั้น** — ห้ามอีโมจิ ห้ามวาด SVG เอง · สัญลักษณ์ตัวอักษร (★ ● ○) ที่ใช้ชั่วคราวใน skeleton ให้เปลี่ยนเป็น lucide ในรอบ visual
- **รูปจาก AI ต้อง art-direct:** โทน photographic จริง (grain, แสงไม่เพอร์เฟกต์) + เกรดสีเข้าชุดเดียวกันทุกภาพ — ห้ามปล่อยผิว plastic ดิบ ๆ · ภาพไหนดู AI ชัด = gen ใหม่หรือตัดทิ้ง
- **Copy แบบ strategist:** ประโยคสั้น มั่นใจ ไม่มี cliché ("ยกระดับ/ปลดล็อก/ไร้รอยต่อ") ไม่มี exclamation
- **ใส่ร่องรอย craft:** motif เส้น slash แดงจากโลโก้เป็น graphic device, ลาย lattice จาก stationery, ระบบเลขหน้า 00–04, รายละเอียดที่ template ไม่มี
- QA สุดท้ายก่อนส่ง: ไล่ดูทีละสไลด์แล้วถามว่า "ถ้าเห็นใน Behance จะเชื่อไหมว่า studio ทำ" — ไม่ผ่าน = แก้
- **ห้ามเปิดครัว:** ทุกสิ่งที่คนอื่นเห็น (progress.html, deck, demo) ห้ามเอ่ยชื่อเครื่องมือ AI / แหล่ง template — พูดแค่ผลงานและสถานะ · รายละเอียดเครื่องมืออยู่เฉพาะไฟล์ internal (PROJECT.md, brief/research-templates.md)
- **ห้าม wall of text:** ทุกสไลด์/ทุก section ต้องมีจังหวะเน้น — highlight คำสำคัญ (สี/serif italic/ตัวเลขใหญ่), ใช้ wordmark ALPHA X ประกอบหัวข้อ, ย่อหน้าไม่เกิน 2–3 บรรทัด, ตัวเลข/keyword ดึงออกมาเป็น display ไม่ฝังในพารากราฟ

### ภาษาภาพของเล่ม (จาก brand presentation template — ดูหน้า 14–15 ใน proposal)
- **X-motif**: ระนาบ/เส้นเฉียงตัดกันเป็นตัว X (แดงเข้ม + กระจกเงิน โปร่งแสง) มุมสไลด์
- **แสง**: red radial glow นุ่ม ๆ หลัง subject บนพื้นดำ
- **รูปจริงเป็นหลัก**: photography ขาวดำ/เกรดเข้ม (สถาปัตยกรรม, รถ, ถนน)
- **เส้น hairline แดง** คาดใต้แถบหัวทุกสไลด์เนื้อหา + wordmark มุมสไลด์
- **หัวเรื่อง serif แดง/ขาว + เลขลำดับ 01. 02. serif แดง**
- เดิมเป็น CSS utility ใน deck.html (`.glow / .diag-red / .diag-glass / .xline`) — ตอนนี้ทำเป็น layer/component ใน Figma แทน · เวอร์ชันที่ใช้จริงบนเว็บอยู่ที่ `.x-mark` ใน demo

**สัดส่วน layout ต้นแบบ (2 หน้าที่แทนชี้ว่า "แบ่งสัดส่วนดีมาก"):**
- **แบบ TOC**: เนื้อหา 2/3 (heading serif แดงใหญ่บนซ้าย + รายการเลข `01.` serif แดง จัด 2×2, คำอธิบายสั้น) : ภาพจริง 1/3 เต็มคอลัมน์ขวา · wordmark+เส้นแดงคาดบน
- **แบบ Contact**: ครึ่งบน = heading serif ซ้าย : ตาราง label(caps เทา)→value(ขาว) ขวา · ครึ่งล่าง = ภาพ silhouette + red glow กินเต็มความกว้าง
- หลักร่วม: แบ่งจอเป็นสัดส่วนใหญ่ชัด ๆ (2/3:1/3 หรือ บน:ล่าง) ไม่หั่นจอเป็นการ์ดย่อยเยอะ ๆ · ให้ negative space ทำงาน

## Design System (ทิศทางเริ่มต้น — รอ confirm CI กับ CFW)

- **ยึด proposal 8 July**: ดำ + **red X accent** (ตรงโลโก้) · gold เป็น accent รองใน Club hub
- โทน: dark-mode cinematic · editorial typography (serif display + sans body, TH/EN)
- ทุกอย่างประกาศใน `tokens.css` ไฟล์เดียว — deck และ demo import ร่วมกัน · ระบบสีใช้ **OKLCH**
- กฎ vault: tokens ห้ามใช้ข้าม project

## แผนสัปดาห์ (ปรับ 26 ส.ค. — Demo-first)

- **26–29 ส.ค.**: build Home + Alpha X Club + navigation/placeholder → responsive → ขึ้น Vercel
- **30 ส.ค.**: review CFW ครั้งแรกด้วย demo ที่กดได้จริง
- **31 ส.ค.**: แก้ feedback และ lock demo
- **1–2 ก.ย.**: ลง visual deck 12 สไลด์ โดยใช้ screenshot และ URL จาก demo จริง
- **3 ก.ย.**: QA สองชั้น + export Google Slides
- **4 ก.ย.**: buffer + ซ้อม pitch
- **5 ก.ย.**: ส่งมอบ

## วัตถุดิบ

- `brief/proposal.pdf` — brand persona, moodboard, stationery 3 options, presentation template (ตัวอย่าง tone deck)
- `brief/sitemap-2026.pdf` — requirement + sitemap + spec รายหน้า + timeline
- `brief/techstack.pdf` — architecture + งบ
- เว็บเดิม www.alphaxclub.com — แคป screenshot ทำ before/after
- รูปประกอบ (hero/moodboard/mockup) — **gen ด้วย Magnific** เก็บลง `deck/assets/`
- **ฟอนต์แบรนด์จริง "ALPHA X"** (TypeK Foundry, ไทยครบ) — ดึงจากเว็บเขาแล้ว → `fonts/` · โลโก้จริง → `deck/assets/alpha-x-logo.png` · แดงแบรนด์จริง **#E4002D** (ดูดจากโลโก้)
- เว็บปัจจุบันเป็น **Next.js อยู่แล้ว** (`/_next/static/`) — จุดขายเวลา pitch stack ต่อเนื่อง
- ข้อมูลบริษัท (SCBX, เป้าพอร์ต 20,000 ลบ., 3 persona) — ดู vault index

## กติกาประจำโปรเจกต์

- **เริ่มงานทุกครั้ง: รัน dev server** — `bun serve.ts` (background) → http://localhost:4321 (progress) · live reload อัตโนมัติ · พอร์ตชน: `lsof -ti:4321 | xargs kill`
- **ทุก session ต้องอัปเดต `progress.html`** — อัปเดตวันที่/สถานะ, timeline, checklist และเพิ่ม Session Log ใหม่บนสุด · ใช้เปิดใน weekly meeting กับ CFW

## QA ก่อนส่ง

- Deck + demo ผ่าน 2-layer QA: `/web-design-guidelines` → `/html-qa-gate`
- Demo: contrast 4.5:1 · touch target ≥44px · ไม่มี horizontal scroll
