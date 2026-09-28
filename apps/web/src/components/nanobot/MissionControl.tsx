'use client';

import React, { useState } from 'react';
import { Target, Rocket, Sliders } from 'lucide-react';

export function MissionControl({ onDeploy }: { onDeploy: (target: string, size: number) => void }) {
  const [target, setTarget] = useState('Coronary Artery Plaque');
  const [swarmSize, setSwarmSize] = useState(15000);

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <Rocket className="h-5 w-5 text-orange-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Mission Control</h2>
          <p className="text-xs text-zinc-400">Deploy & steer magnetic swarms</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-6">
        <div>
           <label className="text-[10px] text-zinc-500 font-mono mb-2 block uppercase">Micro-Surgery Target</label>
           <div className="relative">
             <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
             <input 
               type="text"
               className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-3 text-sm text-zinc-300 focus:outline-none focus:border-orange-500/50"
               value={target}
               onChange={(e) => setTarget(e.target.value)}
             />
           </div>
        </div>

        <div>
           <div className="flex justify-between items-center mb-2">
             <label className="text-[10px] text-zinc-500 font-mono uppercase flex items-center gap-1">
               <Sliders className="h-3 w-3" /> Swarm Density
             </label>
             <span className="text-xs text-orange-400 font-mono">{swarmSize.toLocaleString()} bots</span>
           </div>
           <input 
             type="range"
             min="1000"
             max="50000"
             step="1000"
             className="w-full accent-orange-500 h-2 bg-black rounded-lg appearance-none cursor-pointer"
             value={swarmSize}
             onChange={(e) => setSwarmSize(Number(e.target.value))}
           />
           <div className="flex justify-between text-[9px] text-zinc-600 font-mono mt-1">
              <span>1K (Recon)</span>
              <span>50K (Ablation)</span>
           </div>
        </div>

        <button 
           onClick={() => onDeploy(target, swarmSize)}
           className="mt-auto w-full flex items-center justify-center gap-2 bg-orange-600/20 hover:bg-orange-600/40 text-orange-300 border border-orange-500/50 text-sm font-bold px-4 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.2)]"
        >
           <Rocket className="h-4 w-4" /> Deploy Swarm
        </button>
      </div>
    </div>
  );
}
