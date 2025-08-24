import React from 'react';
import { psychologicalInsights } from '../../constants/psychologicalInsights';

const PsychologicalFrameworks: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Psychological frameworks</h2>
        <p className="text-gray-600 mb-6">Evidence-based insights to overcome learning paralysis and build sustainable habits</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {psychologicalInsights.map((insight, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow">
            <div className="bg-gray-50 border-b border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 capitalize">{insight.title}</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed">{insight.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PsychologicalFrameworks;
