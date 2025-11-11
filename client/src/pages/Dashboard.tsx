import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CircularProgress from "@/components/CircularProgress";
import { Calendar, Users, TrendingUp, AlertTriangle, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalSessions: 80, // 20 สัปดาห์ x 2 วัน x 2 คาบ
    completedSessions: 12,
    totalStudents: 440, // 11 ห้อง x 40 คน
    averageAttendance: 85,
    atRiskStudents: 23,
  });

  // ข้อมูลอัตราเข้าร่วมรายสัปดาห์
  const weeklyAttendanceData = [
    { week: 'สัปดาห์ 1', attendance: 92 },
    { week: 'สัปดาห์ 2', attendance: 88 },
    { week: 'สัปดาห์ 3', attendance: 85 },
    { week: 'สัปดาห์ 4', attendance: 87 },
    { week: 'สัปดาห์ 5', attendance: 83 },
    { week: 'สัปดาห์ 6', attendance: 86 },
  ];

  // ข้อมูลจำนวนนักเรียนแยกตามวิชา
  const subjectData = [
    { subject: 'ไทย', students: 385, color: '#EF4444' },
    { subject: 'คณิต', students: 420, color: '#3B82F6' },
    { subject: 'สังคม', students: 350, color: '#10B981' },
    { subject: 'วิทย์', students: 410, color: '#8B5CF6' },
    { subject: 'อังกฤษ', students: 395, color: '#F59E0B' },
  ];

  // คาบติววันนี้
  const todaySessions = [
    { time: '08:30-10:20', subject: 'คณิตศาสตร์', classroom: 'ม.6/1', teacher: 'อ.สมชาย', status: 'กำลังเรียน' },
    { time: '13:05-15:50', subject: 'ภาษาอังกฤษ', classroom: 'ม.6/3', teacher: 'อ.สมหญิง', status: 'รอเรียน' },
  ];

  // คาบติวสัปดาห์นี้
  const weekSessions = [
    { day: 'อังคาร 5 พ.ย.', count: 22, completed: 11 },
    { day: 'ศุกร์ 8 พ.ย.', count: 22, completed: 0 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
      {/* สถิติภาพรวม - Circular Progress Cards */}
      <Card className="p-6 shadow-lg border-0 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">สถิติภาพรวมระบบ</h3>
        <p className="text-sm text-gray-500 mb-6">ข้อมูลสรุปการจัดติว O-NET ทั้งหมด</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ความคืบหน้าคาบติว */}
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
            <CircularProgress 
              value={stats.completedSessions} 
              max={stats.totalSessions} 
              color="#1572E8" 
              size={140}
              strokeWidth={10}
              label={`/ ${stats.totalSessions}`}
            />
            <p className="text-sm font-medium text-gray-600 mt-4">ความคืบหน้าคาบติว</p>
            <p className="text-xs text-gray-500 mt-1">{Math.round((stats.completedSessions / stats.totalSessions) * 100)}% เสร็จสิ้น</p>
          </div>

          {/* อัตราเข้าร่วม */}
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100 hover:shadow-lg transition-shadow">
            <CircularProgress 
              value={stats.averageAttendance} 
              max={100} 
              color="#10B981" 
              size={140}
              strokeWidth={10}
              label="เฉลี่ย"
            />
            <p className="text-sm font-medium text-gray-600 mt-4">อัตราเข้าร่วมเฉลี่ย</p>
            <p className="text-xs text-gray-500 mt-1">จากนักเรียนทั้งหมด {stats.totalStudents} คน</p>
          </div>

          {/* นักเรียนเสี่ยง */}
          <div className="flex flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-100 hover:shadow-lg transition-shadow">
            <CircularProgress 
              value={stats.atRiskStudents} 
              max={stats.totalStudents} 
              color="#F59E0B" 
              size={140}
              strokeWidth={10}
              label="คน"
            />
            <p className="text-sm font-medium text-gray-600 mt-4">นักเรียนเสี่ยง</p>
            <p className="text-xs text-gray-500 mt-1">เข้าเรียนต่ำกว่า 80%</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* อัตราเข้าร่วมรายสัปดาห์ */}
        <Card className="lg:col-span-2 p-6 shadow-lg border-0 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">อัตราเข้าร่วมรายสัปดาห์</h3>
          <p className="text-sm text-gray-500 mb-6">แนวโน้มการเข้าร่วมติวของนักเรียนในแต่ละสัปดาห์</p>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyAttendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="#1572E8" 
                strokeWidth={3}
                dot={{ fill: '#1572E8', r: 6 }}
                activeDot={{ r: 8 }}
                name="อัตราเข้าร่วม (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* คาบติวสัปดาห์นี้ */}
        <Card className="p-6 shadow-lg bg-gradient-to-br from-[#1572E8] to-[#1269DB] text-white border-0 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">คาบติวสัปดาห์นี้</h3>
            <Calendar className="h-5 w-5" />
          </div>
          <p className="text-sm opacity-90 mb-6">28 ต.ค. - 3 พ.ย. 2568</p>
          
          <div className="space-y-4">
            {weekSessions.map((session, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{session.day}</span>
                  <Badge className="bg-white/20 text-white">
                    {session.completed}/{session.count} คาบ
                  </Badge>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(session.completed / session.count) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{weekSessions.reduce((sum, s) => sum + s.count, 0)}</p>
                <p className="text-sm opacity-90">คาบทั้งหมด</p>
              </div>
              <CheckCircle2 className="h-8 w-8 opacity-50" />
            </div>
          </div>
        </Card>
      </div>

      {/* จำนวนนักเรียนแยกตามวิชา */}
      <Card className="p-6 shadow-lg border-0 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">จำนวนนักเรียนแยกตามวิชา</h3>
        <p className="text-sm text-gray-500 mb-6">สรุปจำนวนนักเรียนที่ลงทะเบียนเรียนแต่ละวิชา</p>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={subjectData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="students" radius={[8, 8, 0, 0]} name="จำนวนนักเรียน">
              {subjectData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* คาบติววันนี้ */}
      <Card className="p-6 shadow-lg border-0 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">คาบติววันนี้</h3>
            <p className="text-sm text-gray-500">รายการคาบติวในวันนี้ทั้งหมด</p>
          </div>
          <Badge className="bg-blue-100 text-blue-700 text-sm px-3 py-1">
            {todaySessions.length} คาบ
          </Badge>
        </div>

        {todaySessions.length > 0 ? (
          <div className="space-y-3">
            {todaySessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{session.subject}</p>
                    <p className="text-sm text-gray-600">{session.classroom} • {session.teacher}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{session.time}</p>
                  <Badge className={`mt-1 ${session.status === 'กำลังเรียน' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {session.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>ยังไม่มีคาบติวในวันนี้</p>
          </div>
        )}
      </Card>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 shadow-md hover:shadow-lg transition-all border-0 rounded-xl bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">คาบตามแผน</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalSessions}</p>
              <p className="text-xs text-gray-500 mt-1">20 สัปดาห์</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-md hover:shadow-lg transition-all border-0 rounded-xl bg-gradient-to-br from-green-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">คาบที่เรียนแล้ว</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedSessions}</p>
              <p className="text-xs text-gray-500 mt-1">{Math.round((stats.completedSessions / stats.totalSessions) * 100)}% เสร็จสิ้น</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-md hover:shadow-lg transition-all border-0 rounded-xl bg-gradient-to-br from-purple-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">นักเรียนทั้งหมด</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalStudents}</p>
              <p className="text-xs text-gray-500 mt-1">11 ห้องเรียน</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-md hover:shadow-lg transition-all border-0 rounded-xl bg-gradient-to-br from-orange-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">นักเรียนเสี่ยง</p>
              <p className="text-2xl font-bold text-orange-600">{stats.atRiskStudents}</p>
              <p className="text-xs text-gray-500 mt-1">เข้าเรียน &lt; 80%</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* System Info Card */}
      <Card className="p-6 shadow-md border-0 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          ข้อมูลระบบจัดติว O-NET
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">จำนวนห้องเรียน</span>
            <span className="font-semibold text-gray-800">11 ห้อง (ม.6/1 - ม.6/11)</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">วันติว</span>
            <span className="font-semibold text-gray-800">อังคาร, ศุกร์</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">เวลาติว</span>
            <span className="font-semibold text-gray-800">08:30-10:20, 13:05-15:50</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">นักเรียนต่อห้อง</span>
            <span className="font-semibold text-gray-800">40 คน</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">ระยะเวลา</span>
            <span className="font-semibold text-gray-800">28 ต.ค. 2568 - 13 มี.ค. 2569</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">จำนวนสัปดาห์</span>
            <span className="font-semibold text-gray-800">20 สัปดาห์</span>
          </div>
        </div>
      </Card>
      </div>
    </DashboardLayout>
  );
}
