'use client';

import React, { useState } from 'react';
import { Dna, Fingerprint, Scissors } from 'lucide-react';

export function SequenceInput({ onDesign }: { onDesign: (seq: string, pam: string) => void }) {
  const [sequence, setSequence] = useState('ATGCGTACGTTAGCTAGCCTAGCTAGCTAGCTGATGCTAGCTAGCTAGCTAGCTAGCTAG');
  const [pam, setPam] = useState('NGG');

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-lime-500/10 border border-lime-500/20">
          <Dna className="h-5 w-5 text-lime-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Target Gene Sequence</h2>
          <p className="text-xs text-zinc-400">Input DNA fragment for gRNA targeting</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        <div>
           <label className="text-[10px] text-zinc-500 font-mono mb-1 block uppercase flex justify-between">
             <span>FASTA SEQUENCE (5' to 3')</span>
             <span className="text-lime-500">{sequence.length} bp</span>
           </label>
           <textarea 
             className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-3 text-xs font-mono text-zinc-300 focus:outline-none focus:border-lime-500/50 resize-none break-all"
             value={sequence}
             onChange={(e) => setSequence(e.target.value.toUpperCase().replace(/[^ATCG]/g, ''))}
           />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="text-[10px] text-zinc-500 font-mono mb-1 block uppercase">PAM Sequence</label>
             <div className="relative">
               <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
               <select 
                 className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-3 text-sm text-zinc-300 focus:outline-none focus:border-lime-500/50 appearance-none"
                 value={pam}
                 onChange={(e) => setPam(e.target.value)}
               >
                  <option value="NGG">NGG (SpCas9)</option>
                  <option value="NMVNN">NMVNN (Cpf1)</option>
                  <option value="NNGRRT">NNGRRT (SaCas9)</option>
               </select>
             </div>
           </div>
           
           <div>
             <label className="text-[10px] text-zinc-500 font-mono mb-1 block uppercase">Genome Assembly</label>
             <input 
               type="text"
               disabled
               className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-3 text-sm text-zinc-500 opacity-50 cursor-not-allowed"
               value="Human (GRCh38/hg38)"
             />
           </div>
        </div>

        <button 
           onClick={() => onDesign(sequence, pam)}
           className="mt-auto w-full flex items-center justify-center gap-2 bg-lime-600/20 hover:bg-lime-600/40 text-lime-300 border border-lime-500/50 text-sm font-bold px-4 py-3 rounded-xl transition-all"
        >
           <Scissors className="h-4 w-4" /> Synthesize Optimal gRNAs
        </button>
      </div>
    </div>
  );
}
