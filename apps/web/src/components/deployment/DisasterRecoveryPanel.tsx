'use client';

import React from 'react';
import { Database, AlertTriangle, Play } from 'lucide-react';

export function DisasterRecoveryPanel() {
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <Database className="h-5 w-5 text-orange-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Supabase Multi-Region DR</h2>
          <p className="text-xs text-zinc-400">Database replication and failover control</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-black/40 border border-white/5 rounded-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2">
             <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">ACTIVE</span>
           </div>
           <span className="text-xs font-mono text-zinc-500">PRIMARY</span>
           <div className="text-sm font-bold text-white mt-1">us-east-1</div>
           <div className="text-[10px] text-zinc-400 mt-2">Writes: Enabled</div>
        </div>
        <div className="p-4 bg-black/40 border border-white/5 rounded-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2">
             <span className="text-[9px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">SYNCING</span>
           </div>
           <span className="text-xs font-mono text-zinc-500">REPLICA</span>
           <div className="text-sm font-bold text-white mt-1">us-west-2</div>
           <div className="text-[10px] text-zinc-400 mt-2">Lag: 45ms</div>
        </div>
      </div>

      <div className="p-4 border border-orange-500/20 bg-orange-500/5 rounded-2xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-xs font-bold text-white">Manual Failover Runbook</h3>
            <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">
              If us-east-1 goes offline, execute dr-failover.sh to promote the Oregon replica. Vercel env vars will automatically update via API.
            </p>
            <button className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase bg-orange-500 hover:bg-orange-400 text-black px-3 py-1.5 rounded-lg transition-colors">
              <Play className="h-3 w-3" /> Simulate Failover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
