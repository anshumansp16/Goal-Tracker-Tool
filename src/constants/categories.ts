import { Target, TrendingUp, Calendar, Brain, Video } from 'lucide-react';
import type { Category } from '../types/category';

export const categories: Category[] = [
  { 
    key: 'physicalHealth', 
    name: 'Physical health', 
    icon: Target, 
    color: '#666666',
    timeSlots: ['19:00-20:00', '20:00-21:00', '21:00-22:00'],
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  },
  { 
    key: 'onetouchWork', 
    name: 'Onetouch work', 
    icon: TrendingUp, 
    color: '#666666',
    timeSlots: ['10:00-18:00'],
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  },
  { 
    key: 'aarambhWork', 
    name: 'Aarambh work', 
    icon: Calendar, 
    color: '#666666',
    timeSlots: ['18:00-22:00', '22:00-24:00'],
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  },
  { 
    key: 'techLearning', 
    name: 'Tech learning', 
    icon: Brain, 
    color: '#666666',
    timeSlots: ['18:00-22:00', '22:00-24:00'],
    preferredDays: ['friday', 'saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday']
  },
  { 
    key: 'youtubeVideos', 
    name: 'Youtube videos', 
    icon: Video, 
    color: '#666666',
    timeSlots: ['10:00-22:00'],
    preferredDays: ['friday', 'saturday', 'sunday']
  }
];
