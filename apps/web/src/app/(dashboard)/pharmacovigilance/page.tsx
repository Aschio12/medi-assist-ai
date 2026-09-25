'use client';

import React from 'react';
import { AdeSignalRadar } from '@/components/pharmacovigilance/AdeSignalRadar';
import { OpenFdaLookup } from '@/components/pharmacovigilance/OpenFdaLookup';
import { MedWatchAutomator } from '@/components/pharmacovigilance/MedWatchAutomator';

export default function PharmacovigilanceDashboard() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/80 to-black/95">
        <div className="relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            Post-Market Surveillance
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mt-2">
            Autonomous Pharmacovigilance
          </h1>
          <p className="text-xs lg:text-sm text-zinc-400 mt-2 max-w-3xl">
            Real-time adverse drug event (ADE) extraction from clinical notes using ClinicalBERT, correlated with openFDA FAERS data, and connected to automated MedWatch Form 3500 generation.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <AdeSignalRadar />
        </div>
        <div className="flex flex-col gap-6">
          <OpenFdaLookup />
          <MedWatchAutomator />
        </div>
      </div>

    </div>
  );
}
