import React from 'react';
import { Target } from 'lucide-react';
import { categories } from '../../constants/categories';
import { formatDate, getDayType } from '../../utils/dateUtils';
import { getTimeSlotRecommendations, generateDailyTaskSuggestions } from '../../utils/taskUtils';

interface DailySuggestionsProps {
  currentDate: string;
}

const DailySuggestions: React.FC<DailySuggestionsProps> = ({ currentDate }) => {
  const dayType = getDayType(currentDate);
  const suggestions = generateDailyTaskSuggestions(currentDate);
  const timeSlots = getTimeSlotRecommendations(currentDate);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Smart suggestions for {formatDate(currentDate)}</h2>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${
            dayType === 'weekend' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {dayType} schedule
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(suggestions).map(([categoryKey, suggestions]) => {
            const category = categories.find(c => c.key === categoryKey) || { 
              name: categoryKey, 
              icon: Target, 
              color: 'text-gray-700' 
            };
            
            return (
              <div key={categoryKey} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  {/* @ts-ignore */}
                  <category.icon size={16} style={{ color: category.color }} />
                  <h4 className="font-semibold text-gray-900 capitalize">
                    {categoryKey === 'breaks' ? 'Breaks & free time' : category.name}
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  {suggestions.slice(0, 4).map((suggestion: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Optimal time allocation guide</h4>
          <div className="mb-3 text-sm text-gray-600">
            {dayType === 'weekend' 
              ? 'Weekend schedule: Focus on YouTube videos, deep tech learning, and flexible timing'
              : 'Weekday schedule: Onetouch work (10 AM-6 PM), Physical health (7-10 PM), Aarambh work (nights)'
            }
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {Object.entries(timeSlots).map(([timeSlot, activities]) => (
              <div key={timeSlot} className="text-center">
                <div className="font-medium text-gray-900 capitalize mb-1">{timeSlot}</div>
                <div className="text-gray-600 text-xs">
                  {activities.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySuggestions;
