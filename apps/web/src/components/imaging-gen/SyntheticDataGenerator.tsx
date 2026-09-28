'use client';

import React, { useState } from 'react';
import { Sparkles, Brain, Scan } from 'lucide-react';

export function SyntheticDataGenerator({ onGenerate }: { onGenerate: (modality: string, anatomy: string, pathology: string) => void }) {
  const [modality, setModality] = useState('MRI');
  const [anatomy, setAnatomy] = useState('Brain');
  const [pathology, setPathology] = useState('Glioblastoma Multiforme');

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20">
          <Sparkles className="h-5 w-5 text-fuchsia-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Latent Diffusion Synthesis</h2>
          <p className="text-xs text-zinc-400">Generate synthetic imaging datasets</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        <div>
           <label className="text-[10px] text-zinc-500 font-mono mb-1 block uppercase">Imaging Modality</label>
           <select 
             className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-zinc-300 focus:outline-none focus:border-fuchsia-500/50 appearance-none"
             value={modality}
             onChange={(e) => setModality(e.target.value)}
           >
              <option>MRI</option>
              <option>CT Scan</option>
              <option>PET Scan</option>
              <option>X-Ray</option>
           </select>
        </div>

        <div>
           <label className="text-[10px] text-zinc-500 font-mono mb-1 block uppercase">Anatomical Region</label>
           <div className="relative">
             <Brain className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
             <input 
               type="text"
               className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-3 text-sm text-zinc-300 focus:outline-none focus:border-fuchsia-500/50"
               value={anatomy}
               onChange={(e) => setAnatomy(e.target.value)}
             />
           </div>
        </div>

        <div>
           <label className="text-[10px] text-zinc-500 font-mono mb-1 block uppercase">Pathological Condition</label>
           <div className="relative">
             <Scan className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
             <input 
               type="text"
               className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-3 text-sm text-zinc-300 focus:outline-none focus:border-fuchsia-500/50"
               value={pathology}
               onChange={(e) => setPathology(e.target.value)}
             />
           </div>
        </div>

        <button 
           onClick={() => onGenerate(modality, anatomy, pathology)}
           className="mt-auto w-full flex items-center justify-center gap-2 bg-fuchsia-600/20 hover:bg-fuchsia-600/40 text-fuchsia-300 border border-fuchsia-500/50 text-sm font-bold px-4 py-3 rounded-xl transition-all"
        >
           <Sparkles className="h-4 w-4" /> Synthesize Image
        </button>
      </div>
    </div>
  );
}
