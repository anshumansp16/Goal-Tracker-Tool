import type { CategoryData } from './category';
import type { MonthlyGoal } from './task';

export interface PsychologicalInsight {
  title: string;
  content: string;
}

export interface AIInsight {
  insight: string;
  advice: string;
  focus: string;
}

export interface MonthData {
  [date: string]: {
    [key: string]: CategoryData;
  };
}

export interface MonthlyGoals {
  [key: string]: MonthlyGoal[];
}

export interface WeeklyPlans {
  [key: string]: any; // This can be expanded based on weekly planning needs
}
