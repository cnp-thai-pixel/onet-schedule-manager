import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { LogIn, GraduationCap, UserCheck, Shield } from 'lucide-react';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  
  // Get role from URL parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const roleFromUrl = searchParams.get('role') as UserRole | null;
    if (roleFromUrl && ['student', 'teacher', 'admin'].includes(roleFromUrl)) {
      setSelectedRole(roleFromUrl);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password, selectedRole);
      toast.success('เข้าสู่ระบบสำเร็จ');
      setLocation('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLanding = () => {
    setLocation('/');
  };

  const roles = [
    { value: 'student' as UserRole, label: 'นักเรียน', icon: GraduationCap, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { value: 'teacher' as UserRole, label: 'ครูผู้สอน', icon: UserCheck, color: 'bg-green-100 text-green-700 hover:bg-green-200' },
    { value: 'admin' as UserRole, label: 'ผู้ดูแลระบบ', icon: Shield, color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
  ];

  const demoCredentials = {
    student: { email: 'student@onet.com', password: 'student123' },
    teacher: { email: 'teacher@onet.com', password: 'teacher123' },
    admin: { email: 'admin@onet.com', password: 'admin123' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex justify-center">
            <img 
              src="https://img5.pic.in.th/file/secure-sv1/CNPLOGO.png" 
              alt="Logo" 
              className="h-20 w-20 object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">เข้าสู่ระบบ</CardTitle>
            <CardDescription className="mt-2 text-gray-600">
              O-NET Schedule Manager
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">เลือกบทบาท</label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedRole === role.value
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <role.icon className={`h-6 w-6 mx-auto mb-1 ${
                    selectedRole === role.value ? 'text-primary' : 'text-gray-400'
                  }`} />
                  <p className={`text-xs font-medium ${
                    selectedRole === role.value ? 'text-primary' : 'text-gray-600'
                  }`}>
                    {role.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="กรอกอีเมล"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="กรอกรหัสผ่าน"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 rounded-xl bg-gradient-to-r from-[#1572E8] to-[#1269DB] hover:from-[#1269DB] hover:to-[#0F5FD1]" 
              disabled={loading}
            >
              <LogIn className="h-4 w-4 mr-2" />
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Button>
          </form>

          <div className="pt-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="w-full h-11 rounded-xl" 
              onClick={handleBackToLanding}
            >
              กลับหน้าแรก
            </Button>
          </div>


        </CardContent>
      </Card>
    </div>
  );
}
