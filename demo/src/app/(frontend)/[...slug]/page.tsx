import { ComingSoon } from '@/components/coming-soon'

// หน้าที่อยู่ใน sitemap แต่ยังไม่ได้ทำในเดโมรอบนี้ — กดจากเมนูแล้วเจอหน้าอธิบายตัวเอง
// static export ต้องรู้ path ล่วงหน้า จึงประกาศไว้ตรงนี้แทนที่จะพึ่ง not-found ตอน runtime
export function generateStaticParams() {
  return [{ slug: ['about'] }, { slug: ['products'] }, { slug: ['contact'] }]
}

export default function ComingSoonPage() {
  return <ComingSoon />
}
