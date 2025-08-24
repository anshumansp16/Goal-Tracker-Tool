import type { AIInsight } from '../types/insight';
import { categories } from '../constants/categories';
import type { CategoryData } from '../types/category';

interface ProgressStats {
  totalDays: number;
  completedDays: number;
}

export const generateDailyInsight = async (
  todayData: Record<string, CategoryData>,
  stats: ProgressStats
): Promise<AIInsight> => {
  try {
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
}

DO NOT OUTPUT ANYTHING OTHER THAN VALID JSON.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    let responseText = data.content[0].text.trim();
    responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Error generating insight:', error);
    return {
      insight: "Remember: progress is measured on a continuum, not binary. Every small action builds toward your larger goals.",
      advice: "Focus on consistency over perfection. Complete your microlearning sessions and celebrate small wins.",
      focus: "Tech learning (5-15 minute focused sessions)"
    };
  }
};
