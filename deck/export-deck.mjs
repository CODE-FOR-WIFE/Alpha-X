import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright-core'

const scriptDir = fileURLToPath(new URL('.', import.meta.url))
const projectRoot = resolve(scriptDir, '..')
const outputDir = join(projectRoot, 'deck/exports')
const chromeCandidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)
const executablePath = chromeCandidates.find((candidate) => existsSync(candidate))

if (!executablePath) {
  throw new Error('ไม่พบ Chrome/Chromium กรุณากำหนด CHROME_PATH แล้วรันใหม่')
}

const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
}

const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
  const requested = pathname === '/' ? '/deck/deck.html' : pathname
  const filePath = normalize(join(projectRoot, requested))

  if (!filePath.startsWith(`${projectRoot}/`) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404).end('Not found')
    return
  }

  response.writeHead(200, {
    'Cache-Control': 'no-store',
    'Content-Type': mime[extname(filePath).toLowerCase()] || 'application/octet-stream',
  })
  createReadStream(filePath).pipe(response)
})

await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen))
const address = server.address()
const baseURL = `http://127.0.0.1:${address.port}/deck/deck.html?nativeExport=1`
mkdirSync(outputDir, { recursive: true })

let browser
try {
  browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ['--disable-gpu', '--font-render-hinting=none'],
  })
  const context = await browser.newContext({
    colorScheme: 'dark',
    deviceScaleFactor: 2,
    locale: 'th-TH',
    reducedMotion: 'reduce',
    viewport: { width: 1920, height: 1080 },
  })
  const page = await context.newPage()
  await page.goto(`${baseURL}#1`, { waitUntil: 'networkidle' })
  const slideCount = await page.locator('.slide').count()

  if (slideCount !== 12) throw new Error(`คาดว่า Deck มี 12 สไลด์ แต่พบ ${slideCount}`)

  for (let index = 1; index <= slideCount; index += 1) {
    await page.goto(`${baseURL}#${index}`, { waitUntil: 'networkidle' })
    const readiness = await page.evaluate(async () => {
      const fontFaces = ['ALPHA X', 'Anuphan', 'Playfair Display', 'Trirong']
      await Promise.all(fontFaces.map((font) => document.fonts.load(`16px "${font}"`, 'ALPHA X ทดสอบ')))
      await document.fonts.ready
      await Promise.all(
        [...document.images].map(async (image) => {
          if (!image.complete) await new Promise((resolveImage) => image.addEventListener('load', resolveImage, { once: true }))
          if (image.decode) await image.decode().catch(() => undefined)
        }),
      )
      await new Promise((resolveFrame) => requestAnimationFrame(() => requestAnimationFrame(resolveFrame)))
      const active = document.querySelector('.slide.active')
      const rect = active?.getBoundingClientRect()
      return {
        fonts: {
          alphaX: document.fonts.check('16px "ALPHA X"'),
          anuphan: document.fonts.check('16px "Anuphan"'),
          playfair: document.fonts.check('16px "Playfair Display"'),
          trirong: document.fonts.check('16px "Trirong"'),
          status: document.fonts.status,
        },
        rect: rect && { height: rect.height, width: rect.width, x: rect.x, y: rect.y },
      }
    })

    if (readiness.fonts.status !== 'loaded' || Object.values(readiness.fonts).includes(false)) {
      throw new Error(`สไลด์ ${index}: ฟอนต์โหลดไม่ครบ ${JSON.stringify(readiness.fonts)}`)
    }
    if (!readiness.rect || readiness.rect.width !== 1920 || readiness.rect.height !== 1080 || readiness.rect.x !== 0 || readiness.rect.y !== 0) {
      throw new Error(`สไลด์ ${index}: layout frame ไม่ตรง 1920x1080 ${JSON.stringify(readiness.rect)}`)
    }

    const output = join(outputDir, `alphax-slide-${String(index).padStart(2, '0')}.png`)
    const buffer = await page.locator('.slide.active').screenshot({
      animations: 'disabled',
      caret: 'hide',
      path: output,
      scale: 'device',
    })
    const width = buffer.readUInt32BE(16)
    const height = buffer.readUInt32BE(20)
    if (width !== 3840 || height !== 2160) {
      throw new Error(`สไลด์ ${index}: PNG มีขนาด ${width}x${height} แทนที่จะเป็น 3840x2160`)
    }
    process.stdout.write(`✓ ${String(index).padStart(2, '0')}  ${width}×${height}  fonts loaded\n`)
  }

  await context.close()
  process.stdout.write(`\nExport สำเร็จ ${slideCount} สไลด์ → ${outputDir}\n`)
} finally {
  if (browser) await browser.close()
  await new Promise((resolveClose) => server.close(resolveClose))
}
