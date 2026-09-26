'use client';

import React from 'react';
import { Dna, Fingerprint, Activity } from 'lucide-react';

export function VariantCallerIgv({ variants }: { variants: any[] }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <Dna className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Somatic Variant Calling (VCF)</h2>
          <p className="text-xs text-zinc-400">High-depth tumor sequencing analysis</p>
        </div>
      </div>
      
      <div className="flex-1 w-full bg-[#1e1e1e] rounded-2xl border border-white/5 overflow-hidden flex flex-col">
        {/* Mock IGV Browser Header */}
        <div className="bg-[#2d2d2d] border-b border-white/10 px-4 py-2 flex items-center justify-between text-xs text-zinc-300">
           <span>IGV.js / GRCh38 Reference Sequence</span>
           <span className="font-mono bg-black/50 px-2 py-0.5 rounded">chr7:55,198,336</span>
        </div>
        
        {/* Variant Tracks */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
          {variants.map((v, i) => (
            <div key={i} className="flex flex-col gap-2 p-3 bg-black/40 rounded-xl border border-white/5">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <Fingerprint className="h-4 w-4 text-purple-400" />
                   <span className="font-bold text-white text-sm">{v.gene} {v.mutation}</span>
                 </div>
                 <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                   {v.significance}
                 </span>
               </div>
               
               <div className="grid grid-cols-4 gap-2 mt-2">
                 <div className="bg-white/5 p-2 rounded text-center">
                   <div className="text-[10px] text-zinc-500">Locus</div>
                   <div className="text-xs font-mono text-zinc-300">{v.chromosome}:{v.position}</div>
                 </div>
                 <div className="bg-white/5 p-2 rounded text-center">
                   <div className="text-[10px] text-zinc-500">Type</div>
                   <div className="text-xs font-mono text-zinc-300">{v.type}</div>
                 </div>
                 <div className="bg-white/5 p-2 rounded text-center">
                   <div className="text-[10px] text-zinc-500">Depth</div>
                   <div className="text-xs font-mono text-zinc-300">{v.read_depth}x</div>
                 </div>
                 <div className="bg-white/5 p-2 rounded text-center">
                   <div className="text-[10px] text-zinc-500">VAF</div>
                   <div className="text-xs font-mono text-zinc-300">{v.allele_frequency * 100}%</div>
                 </div>
               </div>
               
               {/* Mock Alignment Track visualization */}
               <div className="mt-2 h-6 w-full bg-zinc-900 rounded overflow-hidden flex relative">
                  <div className="absolute top-0 left-1/2 w-0.5 h-full bg-rose-500 z-10 opacity-70"></div>
                  {Array.from({length: 40}).map((_, j) => (
                    <div key={j} className="h-full flex-1 border-r border-black/20" style={{
                      backgroundColor: j === 20 ? '#ef4444' : '#a3e635',
                      opacity: Math.random() > 0.8 ? 0.4 : 1
                    }}></div>
                  ))}
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
