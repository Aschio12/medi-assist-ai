'use client';

import React, { useState } from 'react';
import { designGuideRNAs, analyzeOffTargets } from '@/app/actions/crispr';
import { SequenceInput } from '@/components/crispr/SequenceInput';
import { GuideRnaList } from '@/components/crispr/GuideRnaList';
import { OffTargetMatrix } from '@/components/crispr/OffTargetMatrix';
import { Scissors } from 'lucide-react';

export default function CrisprDashboard() {
  const [candidatesData, setCandidatesData] = useState<any>(null);
  const [offTargetData, setOffTargetData] = useState<any>(null);
  const [isDesigning, setIsDesigning] = useState(false);

  const handleDesign = async (seq: string, pam: string) => {
    setIsDesigning(true);
    setCandidatesData(null);
    setOffTargetData(null);
    
    const res = await designGuideRNAs(seq, pam);
    if (res?.status === "success") {
      setCandidatesData(res.data);
    }
    setIsDesigning(false);
  };

  const handleSelectGuide = async (grnaSeq: string) => {
    setOffTargetData(null);
    const res = await analyzeOffTargets(grnaSeq);
    if (res?.status === "success") {
      setOffTargetData(res.data);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-lime-500/30 shadow-[0_0_30px_rgba(132,204,22,0.15)] relative overflow-hidden bg-gradient-to-br from-black to-[#132a13]">
        <div className="relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-lime-500/20 text-lime-300 border border-lime-500/30 flex items-center w-max gap-1">
            <Scissors className="h-3 w-3" /> Frontier Tech
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-lime-200 bg-clip-text text-transparent mt-2">
            CRISPR/Cas9 Gene Editing AI Designer
          </h1>
          <p className="text-xs lg:text-sm text-lime-200/60 mt-2 max-w-3xl">
            Deep learning-based genome engineering. Simulates DeepCRISPR for optimal guide RNA (gRNA) design, maximizing on-target knockout efficiency while running genome-wide mismatch scans to minimize off-target cleavage probability.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        {/* Left Column - Input */}
        <div className="h-full">
           <SequenceInput onDesign={handleDesign} />
        </div>

        {/* Center Column - Candidates */}
        <div className="h-full">
           <GuideRnaList data={candidatesData} onSelect={handleSelectGuide} />
        </div>

        {/* Right Column - Off Targets */}
        <div className="h-full">
           <OffTargetMatrix analysisData={offTargetData} />
        </div>
      </div>

    </div>
  );
}
