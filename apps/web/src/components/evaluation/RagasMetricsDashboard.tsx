'use client';

import React from 'react';
import { RagasScores } from '@/app/actions/evaluation';
import { Target, Search, FileText, CheckCircle2 } from 'lucide-react';

interface RagasMetricsDashboardProps {
  scores: RagasScores;
}

export function RagasMetricsDashboard({ scores }: RagasMetricsDashboardProps) {
  
  const renderMetricBar = (label: string, value: number, icon: React.ReactNode, desc: string, colorClass: string, bgClass: string) => (
    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:bg-black/60 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${bgClass}`}>
            {icon}
          </div>
          <span className="text-sm font-semibold text-white">{label}</span>
        </div>
        <span className={`text-lg font-mono font-bold ${colorClass}`}>
          {(value * 100).toFixed(1)}%
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden mt-2">
        <div 
          className={`h-full ${bgClass.replace('/20', '')}`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
      
      <p className="text-[10px] text-zinc-500 mt-3 leading-relaxed">
        {desc}
      </p>
    </div>
  );

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Target className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">RAGAS Clinical Quality Metrics</h2>
          <p className="text-xs text-zinc-400">Granular retrieval and generation evaluation.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderMetricBar(
          "Faithfulness", 
          scores.faithfulness, 
          <CheckCircle2 className="h-4 w-4 text-neon-400" />, 
          "Measures if the generated answer is entirely supported by retrieved context. Prevents hallucinated clinical claims.",
          "text-neon-400", 
          "bg-neon-500"
        )}
        
        {renderMetricBar(
          "Answer Relevancy", 
          scores.answer_relevancy, 
          <Target className="h-4 w-4 text-cyan-400" />, 
          "Evaluates if the response directly addresses the physician's prompt without tangential information.",
          "text-cyan-400", 
          "bg-cyan-500"
        )}

        {renderMetricBar(
          "Context Precision", 
          scores.context_precision, 
          <Search className="h-4 w-4 text-amber-400" />, 
          "Checks if the most highly relevant medical guidelines were ranked at the top of the context window.",
          "text-amber-400", 
          "bg-amber-500"
        )}

        {renderMetricBar(
          "Context Recall", 
          scores.context_recall, 
          <FileText className="h-4 w-4 text-fuchsia-400" />, 
          "Measures if the retrieved context contains all necessary facts required to answer the clinical question.",
          "text-fuchsia-400", 
          "bg-fuchsia-500"
        )}
      </div>
    </div>
  );
}
