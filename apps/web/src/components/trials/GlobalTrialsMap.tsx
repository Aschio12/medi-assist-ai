'use client';

import React from 'react';
import { Globe, Users, Navigation } from 'lucide-react';

export function GlobalTrialsMap({ results }: { results: any[] | null }) {
  if (!results) {
    return (
      <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col items-center justify-center text-zinc-500">
        <Globe className="h-10 w-10 mb-3 opacity-50" />
        <p className="text-sm font-mono uppercase text-center max-w-xs">Awaiting Semantic Search Results.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Globe className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Global Trial Matches</h2>
          <p className="text-xs text-zinc-400">Ranked by Vector Similarity</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-4 pr-2">
         {results.map((trial, i) => (
           <div key={i} className="bg-black/40 border border-cyan-500/20 rounded-xl p-4 shadow-[0_0_15px_rgba(34,211,238,0.05)] relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-sm font-bold text-white leading-tight pr-4">{trial.title}</h3>
                 <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30 font-mono whitespace-nowrap">
                   {trial.trial_id}
                 </span>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-zinc-400 mb-3">
                 <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {trial.status}</span>
                 <span className="flex items-center gap-1"><Navigation className="h-3 w-3" /> {trial.locations} Sites</span>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                 <span className="text-[10px] text-zinc-500 font-mono uppercase">Cosine Similarity Score</span>
                 <span className="text-sm text-cyan-400 font-mono font-bold">{(trial.similarity_score * 100).toFixed(2)}%</span>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
