import React from 'react';
import { Sparkles, Brain } from 'lucide-react';
import type { AIInsight } from '../../types/insight';
import type { PsychologicalInsight } from '../../types/insight';
import { psychologicalInsights } from '../../constants/psychologicalInsights';

interface AIInsightPanelProps {
  aiInsight: AIInsight | null;
  loading: boolean;
  onGenerateInsight: () => void;
}

const AIInsightPanel: React.FC<AIInsightPanelProps> = ({
  aiInsight,
  loading,
  onGenerateInsight
}) => {
  const randomInsight: PsychologicalInsight = React.useMemo(() => {
    return psychologicalInsights[Math.floor(Math.random() * psychologicalInsights.length)];
  }, []);

  return (
    <div>
      <div className="insight-card">
        <div className="insight-header">
          <div className="insight-header-content">
            <div className="flex items-center gap-3">
              <div className="insight-icon-container">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="insight-title">Daily AI Analysis</h3>
                <p className="insight-subtitle">Personalized insights from your progress</p>
              </div>
            </div>
            <button
              onClick={onGenerateInsight}
              disabled={loading}
              className="generate-button"
            >
              {loading ? <span className="loading-dots">Analyzing</span> : 'Generate'}
            </button>
          </div>
        </div>
        <div className="insight-content">
          {aiInsight ? (
            <>
              <div className="insight-section">
                <h4 className="insight-section-title">
                  <span className="insight-dot blue"></span>
                  Today's Insight
                </h4>
                <p className="insight-text">{aiInsight.insight}</p>
              </div>
              <div className="insight-section green">
                <h4 className="insight-section-title">
                  <span className="insight-dot green"></span>
                  Tomorrow's Focus
                </h4>
                <p className="insight-text">{aiInsight.advice}</p>
              </div>
              <div className="insight-section purple">
                <h4 className="insight-section-title">
                  <span className="insight-dot purple"></span>
                  Priority Area
                </h4>
                <p className="insight-text" style={{ fontWeight: '600', color: '#8b5cf6' }}>{aiInsight.focus}</p>
              </div>
            </>
          ) : (
            <div className="empty-insight">
              <div className="empty-insight-icon">
                <Sparkles />
              </div>
              <p className="insight-text">
                Click "Generate" to get personalized insights based on your daily progress and psychological patterns.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Random Psychological Insight */}
      <div className="insight-card psychology-card" style={{ marginTop: '2rem' }}>
        <div className="insight-header psychology-header">
          <div className="flex items-center gap-3">
            <div className="insight-icon-container">
              <Brain size={20} />
            </div>
            <div>
              <h3 className="insight-title">Psychological Framework</h3>
              <p className="insight-subtitle">Evidence-based insights</p>
            </div>
          </div>
        </div>
        <div className="insight-content">
          <div className="insight-section purple">
            <h4 className="insight-section-title">
              <span className="insight-dot purple"></span>
              {randomInsight.title}
            </h4>
            <p className="insight-text">{randomInsight.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightPanel;
