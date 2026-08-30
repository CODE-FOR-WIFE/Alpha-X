# คิวงาน AlphaX

อัปเดตทุกครั้งที่มีงานเข้าหรืองานเสร็จ · งานใหม่ต่อท้าย **Queue** · เสร็จแล้วย้ายลง **Done** พร้อมวันที่

## 🔄 กำลังทำ
- (ว่าง — รอคิวถัดไป)

## ✅ รีวิวเดค 12 หน้า

สถานะ: `✅ ผ่าน` · `🔍 กำลังดู` · `⬜ ยังไม่ดู` — บอกผมว่าหน้าไหนผ่าน ผมอัปเดตให้

| # | สไลด์ | สถานะ | หมายเหตุ / สิ่งที่ต้องแก้ |
|---|---|---|---|
| S01 | Cover | ✅ ผ่าน | ใส่รูปรถ + shade ไล่ซ้าย |
| S02 | Who We Are — CFW | ✅ ผ่าน | redesign: โลโก้นำ · คำถามคู่ 64px · การ์ด 3 ใบ · backdrop จาง |
| S03 | Why Revamp | ✅ ผ่าน | why-now bar เป็น stat+caption · แดงเล็กแก้ contrast ทั้งเดค 12 จุด |
| S04 | Audience — 3 personas | ✅ ผ่าน | headline สั้น · เลข+ไอคอนคนละบรรทัด · body 2 บรรทัด |
| S05 | Brand Persona | ✅ ผ่าน | ค่านิยมเป็น caps + เส้นคั่น · แก้รูป handshake ที่ผ้าเช็ดหน้าผิดตำแหน่ง |
| S06 | Design System | ✅ ผ่าน | redesign: แถบสีเต็มความกว้าง · specimen ใหญ่ · ตัด spacing scale · แก้ contrast swatch แดง |
| S07 | Architecture — 5 หน้า | ✅ ผ่าน | redesign เป็นสารบัญแนวตั้ง 5 แถว เลขแดงนำ |
| S08 | Key Screens | ✅ ผ่าน | รูปเป็นพระเอก + caption ใต้รูป · footer บรรทัดเดียว |
| S09 | Content Strategy | ✅ ผ่าน | headline สั้น + ย่อหน้า 2 บรรทัด |
| S10 | Tech & Security | ✅ ผ่าน | redesign stat-led: 0 / 3 / <2s + stack เป็นโซ่ + chips |
| S11 | Timeline & Investment | ✅ ผ่าน | redesign 2 บล็อกมีกรอบ · ราคาเป็นตัวเลขนำ |
| S12 | Live Demo | ⬜ | ยังไม่ได้รีวิว |

## ⏳ ค้างไว้ตั้งใจ
- **Slides ยังไม่ sync** (รอบนี้มีของใหม่เยอะมาก — S02/S06/S07/S08/S10/S11 redesign ใหม่หมด) — ของใน Figma ใหม่กว่าที่อยู่ใน Google Slides แล้ว (asset ครบ S03/S04/S05/S08/S09)
  ตั้งใจสะสมงานก่อนแล้วค่อย sync ทีเดียว เพราะรันครั้งหนึ่งใช้เวลาราวหนึ่งนาที
  **ต้องกด `syncDeck()` ก่อนส่งลิงก์ให้ลูกค้าทุกครั้ง**

## 📋 Queue
- [ ] S06 ช่อง component states (เติมตอน build จริง)

### ส่งมอบ
- [ ] commit + push งานรอบนี้ → CI ของ China deploy ขึ้น https://alpha-x-blond.vercel.app/ อัตโนมัติ
- [ ] ตั้ง Share ของ Google Slides เป็น Anyone with the link · Viewer

## ✅ Done

### 2026-08-30 (รอบดึก)
- เติม asset ในเดคจนเหลือช่องเดียว: S03 เว็บเก่า/ใหม่เทียบกัน · S04 icon persona 3 (vector เส้นแดง) · S05 mood 3 ใบ (เจนใหม่) · S08 screenshot เดโมจริง 2 หน้า · S09 pillar 3 ใบ (ใช้รูป story ที่มีอยู่)
- Club page: จัดเป็น 3 เสา Collector / Explorer / Connoisseur พร้อมคำอธิบายเสา + ปุ่ม share / save ทุกบทความ

