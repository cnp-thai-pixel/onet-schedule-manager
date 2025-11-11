import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getScheduleData, Session } from '@/lib/firebase';
import { Calendar, Clock, BookOpen } from 'lucide-react';

const subjectIcons: Record<string, { icon: string; color: string; bgColor: string }> = {
  'ไทย': { icon: '📘', color: 'text-pink-600', bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100' },
  'คณิต': { icon: '🔢', color: 'text-blue-600', bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100' },
  'สังคม': { icon: '🌍', color: 'text-green-600', bgColor: 'bg-gradient-to-br from-green-50 to-green-100' },
  'วิทยาศาสตร์': { icon: '🧬', color: 'text-purple-600', bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100' },
  'อังกฤษ': { icon: '🗣️', color: 'text-orange-600', bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100' },
};

const defaultSubject = { icon: '📚', color: 'text-gray-600', bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100' };

export default function Schedule() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'today' | 'all'>('today');

  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    try {
      const data = await getScheduleData();
      setSessions(data);
    } catch (error) {
      console.error('Error loading schedule:', error);
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

  const todaySessions = sessions.filter(s => {
    const today = new Date().toISOString().split('T')[0];
    return s.date === today;
  });

  const displaySessions = activeTab === 'today' ? todaySessions : sessions;

  const groupedByClassroom = displaySessions.reduce((acc, session) => {
    if (!acc[session.classroom]) {
      acc[session.classroom] = [];
    }
    acc[session.classroom].push(session);
    return acc;
  }, {} as Record<string, Session[]>);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">กำลังโหลดตารางติว...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">ตารางติว</h1>
            <p className="text-muted-foreground">จัดการและดูตารางติว O-NET</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'today' ? 'default' : 'outline'}
            onClick={() => setActiveTab('today')}
          >
            วันนี้
          </Button>
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
          >
            ทั้งหมด
          </Button>
        </div>

        {/* Schedule Grid */}
        {Object.keys(groupedByClassroom).length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {activeTab === 'today' ? 'ไม่มีคาบติวในวันนี้' : 'ยังไม่มีตารางติว'}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Object.entries(groupedByClassroom).map(([classroom, classSessions]) => (
              <Card key={classroom}>
                <CardHeader>
                  <CardTitle className="text-lg">{classroom}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {classSessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-4 border-0 rounded-2xl hover:shadow-xl transition-all duration-300 shadow-md overflow-hidden"
                      >
                        <div className={`${(subjectIcons[session.subject] || defaultSubject).bgColor} p-4 rounded-xl`}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <div className="text-3xl bg-white p-2 rounded-xl shadow-sm">
                                {(subjectIcons[session.subject] || defaultSubject).icon}
                              </div>
                              <div>
                                <h4 className={`font-bold text-lg ${(subjectIcons[session.subject] || defaultSubject).color}`}>
                                  {session.subject}
                                </h4>
                                <p className="text-sm text-gray-600 font-medium">
                                  {session.teacher}
                                </p>
                              </div>
                            </div>
                            <Badge className={getStatusBadge(session.status)}>
                              {session.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{session.day} {session.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{session.startTime} - {session.endTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
