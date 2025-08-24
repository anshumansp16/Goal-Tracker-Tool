import { Target, TrendingUp, Calendar, Brain, Video } from 'lucide-react';
import type { Category } from '../types/category';

export const categories: Category[] = [
  { 
    key: 'physicalHealth', 
    name: 'Physical health', 
    icon: Target, 
    color: 'text-gray-700'
  },
  { 
    key: 'onetouchWork', 
    name: 'Onetouch work', 
    icon: TrendingUp, 
    color: 'text-gray-700'
  },
  { 
    key: 'aarambhWork', 
    name: 'Aarambh work', 
    icon: Calendar, 
    color: 'text-gray-700'
  },
  { 
    key: 'techLearning', 
    name: 'Tech learning', 
    icon: Brain, 
    color: 'text-gray-700'
  },
  { 
    key: 'youtubeVideos', 
    name: 'YouTube videos', 
    icon: Video, 
    color: 'text-gray-700'
  }
];
