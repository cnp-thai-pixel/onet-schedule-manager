import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, Download } from 'lucide-react';
import { readCSVFile, parseCSV, exportToCSV } from '@/lib/csv';
import { toast } from 'sonner';

interface CSVImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  templateData: any[];
  templateFilename: string;
  onImport: (data: any[]) => Promise<void>;
}

export default function CSVImportDialog({
  open,
  onOpenChange,
  title,
  description,
  templateData,
  templateFilename,
  onImport,
}: CSVImportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [importing, setImporting] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    try {
      setFile(selectedFile);
      const csvText = await readCSVFile(selectedFile);
      const data = parseCSV(csvText);
      setPreviewData(data.slice(0, 5)); // Show first 5 rows
      toast.success(`อ่านไฟล์สำเร็จ: ${data.length} แถว`);
    } catch (error) {
      console.error('Error reading CSV:', error);
      toast.error('ไม่สามารถอ่านไฟล์ CSV ได้');
      setFile(null);
      setPreviewData([]);
    }
  };

  const handleDownloadTemplate = () => {
    try {
      exportToCSV(templateData, templateFilename);
      toast.success('ดาวน์โหลดแม่แบบสำเร็จ');
    } catch (error) {
      console.error('Error downloading template:', error);
      toast.error('ไม่สามารถดาวน์โหลดแม่แบบได้');
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error('กรุณาเลือกไฟล์');
      return;
    }

    setImporting(true);
    try {
      const csvText = await readCSVFile(file);
      const data = parseCSV(csvText);
      await onImport(data);
      toast.success(`นำเข้าข้อมูลสำเร็จ: ${data.length} แถว`);
      onOpenChange(false);
      setFile(null);
      setPreviewData([]);
    } catch (error) {
      console.error('Error importing CSV:', error);
      toast.error('ไม่สามารถนำเข้าข้อมูลได้');
    } finally {
      setImporting(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreviewData([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Download Template */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium text-blue-900">ดาวน์โหลดแม่แบบ CSV</p>
              <p className="text-sm text-blue-700">ดาวน์โหลดไฟล์ตัวอย่างเพื่อดูรูปแบบที่ถูกต้อง</p>
            </div>
            <Button variant="outline" onClick={handleDownloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              ดาวน์โหลด
            </Button>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">เลือกไฟล์ CSV</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90"
              />
            </div>
            {file && (
              <p className="text-sm text-gray-600 mt-2">
                ไฟล์ที่เลือก: {file.name}
              </p>
            )}
          </div>

          {/* Preview */}
          {previewData.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">ตัวอย่างข้อมูล (5 แถวแรก)</p>
              <div className="overflow-x-auto border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(previewData[0]).map((key) => (
                        <th key={key} className="px-4 py-2 text-left font-medium text-gray-700">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index} className="border-t">
                        {Object.values(row).map((value: any, i) => (
                          <td key={i} className="px-4 py-2 text-gray-600">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button onClick={handleImport} disabled={!file || importing}>
            <Upload className="h-4 w-4 mr-2" />
            {importing ? 'กำลังนำเข้า...' : 'นำเข้าข้อมูล'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
