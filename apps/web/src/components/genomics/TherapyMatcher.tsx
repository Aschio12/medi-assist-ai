'use client';

import React from 'react';
import { Microscope, Pill, CheckCircle2 } from 'lucide-react';

export function TherapyMatcher({ variants }: { variants: any[] }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <Microscope className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Precision Oncology Matching</h2>
          <p className="text-xs text-zinc-400">Targeted Therapies & Clinical Trials</p>
        </div>
      </div>
      
      <div className="flex-1 space-y-4">
        {variants.map((v, i) => (
          <div key={i} className="p-4 bg-black/40 rounded-2xl border border-white/5">
             <div className="flex justify-between items-center mb-3">
               <span className="font-bold text-white">{v.gene} {v.mutation} Target</span>
               <span className="text-[10px] bg-white/5 text-zinc-300 px-2 py-1 rounded">
                 {v.evidence_level}
               </span>
             </div>
             
             <div className="space-y-3">
               <div>
                 <div className="text-xs text-emerald-400 font-bold flex items-center gap-2 mb-1">
                   <Pill className="h-3 w-3" /> FDA Approved Therapies
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {v.fda_approved_therapies.map((therapy: string, idx: number) => (
                     <span key={idx} className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2 py-1 rounded-md flex items-center gap-1">
                       {therapy !== "None (Undruggable target)" && <CheckCircle2 className="h-3 w-3" />}
                       {therapy}
                     </span>
                   ))}
                 </div>
               </div>
               
               <div>
                 <div className="text-xs text-blue-400 font-bold flex items-center gap-2 mb-1">
                   <Microscope className="h-3 w-3" /> Active Clinical Trials
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {v.clinical_trials.length > 0 ? v.clinical_trials.map((trial: string, idx: number) => (
                     <a key={idx} href="#" className="text-xs bg-blue-500/10 border border-blue-500/20 text-blue-300 px-2 py-1 rounded-md hover:bg-blue-500/20 transition-colors">
                       {trial}
                     </a>
                   )) : <span className="text-xs text-zinc-500">No active trials found</span>}
                 </div>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
