'use client';

import React from 'react';
import { Cpu, Zap } from 'lucide-react';

export function VQEVisualizer({ vqeData, isSimulating }: { vqeData: any, isSimulating: boolean }) {
  
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <Cpu className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Variational Quantum Eigensolver</h2>
          <p className="text-xs text-zinc-400">Ground State Energy Approximation</p>
        </div>
      </div>
      
      <div className="flex-1 bg-[#1e1e1e] rounded-2xl border border-white/5 overflow-hidden flex flex-col relative">
        {isSimulating && (
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
             <Zap className="h-8 w-8 text-purple-500 animate-pulse mb-3" />
             <div className="text-sm font-mono text-purple-300">Mapping Hamiltonian to Qubits...</div>
           </div>
        )}

        <div className="flex-1 p-6 space-y-6">
          {vqeData ? (
             <>
               <div className="flex justify-between items-end border-b border-white/10 pb-4">
                 <div>
                   <div className="text-[10px] text-zinc-500 font-mono">GROUND STATE ENERGY</div>
                   <div className="text-3xl font-bold text-purple-400 font-mono">{vqeData.ground_state_energy_hartree} Ha</div>
                 </div>
                 <div className="text-right">
                   <div className="text-[10px] text-zinc-500 font-mono">QUBITS USED</div>
                   <div className="text-lg text-white font-mono">{vqeData.qubits_used}</div>
                 </div>
               </div>

               <div>
                  <div className="text-[10px] text-zinc-500 font-mono mb-2">CONVERGENCE TRAJECTORY (SPSA)</div>
                  <div className="h-24 w-full flex items-end gap-1">
                    {vqeData.convergence_trajectory.map((val: number, idx: number) => {
                       const heightPct = Math.max(10, Math.min(100, ((val + 78) / 6) * 100));
                       return (
                         <div 
                           key={idx}
                           className="flex-1 bg-purple-500/40 rounded-t-sm"
                           style={{ height: `${heightPct}%` }}
                         ></div>
                       );
                    })}
                  </div>
               </div>
             </>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-zinc-500">
               <Cpu className="h-10 w-10 mb-2 opacity-20" />
               <p className="text-sm">No molecule loaded.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
