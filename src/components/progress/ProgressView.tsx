import React, { useMemo } from 'react';
import { TrendingUp, Calendar, Clock, Target } from 'lucide-react';
import CategoryProgress from './CategoryProgress';
import MonthlyCalendar from './MonthlyCalendar';
import type { MonthData } from '../../types/insight';
import type { CategoryStats } from '../../types/category';
import { categories } from '../../constants/categories';

interface ProgressViewProps {
  monthData: MonthData;
  categoryStats: Record<string, CategoryStats>;
}

const ProgressView: React.FC<ProgressViewProps> = ({
  monthData,
  categoryStats
}) => {
  const analytics = useMemo(() => {
    const dates = Object.keys(monthData).sort();
    const today = new Date().toISOString().split('T')[0];
    const pastDates = dates.filter(date => date <= today);
    
    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    for (let i = pastDates.length - 1; i >= 0; i--) {
      const date = pastDates[i];
      const dayData = monthData[date];
      const dayCompleted = categories.every(cat => {
        const categoryData = dayData[cat.key];
        const totalTasks = categoryData.tasks?.length || 0;
        const completedTasks = categoryData.completedTasks?.length || 0;
        return totalTasks === 0 || completedTasks > 0; // Consider day complete if any task is done
      });
      
      if (dayCompleted) {
        if (i === pastDates.length - 1) currentStreak++;
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        if (i === pastDates.length - 1) currentStreak = 0;
        tempStreak = 0;
      }
    }
    
    // Calculate total time spent
    const totalTimeSpent = pastDates.reduce((total, date) => {
      return total + categories.reduce((dayTotal, cat) => {
        return dayTotal + (monthData[date][cat.key].timeSpent || 0);
      }, 0);
    }, 0);
    
    // Calculate average completion rate
    const avgCompletionRate = categories.reduce((avg, cat) => {
      const stats = categoryStats[cat.key];
      return avg + (stats.total > 0 ? stats.completed / stats.total : 0);
    }, 0) / categories.length;
    
    // Find most productive day of week
    const dayOfWeekStats: Record<string, { completed: number; total: number }> = {};
    pastDates.forEach(date => {
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
      if (!dayOfWeekStats[dayOfWeek]) {
        dayOfWeekStats[dayOfWeek] = { completed: 0, total: 0 };
      }
      dayOfWeekStats[dayOfWeek].total++;
      
      const dayCompleted = categories.some(cat => {
        const categoryData = monthData[date][cat.key];
        return (categoryData.completedTasks?.length || 0) > 0;
      });
      
      if (dayCompleted) {
        dayOfWeekStats[dayOfWeek].completed++;
      }
    });
    
    const mostProductiveDay = Object.entries(dayOfWeekStats).reduce((best, [day, stats]) => {
      const rate = stats.total > 0 ? stats.completed / stats.total : 0;
      return rate > best.rate ? { day, rate } : best;
    }, { day: 'Monday', rate: 0 });
    
    return {
      currentStreak,
      longestStreak,
      totalTimeSpent,
      avgCompletionRate: Math.round(avgCompletionRate * 100),
      mostProductiveDay: mostProductiveDay.day,
      totalDaysTracked: pastDates.length
    };
  }, [monthData, categoryStats]);

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="stat-label">
            <Target size={16} />
            Current streak
          </div>
          <div className="stat-value">{analytics.currentStreak}</div>
          <div className="stat-description">days in a row</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">
            <TrendingUp size={16} />
            Longest streak
          </div>
          <div className="stat-value">{analytics.longestStreak}</div>
          <div className="stat-description">days maximum</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">
            <Clock size={16} />
            Total time
          </div>
          <div className="stat-value">{Math.round(analytics.totalTimeSpent / 60)}</div>
          <div className="stat-description">hours logged</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">
            <Calendar size={16} />
            Best day
          </div>
          <div className="stat-value" style={{ fontSize: '0.875rem' }}>{analytics.mostProductiveDay}</div>
          <div className="stat-description">most productive</div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-medium text-gray-900 mb-3">Progress summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Overall completion rate</span>
            <span className="font-medium">{analytics.avgCompletionRate}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar blue"
              style={{ width: `${analytics.avgCompletionRate}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500">
            Based on {analytics.totalDaysTracked} days of tracking
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <CategoryProgress categoryStats={categoryStats} />
      
      {/* Monthly Calendar */}
      <MonthlyCalendar monthData={monthData} />

      {/* Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-medium text-gray-900 mb-3">Key insights</h3>
        <div className="space-y-2 text-sm text-gray-600">
          {analytics.currentStreak > 0 && (
            <p>🔥 You're on a {analytics.currentStreak}-day streak! Keep the momentum going.</p>
          )}
          {analytics.longestStreak > analytics.currentStreak && (
            <p>🎯 Your longest streak was {analytics.longestStreak} days. You can beat that record!</p>
          )}
          {analytics.avgCompletionRate > 70 && (
            <p>⭐ Excellent consistency! You're completing {analytics.avgCompletionRate}% of your goals.</p>
          )}
          {analytics.avgCompletionRate < 30 && (
            <p>💪 Focus on small wins. Even completing 1 task per day builds powerful habits.</p>
          )}
          <p>📊 {analytics.mostProductiveDay}s tend to be your most productive days.</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressView;
