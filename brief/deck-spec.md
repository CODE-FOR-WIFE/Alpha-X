# Alpha X Proposal Deck — build notes

**The deck now lives in Figma (source of truth):**
https://www.figma.com/design/5DZ7FTf2wXT1RNbgFVSfVU/AlphaX → page **Deck 2026**

All copy is **English**. This file records the system behind the file so the deck can be extended consistently.

---

## Frame & grid
- Frame **1920 × 1080**, laid out 4 across × 3 down with 200px gutters
- Margin 112px left/right · 64px top/bottom
- Every slide sits on `bg/black` — dark throughout

## Local variables — `Alpha X · Color`
| Variable | Hex | Role |
|---|---|---|
| bg/black | #0B0B0D | slide background |
| bg/ink | #16161A | cards, surfaces |
| bg/ink-2 | #212127 | second-level surface |
| brand/red | #E4002D | the only accent that raises its voice |
| brand/gold | #C9A24B | secondary accent, Club/lifestyle only |
| brand/cream | #F4EFE6 | primary button fill, editorial light |
| text/primary | #F5F4F2 | body copy on black |
| text/second | #B9B7B2 | secondary copy |
| text/caption | #9A968C | captions, labels — never lighter (AA) |
| line/hairline | #2E2E34 | dividers, card strokes |

**Red rule:** a mark, never a surface — tick before the eyebrow, the X motif, an emphasised figure, the highlighted node. Primary buttons are cream on black.

## Text styles (scale is ×1.6 of the web scale)
`Display/Hero 128` · `Display/H2 78` · `Display/H2 Italic` · `Heading/H3 40` · `Body/Lead 32` · `Body/Base 26` · `Label/Caps 22` (0.18em, uppercase) · `Body/Caption 19`

Display = **Playfair Display**. Everything else = **Anuphan** — standing in for **ALPHA X**, which is not installed on this machine. Install the brand font and the text styles switch over in one edit.

## Components
| Component | Properties | Used for |
|---|---|---|
| `Slide/Head` | Eyebrow, Heading | the head block on slides 02–11 (red tick + eyebrow, wordmark right, H2, hairline) |
| `Card` | Title, Body | every text card in the deck |
| `Placeholder` | Label | anything still awaiting an asset — the label says what is missing |

## The X motif
Two vector legs, the site's own signature: a red leg at 31.3° crossed near its head by a short white leg. On the cover (top right) and the closing slide (mirrored). Same construction as `.x-mark` in the demo site.

---

## Slides
| # | Slide | Notes |
|---|---|---|
| 01 | Cover | "Wealth with *Passion*" · X motif |
| 02 | Who We Are | CFW-Intelligent message — belief lead, the two-question pull quote, philosophy card, three capability cards |
| 03 | Why Revamp | Today vs Vision columns · why-now bar (THB 20bn, IPO 4–5 yrs, new asset classes) |
| 04 | Audience | Three personas, each mapped to what the new site gives them |
| 05 | Brand Persona | "Calm. Intelligent. Trusted. *Never trying too hard.*" · 3 moods · 4 values |
| 06 | Design System | Swatches, type specimen, spacing bars, buttons — "change one token, the whole site follows" |
| 07 | Architecture | Root domain + 5 page nodes, Alpha X Club highlighted |
| 08 | Key Screens | Two demo screenshot slots |
| 09 | Content Strategy | Cadence + SEO cards · Collector / Explorer / Connoisseur pillars |
| 10 | Tech & Security | Next.js → Payload → PostgreSQL → Azure · two checklists · closing hook |
| 11 | Timeline & Investment | 5 phases with gates · THB 470,000 / 30,000 per month / 1 month warranty |
| 12 | Live Demo | Centred close, QR slot, X motif · **copy states only what the demo actually does** — video lightbox has no file yet, so “every interaction is live” was removed |

## Still awaiting
| Slide | What | From |
|---|---|---|
| 02 | Client logos / selected work / credentials · project team names | CFW |
| 03 | Current-site screenshot (`brief/assets/current-site.png`) · new-site crop | demo |
| 04 | Three persona icons (lucide) | design |
| 05 | Three mood images | image gen |
| 06 | Component states card | during build |
| 08 | Two demo screenshots | after Vercel deploy |
| 09 | Three pillar images | image gen |
| 12 | Live URL + QR | after deploy |
| — | `demo/public/assets/alpha-x-story.mp4` — video lightbox points at it but the file is missing | เจนหรือหาไฟล์วิดีโอ |
