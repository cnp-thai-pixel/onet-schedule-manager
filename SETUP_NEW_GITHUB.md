# คำแนะนำการย้ายโปรเจคไปยัง GitHub Repository ใหม่

## ขั้นตอนการย้ายโปรเจค

### 1. เตรียมไฟล์โปรเจค

ไฟล์ที่ได้รับ: `onet-schedule-manager-complete-source.zip`

แตกไฟล์ zip จะได้โฟลเดอร์ `onet-schedule-manager/` ที่มีไฟล์ทั้งหมด

### 2. สร้าง GitHub Repository ใหม่

1. ไปที่ [GitHub](https://github.com)
2. คลิก **New repository**
3. ตั้งชื่อ repository เช่น `onet-schedule-manager`
4. เลือก **Public** หรือ **Private**
5. **อย่า** เลือก "Initialize this repository with a README"
6. คลิก **Create repository**

### 3. Upload โปรเจคไปยัง GitHub

#### วิธีที่ 1: ใช้ Git Command Line (แนะนำ)

```bash
# 1. เข้าไปในโฟลเดอร์โปรเจค
cd onet-schedule-manager

# 2. ลบ .git เก่า (ถ้ามี)
rm -rf .git

# 3. สร้าง git repository ใหม่
git init

# 4. เพิ่มไฟล์ทั้งหมด
git add .

# 5. Commit
git commit -m "Initial commit: O-NET Schedule Manager"

# 6. เชื่อมกับ GitHub repository ใหม่
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 7. Push ไปยัง GitHub
git branch -M main
git push -u origin main
```

**หมายเหตุ:** แทนที่ `YOUR_USERNAME` และ `YOUR_REPO_NAME` ด้วยชื่อจริงของคุณ

#### วิธีที่ 2: ใช้ GitHub Desktop

1. เปิด GitHub Desktop
2. คลิก **File** → **Add Local Repository**
3. เลือกโฟลเดอร์ `onet-schedule-manager`
4. คลิก **Publish repository**
5. เลือก **Public** หรือ **Private**
6. คลิก **Publish**

#### วิธีที่ 3: ใช้ GitHub Web Interface (Drag & Drop)

1. ไปที่ repository ที่สร้างใหม่
2. คลิก **uploading an existing file**
3. Drag & Drop ไฟล์ทั้งหมดจากโฟลเดอร์ `onet-schedule-manager`
4. เขียน commit message
5. คลิก **Commit changes**

---

## การ Deploy บน Vercel

### ขั้นตอน:

#### 1. เชื่อม Vercel กับ GitHub

1. ไปที่ [vercel.com](https://vercel.com)
2. Sign up / Login ด้วย GitHub
3. อนุญาตให้ Vercel เข้าถึง GitHub

#### 2. Import โปรเจค

1. ใน Vercel Dashboard คลิก **Add New** → **Project**
2. เลือก **Import Git Repository**
3. เลือก repository ใหม่ที่สร้าง
4. คลิก **Import**

#### 3. ตั้งค่าโปรเจค

Vercel จะตรวจจับ settings อัตโนมัติจาก `vercel.json`:

- **Framework Preset:** Vite
- **Build Command:** `pnpm run build`
- **Output Directory:** `dist/public`
- **Install Command:** `pnpm install`

**ไม่ต้องแก้ไขอะไร** เพราะมีไฟล์ `vercel.json` ตั้งค่าไว้แล้ว

#### 4. Deploy

1. คลิก **Deploy**
2. รอ 2-3 นาที
3. เมื่อเสร็จจะได้ URL เช่น `https://your-project.vercel.app`

---

## การ Deploy บน GitHub Pages (ทางเลือก)

### ขั้นตอน:

#### 1. Build Production

```bash
cd onet-schedule-manager
pnpm install
pnpm run build
```

ไฟล์ที่ build จะอยู่ใน `dist/public/`

#### 2. สร้าง Branch gh-pages

```bash
# สร้าง branch gh-pages
git checkout --orphan gh-pages

# ลบไฟล์เก่าทั้งหมด
git rm -rf .

# คัดลอกไฟล์จาก dist/public/
cp -r dist/public/* .

# Commit
git add .
git commit -m "Deploy to GitHub Pages"

# Push
git push origin gh-pages
```

#### 3. ตั้งค่า GitHub Pages

1. ไปที่ repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** → **/ (root)**
4. คลิก **Save**

#### 4. เข้าถึงเว็บไซต์

URL: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

**หมายเหตุ:** ถ้าใช้ GitHub Pages ต้องแก้ไข `vite.config.ts`:

```javascript
export default defineConfig({
  base: '/YOUR_REPO_NAME/', // เปลี่ยนเป็นชื่อ repo ของคุณ
  // ...
});
```

แล้ว build ใหม่

---

## โครงสร้างไฟล์โปรเจค

```
onet-schedule-manager/
├── client/                 # Frontend source code
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/             # Static assets
│   └── index.html
├── shared/                 # Shared types and constants
├── server/                 # Server placeholder
├── csv-templates/          # CSV import templates
├── vercel.json             # Vercel configuration
├── .vercelignore           # Vercel ignore files
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind configuration
├── package.json            # Dependencies
├── README.md               # Project documentation
├── VERCEL_DEPLOYMENT.md    # Vercel deployment guide
├── GITHUB_PAGES_GUIDE.md   # GitHub Pages guide
├── DEMO_CREDENTIALS.md     # Demo login credentials
└── CHANGELOG.md            # Change history
```

---

## ไฟล์สำคัญที่ต้องรู้จัก

### 1. vercel.json
Configuration สำหรับ Vercel deployment:
- Build command
- Output directory
- Routes configuration

### 2. vite.config.ts
Configuration สำหรับ Vite build tool:
- Base path
- Plugins
- Build options

### 3. package.json
Dependencies และ scripts:
- `pnpm dev` - รัน development server
- `pnpm build` - Build production
- `pnpm preview` - Preview production build

### 4. .vercelignore
ไฟล์ที่ Vercel ไม่ต้อง upload:
- node_modules
- dist
- .env files

---

## Environment Variables (ถ้าต้องการ)

ถ้าต้องการเชื่อม Firebase หรือ API อื่นๆ:

### สำหรับ Vercel:
1. ไปที่ Vercel Dashboard → โปรเจค → **Settings** → **Environment Variables**
2. เพิ่ม variables:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```
3. Redeploy โปรเจค

### สำหรับ Local Development:
สร้างไฟล์ `.env` ในโฟลเดอร์ root:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

---

## การอัปเดตโปรเจค

### Auto Deploy (Vercel)
เมื่อเชื่อม GitHub แล้ว:
```bash
# แก้ไขโค้ด
git add .
git commit -m "Update features"
git push

# Vercel จะ deploy อัตโนมัติ
```

### Manual Deploy (Vercel CLI)
```bash
npm install -g vercel
vercel --prod
```

---

## การแก้ปัญหา

### ปัญหา: Build Failed บน Vercel
**แก้ไข:**
1. ตรวจสอบ Node.js version ใน Vercel Settings (ใช้ 18.x หรือ 20.x)
2. ตรวจสอบ `package.json` ว่ามี dependencies ครบ
3. ดู Build Logs ใน Vercel Dashboard

### ปัญหา: 404 Not Found หลัง Deploy
**แก้ไข:**
1. ตรวจสอบ `vercel.json` ว่ามี routes configuration
2. ตรวจสอบ `outputDirectory` ว่าเป็น `dist/public`
3. Redeploy โปรเจค

### ปัญหา: Assets ไม่โหลด
**แก้ไข:**
1. ตรวจสอบ `base` path ใน `vite.config.ts`
2. สำหรับ Vercel ใช้ `base: '/'`
3. สำหรับ GitHub Pages ใช้ `base: '/repo-name/'`

---

## เอกสารเพิ่มเติม

- [README.md](./README.md) - ข้อมูลโปรเจคและการใช้งาน
- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - คู่มือ deploy บน Vercel
- [GITHUB_PAGES_GUIDE.md](./GITHUB_PAGES_GUIDE.md) - คู่มือ deploy บน GitHub Pages
- [DEMO_CREDENTIALS.md](./DEMO_CREDENTIALS.md) - ข้อมูล demo login
- [CHANGELOG.md](./CHANGELOG.md) - ประวัติการเปลี่ยนแปลง

---

## สรุป

1. ✅ แตกไฟล์ `onet-schedule-manager-complete-source.zip`
2. ✅ สร้าง GitHub repository ใหม่
3. ✅ Push โปรเจคไปยัง GitHub
4. ✅ เชื่อม Vercel กับ GitHub
5. ✅ Import โปรเจคใน Vercel
6. ✅ Deploy อัตโนมัติ
7. ✅ เข้าถึงเว็บไซต์ที่ URL ที่ได้รับ

**ง่าย รวดเร็ว และฟรี!** 🚀

---

## ติดต่อและสนับสนุน

หากมีปัญหาหรือข้อสงสัย:
- ดูเอกสารใน repository
- ตรวจสอบ Build Logs ใน Vercel Dashboard
- อ่าน Vercel Documentation: https://vercel.com/docs

---

Made with ❤️ for O-NET students
