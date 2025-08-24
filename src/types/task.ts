export interface Task {
  text: string;
  type: TaskType;
}

export type TaskType = 'Routine' | 'Learning' | 'Creative' | 'Strategic';

export interface MonthlyGoal {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface TaskTypeStyle {
  label: TaskType;
  color: string;
}

export interface DailyTaskSuggestions {
  physicalHealth: string[];
  onetouchWork: string[];
  aarambhWork: string[];
  techLearning: string[];
  youtubeVideos: string[];
  breaks?: string[];
}