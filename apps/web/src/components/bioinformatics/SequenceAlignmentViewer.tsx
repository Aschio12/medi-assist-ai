'use client';

import React from 'react';
import { Dna, AlignLeft } from 'lucide-react';

export function SequenceAlignmentViewer({ alignment }: { alignment: any }) {
  if (!alignment) {
    return (
      <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
        <Dna className="h-10 w-10 mb-3" />
        <p className="text-sm font-mono uppercase">Awaiting Sequence Alignment</p>
      </div>
    );
  }

  const { type, score, alignment_1, alignment_2 } = alignment;
  
  // Create matching indicators ( | for match, * for mismatch, space for gap)
  let matchingLine = "";
  for(let i=0; i<alignment_1.length; i++) {
     if(alignment_1[i] === alignment_2[i]) matchingLine += "|";
     else if(alignment_1[i] === "-" || alignment_2[i] === "-") matchingLine += " ";
     else matchingLine += "*";
  }

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col relative overflow-hidden bg-gradient-to-b from-black to-slate-900">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20">
          <AlignLeft className="h-5 w-5 text-pink-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Genomic Alignment</h2>
          <p className="text-xs text-zinc-400">{type} Algorithm (DP)</p>
        </div>
        <div className="ml-auto text-right">
           <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">Max Score</span>
           <span className="text-xl text-pink-400 font-mono font-bold">{score}</span>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
         <div className="bg-black/80 border border-white/10 p-6 rounded-2xl w-full overflow-x-auto">
            <div className="font-mono text-lg whitespace-pre tracking-[0.3em]">
               <div className="text-emerald-400">{alignment_1}</div>
               <div className="text-zinc-600 opacity-50 text-sm py-1">{matchingLine}</div>
               <div className="text-cyan-400">{alignment_2}</div>
            </div>
         </div>
      </div>
    </div>
  );
}
