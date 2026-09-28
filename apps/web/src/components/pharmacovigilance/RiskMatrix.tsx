'use client';

import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export function RiskMatrix({ riskData }: { riskData: any }) {
  if (!riskData) {
    return (
      <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col items-center justify-center text-zinc-500">
        <ShieldAlert className="h-10 w-10 mb-3 opacity-50" />
        <p className="text-sm font-mono uppercase text-center max-w-xs">Awaiting Patient Cohort Data to generate risk assessment.</p>
      </div>
    );
  }

  const riskScore = riskData.composite_risk_score;
  const isHighRisk = riskScore > 0.6;

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col relative overflow-hidden">
      {isHighRisk && <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>}

      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-xl ${isHighRisk ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/10 border-emerald-500/20'} border`}>
          <AlertTriangle className={`h-5 w-5 ${isHighRisk ? 'text-red-400' : 'text-emerald-400'}`} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Composite Toxicity Risk</h2>
          <p className="text-xs text-zinc-400">FAERS Machine Learning Model</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
         <div className="relative flex items-center justify-center mb-6">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="12" className="text-black/50" />
              <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="12" 
                className={`${isHighRisk ? 'text-red-500' : 'text-emerald-500'} transition-all duration-1000 ease-out`}
                strokeDasharray={`${(riskScore * 100) * 5.53} 553`}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold font-mono ${isHighRisk ? 'text-red-400' : 'text-emerald-400'}`}>
                 {(riskScore * 100).toFixed(1)}%
              </span>
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-1">Risk Index</span>
            </div>
         </div>

         {riskData.warnings && riskData.warnings.length > 0 && (
           <div className="w-full bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3">
             <ShieldAlert className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
             <div>
               <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Clinical Warnings</h3>
               <ul className="text-sm text-red-300/80 space-y-1">
                 {riskData.warnings.map((w: string, i: number) => <li key={i}>{w}</li>)}
               </ul>
             </div>
           </div>
         )}
      </div>
    </div>
  );
}
