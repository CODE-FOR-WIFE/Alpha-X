// ย่อ stage 1920×1080 ให้พอดีหน้าต่าง (เปิดเต็มจอ F11 / ⌃⌘F ได้ภาพเท่าสไลด์จริง)
const fit = () => document.querySelector('.stage').style.setProperty('--fit', Math.min(innerWidth / 1920, innerHeight / 1080))
addEventListener('resize', fit); fit()
