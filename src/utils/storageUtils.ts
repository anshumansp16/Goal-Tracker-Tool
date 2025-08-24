import type { MonthData } from '../types/insight';
import { defaultTasks } from '../constants/taskTypes';
import type { CategoryKey } from '../types/category';

export const saveData = (data: MonthData): void => {
  try {
    localStorage.setItem('goalTrackerData', JSON.stringify(data));
    localStorage.setItem('goalTrackerBackup', JSON.stringify({
      data: data,
      lastSaved: new Date().toISOString(),
      version: '1.0'
    }));
  } catch (error) {
    console.error('Error saving data:', error);
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

export const initializeDayData = (currentDate: string): Record<CategoryKey, any> => {
  return {
    physicalHealth: { tasks: [...defaultTasks.physicalHealth], timeSpent: 0, completed: false },
    onetouchWork: { tasks: [...defaultTasks.onetouchWork], timeSpent: 0, completed: false },
    aarambhWork: { tasks: [...defaultTasks.aarambhWork], timeSpent: 0, completed: false },
    techLearning: { tasks: [...defaultTasks.techLearning], timeSpent: 0, completed: false },
    youtubeVideos: { tasks: [...defaultTasks.youtubeVideos], timeSpent: 0, completed: false }
  };
};
