#!/usr/bin/env python3
"""WCAG contrast checker สำหรับ AlphaX tokens — รันทุกครั้งที่แก้สีใน tokens.css
ponytail: ค่าสี hardcode ตาม tokens.css — แก้ tokens แล้วต้องอัปเดตตารางนี้ด้วย"""
import math

def oklch_to_srgb(L, C, H):
    h = math.radians(H)
    a, b = C * math.cos(h), C * math.sin(h)
    l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s_ = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    r = +4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_
    g = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_
    bl = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_
    def gam(c):
        c = max(0.0, min(1.0, c))
        return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055
    return tuple(gam(c) for c in (r, g, bl))

def lum(rgb):
    def lin(c): return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (lin(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def ratio(fg, bg):
    l1, l2 = lum(oklch_to_srgb(*fg)), lum(oklch_to_srgb(*bg))
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)

# (ชื่อ, fg, bg, เกณฑ์)  — เกณฑ์: 4.5 ข้อความปกติ · 3.0 ข้อความใหญ่/UI component
T = [
    # dark theme
    ("text on bg",            (.97, .003, 90),  (.16, .004, 285), 4.5),
    ("text-2 on bg",          (.76, .005, 90),  (.16, .004, 285), 4.5),
    ("text-3 on bg",          (.62, .007, 95),  (.16, .004, 285), 4.5),
    ("text on surface",       (.97, .003, 90),  (.21, .006, 285), 4.5),
    ("text-3 on surface",     (.62, .007, 95),  (.21, .006, 285), 4.5),
    ("cta-text on cta-bg",    (.20, .006, 85),  (.95, .012, 85),  4.5),
    ("gold on bg (label)",    (.72, .10, 84),   (.16, .004, 285), 4.5),
    ("red on bg (accent txt)",(.57, .24, 23),   (.16, .004, 285), 3.0),
    ("sem-error on bg",       (.56, .19, 33),   (.16, .004, 285), 3.0),
    ("sem-error on error-bg", (.56, .19, 33),   (.24, .05, 33),   3.0),
    ("sem-success on bg",     (.62, .10, 155),  (.16, .004, 285), 4.5),
    ("sem-warn on bg",        (.72, .12, 75),   (.16, .004, 285), 4.5),
    ("focus gold on bg",      (.72, .10, 84),   (.16, .004, 285), 3.0),
    # light theme (.theme-light)
    ("lt text on cream",      (.23, .006, 85),  (.95, .012, 85),  4.5),
    ("lt muted on cream",     (.45, .012, 95),  (.95, .012, 85),  4.5),
    ("lt red-deep on cream",  (.46, .20, 23),   (.95, .012, 85),  4.5),
    ("lt text on surface-2",  (.23, .006, 85),  (.91, .015, 85),  4.5),
]

fails = 0
for name, fg, bg, need in T:
    r = ratio(fg, bg)
    ok = r >= need
    fails += (not ok)
    print(f"{'PASS' if ok else 'FAIL'}  {r:5.2f}:1  (ต้อง ≥{need})  {name}")
print(f"\n{'ALL PASS ✓' if fails == 0 else f'{fails} FAIL — แก้ tokens ก่อนใช้'}")
raise SystemExit(fails)