### 2026-08-30 (รอบเย็น)
- Branding deck ตาม proposal หน้า 14–15: hairline ใต้หัวเป็นแดง (แก้ที่ component ตัวเดียว) · red glow + ระนาบทแยงขนานขาแดง 31.3° ครบทั้ง 12 สไลด์ · เขียนสเปคไว้ใน brief/deck-spec.md
- QR ของเดโม: โมดูลกลม + finder มุมมน + โลโก้ X (เรนเดอร์จาก `icon.svg` ตัวจริง) — `scripts/gen-qr.py` ตรวจสแกนกลับได้ถึง 200px
- S12: ใส่ QR จริง + URL `alpha-x-blond.vercel.app` · S08/S12 คืนคำว่า every interaction is live
- S07: เขียนเนื้อหาแต่ละหน้าตาม sitemap ตรง ๆ (trifold 3 อย่าง, Awards/Compliance/Alpha X Plus, Maps/toggle)
- Club page: เพิ่มโซน **Alpha Events** (Company News & PR) ตาม sitemap 03
- แก้ OG preview ไม่ขึ้น — `metadataBase` เคยชี้ `www.alphaxclub.com` ที่ยังไม่มีไฟล์ เปลี่ยนเป็นโดเมนที่ deploy จริง

### 2026-08-30 (รอบบ่าย)
- Hero ครบ 5 สไลด์ตาม sitemap (Car · Yacht/River Boat · Aircraft · Luxury Property · Gold-backed) — เจนรูป 3 ใบใหม่ด้วย gpt-image-2, เอา Big Bike ออก
- ลิงก์ตันหมดทั้งเว็บ: ปุ่ม Read story ในหน้า Club ชี้ `/club/<slug>` แล้วตกไปหน้า 404 ของเรา
- ย้าย `layout.tsx` / `not-found.tsx` / `icon.svg` ออกมาที่ root ของ app — ไม่งั้น `out/404.html` ตอน export เป็นหน้าขาวของ Next ไม่ใช่ของเรา
- ลด whitespace ใต้ product list (padding ซ้อนกัน ~300px → 144px)
- X motif: หัวขาแดงยาวเท่าครึ่งบนของขาขาว (จุดตัดขยับจาก 10% → 16%)

### 2026-08-30
- Expertise Trifold แก้ให้ตรง sitemap (Financial Excellence / Asset Management & Legal Advisory / Partnership Networks)
- เพิ่มรายการสินเชื่อ 5 อย่างใต้ภาพไดคัท (Car · Yacht/River Boat · Aircraft · Property · Gold-backed) — เอา Big Bike ที่ไม่มีใน sitemap ออก
- What's Trending เป็น 3 บทความ + ลิงก์เข้า Club hub
- ฮีโร่: CTA คู่ตาม sitemap (Beyond imagination. Beyond lifestyle. → Expertise · Contact us → โทร)
- หน้า 404 ตาม design system + catch-all ให้ `/about` `/products` `/contact` · เมนูชี้ครบ 5 หน้า
- Video lightbox → YouTube (`urcyojOfou0`) mount เฉพาะตอนเปิด ปิดแล้ววิดีโอหยุดเอง
- CTA ฮีโร่กระชับ: ปุ่ม Discover more / Contact us · ประโยค "Beyond imagination. Beyond lifestyle." เป็นบรรทัดนำเหนือปุ่ม
- favicon ตัว X พื้นโปร่งใส — ขาแดงยาว + ขาเทา `#9A968C` สั้นกว่า จุดตัดเป็นแดง · องศาตรงกับ motif บนเว็บ (31.3° / 33.7°)
- X motif บนเว็บ: ยืดขาสั้นจาก 18% → 32% ของขาแดง (จุดตัดยังอยู่ 10% จากหัว)
- OG image แคปฮีโร่จริง 1200×630 @2x
- 404 กลับมาอยู่บนกริดเดียวกับหน้าอื่น (60 → 1380 เท่า .shell)
- slides-sync: ถอด trigger รายชั่วโมงออก เปลี่ยนเป็นเมนู **Alpha X → Sync deck from Figma** ในตัว Slides (กันสไลด์ถูกเขียนทับกลางพรีเซนต์)
- Deck 12 สไลด์ใน Figma + pipeline sync เข้า Google Slides (ขึ้นครบแล้ว)
- X gimmick บนเว็บ (เส้นแดง 31.3° + ขาขาวคร่อม + clip-path พื้นมุมเดียวกัน)
