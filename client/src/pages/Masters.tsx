import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Users, School, BookOpen, Download, Upload, Plus } from 'lucide-react';
import { toast } from 'sonner';
import CSVImportDialog from '@/components/CSVImportDialog';
import FAB from '@/components/FAB';
import { exportToCSV, generateStudentTemplate, generateClassroomTemplate, generateTeacherTemplate } from '@/lib/csv';
import { getStudentsData, getClassroomsData } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export default function Masters() {
  const [activeSection, setActiveSection] = useState<'classrooms' | 'students' | 'teachers' | 'subjects'>('classrooms');
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const { isAdmin } = useAuth();

  const sections = [
    { id: 'classrooms' as const, label: 'ห้องเรียน', icon: School },
    { id: 'students' as const, label: 'นักเรียน', icon: Users },
    { id: 'teachers' as const, label: 'ครูผู้สอน', icon: Users },
    { id: 'subjects' as const, label: 'วิชา', icon: BookOpen },
  ];

  const handleAdd = () => {
    if (!isAdmin) {
      toast.error('คุณต้องเข้าสู่ระบบเพื่อใช้งานฟีเจอร์นี้');
      return;
    }
    toast.info('ฟีเจอร์เพิ่มข้อมูลกำลังพัฒนา');
  };

  const handleExport = async () => {
    try {
      let exportData: any[] = [];
      let filename = '';

      if (activeSection === 'students') {
        exportData = await getStudentsData();
        filename = 'students.csv';
      } else if (activeSection === 'classrooms') {
        exportData = await getClassroomsData();
        filename = 'classrooms.csv';
      } else {
        toast.info('ฟีเจอร์ส่งออกข้อมูลกำลังพัฒนา');
        return;
      }

      if (exportData.length === 0) {
        toast.error('ไม่มีข้อมูลให้ส่งออก');
        return;
      }

      exportToCSV(exportData, filename);
      toast.success('ส่งออกข้อมูลสำเร็จ');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('ไม่สามารถส่งออกข้อมูลได้');
    }
  };

  const handleImport = async (importedData: any[]) => {
    if (!isAdmin) {
      toast.error('คุณต้องเข้าสู่ระบบเพื่อใช้งานฟีเจอร์นี้');
      return;
    }
    // Handle import based on active section
    console.log('Importing data:', importedData);
    toast.info('ฟีเจอร์นำเข้าข้อมูลกำลังพัฒนา');
  };

  const getTemplateData = () => {
    switch (activeSection) {
      case 'students':
        return generateStudentTemplate();
      case 'classrooms':
        return generateClassroomTemplate();
      case 'teachers':
        return generateTeacherTemplate();
      default:
        return [];
    }
  };

  const getTemplateFilename = () => {
    return `${activeSection}_template.csv`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">ข้อมูลพื้นฐาน</h1>
            <p className="text-muted-foreground">จัดการข้อมูลห้องเรียน นักเรียน ครู และวิชา</p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sections.map((section) => (
            <Card
              key={section.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                activeSection === section.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              <CardContent className="p-6 text-center">
                <section.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">{section.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Area */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {sections.find(s => s.id === activeSection)?.label}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                ส่งออก CSV
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setImportDialogOpen(true)}
                disabled={!isAdmin}
                className={!isAdmin ? 'opacity-50 cursor-not-allowed' : ''}
              >
                <Upload className="h-4 w-4 mr-2" />
                นำเข้า CSV
              </Button>
              <Button 
                onClick={handleAdd}
                disabled={!isAdmin}
                className={!isAdmin ? 'opacity-50 cursor-not-allowed' : ''}
              >
                <Plus className="h-4 w-4 mr-2" />
                เพิ่ม
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                ยังไม่มีข้อมูล{sections.find(s => s.id === activeSection)?.label}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                คลิกปุ่ม "เพิ่ม{sections.find(s => s.id === activeSection)?.label}" เพื่อเริ่มต้น
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sample Data Display */}
        {activeSection === 'classrooms' && (
          <Card>
            <CardHeader>
              <CardTitle>ห้องเรียนทั้งหมด</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 11 }, (_, i) => i + 1).map((num) => (
                  <Card key={num} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-center">
                      <p className="font-semibold text-lg">ม.6/{num}</p>
                      <p className="text-sm text-muted-foreground">40 คน</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* CSV Import Dialog */}
      <CSVImportDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        title={`นำเข้าข้อมูล${sections.find(s => s.id === activeSection)?.label}`}
        description="อัปโหลดไฟล์ CSV เพื่อนำเข้าข้อมูลจำนวนมากพร้อมกัน"
        templateData={getTemplateData()}
        templateFilename={getTemplateFilename()}
        onImport={handleImport}
      />

      {/* FAB */}
      <FAB onClick={handleAdd} label="เพิ่มข้อมูล" />
    </DashboardLayout>
  );
}
