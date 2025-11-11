import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, Bell, Database, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const handleSave = () => {
    toast.success('บันทึกการตั้งค่าสำเร็จ');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">ตั้งค่า</h1>
          <p className="text-muted-foreground">จัดการการตั้งค่าระบบ</p>
        </div>

        <div className="grid gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                <CardTitle>การตั้งค่าทั่วไป</CardTitle>
              </div>
              <CardDescription>
                ตั้งค่าพื้นฐานของระบบ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ชื่อสถานศึกษา</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="โรงเรียน..."
                  defaultValue="โรงเรียนตัวอย่าง"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ปีการศึกษา</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="2568"
                  defaultValue="2568"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">เกณฑ์ผ่าน (%)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="80"
                  defaultValue="80"
                  min="0"
                  max="100"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>การแจ้งเตือน</CardTitle>
              </div>
              <CardDescription>
                ตั้งค่าการแจ้งเตือนต่างๆ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">แจ้งเตือนก่อนคาบเรียน</p>
                  <p className="text-sm text-muted-foreground">แจ้งเตือน 15 นาทีก่อนคาบเรียน</p>
                </div>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">แจ้งเตือนนักเรียนขาดเรียน</p>
                  <p className="text-sm text-muted-foreground">แจ้งเตือนเมื่อนักเรียนขาดเรียนเกินกำหนด</p>
                </div>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Database Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <CardTitle>ฐานข้อมูล</CardTitle>
              </div>
              <CardDescription>
                จัดการข้อมูลและการสำรองข้อมูล
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">สำรองข้อมูลอัตโนมัติ</p>
                  <p className="text-sm text-muted-foreground">สำรองข้อมูลทุกวันเวลา 00:00 น.</p>
                </div>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>
              <Button variant="outline" onClick={() => toast.info('ฟีเจอร์กำลังพัฒนา')}>
                สำรองข้อมูลตอนนี้
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>ความปลอดภัย</CardTitle>
              </div>
              <CardDescription>
                ตั้งค่าความปลอดภัยของระบบ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">เปลี่ยนรหัสผ่าน</label>
                <Button variant="outline" onClick={() => toast.info('ฟีเจอร์กำลังพัฒนา')}>
                  เปลี่ยนรหัสผ่าน
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg">
              บันทึกการตั้งค่า
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
