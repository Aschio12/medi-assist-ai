'use client';

import React, { useState } from 'react';
import { analyzeToxicityRisk } from '@/app/actions/pharmacovigilance';
import { DrugInput } from '@/components/pharmacovigilance/DrugInput';
import { RiskMatrix } from '@/components/pharmacovigilance/RiskMatrix';
import { AdverseSignalDetector } from '@/components/pharmacovigilance/AdverseSignalDetector';
import { ShieldAlert } from 'lucide-react';

export default function PharmacovigilanceDashboard() {
  const [riskData, setRiskData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (drugs: string[], conditions: string[]) => {
    setIsLoading(true);
    const res = await analyzeToxicityRisk(drugs, conditions);
    if (res) setRiskData(res);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)] relative overflow-hidden bg-gradient-to-br from-black to-[#330000]">
        <div className="relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 flex items-center w-max gap-1">
            <ShieldAlert className="h-3 w-3" /> Predictive ML
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mt-2">
            Pharmacovigilance & Polypharmacy AI
          </h1>
          <p className="text-xs lg:text-sm text-red-200/60 mt-2 max-w-3xl">
            Real-time toxicity risk stratification utilizing a simulated Machine Learning model trained on millions of adverse event vectors from the FDA Adverse Event Reporting System (FAERS).
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[550px]">
        {/* Left Column - Input */}
        <div className="h-full">
           <DrugInput onAnalyze={handleAnalyze} />
        </div>

        {/* Center - Risk Matrix */}
        <div className="h-full">
           <RiskMatrix riskData={riskData} />
        </div>

        {/* Right - Signals */}
        <div className="h-full">
           <AdverseSignalDetector factors={riskData?.contributing_factors || null} />
        </div>
      </div>

    </div>
  );
}
