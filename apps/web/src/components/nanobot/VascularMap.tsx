'use client';

import React from 'react';
import { Route, MapPin, Navigation } from 'lucide-react';

export function VascularMap({ data }: { data: any }) {
  
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Route className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Vascular Navigation Path</h2>
          <p className="text-xs text-zinc-400">Deep RL Swarm Pathfinding</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto pr-2">
         {data ? (
            <div className="relative pl-4 space-y-6">
               <div className="absolute left-6 top-4 bottom-4 w-px bg-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
               
               {data.route_nodes.map((node: string, i: number) => (
                 <div key={i} className="relative z-10 flex items-center gap-4">
                    <div className={`h-4 w-4 rounded-full border-[3px] border-[#111] flex-shrink-0 ${i === data.route_nodes.length - 1 ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)]' : 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]'}`}></div>
                    <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-3 flex justify-between items-center">
                       <span className={`text-sm ${i === data.route_nodes.length - 1 ? 'text-orange-400 font-bold' : 'text-zinc-300'}`}>{node}</span>
                       {i === data.route_nodes.length - 1 && (
                         <span className="text-[10px] bg-orange-500/20 text-orange-300 px-2 py-1 rounded border border-orange-500/30 flex items-center gap-1">
                           <MapPin className="h-3 w-3" /> TARGET
                         </span>
                       )}
                    </div>
                 </div>
               ))}
            </div>
         ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
               <Navigation className="h-12 w-12 mb-3" />
               <span className="text-xs font-mono uppercase">Awaiting Deployment Vector</span>
            </div>
         )}
      </div>
    </div>
  );
}
