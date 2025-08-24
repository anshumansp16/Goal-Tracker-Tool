import type { TaskTypeStyle } from '../types/task';

export const taskTypes: TaskTypeStyle[] = [
  { label: 'Routine', color: 'bg-gray-100 text-gray-700' },
  { label: 'Learning', color: 'bg-blue-100 text-blue-700' },
  { label: 'Creative', color: 'bg-purple-100 text-purple-700' },
  { label: 'Strategic', color: 'bg-green-100 text-green-700' }
];

export const defaultTasks = {
  physicalHealth: [
    "Take a 15-minute morning walk (microhabit formation)",
    "Practice 5 minutes of deep breathing (stress management)",
    "Track water intake for the day (simple accountability)"
  ],
  onetouchWork: [
    "Identify today's priority task (Eisenhower matrix)",
    "Complete a 25-minute focused work session",
    "Review daily progress and plan tomorrow (systems approach)"
  ],
  aarambhWork: [
    "Conduct 15-minute strategic planning session",
    "Check and respond to client communications",
    "Complete one business development activity"
  ],
  techLearning: [
    "Practice Python for 5-15 minutes (microlearning)",
    "Study one AI/ML concept (spaced repetition)",
    "Review code or complete tutorial exercise (deliberate practice)"
  ],
  youtubeVideos: [
    "Record or edit video content (15-20 minutes)",
    "Research trending topics in your niche",
    "Engage with comments and community"
  ]
};
