# ALPHA X — Website Revamp Pitch

พื้นที่ทำงานสำหรับ proposal ของ Code for Wife เพื่อเสนอปรับปรุงเว็บไซต์ ALPHA X Club โดยมีเป้าหมายหลักคือทำให้ลูกค้าเห็นทั้งแนวคิด กลยุทธ์ งานออกแบบ และต้นแบบที่ทดลองใช้งานได้จริงก่อนตัดสินใจเลือกทีม

> สถานะและแผนงานล่าสุดให้ยึด [`progress.html`](./progress.html) เป็นหลัก
>
> Deadline: **5 กันยายน 2026**
>
> Deliverables: **Vercel Demo + Pitch Deck 12 สไลด์**

## สารบัญ

1. [สถานะล่าสุด](#สถานะล่าสุด)
2. [กลยุทธ์การทำงาน](#กลยุทธ์การทำงาน)
3. [แผนส่งมอบ](#แผนส่งมอบ)
4. [ขอบเขตงาน](#ขอบเขตงาน)
5. [วิธีเปิดโปรเจกต์](#วิธีเปิดโปรเจกต์)
6. [วิธีใช้งาน Pitch Deck](#วิธีใช้งาน-pitch-deck)
7. [Design System](#design-system)
8. [File Index](#file-index)
9. [Workflow และการอัปเดต Progress](#workflow-และการอัปเดต-progress)
10. [QA ก่อนส่ง](#qa-ก่อนส่ง)

## สถานะล่าสุด

อัปเดตล่าสุด: **26 สิงหาคม 2026 — ON PLAN**

โปรเจกต์อยู่ใน Phase 1: Pitch โดยมีฐานงานพร้อมแล้วดังนี้

- โครง Pitch Deck ครบ 12/12 สไลด์
- Brand assets, ฟอนต์ ALPHA X และ design tokens พร้อมใช้
- Pitch Deck controller และระบบ export PNG พร้อม
- งานถัดไปคือสร้าง Demo หน้า Home และ Alpha X Club ให้กดได้จริง
- Review กับ Code for Wife ครั้งที่ 1: **30 สิงหาคม 2026**

ดู dashboard ฉบับเต็มได้ที่ [`progress.html`](./progress.html)

## กลยุทธ์การทำงาน

ลำดับการผลิตปัจจุบันคือ **Demo-first**:

1. สร้างหน้า Home และ Alpha X Club ให้เสร็จและขึ้น Vercel
2. นำหน้าจอจริง, interaction จริง และ URL จริงกลับมาใช้ใน Pitch Deck
3. ปิดสไลด์ Key Screens และ Live Demo/QR จากของที่พร้อมนำเสนอจริง
4. QA ทั้ง Demo และ Deck ก่อน export เข้า Google Slides

เหตุผลที่เลือกวิธีนี้:

- ลดการออกแบบซ้ำระหว่าง mockup ใน Deck กับหน้าเว็บจริง
- ทำให้สไลด์ S7 และ S11 ใช้หลักฐานจากผลิตภัณฑ์ที่ทดลองได้จริง
- ช่วยให้ narrative ใน Deck สอดคล้องกับประสบการณ์บน Demo
- ทำให้รอบ review วันที่ 30 สิงหาคมมีชิ้นงานที่จับต้องได้

ขอบเขต Demo ต้องคงไว้ที่ **Home + Club** เพื่อไม่ให้กระทบเวลาปิด Deck

## แผนส่งมอบ

| วันที่ | เป้าหมาย | ผลลัพธ์ที่ต้องได้ |
|---|---|---|
| 26 ส.ค. | Scope + Home | ล็อก section, flow, visual direction และเริ่มหน้า Home |
| 27 ส.ค. | Home | หน้า Home ครบและกดได้ |
| 28 ส.ค. | Club + Navigation | Alpha X Club hub พร้อม nav และ placeholder ของหน้าที่เหลือ |
| 29 ส.ค. | Responsive + Deploy | ตรวจ 393/768/1440, polish interaction และขึ้น Vercel |
| 30 ส.ค. | CFW Review #1 | Review Demo จริงและรวบรวม feedback |
| 31 ส.ค. | Demo Lock | แก้ feedback และล็อกเวอร์ชันสำหรับใช้ใน Deck |
| 1 ก.ย. | Deck Visual 1–6 | ปิด visual ครึ่งแรกของ Deck |
| 2 ก.ย. | Deck Visual 7–12 | ปิด Key Screens, QR และ visual ทั้งเล่ม |
| 3 ก.ย. | QA + Export | QA สองชั้นและ export เข้า Google Slides |
| 4 ก.ย. | Buffer + Rehearsal | เก็บรายละเอียดและซ้อม pitch |
| 5 ก.ย. | Ship | ส่งมอบ Demo และ Pitch Deck |

## ขอบเขตงาน

### 1. Vercel Demo

Demo ทำหน้าที่เป็นหลักฐานว่าแนวคิดสามารถพัฒนาได้จริงบน stack ที่เสนอให้ลูกค้า

สิ่งที่ต้องทำจริง:

- **Home** — cinematic hero, expertise/products และ What's Trending
- **Alpha X Club** — content hub แบบ editorial/magazine
- **Navigation** — ทุกเมนูกดแล้วไม่ตัน โดยหน้าที่ยังไม่อยู่ใน scope ใช้ placeholder ที่ออกแบบเรียบร้อย
- **Responsive** — mobile-first ที่ 393px และตรวจเพิ่มที่ 768px / 1440px
- **Accessibility** — contrast ระดับ WCAG AA, touch target อย่างน้อย 44px และรองรับ reduced motion
- **Deployment** — URL บน Vercel สำหรับ review และสร้าง QR ใน Deck

โฟลเดอร์เป้าหมายคือ `demo/` ซึ่งจะถูกสร้างในขั้น build ถัดไป

### 2. Pitch Deck

Deck เป็น HTML presentation ขนาด 1920×1080 จำนวน 12 สไลด์ อยู่ในไฟล์ [`deck/deck.html`](./deck/deck.html)

โครงสไลด์:

| ลำดับ | เนื้อหา | หมายเหตุ |
|---:|---|---|
| 1 | Cover | Wealth with Passion |
| 2 | Who We Are | Code for Wife และรูปแบบการดูแลหลังส่งมอบ |
| 3 | Why Revamp | Before → After และบริบทธุรกิจ |
| 4 | Customer Personas | Passion Investment / Early Adopters / Symbol of Success |
| 5 | Brand Persona & Mood | Prestige / Trustworthy / Effortless |
| 6 | Design System | Tokens, typography, spacing และ components |
| 7 | Sitemap | โครงเว็บไซต์ 5 หน้าและบทบาทของแต่ละหน้า |
| 8 | Key Screens | Screenshot จาก Demo จริง — ทำหลัง Demo lock |
| 9 | Alpha X Club | Content strategy และ magazine grid |
| 10 | Tech & Security | Architecture, security, performance และ analytics |
| 11 | Timeline & Investment | แผน 8 สัปดาห์และงบประมาณ |
| 12 | Live Demo & Close | Vercel URL, QR และ closing statement |

## วิธีเปิดโปรเจกต์

### สิ่งที่ต้องมี

- [Bun](https://bun.sh/) สำหรับรัน local development server
- Browser รุ่นใหม่ที่รองรับ CSS `oklch()`
- Python 3 สำหรับรัน contrast checker

### เริ่ม local server

```bash
bun serve.ts
```

จากนั้นเปิด:

- Progress dashboard: <http://localhost:4321/>
- Pitch Deck: <http://localhost:4321/deck/deck.html>

Server มี live reload แบบ Server-Sent Events เมื่อไฟล์ในโปรเจกต์เปลี่ยน โดยไม่ต้องติดตั้ง dependency เพิ่มเติม

### ตรวจสีและ contrast

```bash
python3 check-contrast.py
```

คำสั่งต้องจบด้วย `ALL PASS` ก่อนนำ token สีไปใช้ในงานจริง หากแก้ค่าสีใน `tokens.css` ต้องอัปเดตค่าที่ตรวจใน `check-contrast.py` ให้ตรงกันด้วย

## วิธีใช้งาน Pitch Deck

เมื่อเปิด `deck/deck.html`:

- ใช้ปุ่ม `‹` / `›` หรือคีย์ลูกศรซ้าย/ขวาเพื่อเปลี่ยนสไลด์
- ใช้ URL hash เช่น `#1`, `#7`, `#12` เพื่อเปิดสไลด์ที่ต้องการโดยตรง
- ปุ่ม **Export PNG @2x** export สไลด์ปัจจุบันที่ 3840×2160
- ปุ่ม **Open Google Slides** เปิดไฟล์นำเสนอปลายทาง
- Controller จะถูกซ่อนระหว่าง export

Deck ใช้ `modern-screenshot` จาก CDN ในขั้น export ดังนั้นฟังก์ชัน export ต้องเชื่อมต่ออินเทอร์เน็ต ส่วนการเปิดดูสไลด์ทั่วไปทำงานจากไฟล์ใน repo ได้

Google Slides: [ALPHA X Pitch Deck](https://docs.google.com/presentation/d/1EDWQEQJYcsSbU3DSlH0KT0r8_xU3mAfaX52B2JFvlSk/edit)

## Design System

[`tokens.css`](./tokens.css) คือ single source of truth ของหน้าตา Deck, Progress และ Demo

หลักสำคัญ:

- Brand direction: dark cinematic + red X accent
- Brand red: `#E4002D`
- Gold ใช้เป็น accent รองในบริบท Club/lifestyle
- ฟอนต์หลัก: ALPHA X; display serif: Playfair Display / Trirong; fallback body: Anuphan
- สีทั้งหมดจัดระบบด้วย OKLCH
- CTA หลักใช้พื้นครีมบนพื้นดำ; สีแดงสงวนไว้เป็นเครื่องหมายแบรนด์
- Layout ใช้ asymmetric editorial grid และ negative space
- หลีกเลี่ยง card grid ซ้ำ, gradient ม่วง/ฟ้า, glassmorphism, เงา default, icon ที่ไม่จำเป็น และข้อความแบบ template
- Component หรือหน้าใหม่ควรใช้ token เดิมก่อนสร้างค่าเฉพาะจุด

## File Index

### ไฟล์ระดับ root

| ไฟล์ | ประเภท | หน้าที่ |
|---|---|---|
| [`README.md`](./README.md) | Documentation | คู่มือเริ่มต้น ภาพรวม แผนงาน และดัชนีไฟล์ของ repository |
| [`progress.html`](./progress.html) | HTML dashboard | แหล่งข้อมูลหลักสำหรับสถานะปัจจุบัน timeline, deliverables และ session log |
| [`PROJECT.md`](./PROJECT.md) | Internal brief | รายละเอียดดีล โครงสไลด์ กลยุทธ์ เนื้อหา กฎงานออกแบบ และข้อมูลภายในสำหรับทีม |
| [`tokens.css`](./tokens.css) | CSS | Design tokens กลาง: สี ฟอนต์ spacing typography shape motion และ layout |
| [`serve.ts`](./serve.ts) | Bun/TypeScript | Static development server ที่เสิร์ฟทั้ง repo บนพอร์ต 4321 พร้อม live reload |
| [`check-contrast.py`](./check-contrast.py) | Python | ตรวจอัตราส่วน contrast ของ token สีตามเกณฑ์ WCAG |
| [`research-templates.md`](./research-templates.md) | Internal research | งานวิจัย reference/template และแนวทางเลือก layout DNA สำหรับเว็บไซต์ |
| [`.gitignore`](./.gitignore) | Git config | กันไฟล์ระบบ, build output, dependency และ local deployment metadata |

### เอกสารต้นทาง

| ไฟล์ | เนื้อหาและการใช้งาน |
|---|---|
| [`Alpha X Proposal (1).pdf`](./Alpha%20X%20Proposal%20%281%29.pdf) | Proposal/brand reference หลัก: persona, moodboard, stationery และ presentation tone |
| [`AlphaX Sitemap 2026 revised.pdf`](./AlphaX%20Sitemap%202026%20revised.pdf) | Requirement, sitemap, specification รายหน้า และ timeline ที่ลูกค้าปรับปรุงแล้ว |
| [`Techstack.pdf`](./Techstack.pdf) | Architecture, technology stack, security scope และข้อมูลประกอบงบประมาณ |

### `deck/`

| ไฟล์ | หน้าที่ |
|---|---|
| [`deck/deck.html`](./deck/deck.html) | Pitch Deck ทั้ง 12 สไลด์ พร้อม controller, deep link และ PNG export |
| [`deck/assets/alpha-x-logo.png`](./deck/assets/alpha-x-logo.png) | โลโก้ ALPHA X ที่ใช้ใน Deck และ Progress |
| [`deck/assets/current-site.png`](./deck/assets/current-site.png) | Screenshot เว็บไซต์เดิมสำหรับสไลด์ Before → After |
| [`deck/assets/hero-car-a.jpg`](./deck/assets/hero-car-a.jpg) | Hero photography ตัวเลือก A; ใช้เป็นภาพพื้นหลังของ Progress ด้วย |
| [`deck/assets/hero-car-b.jpg`](./deck/assets/hero-car-b.jpg) | Hero photography ตัวเลือก B สำหรับงาน visual |

### `fonts/`

| ไฟล์ | Family / Weight / Style | การใช้งาน |
|---|---|---|
| `ALPHAX-Light.ttf` | ALPHA X 300 | Brand caps, eyebrow และข้อความน้ำหนักเบา |
| `ALPHAX-LightItalic.ttf` | ALPHA X 300 italic | Brand emphasis แบบ italic |
| `ALPHAX-Regular.ttf` | ALPHA X 400 | Body และ UI text หลัก |
| `ALPHAX-Bold.ttf` | ALPHA X 700 | ใช้เฉพาะจุดที่ต้องการน้ำหนักสูง |
| `PlayfairDisplay-400-normal.ttf` | Playfair Display 400 | English display serif |
| `PlayfairDisplay-400-italic.ttf` | Playfair Display 400 italic | English editorial emphasis |
| `PlayfairDisplay-500-normal.ttf` | Playfair Display 500 | English display medium |
| `Trirong-400-normal.ttf` | Trirong 400 | Thai display serif |
| `Trirong-500-normal.ttf` | Trirong 500 | Thai display medium |
| `Anuphan-400-normal.ttf` | Anuphan 400 | Thai body fallback |
| `Anuphan-500-normal.ttf` | Anuphan 500 | Thai body medium fallback |

ฟอนต์ทั้งหมด self-host ผ่าน `tokens.css` เพื่อให้การแสดงผลและการ export PNG สม่ำเสมอ

### โครงสร้างที่กำลังจะเพิ่ม

```text
demo/                  # Next.js + Tailwind Vercel Demo
├── Home               # cinematic landing page
├── Alpha X Club       # editorial content hub
└── placeholders       # หน้าที่เหลือเพื่อให้ navigation ไม่ตัน
```

## Workflow และการอัปเดต Progress

`progress.html` เป็น source of truth สำหรับการวางแผนรายวันและ weekly review ทุก session ควรอัปเดตอย่างน้อย 4 จุด:

1. วันที่ `Updated` และ badge สถานะ: `ON PLAN`, `AT RISK` หรือ `BEHIND`
2. รายการใน deliverable โดยเพิ่ม class `done` ให้สิ่งที่เสร็จแล้ว
3. ตำแหน่ง class `now` ใน timeline และ class `past` สำหรับวันที่ผ่านไป
4. Session log ด้านบนสุด: วันที่ สิ่งที่ทำเสร็จ การตัดสินใจ และงานถัดไป

หลักการจัดการเอกสาร:

- `progress.html` — สถานะปัจจุบันที่ใช้คุยกับทีม
- `README.md` — คู่มือและแผนที่ repository
- `PROJECT.md` — brief เชิงลึกและข้อมูลภายใน
- เมื่อข้อมูลแผนขัดกัน ให้แก้ `progress.html` ก่อน แล้ว sync เอกสารอื่นตาม

## QA ก่อนส่ง

### Demo

- Home และ Club กดได้จริง ไม่มี dead end
- Navigation ที่เหลือมี placeholder ที่เหมาะสม
- ตรวจ viewport 393px, 768px และ 1440px
- ไม่มี horizontal scroll
- Touch target อย่างน้อย 44px
- Text contrast อย่างน้อย 4.5:1; large text/UI อย่างน้อย 3:1
- Keyboard focus มองเห็นชัด
- รองรับ `prefers-reduced-motion`
- URL Vercel พร้อมใช้งานและถูกนำไปสร้าง QR

### Pitch Deck

- ครบ 12 สไลด์และลำดับ narrative ต่อเนื่อง
- Key Screens เป็นภาพจาก Demo เวอร์ชันที่ lock แล้ว
- QR และ Vercel URL ใช้งานได้จริง
- ฟอนต์และภาพไม่หลุดระหว่าง export
- ไม่มี wall of text และไม่มี visual pattern ซ้ำจนดูเป็น template
- Export PNG ครบทุกหน้าและตรวจที่ความละเอียดจริง
- นำภาพเข้า Google Slides และตรวจลำดับอีกครั้ง

### ก่อน commit/push

```bash
git status --short
python3 check-contrast.py
```

ตรวจว่าไม่มี `.DS_Store`, build output, log หรือ local deployment metadata ติดเข้า commit
