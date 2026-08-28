# Alpha X — Pitch Deck + Vercel Demo

> Working brief · vault index: `~/Documents/tanplanet/01 Projects/2026-alphax.md`
> Deadline: **5 ก.ย. 2026** · review กับ CFW ทุกสัปดาห์

## ดีล

- แทนรับ sub **UX/UI ทั้งหมด** จาก Code for Wife (หมิง + ไชน่า) — 30,000 บาท (มัดจำ 5,000 รับแล้ว · 25,000 เมื่อ pitch ชนะ)
- CFW เอางานนี้ไป **bidding แข่งกับบริษัทอื่น** เพื่อชิงงาน revamp www.alphaxclub.com
- เป้าหมายของงาน = **ทำให้ Alpha X เลือก CFW** ไม่ใช่ทำเว็บให้เสร็จ

## Deliverables

### 1. Pitch Deck (HTML app ไฟล์เดียว → export PNG → Google Slides)

ไฟล์: `deck/deck.html` — **ทุกสไลด์อยู่ไฟล์เดียว** (`<section>` ละสไลด์, เวที 1920×1080)

**Controller (แถบล่าง ซ่อนตัวเองตอน export):**
- สลับหน้า: ปุ่ม ‹ › + คีย์บอร์ด ←/→ + ตัวเลข `3/11` + deep-link `#3` (ให้ headless เรียกทีละหน้าได้)
- **Export PNG** หน้าปัจจุบัน @2x (3840×2160) — ใช้ modern-screenshot (SVG foreignObject — รองรับ oklch + ฟอนต์ custom ที่ html2canvas ไม่รองรับ)
- ปุ่ม **Open Google Slides** — ฝัง URL นี้: https://docs.google.com/presentation/d/1EDWQEQJYcsSbU3DSlH0KT0r8_xU3mAfaX52B2JFvlSk/edit
- โฟลเดอร์ Drive เก็บรูป: https://drive.google.com/drive/folders/1cjHvQbKdd3ynzMvzjGUS1Xm1F6DDGvgv ("AlphaX — Deck Assets")
- Fallback คุณภาพสูงสุด: `deck/export-all.sh` วน headless Chrome แคปทุกหน้าจาก `#1..#N`

หมายเหตุ: `01-cover.html` เดิมจะถูก merge เข้า deck.html เป็น section แรกแล้วลบทิ้ง

**โครงต่อสไลด์ (สถานะ: ✅ เคาะแล้ว รอ build):**

**S1 — Cover** *(ดีไซน์เสร็จแล้วใน 01-cover.html รอ merge)*
Layout: hero image ขวา + gradient กลืนดำซ้าย · โลโก้จริงบนซ้าย · eyebrow + "Wealth with *Passion*" (serif, italic ทอง) + sub ไทย · footer CFW/วันที่

**S1.5 — Who We Are (Code for Wife)** *(เพิ่ม 24 ส.ค. — รวมเป็น 12 สไลด์)*
Layout: intro บริษัท — positioning + "ไม่ทิ้งกันหลังส่งมอบ" (โยงแพ็กเกจ MA) + บริการ 3 แถว · รอจาก CFW: โลโก้ลูกค้า/ผลงาน + รายชื่อทีม+role

**S2 — Why Revamp (before → after)**
Layout: จอแยกซ้าย-ขวา · ซ้าย "TODAY" = screenshot เว็บเดิมบนการ์ดสว่าง + 3 pain (โทนลีสซิ่ง / product-first / ไม่สะท้อน HNWI) · ขวา "VISION" = crop mockup ใหม่บนดำ + 3 gain · แถบล่าง: บริบทธุรกิจ — เป้าพอร์ต 20,000 ลบ. + แผน IPO 4–5 ปี = แบรนด์ต้องพร้อมก่อน
Asset: screenshot เว็บเดิม (แคปเอง) + crop จาก S7

**S3 — ลูกค้า 3 กลุ่ม (ใช้ persona ที่ Alpha X ประกาศเอง)**
Layout: 3 คอลัมน์เท่ากัน — Passion Investment / Early Adopters / Symbol of Success · แต่ละคอลัมน์: ชื่อ (serif) → insight 1 บรรทัด → "เว็บใหม่ให้อะไร" → map ไป section (Club hub / digital experience / Products) · เส้นเชื่อมลง sitemap
Icon: lucide (import lib — ห้ามวาดเอง/ห้ามอีโมจิ)

