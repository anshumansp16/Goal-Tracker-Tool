import React from 'react';
import { Clock, X, Plus, CheckCircle2, Circle } from 'lucide-react';
import type { Category, CategoryData } from '../../types/category';
import { taskTypes } from '../../constants/taskTypes';
import { getTaskText, getTaskType } from '../../utils/taskUtils';

interface CategoryCardProps {
  category: Category;
  categoryData: CategoryData;
  onUpdateTimeSpent: (time: string) => void;
  onUpdateTaskCompletion: (taskIndex: number) => void;
  onDeleteTask: (taskIndex: number) => void;
  onAddCustomTask: (task: string, type: string) => void;
  newTaskInput?: string;
  onNewTaskInputChange: (value: string) => void;
  onToggleNewTaskInput: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  categoryData,
  onUpdateTimeSpent,
  onUpdateTaskCompletion,
  onDeleteTask,
  onAddCustomTask,
  newTaskInput,
  onNewTaskInputChange,
  onToggleNewTaskInput
}) => {
  const completedTasks = categoryData.completedTasks || [];
  const completionRate = categoryData.tasks.length > 0 ? (completedTasks.length / categoryData.tasks.length) * 100 : 0;

  const progressClass = completionRate >= 80 ? 'green' : completionRate >= 60 ? 'yellow' : completionRate >= 40 ? 'orange' : 'red';
  const IconComponent = category.icon;
  
  return (
    <div className="category-card fade-in">
      <div className="category-header">
        <div className="category-header-content">
          <div className="category-info">
            <div className="category-icon-container">
              {/* @ts-ignore */}
              <IconComponent size={22} strokeWidth={2} />
            </div>
            <div>
              <h3 className="category-title">{category.name}</h3>
              <p className="category-subtitle">
                {completedTasks.length} of {categoryData.tasks.length} tasks completed
              </p>
            </div>
          </div>
          <div className="category-controls">
            <div className="time-input-container">
              <Clock size={18} />
              <input
                type="number"
                placeholder="0"
                value={categoryData.timeSpent || ''}
                onChange={(e) => onUpdateTimeSpent(e.target.value)}
                className="time-input"
              />
              <span className="time-label">min</span>
            </div>
            <div className="completion-stats">
              <div className="completion-percentage">{Math.round(completionRate)}%</div>
              <div className="completion-bar-container">
                <div 
                  className={`progress-bar ${progressClass}`}
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="task-list">
        {categoryData.tasks.map((task, index) => {
          const taskText = getTaskText(task);
          const taskType = getTaskType(task);
          const typeStyle = taskTypes.find(t => t.label === taskType) || taskTypes[0];
          
          return (
            <div key={index} className="task-item">
              <button
                onClick={() => onUpdateTaskCompletion(index)}
                className="task-checkbox"
              >
                {completedTasks.includes(index) ? (
                  <CheckCircle2 className="checked" />
                ) : (
                  <Circle className="unchecked" />
                )}
              </button>
              <div className="task-content">
                <span className={`task-text ${completedTasks.includes(index) ? 'completed' : ''}`}>
                  {taskText}
                </span>
                <span className={`task-type-badge ${taskType.toLowerCase()}`}>
                  {taskType}
                </span>
              </div>
              <button
                onClick={() => onDeleteTask(index)}
                className="task-delete"
                title="Delete task"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
        
        <div className="add-task-section">
          {newTaskInput !== undefined ? (
            <div className="add-task-form">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTaskInput}
                onChange={(e) => onNewTaskInputChange(e.target.value)}
                className="add-task-input"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    onAddCustomTask(newTaskInput, 'Routine');
                  }
                }}
              />
              <div className="add-task-controls">
                <select 
                  className="task-type-select"
                  onChange={(e) => {
                    if (newTaskInput?.trim()) {
                      onAddCustomTask(newTaskInput, e.target.value);
                    }
                  }}
                >
                  {taskTypes.map(type => (
                    <option key={type.label} value={type.label}>{type.label}</option>
                  ))}
                </select>
                <button
                  onClick={onToggleNewTaskInput}
                  className="cancel-button"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onToggleNewTaskInput}
              className="add-task-button dashed"
            >
              <Plus size={18} />
              Add new task
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
