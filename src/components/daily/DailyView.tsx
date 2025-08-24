import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import AIInsightPanel from './AIInsightPanel';
import { categories } from '../../constants/categories';
import type { CategoryKey } from '../../types/category';
import { generateDailyInsight } from '../../services/aiService';
import type { AIInsight } from '../../types/insight';

interface DailyViewProps {
  currentDate: string;
  monthData: any;
  onUpdateTaskCompletion: (category: CategoryKey, taskIndex: number) => void;
  onUpdateTimeSpent: (category: CategoryKey, time: string) => void;
  onAddCustomTask: (category: CategoryKey, task: string, type: string) => void;
  onDeleteTask: (category: CategoryKey, taskIndex: number) => void;
  stats: { totalDays: number; completedDays: number; };
}

const DailyView: React.FC<DailyViewProps> = ({
  currentDate,
  monthData,
  onUpdateTaskCompletion,
  onUpdateTimeSpent,
  onAddCustomTask,
  onDeleteTask,
  stats
}) => {
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [newTaskInputs, setNewTaskInputs] = useState<Record<string, string | undefined>>({});

  const handleGenerateInsight = async () => {
    setLoading(true);
    try {
      const insight = await generateDailyInsight(monthData[currentDate], stats);
      setAiInsight(insight);
    } catch (error) {
      console.error('Error generating insight:', error);
    }
    setLoading(false);
  };

  const toggleNewTaskInput = (category: CategoryKey) => {
    setNewTaskInputs(prev => ({
      ...prev,
      [category]: prev[category] === undefined ? '' : undefined
    }));
  };

  return (
    <div className="content-grid">
      {/* Main Tasks */}
      <div className="category-section">
        {categories.map(category => {
          const categoryData = monthData[currentDate][category.key] || { tasks: [], timeSpent: 0, completedTasks: [] };
          
          return (
            <CategoryCard
              key={category.key}
              category={category}
              categoryData={categoryData}
              onUpdateTimeSpent={(time) => onUpdateTimeSpent(category.key, time)}
              onUpdateTaskCompletion={(taskIndex) => onUpdateTaskCompletion(category.key, taskIndex)}
              onDeleteTask={(taskIndex) => onDeleteTask(category.key, taskIndex)}
              onAddCustomTask={(task, type) => onAddCustomTask(category.key, task, type)}
              newTaskInput={newTaskInputs[category.key]}
              onNewTaskInputChange={(value) => setNewTaskInputs({ ...newTaskInputs, [category.key]: value })}
              onToggleNewTaskInput={() => toggleNewTaskInput(category.key)}
            />
          );
        })}
      </div>

      {/* AI Insight Panel */}
      <div className="insights-panel">
        <AIInsightPanel
          aiInsight={aiInsight}
          loading={loading}
          onGenerateInsight={handleGenerateInsight}
        />
      </div>
    </div>
  );
};

export default DailyView;
