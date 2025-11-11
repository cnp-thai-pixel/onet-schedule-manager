import { useEffect, useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  getStudentsData, 
  getAttendanceData, 
  saveAttendanceData,
  updateSessionStatus,
  Student, 
  AttendanceRecord 
} from '@/lib/firebase';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

type AttendanceStatus = 'P' | 'L' | 'A' | 'E';

export default function Attendance() {
  const [, params] = useRoute('/attendance/:sessionId');
  const [, setLocation] = useLocation();
  const sessionId = params?.sessionId || '';
  
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (sessionId) {
      loadAttendanceData();
    }
  }, [sessionId]);

  const loadAttendanceData = async () => {
    try {
      const studentsData = await getStudentsData();
      const attendanceData = await getAttendanceData(sessionId);
      
      setStudents(studentsData);
      
      // Load existing attendance
      const attendanceMap: Record<string, AttendanceStatus> = {};
      attendanceData.forEach(record => {
        attendanceMap[record.studentId] = record.status;
      });
      setAttendance(attendanceMap);
    } catch (error) {
      console.error('Error loading attendance:', error);
      toast.error('ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const attendanceRecords: Omit<AttendanceRecord, 'id'>[] = students.map(student => ({
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        classroom: student.classroom,
        status: attendance[student.id] || 'A',
        sessionId,
      }));

      await saveAttendanceData({
        sessionId,
        attendance: attendanceRecords,
      });

      await updateSessionStatus({
        sessionId,
        status: 'DONE',
      });

      toast.success('บันทึกการเช็กชื่อสำเร็จ');
      setLocation('/sessions-today');
    } catch (error) {
      console.error('Error saving attendance:', error);
      toast.error('ไม่สามารถบันทึกข้อมูลได้');
    } finally {
      setSaving(false);
    }
  };

  const statusButtons: { label: string; value: AttendanceStatus; color: string; icon: string }[] = [
    { label: 'มา', value: 'P', color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200', icon: '✅' },
    { label: 'สาย', value: 'L', color: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200', icon: '🕒' },
    { label: 'ลา', value: 'E', color: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border-cyan-200', icon: '📋' },
    { label: 'ขาด', value: 'A', color: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200', icon: '❌' },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation('/sessions-today')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">เช็กชื่อนักเรียน</h1>
              <p className="text-muted-foreground">เลือกสถานะการเข้าเรียนของนักเรียนแต่ละคน</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'กำลังบันทึก...' : 'บันทึก'}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>รายชื่อนักเรียน ({students.length} คน)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.map((student, index) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border-0 bg-white rounded-xl hover:shadow-md transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground w-8">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {student.classroom} เลขที่ {student.number}
                        {student.studentId && ` | รหัส ${student.studentId}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {statusButtons.map((btn) => (
                      <Button
                        key={btn.value}
                        variant="outline"
                        size="sm"
                        className={
                          attendance[student.id] === btn.value
                            ? `${btn.color} border-2 shadow-sm`
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
                        }
                        onClick={() => handleStatusChange(student.id, btn.value)}
                      >
                        <span className="mr-1">{btn.icon}</span>
                        {btn.label}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
