import React from 'react';
import { formatDate, getWeekDates, getDayType } from '../../utils/dateUtils';
import { getTimeSlotRecommendations } from '../../utils/taskUtils';

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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Planning</h2>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-2">
            Week of {formatDate(getWeekDates(currentDate)[0])}
          </h3>
          <p className="text-gray-600 text-base">
            Plan your week based on monthly goals and optimal time slots
          </p>
          <div className="w-16 h-1 bg-gray-800 rounded-full mt-3"></div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            {getWeekDates(currentDate).map((date) => {
              const shortDay = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
              const dayType = getDayType(date);
              const timeSlots = getTimeSlotRecommendations(date);
              const isToday = date === currentDate;
              
              return (
                <div key={date} className={`border rounded-xl p-5 transition-all duration-300 ${
                  isToday 
                    ? 'border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}>
                  <div className="mb-4 text-center">
                    <h4 className="font-bold text-gray-900 text-lg lg:text-base">{shortDay}</h4>
                    <p className="text-sm text-gray-600 font-medium">{new Date(date).getDate()}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                      dayType === 'weekend' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {dayType}
                    </span>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    {Object.entries(timeSlots).map(([slot, activities]) => (
                      <div key={slot} className="bg-gray-50 rounded-lg p-3">
                        <span className="font-semibold text-gray-800 capitalize block mb-1">{slot}</span>
                        <div className="text-gray-600 text-xs leading-relaxed">
                          {activities.join(' • ')}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {isToday && (
                    <button
                      onClick={onNavigateToToday}
                      className="mt-4 w-full px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Go to Today
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
