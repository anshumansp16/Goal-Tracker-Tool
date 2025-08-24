import { useState, useEffect } from 'react';
import type { MonthlyGoals } from '../types/insight';
import type { CategoryKey } from '../types/category';

interface UseMonthlyGoalsReturn {
  monthlyGoals: MonthlyGoals;
  addMonthlyGoal: (category: CategoryKey, goal: string) => void;
  toggleMonthlyGoal: (category: CategoryKey, goalId: number) => void;
}

export const useMonthlyGoals = (): UseMonthlyGoalsReturn => {
  const [monthlyGoals, setMonthlyGoals] = useState<MonthlyGoals>(() => {
    const saved = localStorage.getItem('monthlyGoals');
    return saved ? JSON.parse(saved) : {
      physicalHealth: [],
      onetouchWork: [],
      aarambhWork: [],
      techLearning: [],
      youtubeVideos: []
    };
  });

  useEffect(() => {
    localStorage.setItem('monthlyGoals', JSON.stringify(monthlyGoals));
  }, [monthlyGoals]);

  const addMonthlyGoal = (category: CategoryKey, goal: string) => {
    if (!goal.trim()) return;
    const newGoals = { ...monthlyGoals };
    newGoals[category].push({
      id: Date.now(),
      text: goal,
      completed: false,
      createdAt: new Date().toISOString()
    });
    setMonthlyGoals(newGoals);
  };

  const toggleMonthlyGoal = (category: CategoryKey, goalId: number) => {
    const newGoals = { ...monthlyGoals };
    const goal = newGoals[category].find(g => g.id === goalId);
    if (goal) {
      goal.completed = !goal.completed;
      setMonthlyGoals(newGoals);
    }
  };

  return {
    monthlyGoals,
    addMonthlyGoal,
    toggleMonthlyGoal
  };
};
