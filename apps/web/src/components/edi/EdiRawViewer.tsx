'use client';

import React from 'react';
import { FileText, AlignLeft } from 'lucide-react';

export function EdiRawViewer({ ediData, is835 = false }: { ediData: any, is835?: boolean }) {
  if (!ediData) {
    return (
      <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
        <FileText className="h-10 w-10 mb-3" />
        <p className="text-sm font-mono uppercase">Awaiting X12 Transaction Data</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col relative overflow-hidden bg-black/60">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-xl border ${is835 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
          <AlignLeft className={`h-5 w-5 ${is835 ? 'text-amber-400' : 'text-emerald-400'}`} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Parsed X12 {is835 ? '835 (Remittance)' : '837 (Claim)'}</h2>
          <p className="text-xs text-zinc-400">Loop Hierarchy Representation</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-black border border-white/5 p-4 rounded-xl font-mono text-xs">
         <pre className="text-green-400 whitespace-pre-wrap break-all">
            {JSON.stringify(ediData, null, 2)}
         </pre>
      </div>
    </div>
  );
}
