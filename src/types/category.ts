import type { Icon } from 'lucide-react';
import type { Task } from './task';

export interface Category {
  key: CategoryKey;
  name: string;
  icon: typeof Icon;
  color: string;
}

export type CategoryKey = 'physicalHealth' | 'onetouchWork' | 'aarambhWork' | 'techLearning' | 'youtubeVideos';

export interface CategoryData {
  tasks: Task[];
  timeSpent: number;
  completed: boolean;
  completedTasks?: number[];
}

export interface CategoryStats {
  completed: number;
  total: number;
}

export interface TimeSlots {
  morning: string[];
  afternoon: string[];
  evening: string[];
  night: string[];
}
