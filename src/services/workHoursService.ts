import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { startOfWeek, format } from 'date-fns';

export interface ProjectHours {
  hours: number;
  projectId: string;
}

export interface DayHours {
  [projectId: string]: number;
}

export interface WeekHours {
  [date: string]: DayHours;
}

export interface Project {
  id: string;
  name: string;
  color?: string;
}

export const workHoursService = {
  async saveWorkHours(weekStart: Date, hours: WeekHours) {
    const weekId = format(weekStart, "'week'_yyyy-MM-dd");
    const docRef = doc(db, 'workHours', weekId);
    
    await setDoc(docRef, {
      weekStart: weekStart.toISOString(),
      hours
    });
  },

  async getWorkHours(weekStart: Date): Promise<WeekHours> {
    const weekId = format(weekStart, "'week'_yyyy-MM-dd");
    const docRef = doc(db, 'workHours', weekId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().hours as WeekHours;
    }
    return {};
  },

  async getPreviousWeekHours(currentWeekStart: Date): Promise<WeekHours> {
    const previousWeekStart = startOfWeek(new Date(currentWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000), { weekStartsOn: 1 });
    return this.getWorkHours(previousWeekStart);
  },

  async getProjects(): Promise<Project[]> {
    const projectsRef = collection(db, 'projects');
    const snapshot = await getDocs(projectsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Project));
  },

  async saveProject(project: Omit<Project, 'id'>): Promise<Project> {
    const projectsRef = collection(db, 'projects');
    const docRef = doc(projectsRef);
    const newProject = {
      ...project,
      id: docRef.id
    };
    await setDoc(docRef, newProject);
    return newProject;
  }
}; 