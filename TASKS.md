# คิวงาน AlphaX

อัปเดตทุกครั้งที่มีงานเข้าหรืองานเสร็จ · งานใหม่ต่อท้าย **Queue** · เสร็จแล้วย้ายลง **Done** พร้อมวันที่

## 🔄 กำลังทำ
- (ว่าง — รอคิวถัดไป)

## 📋 Queue

### Demo — เว็บ
- [ ] Club page: เพิ่มโซน **Alpha Events** (Company News & PR) ตาม sitemap 03
- [ ] Club page: จัดบทความให้เห็นเป็น 3 เสา Collector / Explorer / Connoisseur ชัดขึ้น
- [ ] ปุ่ม social share + save-for-later ในหน้า Club (sitemap 03 · ยังไม่เคาะว่าจำเป็นตอนขายไหม)

### Deck — Figma
- [ ] S07 Architecture: ระบุ Expertise Trifold ที่ถูกใน node Home (ตอนนี้เขียนรวม ๆ)
- [ ] S08 + S12: คืนคำว่า "every interaction is live" ได้แล้ว เพราะวิดีโอเล่นได้จริงแล้ว
- [ ] Branding ตาม proposal หน้า 14–15: hairline ใต้หัวเป็นแดง · หัวเรื่อง serif แดงบางสไลด์ · red radial glow · ระนาบทแยง
- [ ] เติม asset ที่ยัง placeholder: credentials CFW · screenshot เว็บเก่า/ใหม่ · icon persona 3 · ภาพ mood 3 · ภาพ pillar 3 · QR + URL จริง

### ส่งมอบ
- [ ] commit + push งานรอบนี้ → CI ของ China deploy ขึ้น https://alpha-x-blond.vercel.app/ อัตโนมัติ
- [ ] เอา URL Vercel + QR ใส่ S12 (CI/CD พร้อมแล้ว — https://alpha-x-blond.vercel.app/)
- [ ] ตั้ง Share ของ Google Slides เป็น Anyone with the link · Viewer

## ✅ Done

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
