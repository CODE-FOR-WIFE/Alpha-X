# ALPHA X — Website Revamp Pitch

Workspace ของ Code for Wife สำหรับ pitch งาน revamp เว็บไซต์ ALPHA X Club

- **Deadline:** 5 กันยายน 2026
- **ส่งมอบ:** Vercel Demo (Home + Club) + Pitch Deck 12 สไลด์
- **สถานะล่าสุด:** เปิด `progress.html` — เป็น source of truth ของแผนและ timeline
- **รายละเอียดงาน/กติกา:** `PROJECT.md` (internal)

## โครงสร้าง

```text
demo/      Next.js static export — หน้า Home และ Club
brief/     เอกสารต้นทางจากลูกค้า + research + deck-spec.md (เนื้อหาสไลด์สำหรับทำใน Figma)
fonts/     ฟอนต์ ALPHA X, Playfair, Trirong, Anuphan (self-host)
tokens.css design tokens กลาง ใช้ร่วมกันทั้ง progress / demo / deck
```

## รัน

```bash
bun serve.ts        # progress → http://localhost:4321
cd demo && pnpm install && pnpm dev     # demo → http://localhost:3000
python3 check-contrast.py               # ต้องขึ้น ALL PASS ก่อนใช้ token สี
```

Deck: ทำใน [Figma](https://www.figma.com/design/5DZ7FTf2wXT1RNbgFVSfVU/AlphaX) (page `Deck 2026`) — ระบบและเนื้อหาอยู่ที่ `brief/deck-spec.md`
ส่งลูกค้าผ่าน [Google Slides](https://docs.google.com/presentation/d/1EDWQEQJYcsSbU3DSlH0KT0r8_xU3mAfaX52B2JFvlSk/edit): `scripts/slides-sync.gs` (Apps Script) ดึงรูปจาก Figma API มาวางในสไลด์ — สั่งจากเมนู **Alpha X → Sync deck from Figma** ในตัว Slides เอง ไม่มี trigger อัตโนมัติ (กันไม่ให้สไลด์ถูกเขียนทับกลางพรีเซนต์)

## Design system

ทุกค่าอยู่ใน `tokens.css` ไฟล์เดียว — สีเป็น OKLCH, brand red `#E4002D`, ทิศทาง dark cinematic + red X accent, layout เป็น asymmetric editorial grid

สร้างของใหม่ให้หยิบ token เดิมก่อนตั้งค่าเฉพาะจุด
