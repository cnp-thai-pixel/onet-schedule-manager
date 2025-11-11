import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'student' | 'teacher' | 'admin';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  studentId?: string; // สำหรับนักเรียน
  teacherId?: string; // สำหรับครู
  classroom?: string; // สำหรับนักเรียน
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('onet_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('onet_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole = 'admin') => {
    // Simple demo authentication with role support
    // In production, this should call a real authentication API
    
    let authenticatedUser: User | null = null;

    // Admin login
    if (email === 'admin@onet.com' && password === 'admin123') {
      authenticatedUser = {
        id: 'admin001',
        email: 'admin@onet.com',
        role: 'admin',
        name: 'ผู้ดูแลระบบ'
      };
    }
    // Teacher login
    else if (email === 'teacher@onet.com' && password === 'teacher123') {
      authenticatedUser = {
        id: 'tch001',
        email: 'teacher@onet.com',
        role: 'teacher',
        name: 'อ.สมชาย ใจดี',
        teacherId: 'TCH001'
      };
    }
    // Student login
    else if (email === 'student@onet.com' && password === 'student123') {
      authenticatedUser = {
        id: 'std001',
        email: 'student@onet.com',
        role: 'student',
        name: 'สมศักดิ์ ขยันเรียน',
        studentId: 'STD001',
        classroom: 'ม.6/1'
      };
    }
    // Generic login based on role parameter
    else if (role) {
      const roleNames = {
        admin: 'ผู้ดูแลระบบ',
        teacher: 'ครูผู้สอน',
        student: 'นักเรียน'
      };
      
      authenticatedUser = {
        id: `${role}001`,
        email,
        role,
        name: roleNames[role],
        ...(role === 'student' && { studentId: 'STD001', classroom: 'ม.6/1' }),
        ...(role === 'teacher' && { teacherId: 'TCH001' }),
      };
    }

    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('onet_user', JSON.stringify(authenticatedUser));
    } else {
      throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('onet_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student',
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
