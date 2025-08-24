import React from 'react';
import { categories } from '../../constants/categories';
import type { CategoryStats } from '../../types/category';

interface CategoryProgressProps {
  categoryStats: Record<string, CategoryStats>;
}

const CategoryProgress: React.FC<CategoryProgressProps> = ({ categoryStats }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Category progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => {
          const data = categoryStats[category.key];
          const percentage = Math.round((data.completed / data.total) * 100);
          
          return (
            <div key={category.key} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <category.icon size={20} className={category.color} />
                <div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{data.completed} of {data.total} days completed</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gray-800 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryProgress;
