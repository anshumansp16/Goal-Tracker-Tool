import React from 'react';
import type { MonthData } from '../../types/insight';
import { categories } from '../../constants/categories';

interface MonthlyCalendarProps {
  monthData: MonthData;
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({ monthData }) => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-3"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = new Date(today.getFullYear(), today.getMonth(), day).toISOString().split('T')[0];
      const dayData = monthData[dateString];
      const isToday = dateString === new Date().toISOString().split('T')[0];
      const isPast = new Date(dateString) < new Date().setHours(0,0,0,0);
      
      let completedCategories = 0;
      if (dayData) {
        categories.forEach(cat => {
          const categoryData = dayData[cat.key];
          const totalTasks = categoryData.tasks?.length || 0;
          const completedTasks = categoryData.completedTasks?.length || 0;
          if (totalTasks > 0 && completedTasks === totalTasks) {
            completedCategories++;
          }
        });
      }
      
      const completionRate = categories.length > 0 ? completedCategories / categories.length : 0;
      
      days.push(
        <div 
          key={day} 
          className={`p-3 text-center rounded-lg transition-all ${
            isToday 
              ? 'bg-gray-100 font-semibold text-gray-900 ring-2 ring-gray-300' 
              : 'hover:bg-gray-50'
          }`}
        >
          <div className="text-sm font-medium">{day}</div>
          {isPast && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-gray-800 h-1 rounded-full transition-all duration-300" 
                  style={{ width: `${completionRate * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly calendar view</h2>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900">
            {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium p-3 text-gray-600 text-sm">
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyCalendar;
