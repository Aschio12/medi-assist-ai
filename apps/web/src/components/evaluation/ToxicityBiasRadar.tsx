'use client';

import React from 'react';
import { ToxicityCheck } from '@/app/actions/evaluation';
import { AlertOctagon, HeartCrack, Skull, Scale3d } from 'lucide-react';

interface ToxicityBiasRadarProps {
  checks: ToxicityCheck[];
}

export function ToxicityBiasRadar({ checks }: ToxicityBiasRadarProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <AlertOctagon className="h-5 w-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Toxicity & Bias Radar</h2>
          <p className="text-xs text-zinc-400">Demographic stereotyping and harmful content.</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {checks.map(check => {
          const isRejected = check.clinical_clearance === "REJECTED";
          
          return (
            <div 
              key={check.id} 
              className={`p-4 rounded-2xl border ${
                isRejected
                  ? 'bg-amber-500/5 border-amber-500/20' 
                  : 'bg-black/40 border-white/5'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
                  {check.id}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  isRejected 
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                    : 'bg-neon-500/20 text-neon-400 border-neon-500/30'
                }`}>
                  {check.clinical_clearance}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HeartCrack className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="text-xs text-zinc-300">Toxicity</span>
                  </div>
                  <span className={`text-xs font-mono font-bold ${check.scores.toxicity > 0.3 ? 'text-amber-400' : 'text-white'}`}>
                    {(check.scores.toxicity * 100).toFixed(1)}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skull className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="text-xs text-zinc-300">Maliciousness</span>
                  </div>
                  <span className="text-xs font-mono text-white">
                    {(check.scores.maliciousness * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale3d className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="text-xs text-zinc-300">Bias / Stereotyping</span>
                  </div>
                  <span className={`text-xs font-mono font-bold ${check.scores.bias_stereotyping > 0.3 ? 'text-red-400' : 'text-white'}`}>
                    {(check.scores.bias_stereotyping * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
