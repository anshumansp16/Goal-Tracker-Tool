import { useState, useEffect } from 'react';
import type { MonthData } from '../types/insight';
import type { CategoryKey } from '../types/category';
import type { Task } from '../types/task';
import { saveData, loadData, initializeDayData } from '../utils/storageUtils';

interface UseMonthDataReturn {
  monthData: MonthData;
  updateTaskCompletion: (category: CategoryKey, taskIndex: number, currentDate: string) => void;
  updateTimeSpent: (category: CategoryKey, time: string, currentDate: string) => void;
  addCustomTask: (category: CategoryKey, task: string, type: string, currentDate: string) => void;
  deleteTask: (category: CategoryKey, taskIndex: number, currentDate: string) => void;
  carryOverIncompleteTasks: (currentDate: string) => void;
  initializeCurrentDate: (currentDate: string) => void;
}

export const useMonthData = (): UseMonthDataReturn => {
  const [monthData, setMonthData] = useState<MonthData>(loadData());

  useEffect(() => {
    saveData(monthData);
  }, [monthData]);

  const updateTaskCompletion = (category: CategoryKey, taskIndex: number, currentDate: string) => {
    const newData = { ...monthData };
    if (!newData[currentDate][category].completedTasks) {
      newData[currentDate][category].completedTasks = [];
    }
    
    const completedTasks = newData[currentDate][category].completedTasks!;
    if (completedTasks.includes(taskIndex)) {
      newData[currentDate][category].completedTasks = completedTasks.filter(i => i !== taskIndex);
    } else {
      newData[currentDate][category].completedTasks!.push(taskIndex);
    }
    
    // Update category completion status
    const totalTasks = newData[currentDate][category].tasks.length;
    const completedCount = newData[currentDate][category].completedTasks!.length;
    newData[currentDate][category].completed = completedCount === totalTasks;
    
    setMonthData(newData);
  };

  const updateTimeSpent = (category: CategoryKey, time: string, currentDate: string) => {
    const newData = { ...monthData };
    newData[currentDate][category].timeSpent = parseInt(time) || 0;
    setMonthData(newData);
  };

  const addCustomTask = (category: CategoryKey, task: string, type = 'Routine', currentDate: string) => {
    if (!task.trim()) return;
    const newData = { ...monthData };
    const taskWithType = { text: task, type: type as Task['type'] };
    if (!newData[currentDate][category].tasks) {
      newData[currentDate][category].tasks = [];
    }
    if (typeof newData[currentDate][category].tasks[0] === 'string') {
      // Convert existing string tasks to objects
      newData[currentDate][category].tasks = newData[currentDate][category].tasks.map(t => 
        typeof t === 'string' ? { text: t, type: 'Routine' } : t
      );
    }
    newData[currentDate][category].tasks.push(taskWithType as Task);
    setMonthData(newData);
  };

  const deleteTask = (category: CategoryKey, taskIndex: number, currentDate: string) => {
    const newData = { ...monthData };
    // Remove the task
    newData[currentDate][category].tasks.splice(taskIndex, 1);
    
    // Update completed tasks array
    if (newData[currentDate][category].completedTasks) {
      newData[currentDate][category].completedTasks = newData[currentDate][category].completedTasks!
        .filter(index => index !== taskIndex)
        .map(index => index > taskIndex ? index - 1 : index);
    }
    
    // Update category completion status
    const totalTasks = newData[currentDate][category].tasks.length;
    const completedCount = newData[currentDate][category].completedTasks?.length || 0;
    newData[currentDate][category].completed = totalTasks > 0 && completedCount === totalTasks;
    
    setMonthData(newData);
  };

  const carryOverIncompleteTasks = (currentDate: string) => {
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];
    
    if (!monthData[yesterdayString] || !monthData[currentDate]) return;
    
    const newData = { ...monthData };
    let hasCarryover = false;
    
    Object.keys(newData[yesterdayString]).forEach(category => {
      const yesterdayData = monthData[yesterdayString][category as CategoryKey];
      const todayData = newData[currentDate][category as CategoryKey];
      const completedTasks = yesterdayData.completedTasks || [];
      
      if (yesterdayData.tasks) {
        yesterdayData.tasks.forEach((task: Task | string, index: number) => {
          if (!completedTasks.includes(index)) {
            // Task was not completed, carry it over
            const taskObj = typeof task === 'string' 
              ? { text: `${task} (carried over)`, type: 'Routine' as const }
              : { ...task, text: `${task.text} (carried over)` };
            todayData.tasks.push(taskObj);
            hasCarryover = true;
          }
        });
      }
    });
    
    if (hasCarryover) {
      setMonthData(newData);
    }
  };

  const initializeCurrentDate = (currentDate: string) => {
    if (!monthData[currentDate]) {
      const newData = { ...monthData };
      newData[currentDate] = initializeDayData(currentDate);
      setMonthData(newData);
    }
  };

  return {
    monthData,
    updateTaskCompletion,
    updateTimeSpent,
    addCustomTask,
    deleteTask,
    carryOverIncompleteTasks,
    initializeCurrentDate
  };
};
