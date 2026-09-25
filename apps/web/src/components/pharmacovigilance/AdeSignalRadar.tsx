'use client';

import React from 'react';
import { Activity, AlertTriangle, Syringe } from 'lucide-react';

export function AdeSignalRadar() {
  const signals = [
    { drug: "Lisinopril", event: "Maculopapular Rash", nlpConfidence: 0.94, severity: "High", date: "Just now" },
    { drug: "Simvastatin", event: "Myopathy", nlpConfidence: 0.88, severity: "Medium", date: "2 hrs ago" },
    { drug: "Amoxicillin", event: "Anaphylaxis", nlpConfidence: 0.98, severity: "Critical", date: "1 day ago" }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <Activity className="h-5 w-5 text-rose-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">ADE Signal Radar</h2>
            <p className="text-xs text-zinc-400">ClinicalBERT adverse event extraction</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          <span className="text-xs font-mono text-rose-400">MONITORING</span>
        </div>
      </div>

      <div className="space-y-4">
        {signals.map((s, i) => (
          <div key={i} className="p-4 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              s.severity === 'Critical' ? 'bg-red-500' : s.severity === 'High' ? 'bg-orange-500' : 'bg-yellow-500'
            }`} />
            
            <div className="flex items-start justify-between pl-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Syringe className="h-4 w-4 text-zinc-400" />
                  <span className="text-sm font-bold text-white">{s.drug}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                  <span className="text-xs font-mono text-rose-300">{s.event}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] text-zinc-500 font-mono">{s.date}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  NLP Conf: {(s.nlpConfidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
