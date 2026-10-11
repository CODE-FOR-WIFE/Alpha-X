// AlphaX dev server — bun serve.ts → http://localhost:4321
// เสิร์ฟไฟล์ทั้งโฟลเดอร์ + auto-reload (SSE) เมื่อไฟล์ใดเปลี่ยน
// ponytail: reload ทั้งหน้าเสมอ ไม่ทำ HMR — พอสำหรับ HTML deck/progress
import { watch } from "fs";
import { resolve, sep } from "path";

const ROOT = import.meta.dir;
const clients = new Set<ReadableStreamDefaultController>();
const RELOAD = `<script>new EventSource("/__events").onmessage=e=>{if(e.data==="reload")location.reload()}</script>`;

// เสิร์ฟเฉพาะไฟล์ในโฟลเดอร์โปรเจกต์ กัน ..%2F และไฟล์ซ่อน (.env, .git)
function fileInsideRoot(pathname: string): string | null {
  let decoded: string;
  try { decoded = decodeURIComponent(pathname); } catch { return null; }
  if (decoded.includes("\0")) return null;
  const rel = (decoded === "/" ? "/progress.html" : decoded).replace(/^\/+/, "");
  if (!rel || rel.split("/").some((part) => part.startsWith("."))) return null;
  const full = resolve(ROOT, rel);
  if (full !== ROOT && !full.startsWith(ROOT + sep)) return null;
  return full === ROOT ? null : full;
}

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
  hostname: "127.0.0.1",
  async fetch(req) {
    const path = new URL(req.url).pathname;
    if (path === "/__events") {
      return new Response(new ReadableStream({
        start(c) { clients.add(c); c.enqueue("data: hi\n\n"); },
        cancel(c) { clients.delete(c); },
      }), { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" } });
    }
    const full = fileInsideRoot(path);
    const file = full ? Bun.file(full) : null;
    if (!file || !(await file.exists())) {
      return new Response("404", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }
    if (full?.endsWith(".html")) {
      const html = (await file.text()).replace("</body>", RELOAD + "</body>");
      return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }
    return new Response(file);
  },
});
console.log("AlphaX dev server → http://localhost:4321  (progress)");
