'use client';

import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export function EncryptionStatus({ isAggregated }: { isAggregated: boolean }) {
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <Lock className="h-5 w-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Homomorphic Encryption</h2>
          <p className="text-xs text-zinc-400">Zero-Knowledge Patient Privacy</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
         <div className={`border-2 border-dashed ${isAggregated ? 'border-emerald-500/50' : 'border-indigo-500/30'} rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-colors duration-500`}>
             {isAggregated ? (
               <>
                 <ShieldCheck className="h-12 w-12 text-emerald-400 mb-4" />
                 <h3 className="text-white font-bold mb-2">Secure Aggregation Complete</h3>
                 <p className="text-xs text-zinc-400">Global weights updated via secure multi-party computation. Raw patient data never left edge nodes.</p>
               </>
             ) : (
               <>
                 <Lock className="h-12 w-12 text-indigo-400 mb-4 opacity-50" />
                 <h3 className="text-white font-bold mb-2">Awaiting Edge Sync</h3>
                 <p className="text-xs text-zinc-400">Weights will be aggregated strictly in ciphertext space.</p>
               </>
             )}
         </div>
      </div>
    </div>
  );
}
