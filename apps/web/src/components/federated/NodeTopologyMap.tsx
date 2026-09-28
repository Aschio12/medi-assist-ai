'use client';

import React from 'react';
import { Network, Server } from 'lucide-react';

export function NodeTopologyMap({ syncCount }: { syncCount: number }) {
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Network className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Edge Node Topology</h2>
          <p className="text-xs text-zinc-400">Decentralized Hospital Data Silos</p>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center relative">
         {/* Central Coordinator */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black border-2 border-cyan-500 p-4 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            <Server className="h-8 w-8 text-cyan-400" />
         </div>

         {/* Edge Nodes */}
         {[...Array(6)].map((_, i) => {
            const angle = (i * 60) * (Math.PI / 180);
            const x = Math.cos(angle) * 120;
            const y = Math.sin(angle) * 120;
            const isSynced = i < syncCount;

            return (
              <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}>
                 <div className={`p-3 rounded-full border ${isSynced ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-white/5 border-white/10'} transition-colors duration-500`}>
                    <Network className={`h-4 w-4 ${isSynced ? 'text-emerald-400' : 'text-zinc-500'}`} />
                 </div>
                 {/* Connecting line */}
                 <svg className="absolute top-1/2 left-1/2 -z-10" style={{ width: '120px', height: '2px', transformOrigin: '0 0', transform: `rotate(${angle + Math.PI}rad)` }}>
                    <line x1="0" y1="0" x2="120" y2="0" stroke={isSynced ? '#10b981' : 'rgba(255,255,255,0.1)'} strokeWidth="2" strokeDasharray={isSynced ? 'none' : '4 4'} />
                 </svg>
              </div>
            );
         })}
      </div>
    </div>
  );
}
