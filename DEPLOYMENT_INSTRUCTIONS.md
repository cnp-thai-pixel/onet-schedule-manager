# คำแนะนำการ Deploy บน GitHub Pages

## ขั้นตอนการ Deploy

### 1. เตรียมไฟล์
- ดาวน์โหลดไฟล์ `onet-schedule-manager-github-pages-FINAL-v2.zip`
- แตกไฟล์ zip จะได้โฟลเดอร์ `dist/public/` ที่มีไฟล์:
  - `index.html`
  - `assets/` (โฟลเดอร์ที่มี JS และ CSS)

### 2. Upload ไปยัง GitHub Repository

#### วิธีที่ 1: ใช้ GitHub Web Interface
1. ไปที่ repository: `https://github.com/jare3289/onet-schedule-manager`
2. คลิกที่ Settings → Pages
3. ตั้งค่า Source: Deploy from a branch
4. เลือก Branch: `gh-pages` (ถ้ายังไม่มีให้สร้างใหม่)
5. Upload ไฟล์ทั้งหมดจาก `dist/public/` ไปที่ root ของ branch `gh-pages`

#### วิธีที่ 2: ใช้ Git Command Line
```bash
# 1. Clone repository
git clone https://github.com/jare3289/onet-schedule-manager.git
cd onet-schedule-manager

# 2. สร้างและเปลี่ยนไปยัง branch gh-pages
git checkout --orphan gh-pages

# 3. ลบไฟล์เก่าทั้งหมด
git rm -rf .

# 4. คัดลอกไฟล์จาก dist/public/
cp -r /path/to/dist/public/* .

# 5. Commit และ Push
git add .
git commit -m "Deploy O-NET Schedule Manager to GitHub Pages"
git push origin gh-pages
```

### 3. ตรวจสอบการทำงาน
- รอ 2-3 นาทีให้ GitHub Pages build เสร็จ
- เปิดเว็บไซต์ที่: `https://jare3289.github.io/onet-schedule-manager/`
- ตรวจสอบว่าหน้าเว็บแสดงผลถูกต้อง

### 4. ทดสอบการทำงาน
- คลิกปุ่ม "เข้าสู่ระบบ" → ควรไปที่หน้า Login
- Login ด้วย demo credentials (ดูใน DEMO_CREDENTIALS.md)
- ทดสอบ navigation ใน Sidebar
- ทดสอบ Logout

## โครงสร้างไฟล์ที่ต้อง Upload

```
gh-pages branch (root)
├── index.html
└── assets/
    ├── index-ByrygPSN.js
    └── index-JRCrPWAW.css
```

## หมายเหตุสำคัญ

### Base Path
- Production build ใช้ base path: `/onet-schedule-manager/`
- ถ้าเปลี่ยนชื่อ repository ต้อง build ใหม่โดยแก้ไข `vite.config.ts`

### Hash Router
- ใช้ Hash-based routing (`#/login`, `#/dashboard`)
- ไม่ต้องตั้งค่า redirect หรือ 404.html

### Assets
- ไฟล์ JS และ CSS อยู่ใน `/onet-schedule-manager/assets/`
- ไม่ต้องแก้ไข path ใน index.html (build ไว้ถูกต้องแล้ว)

## การแก้ปัญหา

### ปัญหา: หน้าเว็บไม่แสดงอะไรเลย
- ตรวจสอบว่า upload ไฟล์ครบถ้วน (index.html + assets/)
- ตรวจสอบ Console ใน Browser (F12) ว่ามี error หรือไม่
- ตรวจสอบว่า GitHub Pages เปิดใช้งานแล้ว

### ปัญหา: CSS/JS ไม่โหลด (404 error)
- ตรวจสอบว่าโฟลเดอร์ `assets/` อยู่ใน root ของ gh-pages branch
- ตรวจสอบ path ใน index.html ว่าเป็น `/onet-schedule-manager/assets/...`

### ปัญหา: Navigation ไม่ทำงาน
- ตรวจสอบว่า URL มี `#` (hash) เช่น `#/login`
- ตรวจสอบ Console ว่ามี JavaScript error หรือไม่

## ข้อมูลเพิ่มเติม

- Repository: https://github.com/jare3289/onet-schedule-manager
- Website URL: https://jare3289.github.io/onet-schedule-manager/
- Demo Credentials: ดูใน `DEMO_CREDENTIALS.md`
- คู่มือการใช้งาน: ดูใน `GITHUB_PAGES_GUIDE.md`
