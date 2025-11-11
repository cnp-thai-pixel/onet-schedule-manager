# คำแนะนำการ Deploy บน GitHub Pages

## ขั้นตอนการ Deploy

### 1. เตรียมไฟล์

ไฟล์ที่จำเป็นสำหรับ GitHub Pages อยู่ในโฟลเดอร์ `github-pages/`:
- `index.html` - หน้าหลักของเว็บไซต์
- `assets/` - โฟลเดอร์ที่มี CSS และ JavaScript files

หรือใช้ไฟล์ ZIP: `onet-schedule-manager-github-pages.zip`

### 2. สร้าง GitHub Repository

1. ไปที่ [GitHub](https://github.com) และสร้าง repository ใหม่
2. ตั้งชื่อ repository (เช่น `onet-schedule-manager`)
3. เลือก Public repository
4. ไม่ต้องเลือก "Initialize this repository with a README"

### 3. อัปโหลดไฟล์

#### วิธีที่ 1: ใช้ GitHub Web Interface

1. ไปที่ repository ที่สร้างใหม่
2. คลิก "uploading an existing file"
3. ลากไฟล์ทั้งหมดจากโฟลเดอร์ `github-pages/` มาวาง
4. กรอก commit message เช่น "Initial commit"
5. คลิก "Commit changes"

#### วิธีที่ 2: ใช้ Git Command Line

```bash
# แตกไฟล์ ZIP
unzip onet-schedule-manager-github-pages.zip

# ไปที่โฟลเดอร์
cd github-pages

# Initialize git
git init

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit
git commit -m "Initial commit"

# เพิ่ม remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push ไปยัง GitHub
git branch -M main
git push -u origin main
```

### 4. เปิดใช้งาน GitHub Pages

1. ไปที่ repository settings
2. เลือก "Pages" จากเมนูด้านซ้าย
3. ในส่วน "Source":
   - Branch: เลือก `main`
   - Folder: เลือก `/ (root)`
4. คลิก "Save"
5. รอสักครู่ GitHub จะ build และ deploy เว็บไซต์

### 5. เข้าถึงเว็บไซต์

เว็บไซต์จะพร้อมใช้งานที่:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

ตัวอย่าง:
- Username: `johndoe`
- Repository: `onet-schedule-manager`
- URL: `https://johndoe.github.io/onet-schedule-manager/`

## การอัปเดตเว็บไซต์

เมื่อต้องการอัปเดตเว็บไซต์:

1. Build โปรเจ็กต์ใหม่:
```bash
pnpm build
```

2. คัดลอกไฟล์จาก `dist/public/` ไปยัง repository

3. Commit และ Push:
```bash
git add .
git commit -m "Update website"
git push
```

GitHub Pages จะอัปเดตเว็บไซต์อัตโนมัติภายในไม่กี่นาที

## หมายเหตุสำคัญ

### Firebase Configuration

เว็บไซต์นี้ใช้ Firebase Firestore สำหรับจัดเก็บข้อมูล คุณต้อง:

1. **ตั้งค่า Firebase Security Rules** ที่ Firebase Console:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // เปลี่ยนเป็น rules ที่เหมาะสมในการใช้งานจริง
    }
  }
}
```

2. **เพิ่มโดเมนของ GitHub Pages** ใน Firebase Console:
   - ไปที่ Project Settings > Authorized domains
   - เพิ่ม `YOUR_USERNAME.github.io`

### ข้อมูลตัวอย่าง

เว็บไซต์ยังไม่มีข้อมูลตัวอย่างใน Firestore คุณต้องเพิ่มข้อมูลผ่าน:
- Firebase Console (Firestore Database)
- หน้า "ข้อมูลพื้นฐาน" ในเว็บไซต์ (เมื่อพัฒนาฟีเจอร์เพิ่มข้อมูลเสร็จ)

### Custom Domain (ถ้าต้องการ)

หากต้องการใช้โดเมนของคุณเอง:

1. สร้างไฟล์ `CNAME` ในโฟลเดอร์ `github-pages/`:
```
yourdomain.com
```

2. ตั้งค่า DNS ของโดเมนให้ชี้ไปที่ GitHub Pages:
```
A Record: 185.199.108.153
A Record: 185.199.109.153
A Record: 185.199.110.153
A Record: 185.199.111.153
```

3. ใน GitHub Pages settings, กรอกโดเมนของคุณ

## การแก้ไขปัญหา

### ปัญหา: หน้าเว็บแสดง 404

**วิธีแก้:**
- ตรวจสอบว่า GitHub Pages ถูกเปิดใช้งานแล้ว
- ตรวจสอบว่าไฟล์ `index.html` อยู่ใน root ของ repository
- รอ 5-10 นาทีหลังจาก push ครั้งแรก

### ปัญหา: CSS/JS ไม่โหลด

**วิธีแก้:**
- ตรวจสอบว่าโฟลเดอร์ `assets/` อยู่ใน repository
- ตรวจสอบ path ของไฟล์ใน `index.html`

### ปัญหา: Firebase ไม่ทำงาน

**วิธีแก้:**
- ตรวจสอบ Firebase Security Rules
- ตรวจสอบว่าโดเมน GitHub Pages ถูกเพิ่มใน Authorized domains
- เปิด Browser Console เพื่อดู error messages

## ทรัพยากรเพิ่มเติม

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
