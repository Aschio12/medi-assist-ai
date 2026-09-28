'use client';

import React from 'react';
import { Activity, Skull } from 'lucide-react';

export function AdverseSignalDetector({ factors }: { factors: string[] | null }) {
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <Activity className="h-5 w-5 text-orange-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Polypharmacy Signals</h2>
          <p className="text-xs text-zinc-400">Contributing Drug Vectors</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto pr-2">
         {!factors ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
               <Skull className="h-10 w-10 mb-3" />
               <p className="text-sm font-mono uppercase text-center">No Active Signals</p>
            </div>
         ) : (
            <div className="space-y-3">
               <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-4">
                  <p className="text-sm text-orange-300">The model detected a high potential for adverse drug-drug interactions among the following active medications.</p>
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                 {factors.map((drug: string, i: number) => (
                   <div key={i} className="bg-black/50 border border-white/10 rounded-lg p-3 flex justify-between items-center">
                      <span className="text-sm text-white font-bold">{drug}</span>
                      <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-mono uppercase">Suspect</span>
                   </div>
                 ))}
               </div>
            </div>
         )}
      </div>
    </div>
  );
}
