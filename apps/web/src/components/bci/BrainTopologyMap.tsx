'use client';

import React from 'react';
import { Waves } from 'lucide-react';

export function BrainTopologyMap({ features }: { features: any }) {
  
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Waves className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Spectral Topology</h2>
          <p className="text-xs text-zinc-400">Power Spectral Density (PSD)</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
         {features ? (
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                 <div className="text-[10px] text-zinc-500 font-mono mb-1">DELTA (0.5-4 Hz)</div>
                 <div className="text-lg text-white font-mono">{features.psd_features.delta_power.toFixed(3)}</div>
               </div>
               <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                 <div className="text-[10px] text-zinc-500 font-mono mb-1">THETA (4-8 Hz)</div>
                 <div className="text-lg text-white font-mono">{features.psd_features.theta_power.toFixed(3)}</div>
               </div>
               <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                 <div className="text-[10px] text-zinc-500 font-mono mb-1">ALPHA (8-12 Hz)</div>
                 <div className="text-lg text-white font-mono">{features.psd_features.alpha_power.toFixed(3)}</div>
               </div>
               <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                 <div className="text-[10px] text-zinc-500 font-mono mb-1">GAMMA (30+ Hz)</div>
                 <div className="text-lg text-white font-mono">{features.psd_features.gamma_power.toFixed(3)}</div>
               </div>
            </div>
         ) : (
            <div className="text-center text-zinc-500 text-sm">
               Awaiting MNE-Python artifact rejection and epoching...
            </div>
         )}
      </div>
    </div>
  );
}
