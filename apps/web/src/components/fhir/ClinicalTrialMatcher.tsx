'use client';

import React from 'react';
import { Microscope, CheckCircle2, AlertCircle } from 'lucide-react';

export function ClinicalTrialMatcher({ matches }: { matches: any[] | null }) {
  if (!matches) {
    return (
      <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col items-center justify-center text-zinc-500">
        <Microscope className="h-10 w-10 mb-3 opacity-50" />
        <p className="text-sm font-mono uppercase text-center max-w-xs">Run GenAI trial matching to parse inclusion criteria against FHIR record.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <Microscope className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">GenAI Trial Matcher</h2>
          <p className="text-xs text-zinc-400">NLP Inclusion/Exclusion Parsing</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-4 pr-2">
        {matches.length === 0 ? (
          <div className="text-zinc-500 text-sm">No trials matched for this patient.</div>
        ) : (
          matches.map((match, i) => (
            <div key={i} className="bg-black/40 border border-white/5 rounded-xl p-4">
               <div className="flex justify-between items-start mb-2">
                 <h3 className="text-sm font-bold text-white leading-tight">{match.title}</h3>
                 <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30 font-mono">
                   {match.trial_id}
                 </span>
               </div>
               
               <div className="mb-3">
                 <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                   <span>Match Score</span>
                   <span className="text-white font-mono">{(match.match_score * 100).toFixed(0)}%</span>
                 </div>
                 <div className="w-full bg-black rounded-full h-1.5">
                   <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${match.match_score * 100}%` }}></div>
                 </div>
               </div>

               <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
                 {match.reasoning}
               </p>

               {match.missing_data && match.missing_data.length > 0 && (
                 <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded-lg flex items-start gap-2 mt-2">
                   <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                   <div>
                     <span className="text-[10px] text-amber-500 font-bold uppercase block mb-1">Missing FHIR Data</span>
                     <ul className="text-xs text-amber-500/80 list-disc pl-4 space-y-0.5">
                       {match.missing_data.map((md: string, idx: number) => <li key={idx}>{md}</li>)}
                     </ul>
                   </div>
                 </div>
               )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
