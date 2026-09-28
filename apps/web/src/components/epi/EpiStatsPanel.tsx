'use client';

import React from 'react';
import { Activity, Users, ShieldAlert, HeartPulse, Skull } from 'lucide-react';

export function EpiStatsPanel({ seirData, spatialData }: { seirData: any, spatialData: any }) {
  if (!seirData || !spatialData || !spatialData.history) {
    return (
      <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
        <Activity className="h-10 w-10 mb-3" />
        <p className="text-sm font-mono uppercase">Awaiting SEIR Data</p>
      </div>
    );
  }

  const finalStep = spatialData.history[spatialData.history.length - 1];
  const stats = finalStep.stats;

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col relative overflow-hidden bg-gradient-to-b from-black to-slate-900">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Activity className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">RK4 Integration Stats</h2>
          <p className="text-xs text-zinc-400">SEIR Compartmental Metrics</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center gap-4">
         
         <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
               <Users className="h-5 w-5 text-zinc-400" />
               <span className="text-sm font-medium text-white">Susceptible (S)</span>
            </div>
            <span className="text-xl font-bold font-mono text-zinc-300">{stats.S.toLocaleString()}</span>
         </div>
         
         <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
               <ShieldAlert className="h-5 w-5 text-amber-500" />
               <span className="text-sm font-medium text-white">Exposed (E)</span>
            </div>
            <span className="text-xl font-bold font-mono text-amber-400">{stats.E.toLocaleString()}</span>
         </div>
         
         <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
               <Activity className="h-5 w-5 text-red-500" />
               <span className="text-sm font-medium text-white">Infectious (I)</span>
            </div>
            <span className="text-xl font-bold font-mono text-red-400">{stats.I.toLocaleString()}</span>
         </div>
         
         <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
               <HeartPulse className="h-5 w-5 text-blue-500" />
               <span className="text-sm font-medium text-white">Recovered (R)</span>
            </div>
            <span className="text-xl font-bold font-mono text-blue-400">{stats.R.toLocaleString()}</span>
         </div>
         
         <div className="bg-zinc-800 border border-zinc-700 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
               <Skull className="h-5 w-5 text-zinc-500" />
               <span className="text-sm font-medium text-white">Deceased (D)</span>
            </div>
            <span className="text-xl font-bold font-mono text-zinc-400">{stats.D.toLocaleString()}</span>
         </div>

      </div>
    </div>
  );
}
