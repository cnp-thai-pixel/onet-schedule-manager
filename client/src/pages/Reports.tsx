import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function Reports() {
  const [activeTab, setActiveTab] = useState<'student' | 'classroom' | 'subject'>('student');
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    toast.info('ฟีเจอร์ส่งออกรายงานกำลังพัฒนา');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">รายงาน</h1>
            <p className="text-muted-foreground">รายงานการเข้าร่วมติวของนักเรียน</p>
          </div>
          <Button onClick={handleExport}>
            <FileText className="h-4 w-4 mr-2" />
            ส่งออกรายงาน
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'student' ? 'default' : 'outline'}
            onClick={() => setActiveTab('student')}
          >
            รายนักเรียน
          </Button>
          <Button
            variant={activeTab === 'classroom' ? 'default' : 'outline'}
            onClick={() => setActiveTab('classroom')}
          >
            รายห้อง
          </Button>
          <Button
            variant={activeTab === 'subject' ? 'default' : 'outline'}
            onClick={() => setActiveTab('subject')}
          >
            รายวิชา
          </Button>
        </div>

        {/* Report Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === 'student' && 'รายงานรายนักเรียน'}
              {activeTab === 'classroom' && 'รายงานรายห้อง'}
              {activeTab === 'subject' && 'รายงานรายวิชา'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                ยังไม่มีข้อมูลรายงาน
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                เริ่มเช็กชื่อเพื่อสร้างรายงานการเข้าร่วม
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sample Report Table (for demonstration) */}
        <Card>
          <CardHeader>
            <CardTitle>ตัวอย่างรายงาน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2">รหัสนักเรียน</th>
                    <th className="text-left p-2">ชื่อ-นามสกุล</th>
                    <th className="text-left p-2">ห้อง</th>
                    <th className="text-center p-2">มา</th>
                    <th className="text-center p-2">สาย</th>
                    <th className="text-center p-2">ขาด</th>
                    <th className="text-center p-2">ลา</th>
                    <th className="text-center p-2">อัตราเข้าร่วม</th>
                    <th className="text-center p-2">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-accent/50">
                    <td className="p-2">12345</td>
                    <td className="p-2">สมชาย ใจดี</td>
                    <td className="p-2">ม.6/1</td>
                    <td className="text-center p-2">18</td>
                    <td className="text-center p-2">1</td>
                    <td className="text-center p-2">1</td>
                    <td className="text-center p-2">0</td>
                    <td className="text-center p-2">90%</td>
                    <td className="text-center p-2">
                      <Badge className="bg-green-100 text-green-800">PASS</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-border hover:bg-accent/50">
                    <td className="p-2">12346</td>
                    <td className="p-2">สมหญิง รักเรียน</td>
                    <td className="p-2">ม.6/1</td>
                    <td className="text-center p-2">15</td>
                    <td className="text-center p-2">2</td>
                    <td className="text-center p-2">3</td>
                    <td className="text-center p-2">0</td>
                    <td className="text-center p-2">75%</td>
                    <td className="text-center p-2">
                      <Badge className="bg-yellow-100 text-yellow-800">NOT PASS</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
