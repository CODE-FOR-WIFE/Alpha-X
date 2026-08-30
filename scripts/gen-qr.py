"""QR ของเดโม — โมดูลกลม + โลโก้ตัว X ตรงกลาง แล้วตรวจว่าสแกนกลับได้จริง

รัน:  python3 -m venv .venv && .venv/bin/pip install "qrcode[pil]" opencv-python-headless
      .venv/bin/python scripts/gen-qr.py

ออกที่ brief/assets/qr-demo.png (1200x1200) — เอาไปวางในสไลด์ S12
"""
import qrcode, cv2, numpy as np
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers.pil import CircleModuleDrawer
from PIL import Image, ImageDraw

URL = 'https://alpha-x-blond.vercel.app/'
SKIP_FINDER = False
RAD = 1.0   # มนเท่าที่ยังสแกนออกที่ 200px · 1.2 หลุดที่ขนาดเล็ก · 2.2 (วงกลมเต็ม) พังทุกขนาด
INK, RED, PAPER = (11, 11, 13), (228, 0, 45), (250, 248, 243)

# error correction H (กู้ได้ 30%) — จำเป็นเพราะโลโก้ไปบังโมดูลตรงกลาง
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=20, border=3)
qr.add_data(URL); qr.make(fit=True)
img = qr.make_image(image_factory=StyledPilImage, module_drawer=CircleModuleDrawer(),
                    fill_color=INK, back_color=PAPER).convert('RGB')

W = img.size[0]
d = ImageDraw.Draw(img)

# finder pattern 3 มุม: มุมมนให้เข้าชุดกับโมดูลกลม
# (เคยลองวงกลมเต็มแล้วสแกนไม่ออก — อัตราส่วน 1:1:3:1:1 ที่ตัวสแกนใช้จับตำแหน่งเสียไป)
box, border = qr.box_size, qr.border
for gx, gy in [(border, border), (qr.modules_count + border - 7, border), (border, qr.modules_count + border - 7)]:
    x0, y0 = gx * box, gy * box
    x1, y1 = x0 + 7 * box, y0 + 7 * box
    if not SKIP_FINDER:
        d.rectangle([x0, y0, x1, y1], fill=PAPER)
        d.rounded_rectangle([x0, y0, x1, y1], radius=box * RAD, fill=INK)
        d.rounded_rectangle([x0 + box, y0 + box, x1 - box, y1 - box], radius=box * RAD * 0.7, fill=PAPER)
        d.rounded_rectangle([x0 + 2 * box, y0 + 2 * box, x1 - 2 * box, y1 - 2 * box], radius=box * RAD * 0.45, fill=INK)

# โลโก้ X ตรงกลาง — ใช้ favicon ตัวจริง (brief/assets/x-mark.png เรนเดอร์จาก demo/src/app/icon.svg)
# แทนที่จะวาดใหม่ด้วย PIL จะได้สัดส่วนและองศาตรงกับ favicon เป๊ะ
# เรนเดอร์ใหม่เมื่อ icon.svg เปลี่ยน: เปิด svg ในเบราว์เซอร์แล้วแคปแบบพื้นโปร่งใส
mark = Image.open('brief/assets/x-mark.png').convert('RGBA')
size = int(W * 0.20)
mark = mark.resize((size, size), Image.LANCZOS)

# พื้นรองใต้โลโก้ให้ X อ่านออกบนโมดูลดำ — สี่เหลี่ยมมุมมน
pad = int(size * 0.10)
cx = cy = W // 2
d.rounded_rectangle([cx - size // 2 - pad, cy - size // 2 - pad,
                     cx + size // 2 + pad, cy + size // 2 + pad],
                    radius=int(size * 0.14), fill=PAPER)
img.paste(mark, (cx - size // 2, cy - size // 2), mark)

out = 'brief/assets/qr-demo.png'
img.resize((1200, 1200), Image.LANCZOS).save(out)

# ตรวจว่าสแกนกลับได้ทั้งขนาดใหญ่และขนาดพิมพ์เล็ก
for size in (1200, 600, 300, 200):
    probe = np.array(img.resize((size, size), Image.LANCZOS).convert('RGB'))[:, :, ::-1]
    data, *_ = cv2.QRCodeDetector().detectAndDecode(probe)
    print(f'{size}px → {data or "อ่านไม่ออก"}')
