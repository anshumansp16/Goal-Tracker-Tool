import React from 'react';
import MonthlyGoals from './MonthlyGoals';
import WeeklyPlanner from './WeeklyPlanner';
import DailySuggestions from './DailySuggestions';
import type { MonthlyGoals as MonthlyGoalsType } from '../../types/insight';
import type { CategoryKey } from '../../types/category';

interface PlannerViewProps {
  currentDate: string;
  monthlyGoals: MonthlyGoalsType;
  onAddMonthlyGoal: (category: CategoryKey, goal: string) => void;
  onToggleMonthlyGoal: (category: CategoryKey, goalId: number) => void;
  onNavigateToToday: () => void;
}

const PlannerView: React.FC<PlannerViewProps> = ({
  currentDate,
  monthlyGoals,
  onAddMonthlyGoal,
  onToggleMonthlyGoal,
  onNavigateToToday
}) => {
  return (
    <div className="space-y-8">
      <MonthlyGoals
        monthlyGoals={monthlyGoals}
        onAddMonthlyGoal={onAddMonthlyGoal}
        onToggleMonthlyGoal={onToggleMonthlyGoal}
      />
      <WeeklyPlanner
        currentDate={currentDate}
        onNavigateToToday={onNavigateToToday}
      />
      <DailySuggestions currentDate={currentDate} />
    </div>
  );
};

export default PlannerView;
