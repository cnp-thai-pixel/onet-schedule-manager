import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Clock,
  Shield,
  UserCheck,
  GraduationCap,
  ArrowRight,
  BarChart3
} from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleRoleLogin = (role: 'student' | 'teacher' | 'admin') => {
    // จะเชื่อมกับระบบ Auth ในภายหลัง
    setLocation('/login');
  };

  const stats = [
    { icon: Calendar, label: "คาบติว", value: "80", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Users, label: "นักเรียน", value: "440", color: "text-green-600", bg: "bg-green-50" },
    { icon: BookOpen, label: "ห้องเรียน", value: "11", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: TrendingUp, label: "อัตราเข้าร่วม", value: "85%", color: "text-orange-600", bg: "bg-orange-50" },
  ];

  const features = [
    {
      icon: Calendar,
      title: "จัดการตารางติว",
      description: "ระบบจัดตารางติว O-NET อัตโนมัติ ครอบคลุม 11 ห้องเรียน 5 วิชา",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: UserCheck,
      title: "เช็กชื่ออัตโนมัติ",
      description: "บันทึกการเข้าร่วมติวแบบ Real-time พร้อมรายงานสถิติ",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: BarChart3,
      title: "รายงานและวิเคราะห์",
      description: "วิเคราะห์ข้อมูลการเข้าร่วม ติดตามนักเรียนเสี่ยง",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      icon: Shield,
      title: "ระบบสิทธิ์ 3 ระดับ",
      description: "แยกสิทธิ์นักเรียน ครูผู้สอน และผู้ดูแลระบบ",
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
  ];

  const roles = [
    {
      role: 'student',
      icon: GraduationCap,
      title: "นักเรียน",
      description: "ดูตารางติว ประวัติการเข้าเรียน และคะแนนเข้าร่วม",
      features: ["ดูตารางติวของตัวเอง", "ตรวจสอบประวัติการเข้าเรียน", "ดูคะแนนเข้าร่วม"],
      color: "from-blue-500 to-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      role: 'teacher',
      icon: UserCheck,
      title: "ครูผู้สอน",
      description: "เช็กชื่อนักเรียน อัปเดตข้อมูล และดูรายงาน",
      features: ["เช็กชื่อนักเรียนในคาบที่สอน", "อัปเดตข้อมูลส่วนตัว", "ดูรายงานการเข้าเรียน"],
      color: "from-green-500 to-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700"
    },
    {
      role: 'admin',
      icon: Shield,
      title: "ผู้ดูแลระบบ",
      description: "จัดการข้อมูลทั้งหมด ดู Dashboard และรายงานแบบเต็ม",
      features: ["เข้าถึงได้ทุกหน้า", "จัดการข้อมูลทั้งหมด", "ดู Dashboard แบบเต็ม"],
      color: "from-purple-500 to-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1572E8] via-[#1269DB] to-[#0F5FD1]">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2 text-sm">
              <CheckCircle2 className="h-4 w-4 mr-2 inline" />
              ระบบจัดการติว O-NET ออนไลน์
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              O-NET Schedule Manager
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100 max-w-3xl mx-auto">
              ระบบจัดการตารางติว O-NET แบบครบวงจร
            </p>
            <p className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto">
              สำหรับนักเรียน ม.6 ทั้ง 11 ห้องเรียน ครอบคลุม 5 วิชาหลัก
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
                  <div className={`h-12 w-12 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-blue-100">{stat.label}</p>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 shadow-xl"
                onClick={() => setLocation('/login')}
              >
                เข้าสู่ระบบ
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                เรียนรู้เพิ่มเติม
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 px-4 py-2">
            ฟีเจอร์หลัก
          </Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            ระบบที่ครบครันสำหรับการจัดติว
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            เครื่องมือที่จำเป็นทั้งหมดสำหรับการจัดการติว O-NET อย่างมีประสิทธิภาพ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all border-0 bg-white">
              <div className={`h-14 w-14 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Role Selection */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-700 px-4 py-2">
            เลือกบทบาทของคุณ
          </Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            เข้าสู่ระบบตามบทบาท
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ระบบแบ่งสิทธิ์การใช้งาน 3 ระดับ เพื่อความปลอดภัยและความเหมาะสม
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((roleData, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all group">
              <div className={`h-32 bg-gradient-to-r ${roleData.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />
                <roleData.icon className="h-16 w-16 text-white relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{roleData.title}</h3>
                <p className="text-gray-600 mb-6">{roleData.description}</p>
                
                <div className="space-y-3 mb-6">
                  {roleData.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${roleData.buttonColor} text-white`}
                  size="lg"
                  onClick={() => handleRoleLogin(roleData.role as 'student' | 'teacher' | 'admin')}
                >
                  เข้าสู่ระบบในฐานะ{roleData.title}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gray-100 text-gray-700 px-4 py-2">
                ข้อมูลระบบ
              </Badge>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                รายละเอียดการจัดติว O-NET
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-l-4 border-blue-500">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">ระยะเวลา</h3>
                    <p className="text-gray-600">28 ต.ค. 2568 - 13 มี.ค. 2569</p>
                    <p className="text-sm text-gray-500 mt-1">รวม 20 สัปดาห์</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-green-500">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">วันและเวลา</h3>
                    <p className="text-gray-600">ทุกวันอังคารและศุกร์</p>
                    <p className="text-sm text-gray-500 mt-1">08:30-10:20, 13:05-15:50</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-purple-500">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">วิชาที่เปิดสอน</h3>
                    <p className="text-gray-600">5 วิชาหลัก</p>
                    <p className="text-sm text-gray-500 mt-1">ไทย คณิต สังคม วิทย์ อังกฤษ</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-orange-500">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">จำนวนนักเรียน</h3>
                    <p className="text-gray-600">440 คน จาก 11 ห้อง</p>
                    <p className="text-sm text-gray-500 mt-1">ม.6/1 - ม.6/11</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">O-NET Schedule Manager</h3>
              <p className="text-gray-400">
                ระบบจัดการตารางติว O-NET แบบครบวงจร สำหรับนักเรียน ครู และผู้ดูแลระบบ
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">เมนูหลัก</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">หน้าแรก</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">ฟีเจอร์</a></li>
                <li><a href="/login" className="hover:text-white transition-colors">เข้าสู่ระบบ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">ติดต่อเรา</h3>
              <p className="text-gray-400">
                โรงเรียนตัวอย่าง<br />
                เบอร์โทร: 02-XXX-XXXX<br />
                อีเมล: info@school.ac.th
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2568 O-NET Schedule Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
