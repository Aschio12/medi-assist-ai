'use client';

import React from 'react';
import { Target, Activity } from 'lucide-react';

export function BindingAffinityChart({ affinityData }: { affinityData: any }) {
  
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <Target className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Target Binding Affinity</h2>
          <p className="text-xs text-zinc-400">Hybrid Quantum-Classical Neural Net</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
         {affinityData ? (
            <div className="space-y-6">
               <div className="flex justify-between items-end border-b border-white/10 pb-4">
                 <div>
                   <div className="text-[10px] text-zinc-500 font-mono">PREDICTED pIC50</div>
                   <div className="text-3xl font-bold text-emerald-400 font-mono">{affinityData.pIC50_score}</div>
                 </div>
                 <div className="text-right">
                   <div className="text-[10px] text-zinc-500 font-mono">FREE ENERGY (ΔG)</div>
                   <div className="text-xl text-white font-mono">{affinityData.binding_free_energy_kcal_mol} kcal/mol</div>
                 </div>
               </div>
               
               <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center gap-3">
                 <Activity className="h-4 w-4 text-emerald-400" />
                 <div>
                    <div className="text-[10px] text-zinc-500 font-mono">QUANTUM ADVANTAGE</div>
                    <div className="text-xs text-white">{affinityData.quantum_advantage_metric}</div>
                 </div>
               </div>
            </div>
         ) : (
            <div className="text-center text-zinc-500 text-sm">
               Run simulation to predict binding affinity.
            </div>
         )}
      </div>
    </div>
  );
}
