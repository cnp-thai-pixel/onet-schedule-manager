# Quick Start Guide - O-NET Schedule Manager

## 🚀 เริ่มต้นใช้งานภายใน 5 นาที

### ขั้นตอนที่ 1: แตกไฟล์
```bash
# แตกไฟล์ zip
unzip onet-schedule-manager-complete-source.zip
cd onet-schedule-manager
```

### ขั้นตอนที่ 2: ติดตั้ง Dependencies
```bash
# ติดตั้งด้วย pnpm (แนะนำ)
pnpm install

# หรือ npm
npm install
```

### ขั้นตอนที่ 3: รัน Development Server
```bash
# รัน dev server
pnpm dev

# หรือ
npm run dev
```

เปิด browser ที่ `http://localhost:3000`

---

## 📦 Deploy บน Vercel (แนะนำ)

### ขั้นตอนสั้นๆ:

1. **Push ไปยัง GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy บน Vercel**
   - ไปที่ [vercel.com](https://vercel.com)
   - Login ด้วย GitHub
   - คลิก **Add New** → **Project**
   - เลือก repository
   - คลิก **Deploy**

3. **เสร็จแล้ว!**
   - รอ 2-3 นาที
   - ได้ URL: `https://your-project.vercel.app`

---

## 🔑 Demo Login

### ผู้ดูแลระบบ (Admin)
- **Email:** admin@onet.com
- **Password:** admin123

### ครูผู้สอน (Teacher)
- **Email:** teacher@onet.com
- **Password:** teacher123

### นักเรียน (Student)
- **Email:** student@onet.com
- **Password:** student123

---

## 📚 เอกสารเพิ่มเติม

- [README.md](./README.md) - ข้อมูลโปรเจคโดยละเอียด
- [SETUP_NEW_GITHUB.md](./SETUP_NEW_GITHUB.md) - คำแนะนำย้าย GitHub
- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - คู่มือ deploy Vercel
- [GITHUB_PAGES_GUIDE.md](./GITHUB_PAGES_GUIDE.md) - คู่มือ deploy GitHub Pages

---

## ❓ ปัญหาที่พบบ่อย

### Q: pnpm command not found
**A:** ติดตั้ง pnpm:
```bash
npm install -g pnpm
```

### Q: Port 3000 ถูกใช้งานแล้ว
**A:** Vite จะหา port ว่างอัตโนมัติ หรือระบุ port เอง:
```bash
pnpm dev --port 3001
```

### Q: Build failed
**A:** ตรวจสอบ Node.js version (ต้องเป็น 18.x หรือ 20.x):
```bash
node --version
```

---

## 🎯 Next Steps

1. ✅ ทดสอบการทำงานบน localhost
2. ✅ Push ไปยัง GitHub
3. ✅ Deploy บน Vercel
4. ✅ เชื่อม Firebase (ถ้าต้องการ)
5. ✅ Customize ตามต้องการ

---

**Happy Coding! 🚀**
