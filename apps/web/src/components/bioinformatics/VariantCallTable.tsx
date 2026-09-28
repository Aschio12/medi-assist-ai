'use client';

import React from 'react';
import { Database, Filter } from 'lucide-react';

export function VariantCallTable() {
  const mockVariants = [
    { chr: "chr1", pos: 10177, id: "rs367896724", ref: "A", alt: "AC", qual: 100, filter: "PASS" },
    { chr: "chr1", pos: 10235, id: "rs540431307", ref: "T", alt: "TA", qual: 100, filter: "PASS" },
    { chr: "chr2", pos: 43566, id: ".", ref: "G", alt: "C", qual: 45, filter: "q10" },
    { chr: "chr3", pos: 99234, id: "rs123456789", ref: "C", alt: "T", qual: 99, filter: "PASS" }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <Database className="h-5 w-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">VCF Variant Calls</h2>
          <p className="text-xs text-zinc-400">Parsed from Genomic Sequencing run</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
         <table className="w-full text-left text-sm text-zinc-400">
            <thead className="text-[10px] uppercase tracking-widest text-zinc-500 bg-white/5">
               <tr>
                  <th className="px-4 py-3 rounded-l-lg">CHROM</th>
                  <th className="px-4 py-3">POS</th>
                  <th className="px-4 py-3">REF</th>
                  <th className="px-4 py-3">ALT</th>
                  <th className="px-4 py-3 rounded-r-lg">FILTER</th>
               </tr>
            </thead>
            <tbody>
               {mockVariants.map((v, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                     <td className="px-4 py-3 font-mono text-white">{v.chr}</td>
                     <td className="px-4 py-3 font-mono text-indigo-300">{v.pos}</td>
                     <td className="px-4 py-3 font-mono text-emerald-400">{v.ref}</td>
                     <td className="px-4 py-3 font-mono text-pink-400">{v.alt}</td>
                     <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${v.filter === 'PASS' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                           {v.filter}
                        </span>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}
