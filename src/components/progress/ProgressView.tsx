import React from 'react';
import CategoryProgress from './CategoryProgress';
import MonthlyCalendar from './MonthlyCalendar';
import type { MonthData } from '../../types/insight';
import type { CategoryStats } from '../../types/category';

interface ProgressViewProps {
  monthData: MonthData;
  categoryStats: Record<string, CategoryStats>;
}

const ProgressView: React.FC<ProgressViewProps> = ({
  monthData,
  categoryStats
}) => {
  return (
    <div className="space-y-8">
      <CategoryProgress categoryStats={categoryStats} />
      <MonthlyCalendar monthData={monthData} />
    </div>
  );
};

export default ProgressView;
