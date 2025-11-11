# คำแนะนำการ Deploy บน Vercel

## ทำไมต้องใช้ Vercel?

Vercel เป็นแพลตฟอร์มที่ออกแบบมาสำหรับ React และ Next.js โดยเฉพาะ มีข้อดีดังนี้:

✅ **ฟรี 100%** - ไม่มีค่าใช้จ่าย  
✅ **Deploy ง่าย** - เชื่อม GitHub แล้ว deploy อัตโนมัติ  
✅ **รวดเร็ว** - Global CDN ทำให้โหลดเร็ว  
✅ **Custom Domain** - ใช้ domain ของคุณเองได้ฟรี  
✅ **Auto Deploy** - Push code → Deploy อัตโนมัติ  
✅ **HTTPS** - SSL certificate ฟรี  

---

## วิธีที่ 1: Deploy ผ่าน Vercel Dashboard (แนะนำ)

### ขั้นตอน:

#### 1. สร้างบัญชี Vercel
1. ไปที่ [vercel.com](https://vercel.com)
2. คลิก **Sign Up**
3. เลือก **Continue with GitHub** (แนะนำ)
4. อนุญาตให้ Vercel เข้าถึง GitHub

#### 2. Upload โปรเจคไปยัง GitHub
```bash
# ถ้ายังไม่มี repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/onet-schedule-manager.git
git push -u origin main
```

#### 3. Import โปรเจคใน Vercel
1. ใน Vercel Dashboard คลิก **Add New** → **Project**
2. เลือก **Import Git Repository**
3. เลือก repository `onet-schedule-manager`
4. คลิก **Import**

#### 4. ตั้งค่าโปรเจค
Vercel จะตรวจจับ settings อัตโนมัติ แต่ตรวจสอบให้แน่ใจว่า:

- **Framework Preset:** Vite
- **Build Command:** `pnpm run build`
- **Output Directory:** `dist/public`
- **Install Command:** `pnpm install`

#### 5. Deploy
1. คลิก **Deploy**
2. รอ 2-3 นาที
3. เมื่อเสร็จจะได้ URL เช่น `https://onet-schedule-manager.vercel.app`

---

## วิธีที่ 2: Deploy ผ่าน Vercel CLI

### ติดตั้ง Vercel CLI
```bash
npm install -g vercel
```

### Login
```bash
vercel login
```

### Deploy
```bash
cd /path/to/onet-schedule-manager
vercel
```

ตอบคำถาม:
- **Set up and deploy?** → Yes
- **Which scope?** → เลือก account ของคุณ
- **Link to existing project?** → No
- **What's your project's name?** → onet-schedule-manager
- **In which directory is your code located?** → ./

### Deploy Production
```bash
vercel --prod
```

---

## การตั้งค่า Custom Domain (ถ้ามี)

1. ใน Vercel Dashboard → เลือกโปรเจค
2. ไปที่ **Settings** → **Domains**
3. คลิก **Add Domain**
4. ใส่ domain ของคุณ เช่น `onet.example.com`
5. ตั้งค่า DNS ตามที่ Vercel แนะนำ:
   ```
   Type: CNAME
   Name: onet (หรือ @)
   Value: cname.vercel-dns.com
   ```

---

## Environment Variables (ถ้าต้องการ)

ถ้าโปรเจคต้องการ Firebase หรือ API keys:

1. ใน Vercel Dashboard → **Settings** → **Environment Variables**
2. เพิ่ม variables:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```
3. Redeploy โปรเจค

---

## Auto Deploy (CI/CD)

เมื่อเชื่อม GitHub แล้ว:

✅ **Push to main branch** → Deploy to Production อัตโนมัติ  
✅ **Push to other branches** → สร้าง Preview URL  
✅ **Pull Request** → สร้าง Preview URL สำหรับ review  

---

## การอัปเดตโปรเจค

### วิธีที่ 1: ผ่าน Git (แนะนำ)
```bash
# แก้ไขโค้ด
git add .
git commit -m "Update features"
git push

# Vercel จะ deploy อัตโนมัติ
```

### วิธีที่ 2: ผ่าน Vercel CLI
```bash
vercel --prod
```

---

## การแก้ปัญหา

### ปัญหา: 404 NOT_FOUND หลัง Deploy
**สาเหตุ:** Configuration ไม่ถูกต้อง  
**แก้ไข:**
1. ตรวจสอบว่า `vercel.json` ใช้ `routes` แทน `rewrites`
2. ตรวจสอบว่า `outputDirectory` เป็น `dist/public`
3. Redeploy โปรเจค:
```bash
vercel --prod
```

### ปัญหา: Build Failed
**สาเหตุ:** Dependencies ไม่ครบ  
**แก้ไข:**
1. ตรวจสอบ `package.json` ว่ามี dependencies ครบ
2. ใน Vercel → Settings → General → Node.js Version → เลือก 18.x หรือ 20.x

### ปัญหา: 404 Not Found เมื่อ Refresh
**สาเหตุ:** SPA routing ไม่ทำงาน  
**แก้ไข:** ตรวจสอบว่ามีไฟล์ `vercel.json` แล้ว (โปรเจคนี้มีแล้ว)

### ปัญหา: Assets ไม่โหลด
**สาเหตุ:** Base path ไม่ถูกต้อง  
**แก้ไข:** ตรวจสอบ `vite.config.ts` ว่า `base: '/'` (โปรเจคนี้ตั้งค่าถูกต้องแล้ว)

### ปัญหา: Build ช้า
**สาเหตุ:** Bundle size ใหญ่  
**แก้ไข:**
```javascript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        charts: ['recharts']
      }
    }
  }
}
```

---

## ข้อมูลเพิ่มเติม

### URLs ที่สำคัญ
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Documentation:** https://vercel.com/docs
- **Support:** https://vercel.com/support

### ไฟล์สำคัญในโปรเจค
- `vercel.json` - Vercel configuration
- `.vercelignore` - ไฟล์ที่ไม่ต้อง upload
- `vite.config.ts` - Build configuration

### คำสั่ง Vercel CLI
```bash
vercel          # Deploy to preview
vercel --prod   # Deploy to production
vercel ls       # List deployments
vercel logs     # View logs
vercel domains  # Manage domains
vercel env      # Manage environment variables
```

---

## สรุป

1. ✅ สร้างบัญชี Vercel และเชื่อม GitHub
2. ✅ Push โปรเจคไปยัง GitHub
3. ✅ Import โปรเจคใน Vercel
4. ✅ Deploy (อัตโนมัติ)
5. ✅ เข้าถึงเว็บไซต์ที่ URL ที่ได้รับ

**ง่าย รวดเร็ว และฟรี!** 🚀
