// AlphaX dev server — bun serve.ts → http://localhost:4321
// เสิร์ฟไฟล์ทั้งโฟลเดอร์ + auto-reload (SSE) เมื่อไฟล์ใดเปลี่ยน
// ponytail: reload ทั้งหน้าเสมอ ไม่ทำ HMR — พอสำหรับ HTML deck/progress
import { watch } from "fs";

const ROOT = import.meta.dir;
const clients = new Set<ReadableStreamDefaultController>();
const RELOAD = `<script>new EventSource("/__events").onmessage=e=>{if(e.data==="reload")location.reload()}</script>`;

let t: Timer | null = null;
watch(ROOT, { recursive: true }, (_e, file) => {
  if (file?.includes("node_modules") || file?.startsWith(".git")) return;
  if (t) clearTimeout(t);
  t = setTimeout(() => {
    for (const c of clients) { try { c.enqueue("data: reload\n\n"); } catch {} }
    console.log("↻", file);
  }, 120);
});

Bun.serve({
  port: 4321,
  async fetch(req) {
    const path = decodeURIComponent(new URL(req.url).pathname);
    if (path === "/__events") {
      return new Response(new ReadableStream({
        start(c) { clients.add(c); c.enqueue("data: hi\n\n"); },
        cancel(c) { clients.delete(c); },
      }), { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" } });
    }
    const file = Bun.file(ROOT + (path === "/" ? "/progress.html" : path));
    if (!(await file.exists())) return new Response("404: " + path, { status: 404 });
    if (path.endsWith(".html") || path === "/") {
      const html = (await file.text()).replace("</body>", RELOAD + "</body>");
      return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }
    return new Response(file);
  },
});
console.log("AlphaX dev server → http://localhost:4321  (progress)");
