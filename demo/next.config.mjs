/** @type {import('next').NextConfig} */
export default {
  // ponytail: static export — เนื้อหา hardcode ทั้งหมด ไม่มี server ให้พังตอน pitch
  output: 'export',
  // trailingSlash: ให้ได้ club/index.html เพื่อให้ static server ธรรมดาเปิด /club/ ได้ ไม่ 404
  trailingSlash: true,
  images: { unoptimized: true },
}
