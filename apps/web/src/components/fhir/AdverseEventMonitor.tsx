'use client';

import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export function AdverseEventMonitor({ signals }: { signals: any[] | null }) {
  if (!signals) {
    return (
      <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col items-center justify-center text-zinc-500">
        <ShieldAlert className="h-10 w-10 mb-3 opacity-50" />
        <p className="text-sm font-mono uppercase text-center max-w-xs">Run PV scan to monitor longitudinal drug safety.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
          <ShieldAlert className="h-5 w-5 text-red-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Pharmacovigilance</h2>
          <p className="text-xs text-zinc-400">Adverse Drug Reaction Signals</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-4 pr-2">
        {signals.length === 0 ? (
          <div className="text-emerald-500 text-sm flex items-center gap-2">
             <CheckCircle2 className="h-4 w-4" /> No ADR signals detected for this patient.
          </div>
        ) : (
          signals.map((sig, i) => (
            <div key={i} className="bg-black/40 border border-red-500/20 rounded-xl p-4 shadow-[0_0_15px_rgba(239,68,68,0.1)] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
               
               <div className="flex justify-between items-start mb-2 pl-2">
                 <h3 className="text-sm font-bold text-red-400 leading-tight flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> {sig.drug_suspect} (Suspect)
                 </h3>
                 <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/30 font-mono">
                   {sig.signal_id}
                 </span>
               </div>

               <p className="text-xs text-zinc-300 mb-3 pl-2 leading-relaxed">
                 {sig.event_description}
               </p>

               <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/10 ml-2">
                  <span className="text-[10px] text-red-400 font-bold uppercase block mb-1">Recommended Action</span>
                  <span className="text-xs text-white">{sig.recommended_action}</span>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
