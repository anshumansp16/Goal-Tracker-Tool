import type { Task, DailyTaskSuggestions } from '../types/task';
import type { TimeSlots } from '../types/category';
import { getDayType } from './dateUtils';

export const getTaskText = (task: Task | string): string => {
  return typeof task === 'string' ? task : task.text;
};

export const getTaskType = (task: Task | string): string => {
  return typeof task === 'string' ? 'Routine' : (task.type || 'Routine');
};

export const getTimeSlotRecommendations = (dateString: string): TimeSlots => {
  const dayType = getDayType(dateString);
  
  if (dayType === 'weekend') {
    return {
      morning: ['Break/Free time', 'YouTube videos'],
      afternoon: ['Tech learning', 'YouTube videos'],
      evening: ['Physical health (7-10 PM)', 'Aarambh work'],
      night: ['Tech learning', 'Break/Free time']
    };
  } else {
    return {
      morning: ['Onetouch work (10 AM-6 PM)'],
      afternoon: ['Onetouch work (10 AM-6 PM)'],
      evening: ['Physical health (7-10 PM)', 'Break/Free time'],
      night: ['Aarambh work', 'Tech learning']
    };
  }
};

export const generateDailyTaskSuggestions = (dateString: string): DailyTaskSuggestions => {
  const dayType = getDayType(dateString);
  
  return {
    physicalHealth: ['Evening workout or gym (7-10 PM, 1 hour)', 'Post-workout stretching and recovery'],
    onetouchWork: dayType === 'weekday' ? [
      'Priority project work (10 AM-6 PM)',
      'Team meetings and communications',
      'Strategic planning and task management',
      'Client calls and project coordination'
    ] : ['Weekly review and planning (1 hour)', 'Skill development for work projects'],
    aarambhWork: [
      'Business development calls',
      'Client project work (1-2 hours)',
      'Market research and analysis',
      'Financial planning and business strategy'
    ],
    techLearning: dayType === 'weekend' ? [
      'Deep dive coding session (2-3 hours)',
      'Complete online course modules',
      'Work on personal programming projects',
      'Algorithm practice and problem solving'
    ] : [
      'Quick skill practice (30 min after work)',
      'Read tech articles or documentation',
      'Code review or debugging session',
      'Watch tutorial videos (20-30 min)'
    ],
    youtubeVideos: dayType === 'weekend' ? [
      'Content planning and scripting (2 hours)',
      'Video recording session (3-4 hours)',
      'Video editing and post-production',
      'Thumbnail creation and optimization',
      'Community engagement and comments response'
    ] : [
      'Quick video editing (30-45 min)',
      'Trend research and content ideas (15 min)',
      'Upload scheduling and SEO optimization',
      'Analytics review and strategy adjustment'
    ],
    breaks: dayType === 'weekday' ? [
      'Morning coffee break (9-10 AM)',
      'Lunch break and walk (12-1 PM)',
      'Evening decompression (6-7 PM)',
      'Late night relaxation (after 10 PM)'
    ] : [
      'Leisurely morning routine',
      'Social time with friends/family (1-2 hours)',
      'Leisure reading or entertainment',
      'Mindfulness or meditation session'
    ]
  };
};
