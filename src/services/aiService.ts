import type { AIInsight } from '../types/insight';
import { categories } from '../constants/categories';
import type { CategoryData } from '../types/category';

interface ProgressStats {
  totalDays: number;
  completedDays: number;
}

// Smart insights based on completion patterns
const getSmartInsights = (todayData: Record<string, CategoryData>, stats: ProgressStats): AIInsight[] => {
  const insights: AIInsight[] = [];
  
  // Analyze completion patterns
  const categoryCompletions = categories.map(cat => {
    const data = todayData[cat.key];
    const completedTasks = data.completedTasks?.length || 0;
    const totalTasks = data.tasks?.length || 0;
    const completionRate = totalTasks > 0 ? completedTasks / totalTasks : 0;
    return { category: cat, completionRate, timeSpent: data.timeSpent || 0 };
  });

  const strongestCategory = categoryCompletions.reduce((prev, current) => 
    current.completionRate > prev.completionRate ? current : prev
  );
  
  const weakestCategory = categoryCompletions.reduce((prev, current) => 
    current.completionRate < prev.completionRate ? current : prev
  );

  // Generate insights based on patterns
  if (strongestCategory.completionRate > 0.8) {
    insights.push({
      insight: `Excellent progress in ${strongestCategory.category.name}! You're building strong momentum and consistency.`,
      advice: `Maintain this momentum by continuing your current approach. Consider increasing the challenge slightly.`,
      focus: strongestCategory.category.name
    });
  }

  if (weakestCategory.completionRate < 0.3 && weakestCategory.category.key !== strongestCategory.category.key) {
    insights.push({
      insight: `${weakestCategory.category.name} needs attention. Small, consistent actions lead to big results over time.`,
      advice: `Start with just 5-10 minutes daily for ${weakestCategory.category.name}. Focus on building the habit first.`,
      focus: weakestCategory.category.name
    });
  }

  // Monthly progress insights
  const monthlyProgress = stats.completedDays / stats.totalDays;
  if (monthlyProgress > 0.7) {
    insights.push({
      insight: "Your consistency this month is impressive! You're proving that sustainable progress beats perfectionism.",
      advice: "Keep up the steady rhythm. Small daily wins compound into major achievements.",
      focus: "Maintaining consistency"
    });
  } else if (monthlyProgress < 0.3) {
    insights.push({
      insight: "Every day is a fresh start. Focus on progress, not perfection. One task completed is better than none.",
      advice: "Choose your easiest task first tomorrow. Build momentum with small wins before tackling bigger challenges.",
      focus: "Building momentum"
    });
  }

  return insights;
};

export const generateDailyInsight = async (
  todayData: Record<string, CategoryData>,
  stats: ProgressStats
): Promise<AIInsight> => {
  try {
    // For now, use smart local insights instead of API
    // This ensures the app works without API keys
    const insights = getSmartInsights(todayData, stats);
    
    if (insights.length > 0) {
      // Return a random insight from the generated ones
      return insights[Math.floor(Math.random() * insights.length)];
    }

    // Fallback insight
    return {
      insight: "Every step forward matters. Consistency beats perfection, and progress beats procrastination.",
      advice: "Focus on completing one task at a time. Break larger goals into smaller, manageable actions.",
      focus: "Consistent daily action"
    };

    // TODO: Uncomment and configure when API key is available
    /*
    const API_KEY = process.env.REACT_APP_ANTHROPIC_API_KEY;
    if (!API_KEY) {
      throw new Error('API key not configured');
    }

    const prompt = `Based on this daily goal tracking data, provide a brief motivational insight and specific actionable advice for tomorrow. Focus on psychological patterns like overcoming FOMO, perfectionism, and all-or-nothing thinking.

Today's data:
${categories.map(cat => {
  const data = todayData[cat.key];
  const completedTasks = data.completedTasks?.length || 0;
  const totalTasks = data.tasks?.length || 0;
  return `${cat.name}: ${completedTasks}/${totalTasks} tasks completed, ${data.timeSpent} minutes spent`;
}).join('\n')}

Overall progress: ${stats.completedDays}/${stats.totalDays} days completed this month

Respond with a JSON object containing:
{
  "insight": "Brief motivational insight (2-3 sentences)",
  "advice": "Specific actionable advice for tomorrow (2-3 sentences)",
  "focus": "One key area to prioritize tomorrow"
}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    let responseText = data.content[0].text.trim();
    responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    return JSON.parse(responseText);
    */
  } catch (error) {
    console.error('Error generating insight:', error);
    
    // Enhanced fallback insights
    const fallbackInsights = [
      {
        insight: "Progress isn't always linear. Every small action contributes to your larger vision.",
        advice: "Focus on your strongest category tomorrow and use that momentum to tackle one challenging task.",
        focus: "Building on existing momentum"
      },
      {
        insight: "Consistency beats intensity. Small daily actions compound into remarkable results over time.",
        advice: "Choose quality over quantity. Complete fewer tasks with full attention rather than rushing through many.",
        focus: "Mindful task completion"
      },
      {
        insight: "Your future self will thank you for the effort you put in today, however small it may seem.",
        advice: "Start with your most important task first thing tomorrow. Fresh energy leads to better outcomes.",
        focus: "Priority task completion"
      }
    ];
    
    return fallbackInsights[Math.floor(Math.random() * fallbackInsights.length)];
  }
};
