# ALPHA X — Website Revamp Pitch

Workspace ของ Code for Wife สำหรับ pitch งาน revamp เว็บไซต์ ALPHA X Club

- **Deadline:** 5 กันยายน 2026
- **ส่งมอบ:** Vercel Demo (Home + Club) + Pitch Deck 12 สไลด์
- **สถานะล่าสุด:** เปิด `progress.html` — เป็น source of truth ของแผนและ timeline
- **รายละเอียดงาน/กติกา:** `PROJECT.md` (internal)

## โครงสร้าง

```text
demo/      Next.js static export — หน้า Home และ Club
deck/      Pitch deck (deck.html) + script export PNG
brief/     เอกสารต้นทางจากลูกค้า + research ภายใน
fonts/     ฟอนต์ ALPHA X, Playfair, Trirong, Anuphan (self-host)
tokens.css design tokens กลาง ใช้ร่วมกันทั้ง deck / progress / demo
```

## รัน

```bash
bun serve.ts        # progress + deck → http://localhost:4321
cd demo && pnpm install && pnpm dev     # demo → http://localhost:3000
cd deck && pnpm install && pnpm export  # export สไลด์เป็น PNG → deck/exports/
python3 check-contrast.py               # ต้องขึ้น ALL PASS ก่อนใช้ token สี
```

Deck: ลูกศรซ้าย/ขวาเปลี่ยนสไลด์ · URL hash (`#7`) เปิดตรงสไลด์ · [Google Slides](https://docs.google.com/presentation/d/1EDWQEQJYcsSbU3DSlH0KT0r8_xU3mAfaX52B2JFvlSk/edit)

## Design system

ทุกค่าอยู่ใน `tokens.css` ไฟล์เดียว — สีเป็น OKLCH, brand red `#E4002D`, ทิศทาง dark cinematic + red X accent, layout เป็น asymmetric editorial grid

สร้างของใหม่ให้หยิบ token เดิมก่อนตั้งค่าเฉพาะจุด
