'use client';

import React from 'react';
import { Image as ImageIcon, Loader2, CheckCircle2 } from 'lucide-react';

export function ImageComparisonViewer({ resultData, isProcessing, mode }: { resultData: any, isProcessing: boolean, mode: 'synthesize' | 'super-resolve' }) {
  
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <ImageIcon className="h-5 w-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Generative Viewer</h2>
          <p className="text-xs text-zinc-400">Diffusion Inference Output</p>
        </div>
      </div>
      
      <div className="flex-1 bg-[#121212] rounded-2xl border border-white/5 relative flex flex-col items-center justify-center overflow-hidden">
         {isProcessing ? (
            <div className="flex flex-col items-center justify-center text-indigo-400">
               <Loader2 className="h-10 w-10 animate-spin mb-4" />
               <div className="text-sm font-mono tracking-widest uppercase">
                 {mode === 'synthesize' ? 'Running Denoising Steps...' : 'Applying Noise Augmentation...'}
               </div>
            </div>
         ) : resultData ? (
            <div className="w-full h-full p-6 flex flex-col">
               <div className="flex-1 bg-gradient-to-br from-indigo-900/20 to-black rounded-xl border border-indigo-500/20 flex items-center justify-center mb-4 relative overflow-hidden group">
                  <ImageIcon className="h-16 w-16 text-indigo-500/30 group-hover:scale-110 transition-transform" />
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span className="text-[10px] text-white font-mono uppercase">{mode === 'synthesize' ? '100% Synthetic' : 'SR Enhanced'}</span>
                  </div>
               </div>

               {mode === 'synthesize' && (
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <div className="text-[10px] text-zinc-500 font-mono">FRÉCHET INCEPTION DISTANCE (FID)</div>
                     <div className="text-lg text-white font-mono">{resultData.fid_score}</div>
                   </div>
                   <div className="text-right">
                     <div className="text-[10px] text-zinc-500 font-mono">DENOISING STEPS</div>
                     <div className="text-lg text-white font-mono">{resultData.diffusion_steps}</div>
                   </div>
                 </div>
               )}

               {mode === 'super-resolve' && (
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <div className="text-[10px] text-zinc-500 font-mono">PSNR IMPROVEMENT</div>
                     <div className="text-lg text-white font-mono">+{resultData.psnr_improvement_db} dB</div>
                   </div>
                   <div className="text-right">
                     <div className="text-[10px] text-zinc-500 font-mono">SSIM SCORE</div>
                     <div className="text-lg text-white font-mono">{resultData.ssim_score}</div>
                   </div>
                 </div>
               )}
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center text-zinc-500 opacity-50">
               <ImageIcon className="h-12 w-12 mb-3" />
               <span className="text-xs font-mono uppercase">Waiting for prompt</span>
            </div>
         )}
      </div>
    </div>
  );
}
