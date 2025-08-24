import React from 'react';
import { formatDate, getWeekDates } from '../../utils/dateUtils';
import { getTimeSlotRecommendations, generateDailyTaskSuggestions } from '../../utils/taskUtils';
import { getDayType } from '../../utils/dateUtils';

interface WeeklyPlannerProps {
  currentDate: string;
  onNavigateToToday: () => void;
}

const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  currentDate,
  onNavigateToToday
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly planning</h2>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900">
            Week of {formatDate(getWeekDates(currentDate)[0])}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Plan your week based on monthly goals and optimal time slots
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {getWeekDates(currentDate).map((date, index) => {
              const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
              const dayType = getDayType(date);
              const timeSlots = getTimeSlotRecommendations(date);
              const suggestions = generateDailyTaskSuggestions(date);
              const isToday = date === currentDate;
              
              return (
                <div key={date} className={`border rounded-lg p-4 ${isToday ? 'border-gray-400 bg-gray-50' : 'border-gray-200'}`}>
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900">{dayName}</h4>
                    <p className="text-xs text-gray-600">{new Date(date).getDate()}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                      dayType === 'weekend' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {dayType}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    {Object.entries(timeSlots).map(([slot, activities]) => (
                      <div key={slot}>
                        <span className="font-medium text-gray-700 capitalize">{slot}:</span>
                        <div className="text-gray-600">
                          {activities.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {isToday && (
                    <button
                      onClick={onNavigateToToday}
                      className="mt-3 w-full px-3 py-2 bg-gray-900 text-white text-xs rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Go to today
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanner;
