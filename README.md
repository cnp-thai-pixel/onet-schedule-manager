# O-NET Schedule Manager

ระบบจัดการตารางติว O-NET พร้อมเช็กชื่อนักเรียน รายงานการเข้าร่วม และจัดการข้อมูลพื้นฐาน

## คุณสมบัติหลัก

- **Dashboard**: แสดงภาพรวมระบบด้วย KPI Cards (คาบตามแผน, คาบที่เรียนแล้ว, อัตราเข้าร่วม, นักเรียนเสี่ยง)
- **ตารางติว**: แสดงตารางติวทั้งหมด 11 ห้องเรียน (ม.6/1 - ม.6/11) พร้อม 2 Tabs (วันนี้ + ทั้งหมด)
- **คาบวันนี้**: แสดงคาบติวในวันนี้พร้อมปุ่มเช็กชื่อ
- **เช็กชื่อ**: ระบบเช็กชื่อนักเรียนพร้อมสถานะ (มา, สาย, ขาด, ลา)
- **รายงาน**: รายงานการเข้าร่วม 3 แบบ (รายนักเรียน, รายห้อง, รายวิชา) พร้อม Badge PASS/NOT PASS
- **ข้อมูลพื้นฐาน**: จัดการข้อมูลห้องเรียน นักเรียน ครู และวิชา
- **ตั้งค่า**: ตั้งค่าระบบ การแจ้งเตือน และความปลอดภัย

## เทคโนโลยีที่ใช้

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: Firebase Firestore
- **Routing**: Wouter
- **Font**: Prompt (Google Fonts)

## Firebase Configuration

```javascript
{
  apiKey: "AIzaSyBYWBNmNvt_TMnpQqkk7PJ28asgWOOtSOw",
  authDomain: "onet-cc77e.firebaseapp.com",
  projectId: "onet-cc77e",
  storageBucket: "onet-cc77e.firebasestorage.app",
  messagingSenderId: "588150070857",
  appId: "1:588150070857:web:ed8e041db582c82abb6998",
  measurementId: "G-5JFG6Y0G1T"
}
```

## Firestore Collections

### classrooms
```typescript
{
  id: string;
  name: string;
  level: string;
  studentCount: number;
}
```

### students
```typescript
{
  id: string;
  classroom: string;
  number: number;
  firstName: string;
  lastName: string;
  studentId?: string;
}
```

### sessions
```typescript
{
  id: string;
  classroom: string;
  subject: string;
  teacher: string;
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  status: 'OPEN' | 'DONE' | 'CANCELLED';
}
```

### attendance
```typescript
{
  id?: string;
  studentId: string;
  studentName: string;
  classroom: string;
  status: 'P' | 'L' | 'A' | 'E'; // Present, Late, Absent, Excused
  sessionId: string;
}
```

## การติดตั้งและรัน

### Development

```bash
# ติดตั้ง dependencies
pnpm install

# รันเซิร์ฟเวอร์ dev
pnpm dev
```

### Production Build

```bash
# Build สำหรับ production
pnpm build

# ไฟล์ที่ build จะอยู่ใน client/dist
```

## การ Deploy

### Vercel (แนะนำ) ⭐

```bash
# ติดตั้ง Vercel CLI
npm install -g vercel

# Deploy
vercel
```

หรือ deploy ผ่าน [Vercel Dashboard](https://vercel.com):
1. Import GitHub repository
2. Deploy อัตโนมัติ

📖 [คู่มือการ Deploy บน Vercel](./VERCEL_DEPLOYMENT.md)

### GitHub Pages

1. Build โปรเจ็กต์:
```bash
pnpm build
```

2. ไฟล์ที่สำคัญสำหรับ GitHub Pages จะอยู่ใน `client/dist/`:
   - `index.html` - หน้าหลัก
   - `assets/` - ไฟล์ CSS, JS, และรูปภาพ
   - `vite.svg` - Favicon

3. อัปโหลดไฟล์ทั้งหมดใน `client/dist/` ไปยัง GitHub repository

4. ตั้งค่า GitHub Pages ใน Settings > Pages:
   - Source: Deploy from a branch
   - Branch: main (หรือ branch ที่ต้องการ)
   - Folder: / (root)

5. เข้าถึงเว็บไซต์ที่: `https://<username>.github.io/<repository-name>/`

## โครงสร้างโปรเจ็กต์

```
onet-schedule-manager/
├── client/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # UI components
│   │   │   ├── ui/      # shadcn/ui components
│   │   │   └── DashboardLayout.tsx
│   │   ├── contexts/    # React contexts
│   │   ├── hooks/       # Custom hooks
│   │   ├── lib/         # Utilities
│   │   │   └── firebase.ts
│   │   ├── pages/       # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Schedule.tsx
│   │   │   ├── SessionsToday.tsx
│   │   │   ├── Attendance.tsx
│   │   │   ├── Reports.tsx
│   │   │   ├── Masters.tsx
│   │   │   └── Settings.tsx
│   │   ├── App.tsx      # Main app component
│   │   ├── main.tsx     # Entry point
│   │   └── index.css    # Global styles
│   └── index.html       # HTML template
├── package.json
└── README.md
```

## ข้อมูลระบบ

- **จำนวนห้องเรียน**: 11 ห้อง (ม.6/1 - ม.6/11)
- **นักเรียนต่อห้อง**: 40 คน
- **วันติว**: อังคาร (08:30-10:20) และศุกร์ (13:05-15:50)
- **ระยะเวลา**: 28 ต.ค. 2568 - 13 มี.ค. 2569 (20 สัปดาห์)

## สี Theme

- **Primary**: #0284C7 (Sky Blue)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Orange)
- **Danger**: #EF4444 (Red)
- **Dark**: #0F172A (Slate)

## Logo

![Logo](https://img5.pic.in.th/file/secure-sv1/CNPLOGO.png)

## License

MIT License
