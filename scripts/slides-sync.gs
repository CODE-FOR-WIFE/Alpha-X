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
 *  4. หลังจากนั้นสั่ง sync ได้จากเมนูในตัว Slides เลย: Alpha X → Sync deck from Figma
 *
 * ต้องเข้าทาง Extensions → Apps Script ของไฟล์ Slides เท่านั้น ถ้าสร้างเป็น standalone project
 * (script.google.com โดยตรง) เมนู Alpha X จะไม่โผล่ เพราะ onOpen ผูกกับไฟล์ที่เปิดอยู่
 *
 * รันครั้งหนึ่งใช้เวลาราวหนึ่งถึงสองนาที — Apps Script ตัดที่ 6 นาที ดู Execution log
 * ระหว่างรันได้ว่าไปถึงสไลด์ไหนแล้ว
 *
 * ไม่มี trigger อัตโนมัติโดยตั้งใจ — sync ลบทุก element ในสไลด์ก่อนวางรูปใหม่
 * ถ้ามันเด้งขึ้นมากลางการพรีเซนต์ ผู้ชมจะเห็นสไลด์แว็บหายกลางประโยค
 * ให้เป็นการกดสั่งเองเสมอ และอย่ากดระหว่างฉาย
 * ────────────────────────────────────────────────────────────────────
 */

var CONFIG = {
  SOURCE: 'figma',                 // 'figma' หรือ 'drive'
  PRESENTATION_ID: '1EDWQEQJYcsSbU3DSlH0KT0r8_xU3mAfaX52B2JFvlSk',

  // โหมด figma
  FIGMA_FILE_KEY: '5DZ7FTf2wXT1RNbgFVSfVU',
  FIGMA_PAGE_NAME: 'Deck 2026',    // ดึงเฉพาะเฟรมในหน้านี้
  // 2 = 3840×2160 — คมพอสำหรับฉายและ print แล้ว (สไลด์จริงกว้าง 1920)
  // เคยตั้ง 4 (7680×4320) แล้ว sync ชนเพดาน 6 นาทีของ Apps Script: 33 ล้านพิกเซล × 12 ใบ
  // ทั้ง render ทั้งโหลดทั้งยัดเข้า Slides ไม่ทัน · ขยับเป็น 3 ได้ถ้าอยากคมกว่านี้และยอมรอนานขึ้น
  FIGMA_SCALE: 2,

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

  Logger.log('เริ่มวาง %s สไลด์', items.length);
  items.forEach(function (item) {
    var slides = deck.getSlides();
    var slide = slides[item.number - 1] || deck.appendSlide(SlidesApp.PredefinedLayout.BLANK);

    slide.getPageElements().forEach(function (el) { el.remove(); });
    fitToSlide_(deck, slide.insertImage(item.blob));
    report.push(item.number + ' ← ' + item.name);
    Logger.log('  %s/%s  %s', report.length, items.length, item.name);
  });

  // สไลด์ส่วนเกินท้ายเล่ม (เช่นหน้าเปล่าที่ Google ใส่มาให้ตอนสร้างไฟล์) เอาออก
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
  Logger.log('เจอ %s เฟรมในหน้า %s — กำลังให้ Figma render ที่ scale %s', frames.length, CONFIG.FIGMA_PAGE_NAME, CONFIG.FIGMA_SCALE);
  var ids = frames.map(function (f) { return f.id; }).join(',');
  var rendered = fetchJson_(
    'https://api.figma.com/v1/images/' + CONFIG.FIGMA_FILE_KEY +
    '?ids=' + encodeURIComponent(ids) + '&format=png&scale=' + CONFIG.FIGMA_SCALE, headers);
  if (rendered.err) throw new Error('Figma render error: ' + rendered.err);

  // Figma คืน URL ทันทีแต่ไฟล์บน S3 ยังไม่พร้อม — พักก่อนเริ่มดึง
  Utilities.sleep(4000);

  return frames.map(function (f) {
    var url = rendered.images[f.id];
    if (!url) throw new Error('Figma ไม่ได้ส่งรูปของเฟรม ' + f.name);
    return { number: f.number, name: f.name, blob: fetchRendered_(f, url, headers) };
  });
}

/**
 * ดึงไฟล์รูปที่ Figma render — ต้องทนสองอย่าง:
 *  1. Figma คืน URL ก่อนไฟล์บน S3 พร้อมจริง (เจอเป็น "Address unavailable")
 *  2. URL มีอายุจำกัด เดคใหญ่ ๆ ใบท้าย ๆ อาจหมดอายุก่อนถึงคิว
 * จึงลองซ้ำแบบเว้นระยะ แล้วขอ URL ใหม่ให้เฟรมนั้นตั้งแต่รอบที่สอง
 */
function fetchRendered_(frame, url, headers) {
  var waits = [0, 3000, 6000, 10000];
  var lastErr = null;

  for (var attempt = 0; attempt < waits.length; attempt++) {
    if (waits[attempt]) Utilities.sleep(waits[attempt]);
    try {
      var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      if (res.getResponseCode() === 200) return res.getBlob();
      lastErr = 'HTTP ' + res.getResponseCode();
    } catch (e) {
      lastErr = e.message;
    }
    Logger.log('  รอ %s … (%s) ลองใหม่ครั้งที่ %s', frame.name, lastErr, attempt + 1);

    if (attempt >= 1) {
      var again = fetchJson_(
        'https://api.figma.com/v1/images/' + CONFIG.FIGMA_FILE_KEY +
        '?ids=' + encodeURIComponent(frame.id) + '&format=png&scale=' + CONFIG.FIGMA_SCALE, headers);
      if (again.images && again.images[frame.id]) url = again.images[frame.id];
    }
  }
  throw new Error('ดึงรูป ' + frame.name + ' ไม่สำเร็จหลังลอง ' + waits.length + ' ครั้ง — ' + lastErr);
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

/** เมนู Alpha X ในแถบเมนูของ Slides — เปิดไฟล์แล้วสั่ง sync ได้เลยไม่ต้องเข้า Apps Script */
function onOpen() {
  SlidesApp.getUi()
    .createMenu('Alpha X')
    .addItem('Sync deck from Figma', 'syncDeckFromMenu')
    .addToUi();
}

/** ทางเข้าจากเมนู — ถามยืนยันก่อน เพราะ sync เขียนทับทุกสไลด์ */
function syncDeckFromMenu() {
  var ui = SlidesApp.getUi();
  var answer = ui.alert(
    'Sync deck from Figma',
    'ทุกสไลด์จะถูกเขียนทับด้วยของล่าสุดจาก Figma\n\nอย่าสั่งระหว่างกำลังพรีเซนต์',
    ui.ButtonSet.OK_CANCEL);
  if (answer !== ui.Button.OK) return;

  var report = syncDeck();
  ui.alert('เสร็จแล้ว', 'อัปเดต ' + report.length + ' สไลด์', ui.ButtonSet.OK);
}

/** เผื่อเคยตั้ง trigger รายชั่วโมงไว้ก่อนหน้า — เรียกครั้งเดียวเพื่อล้างทิ้ง */
function removeAutoTriggers() {
  var removed = 0;
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'syncDeck') { ScriptApp.deleteTrigger(t); removed++; }
  });
  Logger.log('ลบ trigger อัตโนมัติแล้ว %s ตัว', removed);
  return removed;
}
