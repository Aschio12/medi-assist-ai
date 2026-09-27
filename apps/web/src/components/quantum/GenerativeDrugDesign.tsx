'use client';

import React, { useState } from 'react';
import { Hexagon, FlaskConical, Play } from 'lucide-react';

export function GenerativeDrugDesign({ onSimulate }: { onSimulate: (smiles: string) => void }) {
  const [smiles, setSmiles] = useState('CC1=C(C=C(C=C1)NC(=O)C2=CC=C(C=C2)CN3CCN(CC3)C)NC4=NC=CC(=N4)C5=CC=CC=N5'); // Imatinib

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20">
          <Hexagon className="h-5 w-5 text-pink-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Compound Input</h2>
          <p className="text-xs text-zinc-400">SMILES String Representation</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        <div>
           <label className="text-[10px] text-zinc-500 font-mono mb-1 block">LIGAND SMILES</label>
           <textarea 
             className="w-full h-24 bg-black/50 border border-white/10 rounded-xl p-3 text-xs font-mono text-zinc-300 focus:outline-none focus:border-pink-500/50 resize-none"
             value={smiles}
             onChange={(e) => setSmiles(e.target.value)}
           />
        </div>

        <div>
           <label className="text-[10px] text-zinc-500 font-mono mb-1 block">TARGET PROTEIN (PDB ID)</label>
           <input 
             type="text"
             className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm font-mono text-zinc-300 focus:outline-none focus:border-pink-500/50"
             defaultValue="1IEP" // ABL kinase
           />
        </div>

        <button 
           onClick={() => onSimulate(smiles)}
           className="mt-auto w-full flex items-center justify-center gap-2 bg-pink-600/20 hover:bg-pink-600/40 text-pink-300 border border-pink-500/50 text-sm font-bold px-4 py-3 rounded-xl transition-all"
        >
           <Play className="h-4 w-4" /> Run Quantum Simulation
        </button>
      </div>
    </div>
  );
}
