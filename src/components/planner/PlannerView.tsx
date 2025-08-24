import React, { useState } from 'react';
import { Calendar, Target, Clock } from 'lucide-react';
import MonthlyGoals from './MonthlyGoals';
import WeeklyPlanner from './WeeklyPlanner';
import DailySuggestions from './DailySuggestions';
import type { MonthlyGoals as MonthlyGoalsType } from '../../types/insight';
import type { CategoryKey } from '../../types/category';
import { categories } from '../../constants/categories';

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
  const [activeTab, setActiveTab] = useState<'monthly' | 'weekly' | 'daily'>('monthly');

  const getDayOfWeek = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  };

  const getTimeBasedSuggestions = (date: string) => {
    const dayOfWeek = getDayOfWeek(date);
    const isWeekend = dayOfWeek === 'friday' || dayOfWeek === 'saturday' || dayOfWeek === 'sunday';
    
    return categories.map(category => {
      const isPreferredDay = category.preferredDays.includes(dayOfWeek);
      const suggestedTasks = [];
      
      if (category.key === 'youtubeVideos' && isWeekend) {
        suggestedTasks.push('Watch educational videos', 'Review saved videos');
      } else if (category.key === 'techLearning' && (isWeekend || !isWeekend)) {
        suggestedTasks.push('Complete course module', 'Practice coding exercises');
      } else if (category.key === 'onetouchWork' && !isWeekend) {
        suggestedTasks.push('Focus work session', 'Complete project tasks');
      } else if (category.key === 'aarambhWork') {
        suggestedTasks.push('Work on side project', 'Plan next steps');
      } else if (category.key === 'physicalHealth') {
        suggestedTasks.push('Exercise session', 'Physical activity');
      }
      
      return {
        category,
        isPreferredDay,
        suggestedTasks,
        timeSlots: category.timeSlots
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Planner Navigation */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Planner</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {[
            { key: 'monthly', label: 'Monthly', icon: Target },
            { key: 'weekly', label: 'Weekly', icon: Calendar },
            { key: 'daily', label: 'Daily', icon: Clock }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === key 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="fade-in">
        {activeTab === 'monthly' && (
          <div className="space-y-6">
            <MonthlyGoals
              monthlyGoals={monthlyGoals}
              onAddMonthlyGoal={onAddMonthlyGoal}
              onToggleMonthlyGoal={onToggleMonthlyGoal}
            />
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Monthly Planning Tips</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Set 2-3 key goals per category for the month</li>
                <li>• Break down large goals into weekly milestones</li>
                <li>• Review and adjust goals weekly based on progress</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'weekly' && (
          <div className="space-y-6">
            <WeeklyPlanner
              currentDate={currentDate}
              onNavigateToToday={onNavigateToToday}
            />
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Weekly Schedule Optimization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Weekdays (Mon-Fri)</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Onetouch work: 10 AM - 6 PM</li>
                    <li>• Physical health: 7-10 PM</li>
                    <li>• Aarambh work: Evening/night</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Weekends (Fri-Sun)</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Youtube videos: Flexible timing</li>
                    <li>• Tech learning: Extended sessions</li>
                    <li>• Personal projects: Focus time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'daily' && (
          <div className="space-y-6">
            <DailySuggestions currentDate={currentDate} />
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Today's Smart Suggestions</h3>
              <div className="space-y-4">
                {getTimeBasedSuggestions(currentDate).map(({ category, isPreferredDay, suggestedTasks, timeSlots }) => (
                  <div key={category.key} className={`p-3 rounded-lg border ${isPreferredDay ? 'border-gray-300 bg-gray-50' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {/* @ts-ignore */}
                      <category.icon size={16} />
                      <span className="font-medium text-sm">{category.name}</span>
                      {isPreferredDay && <span className="text-xs bg-gray-200 px-2 py-1 rounded">Recommended today</span>}
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      Suggested time: {timeSlots.join(', ')}
                    </div>
                    <div className="text-xs text-gray-600">
                      Tasks: {suggestedTasks.join(', ') || 'Custom tasks'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlannerView;
