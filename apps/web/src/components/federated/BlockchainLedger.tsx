'use client';

import React from 'react';
import { Link2, ShieldCheck, Database } from 'lucide-react';

export function BlockchainLedger({ receipt }: { receipt: any }) {
  
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <Link2 className="h-5 w-5 text-orange-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Provenance Ledger</h2>
          <p className="text-xs text-zinc-400">Immutable Blockchain Receipts</p>
        </div>
      </div>
      
      <div className="flex-1 bg-[#1e1e1e] rounded-2xl border border-white/5 overflow-hidden flex flex-col">
        <div className="bg-[#2d2d2d] border-b border-white/10 px-4 py-2 flex items-center gap-2 text-xs text-zinc-300">
           <Database className="h-3 w-3" /> <span>Smart Contract: 0xFedMedCore</span>
        </div>
        <div className="flex-1 p-4 space-y-4">
          
          {receipt ? (
            <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl space-y-3 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg">NEW BLOCK</div>
               
               <div>
                 <div className="text-[10px] text-zinc-500 font-mono">BLOCK NUMBER</div>
                 <div className="text-sm font-bold text-white">#{receipt.block_number}</div>
               </div>
               
               <div>
                 <div className="text-[10px] text-zinc-500 font-mono">WEIGHT PAYLOAD HASH (SHA-256)</div>
                 <div className="text-xs font-mono text-orange-400 break-all">{receipt.weight_hash_sha256}</div>
               </div>

               <div>
                 <div className="text-[10px] text-zinc-500 font-mono">TX HASH</div>
                 <div className="text-xs font-mono text-zinc-300 break-all">{receipt.transaction_hash}</div>
               </div>
               
               <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold mt-2 pt-2 border-t border-white/10">
                 <ShieldCheck className="h-3 w-3" /> VERIFIED & MINED
               </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500">
               <p className="text-sm">Awaiting next federated sync...</p>
               <p className="text-[10px] mt-1 font-mono">No new blocks mined.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
