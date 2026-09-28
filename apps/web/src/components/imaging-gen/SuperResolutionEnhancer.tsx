'use client';

import React, { useState } from 'react';
import { Maximize, Upload, Layers } from 'lucide-react';

export function SuperResolutionEnhancer({ onEnhance }: { onEnhance: (imageId: string) => void }) {
  const [imageId, setImageId] = useState('LOW_DOSE_CT_0921');

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Maximize className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Super-Resolution</h2>
          <p className="text-xs text-zinc-400">Diffusion-based SR Enhancement</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-4 justify-center">
         
         <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-zinc-500 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-colors cursor-pointer">
            <Upload className="h-8 w-8 mb-2 opacity-50" />
            <span className="text-xs font-mono">UPLOAD LOW-RES SCAN</span>
         </div>
         
         <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <Layers className="h-4 w-4 text-cyan-400" />
               <span className="text-sm text-zinc-300 font-mono">{imageId}</span>
            </div>
            <span className="text-[10px] bg-black/50 px-2 py-1 rounded text-zinc-400 border border-white/10">128x128</span>
         </div>

         <button 
           onClick={() => onEnhance(imageId)}
           className="w-full flex items-center justify-center gap-2 bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/50 text-sm font-bold px-4 py-3 rounded-xl transition-all"
        >
           <Maximize className="h-4 w-4" /> Enhance to 512x512 (4x)
        </button>
      </div>
    </div>
  );
}
