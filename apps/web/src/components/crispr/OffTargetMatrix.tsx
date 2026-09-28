'use client';

import React from 'react';
import { ShieldAlert, Fingerprint } from 'lucide-react';

export function OffTargetMatrix({ analysisData }: { analysisData: any }) {
  
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
          <ShieldAlert className="h-5 w-5 text-rose-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Off-Target Specificity</h2>
          <p className="text-xs text-zinc-400">Genome-Wide Mismatch Prediction</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-4 justify-center">
         {analysisData ? (
            <>
               <div className="flex justify-between items-end border-b border-white/10 pb-4">
                 <div>
                   <div className="text-[10px] text-zinc-500 font-mono">AGGREGATE SAFETY SCORE (CFD)</div>
                   <div className={`text-3xl font-bold font-mono ${analysisData.aggregate_safety_score > 80 ? 'text-emerald-400' : 'text-rose-400'}`}>
                     {analysisData.aggregate_safety_score}/100
                   </div>
                 </div>
               </div>
               
               <div className="space-y-2">
                 <div className="text-[10px] text-zinc-500 font-mono">POTENTIAL OFF-TARGET LOCI (hg38)</div>
                 {analysisData.potential_off_targets.map((ot: any, i: number) => (
                   <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/10 flex justify-between items-center">
                     <div className="flex items-center gap-3">
                       <Fingerprint className="h-4 w-4 text-rose-400" />
                       <div>
                          <div className="text-xs text-white font-mono">{ot.locus}</div>
                          <div className="text-[10px] text-zinc-400">{ot.location_type.toUpperCase()}</div>
                       </div>
                     </div>
                     <div className="text-right">
                        <div className="text-xs text-white"><span className="text-rose-400">{ot.mismatches}</span> Mismatches</div>
                        <div className="text-[10px] text-zinc-500 font-mono">Cut Prob: {(ot.cleavage_probability * 100).toFixed(1)}%</div>
                     </div>
                   </div>
                 ))}
               </div>
            </>
         ) : (
            <div className="text-center text-zinc-500 text-sm opacity-50">
               Select a gRNA candidate to run genome-wide off-target mismatch analysis.
            </div>
         )}
      </div>
    </div>
  );
}
