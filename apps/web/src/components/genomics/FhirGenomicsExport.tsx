'use client';

import React from 'react';
import { Database, Download, FileJson } from 'lucide-react';

export function FhirGenomicsExport({ fhirData }: { fhirData: any }) {
  if (!fhirData) return null;

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <Database className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">HL7 FHIR Export</h2>
            <p className="text-xs text-zinc-400">Genomics Reporting IG Standardization</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs px-3 py-2 rounded-lg transition-colors">
          <Download className="h-3 w-3" /> Export to EHR
        </button>
      </div>
      
      <div className="flex-1 w-full bg-[#1e1e1e] rounded-2xl border border-white/5 overflow-hidden flex flex-col">
        <div className="bg-[#2d2d2d] border-b border-white/10 px-4 py-2 flex items-center gap-2 text-xs text-zinc-300">
           <FileJson className="h-3 w-3" /> <span>fhir_genomics_report.json</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <pre className="text-[10px] sm:text-xs font-mono text-zinc-300 whitespace-pre-wrap">
            {JSON.stringify(fhirData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
