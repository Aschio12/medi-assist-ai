'use client';

import React from 'react';
import { DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';

export function AdjudicationResults({ remittance }: { remittance: any }) {
  if (!remittance || !remittance.transactions) {
    return (
      <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
        <DollarSign className="h-10 w-10 mb-3" />
        <p className="text-sm font-mono uppercase">Awaiting Adjudication</p>
      </div>
    );
  }

  const txns = remittance.transactions || [];
  
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col relative overflow-hidden bg-gradient-to-b from-black to-slate-900">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <DollarSign className="h-5 w-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">AI Adjudication Results</h2>
          <p className="text-xs text-zinc-400">Simulated 835 Generation</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto pr-2">
         {txns.map((txn: any, idx: number) => (
            <div key={idx} className="mb-6 space-y-4">
               <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                  <span className="text-sm text-zinc-400">Total Paid (ACH)</span>
                  <span className="text-xl font-bold text-emerald-400">${txn.total_paid.toFixed(2)}</span>
               </div>
               
               {txn.claim_payments?.map((claim: any, cidx: number) => (
                  <div key={cidx} className="bg-black/40 p-4 rounded-xl border border-white/5">
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-mono text-zinc-500">Claim ID: {claim.patient_control_number}</span>
                        {claim.claim_status_code === '1' ? 
                           <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded"><CheckCircle2 className="h-3 w-3" /> PAID</span> :
                           <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-500/10 px-2 py-1 rounded"><AlertCircle className="h-3 w-3" /> DENIED</span>
                        }
                     </div>
                     
                     <div className="space-y-2">
                        {claim.service_payments?.map((svc: any, sidx: number) => (
                           <div key={sidx} className="bg-white/5 p-2 rounded-lg text-xs font-mono grid grid-cols-3 gap-2">
                              <span className="text-indigo-300">Proc: {svc.procedure_code}</span>
                              <span className="text-zinc-400">Chg: ${svc.line_charge.toFixed(2)}</span>
                              <span className={svc.line_paid > 0 ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>Pd: ${svc.line_paid.toFixed(2)}</span>
                              
                              {svc.adjustments?.length > 0 && (
                                 <div className="col-span-3 mt-1 pt-1 border-t border-white/5 text-[10px] text-amber-500/80">
                                    {svc.adjustments.map((adj: any, aidx: number) => (
                                       <div key={aidx}>CAS {adj.group} - {adj.reason_code} (${adj.amount.toFixed(2)}): {adj.desc}</div>
                                    ))}
                                 </div>
                              )}
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         ))}
      </div>
    </div>
  );
}
