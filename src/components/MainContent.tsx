import React from 'react';
import DailyView from './daily/DailyView';
import PlannerView from './planner/PlannerView';
import ProgressView from './progress/ProgressView';
import PsychologicalFrameworks from './insights/PsychologicalFrameworks';
import type { CategoryStats } from '../types/category';
import type { MonthData, MonthlyGoals } from '../types/insight';
import type { CategoryKey } from '../types/category';

interface MainContentProps {
  activeView: string;
  currentDate: string;
  monthData: MonthData;
  monthlyGoals: MonthlyGoals;
  stats: {
    totalDays: number;
    completedDays: number;
    categoryStats: Record<string, CategoryStats>;
  };
  onUpdateTaskCompletion: (category: CategoryKey, taskIndex: number) => void;
  onUpdateTimeSpent: (category: CategoryKey, time: string) => void;
  onAddCustomTask: (category: CategoryKey, task: string, type: string) => void;
  onDeleteTask: (category: CategoryKey, taskIndex: number) => void;
  onAddMonthlyGoal: (category: CategoryKey, goal: string) => void;
  onToggleMonthlyGoal: (category: CategoryKey, goalId: number) => void;
  onNavigateToToday: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  activeView,
  currentDate,
  monthData,
  monthlyGoals,
  stats,
  onUpdateTaskCompletion,
  onUpdateTimeSpent,
  onAddCustomTask,
  onDeleteTask,
  onAddMonthlyGoal,
  onToggleMonthlyGoal,
  onNavigateToToday
}) => {
  const renderContent = () => {
    switch (activeView) {
      case 'today':
        return (
          <DailyView
            currentDate={currentDate}
            monthData={monthData}
            onUpdateTaskCompletion={onUpdateTaskCompletion}
            onUpdateTimeSpent={onUpdateTimeSpent}
            onAddCustomTask={onAddCustomTask}
            onDeleteTask={onDeleteTask}
            stats={stats}
          />
        );
      case 'planner':
        return (
          <PlannerView
            currentDate={currentDate}
            monthlyGoals={monthlyGoals}
            onAddMonthlyGoal={onAddMonthlyGoal}
            onToggleMonthlyGoal={onToggleMonthlyGoal}
            onNavigateToToday={onNavigateToToday}
          />
        );
      case 'progress':
        return (
          <ProgressView
            monthData={monthData}
            categoryStats={stats.categoryStats}
          />
        );
      case 'insights':
        return <PsychologicalFrameworks />;
      default:
        return null;
    }
  };

  return (
    <div className="fade-in">
      {renderContent()}
    </div>
  );
};

export default MainContent;
