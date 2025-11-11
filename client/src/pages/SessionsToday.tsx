import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getScheduleData, Session } from '@/lib/firebase';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

export default function SessionsToday() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    loadTodaySessions();
  }, []);

  const loadTodaySessions = async () => {
    try {
      const data = await getScheduleData();
      const today = new Date().toISOString().split('T')[0];
      const todaySessions = data.filter(s => s.date === today);
      setSessions(todaySessions);
    } catch (error) {
      console.error('Error loading today sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: Session['status']) => {
    const variants = {
      OPEN: 'bg-blue-100 text-blue-800',
      DONE: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return variants[status] || variants.OPEN;
  };

  const handleAttendance = (sessionId: string) => {
    setLocation(`/attendance/${sessionId}`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">กำลังโหลดคาบวันนี้...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">คาบวันนี้</h1>
          <p className="text-muted-foreground">คาบติวที่มีในวันนี้พร้อมเช็กชื่อ</p>
        </div>

        {sessions.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">ไม่มีคาบติวในวันนี้</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((session) => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{session.classroom}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {session.subject}
                      </p>
                    </div>
                    <Badge className={getStatusBadge(session.status)}>
                      {session.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{session.day} {session.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{session.startTime} - {session.endTime}</span>
                    </div>
                    <div className="text-muted-foreground">
                      ครู: {session.teacher}
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => handleAttendance(session.id)}
                    disabled={session.status === 'CANCELLED'}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    เช็กชื่อ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