**S4 — Brand Persona & Mood**
Layout: แบบหน้า BRAND PERSONA ใน proposal — 3 ภาพ portrait เรียงแถว ทับคำ PRESTIGE / TRUSTWORTHY / EFFORTLESS · บนขวา: brand statement 2 บรรทัด · ล่าง: brand values 4 คำ (Passion·Expertise·Exclusivity·Trust)
Asset: gen Magnific 3 ภาพ (lobby หรู / handshake ขาวดำ / หนัง+กาแฟ effortless)

**S5 — Design System (จุดขายหลัก — สไลด์เดียวที่แน่นได้)**
Layout: 2 โซน · ซ้าย Foundations: จานสี oklch (swatch + ชื่อ token), type specimen 3 เสียง (ALPHA X font จริง + Playfair/Trirong โชว์ ไทย/EN), spacing scale แท่งไล่ระดับ · ขวา Components: ปุ่ม 3 แบบ × states (default/hover/disabled), การ์ด, input, chip — **render สดจาก tokens.css ไม่ใช่รูป**
Punchline: "แก้ token ตัวเดียว ทั้งเว็บเปลี่ยนตาม"

**S6 — Sitemap 5 หน้า**
Layout: tree แนวนอน (CSS grid boxes) — root alphaxclub.com → 5 ใบ · แต่ละใบ: ชื่อหน้า + role 1 บรรทัด (Home=First Impression · About=Trust · Products=Solutions · Club=Magnet · Contact=Conversion) · ไฮไลต์ Club ด้วยขอบทอง = จุดต่างจากเว็บเดิม

**S7 — Key Screens** *(ทำท้ายสุด — screenshot จาก demo จริง)*
Layout: 2 browser frame เฉียงซ้อนกัน — Home (dark hero) + Club hub (editorial grid) · caption จุดเด่นข้างละ 3 ข้อ · badge "กดเล่นได้จริง → สไลด์สุดท้าย"

**S8 — Alpha X Club = Magnet**
Layout: ซ้าย: บทสรุป strategy (ทำไม content คือเหตุผลให้กลับมา + cadence ≥1/สัปดาห์ + SEO/AEO keywords) · ขวา: preview magazine grid 3 เสา The Collector / The Explorer / The Connoisseur (การ์ดหัวข้อบทความตัวอย่างเสาละ 1)
Asset: ภาพประกอบบทความ gen Magnific 3 ภาพ (นาฬิกา vintage / สนามกอล์ฟ / whisky)

**S9 — Tech & Security**
Layout: แถว architecture: Next.js 16 → Payload CMS → Postgres บน Azure (กล่องต่อลูกศร CSS) · การ์ดขวา: SCBX security checklist (VA โดย vendor · Pentest โดย Alpha X · source scan · PDPA/cookie) · แถบล่าง: <2s load · GA4 · TH/EN
Hook: "เว็บปัจจุบันก็ Next.js — ทีมเดิมรับช่วงต่อได้ทันที ไม่เริ่มจากศูนย์"

**S10 — Timeline & Investment**
Layout: แถบ 8 สัปดาห์แนวนอน 5 เฟส (WK1 Wireframe / WK2 UI / WK3-5 Dev+CMS / WK6-7 UAT+VA / WK8 Go-live) + จุด gate "sign-off ก่อน dev" · กล่องขวา: 470,000 บาท + optional MA 30,000/เดือน + warranty 1 เดือน

**S11 — Live Demo & Close**
Layout: กลางจอ: QR ใหญ่ + URL Vercel + "สัมผัสได้เลยตอนนี้" · ล่าง: ขอบเขตที่ demo ครอบคลุม + ติดต่อ CFW · จบด้วย tagline
Asset: QR gen ตอนได้ URL จริง

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
- โค้ดเป็น CSS utility ใน deck.html แล้ว: `.fx .glow / .diag-red / .diag-glass / .xline` + hairline อัตโนมัติ

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

- **เริ่มงานทุกครั้ง: รัน dev server** — `bun serve.ts` (background) → http://localhost:4321 (progress) · /deck/deck.html (deck) · live reload อัตโนมัติ · พอร์ตชน: `lsof -ti:4321 | xargs kill`
- **ทุก session ต้องอัปเดต `progress.html`** — อัปเดตวันที่/สถานะ, timeline, checklist และเพิ่ม Session Log ใหม่บนสุด · ใช้เปิดใน weekly meeting กับ CFW

## QA ก่อนส่ง

- Deck + demo ผ่าน 2-layer QA: `/web-design-guidelines` → `/html-qa-gate`
- Demo: contrast 4.5:1 · touch target ≥44px · ไม่มี horizontal scroll
