'use client';

import React from 'react';
import { FileText, Cpu } from 'lucide-react';

export function NlpCriteriaParser({ parseResult }: { parseResult: any }) {
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20">
          <Cpu className="h-5 w-5 text-pink-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">ClinicalBERT NER</h2>
          <p className="text-xs text-zinc-400">Named Entity Recognition</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto pr-2">
         {!parseResult ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
               <FileText className="h-10 w-10 mb-3" />
               <p className="text-sm font-mono uppercase text-center">Awaiting Criteria Text</p>
            </div>
         ) : (
            <div className="space-y-4">
               <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                  <p className="text-sm text-zinc-300 italic">"{parseResult.original_text}"</p>
               </div>
               
               <div className="space-y-2">
                 <h3 className="text-[10px] font-bold text-zinc-500 uppercase">Extracted Entities</h3>
                 {parseResult.extracted_entities.map((entity: any, i: number) => (
                   <div key={i} className="bg-black/50 border border-white/10 rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-1 rounded font-mono uppercase mr-3">
                          {entity.entity_group}
                        </span>
                        <span className="text-sm text-white font-bold">{entity.word}</span>
                      </div>
                      <span className="text-xs text-zinc-500 font-mono">Conf: {(entity.score * 100).toFixed(1)}%</span>
                   </div>
                 ))}
               </div>
            </div>
         )}
      </div>
    </div>
  );
}
