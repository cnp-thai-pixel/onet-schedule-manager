import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYWBNmNvt_TMnpQqkk7PJ28asgWOOtSOw",
  authDomain: "onet-cc77e.firebaseapp.com",
  projectId: "onet-cc77e",
  storageBucket: "onet-cc77e.firebasestorage.app",
  messagingSenderId: "588150070857",
  appId: "1:588150070857:web:ed8e041db582c82abb6998",
  measurementId: "G-5JFG6Y0G1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection References
export const collectionsRef = {
  classrooms: collection(db, 'classrooms'),
  students: collection(db, 'students'),
  sessions: collection(db, 'sessions'),
  attendance: collection(db, 'attendance'),
};

// Types
export interface Classroom {
  id: string;
  name: string;
  level: string;
  studentCount: number;
}

export interface Student {
  id: string;
  classroom: string;
  number: number;
  firstName: string;
  lastName: string;
  studentId?: string;
}

export interface Session {
  id: string;
  classroom: string;
  subject: string;
  teacher: string;
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  status: 'OPEN' | 'DONE' | 'CANCELLED';
}

export interface AttendanceRecord {
  id?: string;
  studentId: string;
  studentName: string;
  classroom: string;
  status: 'P' | 'L' | 'A' | 'E'; // Present, Late, Absent, Excused
  sessionId: string;
}

// API Functions
export const getScheduleData = async (): Promise<Session[]> => {
  try {
    const snapshot = await getDocs(collectionsRef.sessions);
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as Session));
  } catch (error) {
    console.error('Error getting schedule data:', error);
    throw error;
  }
};

export const getAttendanceData = async (sessionId: string): Promise<AttendanceRecord[]> => {
  try {
    const q = query(collectionsRef.attendance, where('sessionId', '==', sessionId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as AttendanceRecord));
  } catch (error) {
    console.error('Error getting attendance data:', error);
    throw error;
  }
};

export const getStudentsData = async (): Promise<Student[]> => {
  try {
    const snapshot = await getDocs(collectionsRef.students);
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as Student));
  } catch (error) {
    console.error('Error getting students data:', error);
    throw error;
  }
};

export const getClassroomsData = async (): Promise<Classroom[]> => {
  try {
    const snapshot = await getDocs(collectionsRef.classrooms);
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as Classroom));
  } catch (error) {
    console.error('Error getting classrooms data:', error);
    throw error;
  }
};

export const saveAttendanceData = async (payload: {
  sessionId: string;
  attendance: Omit<AttendanceRecord, 'id'>[];
}): Promise<void> => {
  try {
    const batch = payload.attendance.map(record => 
      addDoc(collectionsRef.attendance, record)
    );
    await Promise.all(batch);
  } catch (error) {
    console.error('Error saving attendance data:', error);
    throw error;
  }
};

export const updateSessionStatus = async (payload: {
  sessionId: string;
  status: Session['status'];
}): Promise<void> => {
  try {
    const sessionRef = doc(db, 'sessions', payload.sessionId);
    await updateDoc(sessionRef, { status: payload.status });
  } catch (error) {
    console.error('Error updating session status:', error);
    throw error;
  }
};

export const addStudent = async (payload: Omit<Student, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collectionsRef.students, payload);
    return docRef.id;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

export const addSession = async (payload: Omit<Session, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collectionsRef.sessions, payload);
    return docRef.id;
  } catch (error) {
    console.error('Error adding session:', error);
    throw error;
  }
};

export { db };
