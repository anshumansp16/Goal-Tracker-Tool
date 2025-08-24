import React from 'react';
import { psychologicalInsights } from '../../constants/psychologicalInsights';

const PsychologicalFrameworks: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Psychological Frameworks</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">Evidence-based insights to overcome learning paralysis and build sustainable habits</p>
        <div className="w-24 h-1 bg-gray-800 rounded-full mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {psychologicalInsights.map((insight, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-6">
              <h3 className="font-bold text-lg text-gray-900 capitalize mb-1">{insight.title}</h3>
              <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed text-base">{insight.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PsychologicalFrameworks;
