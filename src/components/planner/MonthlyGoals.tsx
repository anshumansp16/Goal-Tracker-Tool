import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { categories } from '../../constants/categories';
import type { MonthlyGoals as MonthlyGoalsType } from '../../types/insight';
import type { CategoryKey } from '../../types/category';

interface MonthlyGoalsProps {
  monthlyGoals: MonthlyGoalsType;
  onAddMonthlyGoal: (category: CategoryKey, goal: string) => void;
  onToggleMonthlyGoal: (category: CategoryKey, goalId: number) => void;
}

const MonthlyGoals: React.FC<MonthlyGoalsProps> = ({
  monthlyGoals,
  onAddMonthlyGoal,
  onToggleMonthlyGoal
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly goals</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map(category => (
          <div key={category.key} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <category.icon size={20} className={category.color} />
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
            </div>
            
            <div className="space-y-2 mb-4">
              {monthlyGoals[category.key].map(goal => (
                <div key={goal.id} className="flex items-start gap-3 group">
                  <button
                    onClick={() => onToggleMonthlyGoal(category.key, goal.id)}
                    className="mt-0.5 flex-shrink-0"
                  >
                    {goal.completed ? (
                      <CheckCircle2 size={18} className="text-gray-800" />
                    ) : (
                      <Circle size={18} className="text-gray-300 hover:text-gray-500" />
                    )}
                  </button>
                  <span className={`flex-1 text-sm ${goal.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                    {goal.text}
                  </span>
                </div>
              ))}
            </div>
            
            <input
              type="text"
              placeholder="Add monthly goal..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onAddMonthlyGoal(category.key, (e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyGoals;
