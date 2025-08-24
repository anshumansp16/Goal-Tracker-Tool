import React from 'react';
import { categories } from '../../constants/categories';
import type { CategoryStats } from '../../types/category';

interface CategoryProgressProps {
  categoryStats: Record<string, CategoryStats>;
}

const CategoryProgress: React.FC<CategoryProgressProps> = ({ categoryStats }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Category Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => {
          const data = categoryStats[category.key];
          const percentage = Math.round((data.completed / data.total) * 100);
          
          return (
            <div key={category.key} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  {/* @ts-ignore */}
                  <category.icon size={24} style={{ color: category.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{data.completed} of {data.total} days completed</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-black text-gray-900">{percentage}%</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-600">Progress</div>
                    <div className="text-xs text-gray-500">{data.completed}/{data.total}</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 transition-all duration-700 ease-out"
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
