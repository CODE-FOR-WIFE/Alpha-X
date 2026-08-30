/**
 * AlphaX deck — keep the Google Slides deck in sync with the Figma file.
 *
 * โหมด A (ค่าเริ่มต้น, แนะนำ): ดึงรูปจาก Figma REST API ตรง ๆ
 *   กด Run ครั้งเดียว → สไลด์ทุกใบอัปเดตเป็นของล่าสุดใน Figma
 *   ไม่ต้อง export ไม่ต้องอัปโหลด Drive ไม่ต้องตั้งชื่อไฟล์
 *
 * โหมด B: อ่านรูปจากโฟลเดอร์ Drive (เผื่ออยากคุม export เอง)
 *   ตั้ง CONFIG.SOURCE = 'drive' แล้ววางไฟล์ชื่อ 01-*.png, 02-*.png … ในโฟลเดอร์
 *
 * ── ติดตั้ง (ครั้งเดียว) ─────────────────────────────────────────────
 *  1. เปิด Google Slides ที่จะใช้ → Extensions → Apps Script → วางไฟล์นี้ทับ Code.gs
 *  2. โหมด A ต้องมี Figma token: figma.com → Settings → Security →
 *     Personal access tokens → Generate (ให้สิทธิ์ File content: read)
 *     แล้วเก็บใส่ Script Properties (อย่าวางในโค้ด):
 *     Project Settings → Script Properties → Add → key `FIGMA_TOKEN`, value = token
 *  3. Run → syncDeck() (กด Authorize ครั้งแรก)
 *  4. อยากให้อัปเดตเอง: Run → installHourlyTrigger() หนึ่งครั้ง
 * ────────────────────────────────────────────────────────────────────
 */

var CONFIG = {
  SOURCE: 'figma',                 // 'figma' หรือ 'drive'
  PRESENTATION_ID: '1EDWQEQJYcsSbU3DSlH0KT0r8_xU3mAfaX52B2JFvlSk',

  // โหมด figma
  FIGMA_FILE_KEY: '5DZ7FTf2wXT1RNbgFVSfVU',
  FIGMA_PAGE_NAME: 'Deck 2026',    // ดึงเฉพาะเฟรมในหน้านี้
  // 4 = 7680×4320 (~0.6 MB/สไลด์) คมสุดที่ Figma ให้ · ทั้งเล่ม ~7 MB
  // ถ้า sync ช้าหรือไฟล์อืด ลดเป็น 3 (5760×4320, ~0.4 MB) ตายังแยกไม่ออกบนโปรเจกเตอร์
  FIGMA_SCALE: 4,

  // โหมด drive
  FOLDER_ID: '15jmJLM66xBEp9F_zLjznLZ6zNWoezVJ_',
};

/** เรียงสไลด์จากเลขนำหน้าชื่อ — รับทั้ง "01-cover.png" และ "S01 · Cover" */
var SLIDE_NUMBER = /^S?\s*(\d{1,2})/i;

function syncDeck() {
  var items = CONFIG.SOURCE === 'drive' ? imagesFromDrive_() : imagesFromFigma_();
  if (!items.length) throw new Error('ไม่พบสไลด์ที่ชื่อขึ้นต้นด้วยเลข (S01, 01-… )');

  var deck = SlidesApp.openById(CONFIG.PRESENTATION_ID);
  var report = [];

  items.forEach(function (item) {
    var slides = deck.getSlides();
    var slide = slides[item.number - 1] || deck.appendSlide(SlidesApp.PredefinedLayout.BLANK);

    slide.getPageElements().forEach(function (el) { el.remove(); });
    fitToSlide_(deck, slide.insertImage(item.blob));
    report.push(item.number + ' ← ' + item.name);
  });

  // สไลด์ส่วนเกินท้ายเล่ม (เช่นหน้าเปล่าที่ Google ใส่มาให้ตอนสร้างไฟล์) เอาออกimage.png
  deck.getSlides().slice(items.length).forEach(function (s) { s.remove(); });

  Logger.log('synced %s slides\n%s', report.length, report.join('\n'));
  return report;
}

