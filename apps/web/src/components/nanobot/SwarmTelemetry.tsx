'use client';

import React, { useEffect, useState } from 'react';
import { Activity, Zap, Shield, Magnet } from 'lucide-react';

export function SwarmTelemetry({ isActive, data }: { isActive: boolean, data: any }) {
  const [cohesion, setCohesion] = useState(98.5);
  const [velocity, setVelocity] = useState(4.2);
  const [power, setPower] = useState(100);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setCohesion(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 2)));
        setVelocity(prev => Math.max(1.0, Math.min(8.0, prev + (Math.random() - 0.5))));
        setPower(prev => Math.max(0, prev - 0.1));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <Activity className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Live Telemetry</h2>
          <p className="text-xs text-zinc-400">Swarm State & Magnetic Actuation</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-4 justify-center">
         {isActive && data ? (
            <>
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                   <div className="flex items-center gap-2 mb-2">
                     <Shield className="h-4 w-4 text-emerald-400" />
                     <span className="text-[10px] text-zinc-400 font-mono">COHESION</span>
                   </div>
                   <div className={`text-2xl font-mono ${cohesion > 90 ? 'text-white' : 'text-amber-400'}`}>
                     {cohesion.toFixed(1)}%
                   </div>
                 </div>
                 
                 <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                   <div className="flex items-center gap-2 mb-2">
                     <Zap className="h-4 w-4 text-emerald-400" />
                     <span className="text-[10px] text-zinc-400 font-mono">VELOCITY</span>
                   </div>
                   <div className="text-2xl font-mono text-white">
                     {velocity.toFixed(1)} <span className="text-sm text-zinc-500">mm/s</span>
                   </div>
                 </div>
               </div>
               
               <div className="bg-black/40 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <Magnet className="h-4 w-4 text-emerald-400" />
                       <span className="text-[10px] text-zinc-400 font-mono uppercase">Applied Magnetic Field</span>
                    </div>
                    <div className="text-xl font-mono text-emerald-400">{data.magnetic_field_strength_required}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-zinc-400 font-mono uppercase">EST. TIME TO TARGET</div>
                    <div className="text-xl font-mono text-white">{data.estimated_ttv} min</div>
                  </div>
               </div>

               <div>
                 <div className="flex justify-between items-center mb-1">
                   <span className="text-[10px] text-zinc-500 font-mono">SWARM POWER LEVEL</span>
                   <span className="text-[10px] text-emerald-400 font-mono">{power.toFixed(1)}%</span>
                 </div>
                 <div className="w-full bg-black rounded-full h-1.5">
                   <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${power}%` }}></div>
                 </div>
               </div>
            </>
         ) : (
            <div className="text-center text-zinc-500 text-sm opacity-50">
               Swarm is currently docked. Waiting for deployment command to initialize magnetic actuation.
            </div>
         )}
      </div>
    </div>
  );
}
