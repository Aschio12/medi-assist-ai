'use client';

import React, { useState } from 'react';
import { alignSequences, assembleGenome } from '@/app/actions/genomics';
import { SequenceAlignmentViewer } from '@/components/bioinformatics/SequenceAlignmentViewer';
import { VariantCallTable } from '@/components/bioinformatics/VariantCallTable';
import { Dna, Play, GitMerge } from 'lucide-react';

export default function BioinformaticsDashboard() {
  const [alignment, setAlignment] = useState<any>(null);
  const [isAligning, setIsAligning] = useState(false);

  const handleAlign = async () => {
    setIsAligning(true);
    // Simulate real bioinformatics processing
    const seq1 = "ATGCGATCGATCGATCGATCGCGATCGATCGAT";
    const seq2 = "ATGCGATCGATCGATCGATCGCGATCGATCGAT"; // exact match test
    
    // Slight mismatch to test algorithm
    const res = await alignSequences("ATGCGATCGATCGATCGATCGCGATCGATCGAT", "ATGCGATCGATCGATCGATCGCGATCGATC", "global");
    setAlignment(res);
    setIsAligning(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.15)] relative overflow-hidden bg-gradient-to-br from-black to-slate-900">
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center w-max gap-1">
              <Dna className="h-3 w-3" /> Bioinformatics Engine
            </span>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent mt-2">
              Genomic Sequencing Pipeline
            </h1>
            <p className="text-xs lg:text-sm text-pink-200/60 mt-2 max-w-3xl">
              Advanced bioinformatics tools including Needleman-Wunsch global alignment, Smith-Waterman local alignment, state-machine VCF parsers, and Hierholzer's Algorithm for De Bruijn Graph K-mer assembly.
            </p>
          </div>
          <div className="flex gap-2">
             <button 
                onClick={handleAlign} 
                disabled={isAligning} 
                className="flex items-center gap-2 bg-pink-600/20 hover:bg-pink-600/40 text-pink-300 border border-pink-500/50 text-sm font-bold px-5 py-3 rounded-xl transition-all disabled:opacity-50"
             >
                <GitMerge className={`h-4 w-4 ${isAligning ? 'animate-pulse' : ''}`} /> 
                {isAligning ? 'Aligning...' : 'Global NW Align'}
             </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
        <div className="h-full">
           <SequenceAlignmentViewer alignment={alignment} />
        </div>
        <div className="h-full">
           <VariantCallTable />
        </div>
      </div>

    </div>
  );
}