/** โหมด A — ถามชื่อ+id ของเฟรมจาก Figma แล้วขอ URL รูปมาเป็นชุดเดียว */
function imagesFromFigma_() {
  var token = PropertiesService.getScriptProperties().getProperty('FIGMA_TOKEN');
  if (!token) throw new Error('ยังไม่ได้ตั้ง Script Property ชื่อ FIGMA_TOKEN');
  var headers = { 'X-Figma-Token': token };

  // 1) โครงไฟล์แบบตื้น ๆ พอให้เห็นเฟรมชั้นบนสุดของหน้าที่ต้องการ
  var tree = fetchJson_(
    'https://api.figma.com/v1/files/' + CONFIG.FIGMA_FILE_KEY + '?depth=2', headers);

  var pages = tree.document.children.filter(function (p) { return p.name === CONFIG.FIGMA_PAGE_NAME; });
  if (!pages.length) throw new Error('ไม่พบหน้า "' + CONFIG.FIGMA_PAGE_NAME + '" ในไฟล์ Figma');

  var frames = pages[0].children
    .filter(function (n) { return n.type === 'FRAME' && SLIDE_NUMBER.test(n.name); })
    .map(function (n) { return { number: parseInt(SLIDE_NUMBER.exec(n.name)[1], 10), id: n.id, name: n.name }; })
    .sort(function (a, b) { return a.number - b.number; });
  if (!frames.length) return [];

  // 2) ขอ URL รูปทีเดียวทุกเฟรม (Figma render ให้แล้วส่ง URL ชั่วคราวกลับมา)
  var ids = frames.map(function (f) { return f.id; }).join(',');
  var rendered = fetchJson_(
    'https://api.figma.com/v1/images/' + CONFIG.FIGMA_FILE_KEY +
    '?ids=' + encodeURIComponent(ids) + '&format=png&scale=' + CONFIG.FIGMA_SCALE, headers);
  if (rendered.err) throw new Error('Figma render error: ' + rendered.err);

  return frames.map(function (f) {
    var url = rendered.images[f.id];
    if (!url) throw new Error('Figma ไม่ได้ส่งรูปของเฟรม ' + f.name);
    return { number: f.number, name: f.name, blob: UrlFetchApp.fetch(url).getBlob() };
  });
}

/** โหมด B — รูปในโฟลเดอร์ Drive, ชื่อซ้ำเลขกันเอาไฟล์ที่แก้ล่าสุด */
function imagesFromDrive_() {
  var files = DriveApp.getFolderById(CONFIG.FOLDER_ID).getFiles();
  var byNumber = {};

  while (files.hasNext()) {
    var file = files.next();
    if (file.getMimeType().indexOf('image/') !== 0) continue;
    var match = SLIDE_NUMBER.exec(file.getName());
    if (!match) continue;

    var n = parseInt(match[1], 10);
    if (!byNumber[n] || file.getLastUpdated() > byNumber[n].updated) {
      byNumber[n] = { number: n, name: file.getName(), blob: file.getBlob(), updated: file.getLastUpdated() };
    }
  }

  return Object.keys(byNumber)
    .map(function (k) { return byNumber[k]; })
    .sort(function (a, b) { return a.number - b.number; });
}

function fetchJson_(url, headers) {
  var res = UrlFetchApp.fetch(url, { headers: headers, muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) {
    throw new Error('Figma API ' + res.getResponseCode() + ': ' + res.getContentText().slice(0, 300));
  }
  return JSON.parse(res.getContentText());
}

/** ขยายรูปให้เต็มหน้าสไลด์แบบรักษาสัดส่วน */
function fitToSlide_(deck, picture) {
  var pageW = deck.getPageWidth(), pageH = deck.getPageHeight();
  var scale = Math.min(pageW / picture.getWidth(), pageH / picture.getHeight());
  picture.setWidth(picture.getWidth() * scale);
  picture.setHeight(picture.getHeight() * scale);
  picture.setLeft((pageW - picture.getWidth()) / 2);
  picture.setTop((pageH - picture.getHeight()) / 2);
}

/** อัปเดตเองทุกชั่วโมง — รันครั้งเดียวพอ (รันซ้ำไม่สร้าง trigger ซ้อน) */
function installHourlyTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'syncDeck') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('syncDeck').timeBased().everyHours(1).create();
  Logger.log('ตั้ง trigger รายชั่วโมงให้ syncDeck แล้ว');
}
