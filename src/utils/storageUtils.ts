import type { MonthData } from '../types/insight';
import { defaultTasks } from '../constants/taskTypes';
import type { CategoryKey } from '../types/category';

export const saveData = (data: MonthData): void => {
  try {
    localStorage.setItem('goalTrackerData', JSON.stringify(data));
    localStorage.setItem('goalTrackerBackup', JSON.stringify({
      data: data,
      lastSaved: new Date().toISOString(),
      version: '2.0'
    }));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Enhanced storage utilities
export const saveMonthlyGoals = (goals: any): void => {
  try {
    localStorage.setItem('goalTrackerMonthlyGoals', JSON.stringify(goals));
  } catch (error) {
    console.error('Error saving monthly goals:', error);
  }
};

export const loadMonthlyGoals = (): any => {
  try {
    const saved = localStorage.getItem('goalTrackerMonthlyGoals');
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Error loading monthly goals:', error);
    return {};
  }
};

export const saveWeeklyPlans = (plans: any): void => {
  try {
    localStorage.setItem('goalTrackerWeeklyPlans', JSON.stringify(plans));
  } catch (error) {
    console.error('Error saving weekly plans:', error);
  }
};

export const loadWeeklyPlans = (): any => {
  try {
    const saved = localStorage.getItem('goalTrackerWeeklyPlans');
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Error loading weekly plans:', error);
    return {};
  }
};

export const initializeMonthData = (): MonthData => {
  const data: MonthData = {};
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    data[dateString] = {
      physicalHealth: { tasks: [], timeSpent: 0, completed: false },
      onetouchWork: { tasks: [], timeSpent: 0, completed: false },
      aarambhWork: { tasks: [], timeSpent: 0, completed: false },
      techLearning: { tasks: [], timeSpent: 0, completed: false },
      youtubeVideos: { tasks: [], timeSpent: 0, completed: false }
    };
  }
  return data;
};

export const loadData = (): MonthData => {
  try {
    const saved = localStorage.getItem('goalTrackerData');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure all categories exist (for backward compatibility)
      Object.keys(parsed).forEach(date => {
        if (!parsed[date].youtubeVideos) {
          parsed[date].youtubeVideos = { tasks: [], timeSpent: 0, completed: false };
        }
      });
      return parsed;
    }
    return initializeMonthData();
  } catch (error) {
    console.error('Error loading data:', error);
    return initializeMonthData();
  }
};

export const initializeDayData = (_currentDate: string): Record<CategoryKey, any> => {
  return {
    physicalHealth: { tasks: [...defaultTasks.physicalHealth], timeSpent: 0, completed: false },
    onetouchWork: { tasks: [...defaultTasks.onetouchWork], timeSpent: 0, completed: false },
    aarambhWork: { tasks: [...defaultTasks.aarambhWork], timeSpent: 0, completed: false },
    techLearning: { tasks: [...defaultTasks.techLearning], timeSpent: 0, completed: false },
    youtubeVideos: { tasks: [...defaultTasks.youtubeVideos], timeSpent: 0, completed: false }
  };
};
