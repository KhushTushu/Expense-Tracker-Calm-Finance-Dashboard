
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Expense } from '../types';

interface SmartInsightsProps {
  expenses: Expense[];
}

export const SmartInsights: React.FC<SmartInsightsProps> = ({ expenses }) => {
  const [insight, setInsight] = useState<string>('Analyzing your patterns...');
  const [isLoading, setIsLoading] = useState(false);

  const generateInsight = async () => {
    if (expenses.length === 0) {
      setInsight('Add some expenses to see smart insights.');
      return;
    }

    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Below is a list of my recent expenses. Provide a very short (max 2 sentences), 
        calm, and encouraging financial insight or suggestion. 
        Focus on mindfulness and well-being.
        Expenses: ${expenses.map(e => `${e.description} ($${e.amount} - ${e.category})`).join(', ')}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });

      setInsight(response.text || 'Keep observing your flow; awareness is the first step to balance.');
    } catch (error) {
      console.error('Gemini error:', error);
      setInsight('Your financial journey is unique. Stay mindful of your choices today.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      generateInsight();
    }, 1500);
    return () => clearTimeout(timer);
  }, [expenses.length]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-blue-100 mt-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest">Zen Insight</h4>
      </div>
      <p className={`text-blue-900 text-sm leading-relaxed transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {insight}
      </p>
    </div>
  );
};
