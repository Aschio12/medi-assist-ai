'use client';

import React, { useState } from 'react';
import { FileCheck, UploadCloud, Loader2 } from 'lucide-react';
import { generateMedWatchForm } from '@/app/actions/pharmacovigilance';

export function MedWatchAutomator() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'drafted'>('idle');
  const [reportId, setReportId] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await generateMedWatchForm('PT-88910', 'Lisinopril', 'Severe Maculopapular Rash');
      setReportId(response.report_id);
      setStatus('drafted');
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <FileCheck className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">FDA MedWatch (Form 3500)</h2>
              <p className="text-xs text-zinc-400">Automated Regulatory Reporting</p>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-zinc-400 mb-6">
          The PV-Engine automatically drafts FDA MedWatch forms when a high-confidence adverse drug event is detected in clinical notes. Medical Officers can review and submit these directly to the FDA ESG.
        </p>
      </div>

      {status === 'idle' ? (
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <UploadCloud className="h-5 w-5" />}
          {loading ? 'Drafting Form 3500...' : 'Auto-Draft Form for Lisinopril Event'}
        </button>
      ) : (
        <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-xs font-bold text-orange-400">DRAFT_READY_FOR_REVIEW</span>
          </div>
          <div className="text-sm font-mono text-white mb-3">Report ID: {reportId}</div>
          <button className="w-full bg-orange-500 hover:bg-orange-400 text-black py-2 rounded-lg text-sm font-bold transition-colors">
            Review & Sign Off
          </button>
        </div>
      )}
    </div>
  );
}
