import { useState, useEffect } from 'react';
import type { WeeklyPlans } from '../types/insight';

interface UseWeeklyPlansReturn {
  weeklyPlans: WeeklyPlans;
  updateWeeklyPlan: (weekKey: string, plan: any) => void;
}

export const useWeeklyPlans = (): UseWeeklyPlansReturn => {
  const [weeklyPlans, setWeeklyPlans] = useState<WeeklyPlans>(() => {
    const saved = localStorage.getItem('weeklyPlans');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('weeklyPlans', JSON.stringify(weeklyPlans));
  }, [weeklyPlans]);

  const updateWeeklyPlan = (weekKey: string, plan: any) => {
    setWeeklyPlans(prev => ({
      ...prev,
      [weekKey]: plan
    }));
  };

  return {
    weeklyPlans,
    updateWeeklyPlan
  };
};
