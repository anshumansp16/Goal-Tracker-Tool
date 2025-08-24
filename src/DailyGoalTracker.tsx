import React, { useState, useEffect } from 'react';
import { Calendar, Target, BarChart3, Brain } from 'lucide-react';
import MainContent from './components/MainContent';
import { useMonthData } from './hooks/useMonthData';
import { useMonthlyGoals } from './hooks/useMonthlyGoals';
import { useWeeklyPlans } from './hooks/useWeeklyPlans';
import { categories } from './constants/categories';
import { formatDate } from './utils/dateUtils';

const DailyGoalTracker: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeView, setActiveView] = useState('today');
  
  const {
    monthData,
    updateTaskCompletion,
    updateTimeSpent,
    addCustomTask,
    deleteTask,
    carryOverIncompleteTasks,
    initializeCurrentDate
  } = useMonthData();

  const {
    monthlyGoals,
    addMonthlyGoal,
    toggleMonthlyGoal
  } = useMonthlyGoals();

  useWeeklyPlans(); // Keep for future use

  useEffect(() => {
    initializeCurrentDate(currentDate);
    carryOverIncompleteTasks(currentDate);
  }, [currentDate]);

  const getProgressStats = () => {
    const dates = Object.keys(monthData).sort();
    const today = new Date().toISOString().split('T')[0];
    const pastDates = dates.filter(date => date <= today);
    
    let totalDays = pastDates.length;
    let completedDays = 0;
    let categoryStats: Record<string, { completed: number; total: number }> = {};
    
    categories.forEach(cat => {
      categoryStats[cat.key] = { completed: 0, total: pastDates.length };
    });
    
    pastDates.forEach(date => {
      let dayCompleted = true;
      categories.forEach(cat => {
        const categoryData = monthData[date][cat.key];
        const totalTasks = categoryData.tasks?.length || 0;
        const completedTasks = categoryData.completedTasks?.length || 0;
        
        if (totalTasks > 0 && completedTasks === totalTasks) {
          categoryStats[cat.key].completed++;
        } else {
          dayCompleted = false;
        }
      });
      
      if (dayCompleted) completedDays++;
    });
    
    return { totalDays, completedDays, categoryStats };
  };

  const stats = getProgressStats();

  return (
    <div className="app-container">
      <div className="header-container">
        <div className="header-content">
          <div className="fade-in">
            <h1 className="header-title">
              Daily goal tracker
            </h1>
            <p className="header-subtitle">Track your progress across health, work, and learning goals</p>
          </div>
          
          <div className="nav-container">
            <div className="date-picker">
              <Calendar size={18} />
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
              />
              <span className="date-display">{formatDate(currentDate)}</span>
            </div>
            
            <div className="nav-tabs">
              {[
                { key: 'today', label: 'Today', icon: Target },
                { key: 'planner', label: 'Planner', icon: Calendar },
                { key: 'progress', label: 'Progress', icon: BarChart3 },
                { key: 'insights', label: 'Insights', icon: Brain }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveView(key)}
                  className={`nav-tab ${activeView === key ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Month progress</div>
              <div className="stat-value">
                {stats.completedDays}<span className="stat-value-small">/{stats.totalDays}</span>
              </div>
              <div className="stat-description">
                {Math.round((stats.completedDays / stats.totalDays) * 100)}% complete
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar blue"
                  style={{ width: `${Math.round((stats.completedDays / stats.totalDays) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            {categories.map(cat => {
              const percentage = Math.round((stats.categoryStats[cat.key].completed / stats.categoryStats[cat.key].total) * 100);
              const progressClass = percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : percentage >= 40 ? 'orange' : 'red';
              const IconComponent = cat.icon;
              
              return (
                <div key={cat.key} className="stat-card">
                  <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {/* @ts-ignore */}
                    <IconComponent size={18} strokeWidth={2} />
                    {cat.name}
                  </div>
                  <div className="stat-value">
                    {stats.categoryStats[cat.key].completed}
                    <span className="stat-value-small">
                      /{stats.categoryStats[cat.key].total}
                    </span>
                  </div>
                  <div className="stat-description">
                    {percentage}% success
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className={`progress-bar ${progressClass}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="main-content">
        <MainContent
          activeView={activeView}
          currentDate={currentDate}
          monthData={monthData}
          monthlyGoals={monthlyGoals}
          stats={stats}
          onUpdateTaskCompletion={(category, taskIndex) => updateTaskCompletion(category, taskIndex, currentDate)}
          onUpdateTimeSpent={(category, time) => updateTimeSpent(category, time, currentDate)}
          onAddCustomTask={(category, task, type) => addCustomTask(category, task, type, currentDate)}
          onDeleteTask={(category, taskIndex) => deleteTask(category, taskIndex, currentDate)}
          onAddMonthlyGoal={addMonthlyGoal}
          onToggleMonthlyGoal={toggleMonthlyGoal}
          onNavigateToToday={() => setActiveView('today')}
        />
      </div>
    </div>
  );
};

export default DailyGoalTracker;
