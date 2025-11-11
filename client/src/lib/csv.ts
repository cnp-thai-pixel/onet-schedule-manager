// CSV Utility Functions

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) {
    throw new Error('No data to export');
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Add BOM for UTF-8
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const parseCSV = (csvText: string): any[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) {
    throw new Error('Empty CSV file');
  }

  // Parse header
  const headers = lines[0].split(',').map(h => h.trim());
  
  // Parse rows
  const data = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    return row;
  });

  return data;
};

export const readCSVFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      resolve(text);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsText(file, 'UTF-8');
  });
};

// Template generators
export const generateStudentTemplate = () => {
  return [
    {
      studentId: '12345',
      classroom: 'ม.6/1',
      number: '1',
      firstName: 'สมชาย',
      lastName: 'ใจดี'
    }
  ];
};

export const generateSessionTemplate = () => {
  return [
    {
      classroom: 'ม.6/1',
      subject: 'คณิต',
      teacher: 'ครูสมหญิง',
      date: '2024-11-05',
      day: 'อังคาร',
      startTime: '08:30',
      endTime: '10:20',
      status: 'OPEN'
    }
  ];
};

export const generateClassroomTemplate = () => {
  return [
    {
      name: 'ม.6/1',
      level: 'ม.6',
      studentCount: '40'
    }
  ];
};

export const generateTeacherTemplate = () => {
  return [
    {
      name: 'ครูสมชาย',
      subject: 'คณิต',
      email: 'teacher@example.com',
      phone: '0812345678'
    }
  ];
};
