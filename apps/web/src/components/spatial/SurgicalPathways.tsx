'use client';

import React from 'react';
import { Route, ShieldAlert, Crosshair } from 'lucide-react';

export function SurgicalPathways({ plan }: { plan: any }) {
  if (!plan) return null;

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Route className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Surgical Navigation AI</h2>
          <p className="text-xs text-zinc-400">A* Pathfinding & Risk Avoidance</p>
        </div>
      </div>
      
      <div className="flex-1 space-y-4">
        
        <div className="bg-black/40 border border-white/5 p-4 rounded-2xl flex items-start gap-4">
           <div className="p-2 bg-rose-500/10 rounded-lg shrink-0">
             <ShieldAlert className="h-4 w-4 text-rose-500" />
           </div>
           <div>
             <div className="text-xs text-zinc-400 mb-1 uppercase tracking-wider font-bold">Critical Structures Avoided</div>
             <div className="flex flex-wrap gap-2 mt-2">
               {plan.critical_structures_avoided.map((structure: string, i: number) => (
                 <span key={i} className="text-xs bg-rose-500/20 text-rose-300 px-2 py-1 rounded border border-rose-500/30">
                   {structure}
                 </span>
               ))}
             </div>
             <div className="mt-3 text-[10px] text-zinc-500 font-mono">
               Guaranteed Safety Margin: <span className="text-cyan-400 font-bold">{plan.safety_margin_mm} mm</span>
             </div>
           </div>
        </div>

        <div className="bg-black/40 border border-white/5 p-4 rounded-2xl">
           <div className="text-xs text-zinc-400 mb-3 uppercase tracking-wider font-bold flex items-center gap-2">
             <Crosshair className="h-4 w-4" /> Trajectory Waypoints
           </div>
           
           <div className="space-y-2">
              <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                 <span className="text-xs font-bold text-emerald-400">Entry</span>
                 <span className="text-xs font-mono text-zinc-300">
                   {plan.entry_point.x.toFixed(1)}, {plan.entry_point.y.toFixed(1)}, {plan.entry_point.z.toFixed(1)}
                 </span>
              </div>
              
              {plan.waypoints.map((wp: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between bg-white/5 p-2 rounded-lg border-l-2 border-cyan-500 ml-4">
                   <span className="text-xs text-cyan-400">Waypoint {idx + 1}</span>
                   <span className="text-xs font-mono text-zinc-300">
                     {wp.x.toFixed(1)}, {wp.y.toFixed(1)}, {wp.z.toFixed(1)}
                   </span>
                </div>
              ))}

              <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg border-l-2 border-rose-500 ml-8">
                 <span className="text-xs font-bold text-rose-400">Target</span>
                 <span className="text-xs font-mono text-zinc-300">
                   {plan.target_point.x.toFixed(1)}, {plan.target_point.y.toFixed(1)}, {plan.target_point.z.toFixed(1)}
                 </span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
