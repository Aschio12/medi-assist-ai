'use client';

import React from 'react';
import { Activity, TrendingUp } from 'lucide-react';

export function TrainingMetrics({ metrics }: { metrics: any }) {
  
  const currentAcc = metrics?.global_accuracy || 0.9410;
  const currentRound = metrics?.new_global_round || 42;

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Global Model State</h2>
            <p className="text-xs text-zinc-400">FedAvg Convergence Metrics</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center gap-8">
         <div className="text-center">
            <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Global Accuracy</div>
            <div className="text-4xl font-bold text-white">{(currentAcc * 100).toFixed(2)}%</div>
            {metrics && <div className="text-xs text-emerald-400 mt-1">↑ +0.10%</div>}
         </div>
         
         <div className="w-px h-16 bg-white/10"></div>
         
         <div className="text-center">
            <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Aggregation Round</div>
            <div className="text-4xl font-bold text-white font-mono">{currentRound}</div>
            {metrics && <div className="text-xs text-blue-400 mt-1">Sync Complete</div>}
         </div>
      </div>

      {/* Mock convergence graph */}
      <div className="mt-6 h-16 w-full flex items-end gap-1 px-4">
        {Array.from({length: 30}).map((_, i) => (
          <div 
            key={i} 
            className="flex-1 bg-emerald-500/20 rounded-t-sm"
            style={{ 
              height: `${Math.min(100, 40 + (i * 1.5) + (Math.random() * 10))}%`,
              opacity: i === 29 && metrics ? 1 : 0.5 
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
