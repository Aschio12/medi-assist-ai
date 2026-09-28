'use client';

import React from 'react';
import { Activity, BarChart3 } from 'lucide-react';

export function WeightAggregationChart({ globalWeights }: { globalWeights: number[] | null }) {
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <BarChart3 className="h-5 w-5 text-orange-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">FedAvg Global Weights</h2>
          <p className="text-xs text-zinc-400">Synchronized Neural Network Layer</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto pr-2">
         {!globalWeights ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
               <Activity className="h-10 w-10 mb-3" />
               <p className="text-sm font-mono uppercase text-center">Awaiting aggregation across edge nodes.</p>
            </div>
         ) : (
            <div className="space-y-4">
               <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                  <p className="text-sm text-orange-300">Global model weights have been securely updated using Federated Averaging (FedAvg).</p>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                 {globalWeights.map((w, i) => (
                   <div key={i} className="bg-black/50 border border-white/10 rounded-lg p-2 text-center">
                      <span className="text-[10px] text-zinc-500 block mb-1 uppercase font-mono">Weight {i}</span>
                      <span className="text-sm text-white font-mono">{w.toFixed(4)}</span>
                   </div>
                 ))}
               </div>
            </div>
         )}
      </div>
    </div>
  );
}
