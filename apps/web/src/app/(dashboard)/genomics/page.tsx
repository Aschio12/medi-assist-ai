'use client';

import React, { useState, useEffect } from 'react';
import { analyzeTumorGenome } from '@/app/actions/genomics';
import { VariantCallerIgv } from '@/components/genomics/VariantCallerIgv';
import { TherapyMatcher } from '@/components/genomics/TherapyMatcher';
import { FhirGenomicsExport } from '@/components/genomics/FhirGenomicsExport';
import { Activity, Loader2 } from 'lucide-react';

export default function GenomicsDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching and analyzing genome on mount
    analyzeTumorGenome("PT-889-NSCLC", "Non-Small Cell Lung Cancer")
      .then(res => {
        setData(res);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/80 to-black/95">
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Precision Oncology
            </span>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mt-2">
              Genomic AI Analysis
            </h1>
            <p className="text-xs lg:text-sm text-zinc-400 mt-2 max-w-3xl">
              Automated VCF parsing, somatic mutation extraction, and NLP-driven targeted therapy matching integrated with HL7 FHIR Genomics Reporting standards.
            </p>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-mono text-zinc-500 mb-1">PATIENT ID</div>
             <div className="text-sm font-bold text-white font-mono bg-white/10 px-3 py-1 rounded border border-white/20">PT-889-NSCLC</div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 glass-panel rounded-3xl border-white/10">
           <Loader2 className="h-8 w-8 text-purple-500 animate-spin mb-4" />
           <p className="text-zinc-400 text-sm">Processing VCF sequences & matching targeted therapies...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
            <VariantCallerIgv variants={data?.variants} />
            <div className="flex flex-col gap-6 h-full">
              <div className="flex-1 overflow-hidden">
                <TherapyMatcher variants={data?.variants} />
              </div>
              <div className="flex-1 overflow-hidden">
                <FhirGenomicsExport fhirData={data?.fhir_export} />
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
