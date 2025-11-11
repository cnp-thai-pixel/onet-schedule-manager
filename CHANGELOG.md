# Changelog - O-NET Schedule Manager

## Version 2025-01-11 - GitHub Pages Base Path Fix

### 🐛 Critical Bug Fix
- แก้ไขปัญหาเว็บไซต์ไม่แสดงผลบน GitHub Pages
- เพิ่ม base path `/onet-schedule-manager/` ใน vite.config.ts
- Asset paths ถูกต้องแล้ว (JS, CSS)

### ✨ Changes
1. **vite.config.ts**
   - เพิ่ม `base: '/onet-schedule-manager/'` สำหรับ production build
   - Dev server ยังคงใช้ base path `/` เพื่อการพัฒนา

2. **Production Build**
   - Build ใหม่ด้วย base path ที่ถูกต้อง
   - ไฟล์ index.html มี asset paths: `/onet-schedule-manager/assets/...`

### 📦 Deployment
- ไฟล์: `onet-schedule-manager-github-pages-FINAL-v2.zip`
- แตกไฟล์และ upload ไปที่ GitHub Pages
- URL: `https://jare3289.github.io/onet-schedule-manager/`

---

## Version 2025-01-05 - Hash Router Navigation Fix

### 🐛 Bug Fixes
- แก้ไขปัญหา Hash Router navigation ที่ทำให้ URL เปลี่ยนไปเป็น 404 error
- แก้ไขปัญหาปุ่ม Role Selection ที่ส่ง query parameter (?role=student) ทำให้เกิด 404

### ✨ Changes
1. **useHashLocation Hook**
   - ปรับปรุง return type ให้ทำงานร่วมกับ wouter Router ได้อย่างถูกต้อง
   - เพิ่ม useCallback เพื่อ optimize performance

2. **App.tsx**
   - ใช้ `Router` component จาก wouter พร้อม custom `useHashLocation` hook
   - รองรับ hash-based routing สำหรับ GitHub Pages

3. **Landing.tsx**
   - เปลี่ยนจาก `setLocation('/login?role=${role}')` เป็น `setLocation('/login')`
   - ลบ query parameter ที่ไม่จำเป็นออก

### ✅ Testing Results
- ✅ Landing Page → Login (ทุกปุ่ม Role Selection ทำงานได้)
- ✅ Login → Dashboard (หลัง login สำเร็จ)
- ✅ Dashboard → ตารางติว (เมนู Sidebar navigation)
- ✅ Logout → Landing Page (กลับหน้าแรกได้)
- ✅ Login → กลับหน้าแรก (ปุ่มกลับทำงานได้)

### 📦 Deployment
- สร้าง production build ใหม่: `onet-schedule-manager-github-pages-FIXED.zip`
- พร้อม deploy บน GitHub Pages
- รองรับ hash-based URLs: `https://jare3289.github.io/onet-schedule-manager/#/`

### 🔧 Technical Details
- Framework: React 19 + Vite
- Routing: Wouter with custom useHashLocation hook
- Styling: Tailwind CSS 4
- Deployment: GitHub Pages (static hosting)

---

## Previous Versions

### Version 2025-01-04 - Initial Release
- ✅ สร้างระบบ O-NET Schedule Manager สมบูรณ์
- ✅ UI แบบ Atlantis Dashboard ด้วย Blue theme (#1572E8)
- ✅ Authentication system รองรับ 3 roles (Student/Teacher/Admin)
- ✅ Dashboard พร้อม charts และ metrics
- ✅ CSV Import/Export functionality
- ✅ Collapsible Sidebar navigation
- ⚠️ มีปัญหา Hash Router navigation (แก้ไขแล้วใน version ล่าสุด)
