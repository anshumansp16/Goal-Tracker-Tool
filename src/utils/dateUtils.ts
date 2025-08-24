export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const getWeekNumber = (date: string): number => {
  const d = new Date(date);
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + yearStart.getDay() + 1) / 7);
};

export const getWeekDates = (date: string): string[] => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  const sunday = new Date(d.setDate(diff));
  
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const weekDay = new Date(sunday);
    weekDay.setDate(sunday.getDate() + i);
    weekDates.push(weekDay.toISOString().split('T')[0]);
  }
  return weekDates;
};

export const getDayType = (dateString: string): 'weekend' | 'weekday' => {
  const date = new Date(dateString);
  const day = date.getDay();
  
  if (day === 0 || day === 6 || day === 5) return 'weekend'; // Friday, Saturday, Sunday
  return 'weekday';
};
