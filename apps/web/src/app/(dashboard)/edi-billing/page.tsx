'use client';

import React, { useState } from 'react';
import { parseEdi, adjudicateClaim } from '@/app/actions/edi';
import { EdiRawViewer } from '@/components/edi/EdiRawViewer';
import { AdjudicationResults } from '@/components/edi/AdjudicationResults';
import { FileText, Play, ServerCog } from 'lucide-react';

const MOCK_837 = "ISA*00*          *00*          *ZZ*SENDER         *ZZ*RECEIVER       *260928*1630*U*00401*000000001*0*T*:~GS*HC*SENDER*RECEIVER*20260928*1630*1*X*004010X098A1~ST*837*0001~HL*1**20*1~NM1*85*2*PROVIDER INC*****XX*1234567890~HL*2*1*22*0~NM1*IL*1*DOE*JOHN****MI*999999999~CLM*CLM-2026-991*150.00***11::1*Y*A*Y*I~SV1*HC:99213*150.00*UN*1~SE*10*0001~GE*1*1~IEA*1*000000001~";

export default function EdiBillingDashboard() {
  const [ediData, setEdiData] = useState<any>(null);
  const [remittance, setRemittance] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    
    // Parse 837
    const parseRes = await parseEdi(MOCK_837, "837");
    setEdiData(parseRes?.data);
    
    // Adjudicate
    const adjRes = await adjudicateClaim(MOCK_837);
    setRemittance(adjRes?.remittance);
    
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.15)] relative overflow-hidden bg-gradient-to-br from-black to-slate-900">
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center w-max gap-1">
              <ServerCog className="h-3 w-3" /> Financial Clearinghouse
            </span>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mt-2">
              EDI X12 Billing & Adjudication
            </h1>
            <p className="text-xs lg:text-sm text-indigo-200/60 mt-2 max-w-3xl">
              Strict ISA tokenization, hierarchical loop building (HL), and mock AI adjudication for HIPAA compliant 837 Professional Claims and 835 Remittance Advice formats.
            </p>
          </div>
          <div>
             <button 
                onClick={handleProcess} 
                disabled={isProcessing} 
                className="flex items-center gap-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/50 text-sm font-bold px-5 py-3 rounded-xl transition-all disabled:opacity-50"
             >
                <Play className={`h-4 w-4 ${isProcessing ? 'animate-pulse' : ''}`} /> 
                {isProcessing ? 'Processing Claim...' : 'Simulate 837 Adjudication'}
             </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
        <div className="h-full">
           <EdiRawViewer ediData={ediData} is835={false} />
        </div>
        <div className="h-full">
           <AdjudicationResults remittance={remittance} />
        </div>
      </div>

    </div>
  );
}
