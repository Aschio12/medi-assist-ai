'use client';

import React from 'react';
import { Target, Activity, CheckCircle2 } from 'lucide-react';

export function GuideRnaList({ data, onSelect }: { data: any, onSelect: (seq: string) => void }) {
  
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <Target className="h-5 w-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Top gRNA Candidates</h2>
          <p className="text-xs text-zinc-400">DeepCRISPR On-Target Efficacy</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto pr-2">
         {data ? (
            <div className="space-y-3">
               {data.top_candidates.map((g: any, i: number) => (
                 <div 
                   key={g.id} 
                   className="bg-black/40 border border-white/5 rounded-xl p-4 hover:border-amber-500/40 transition-colors cursor-pointer"
                   onClick={() => onSelect(g.sequence)}
                 >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-mono text-zinc-400">{g.id}</span>
                      {i === 0 && (
                        <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          <CheckCircle2 className="h-3 w-3" /> BEST
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3 bg-[#111] py-2 px-3 rounded-lg border border-white/5">
                      <span className="text-sm font-mono text-white tracking-[0.2em]">{g.sequence}</span>
                      <span className="text-sm font-mono text-amber-500/50">|</span>
                      <span className="text-sm font-mono text-amber-400">{g.pam}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                       <div>
                         <div className="text-[10px] font-mono text-zinc-500">ON-TARGET SCORE</div>
                         <div className="text-sm text-white">{g.on_target_efficacy_score}</div>
                       </div>
                       <div>
                         <div className="text-[10px] font-mono text-zinc-500">FRAMESHIFT PROB</div>
                         <div className="text-sm text-white">{g.frameshift_probability}</div>
                       </div>
                       <div>
                         <div className="text-[10px] font-mono text-zinc-500">GC CONTENT</div>
                         <div className="text-sm text-white">{g.gc_content}%</div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
               <Activity className="h-12 w-12 mb-3" />
               <span className="text-xs font-mono uppercase">Waiting for AI generation</span>
            </div>
         )}
      </div>
    </div>
  );
}
