'use client';

import React from 'react';
import { HallucinationCheck } from '@/app/actions/evaluation';
import { ShieldAlert, Fingerprint, Layers, LayoutList } from 'lucide-react';

interface TruLensHallucinationMatrixProps {
  checks: HallucinationCheck[];
}

export function TruLensHallucinationMatrix({ checks }: TruLensHallucinationMatrixProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
          <ShieldAlert className="h-5 w-5 text-red-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">TruLens "RAG Triad" Checks</h2>
          <p className="text-xs text-zinc-400">Strict hallucination detection matrix.</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {checks.map(check => (
          <div 
            key={check.id} 
            className={`p-4 rounded-2xl border ${
              check.hallucination_detected 
                ? 'bg-red-500/5 border-red-500/20' 
                : 'bg-black/40 border-white/5'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
                {check.id}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                check.hallucination_detected 
                  ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                  : 'bg-neon-500/20 text-neon-400 border-neon-500/30'
              }`}>
                {check.clinical_safety_status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-xs text-zinc-300">Context Relevance</span>
                </div>
                <span className="text-xs font-mono text-white">
                  {(check.metrics.context_relevance * 100).toFixed(0)}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Fingerprint className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-xs text-zinc-300">Groundedness</span>
                </div>
                <span className={`text-xs font-mono font-bold ${check.metrics.groundedness < 0.85 ? 'text-red-400' : 'text-neon-400'}`}>
                  {(check.metrics.groundedness * 100).toFixed(0)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LayoutList className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-xs text-zinc-300">Answer Relevance</span>
                </div>
                <span className="text-xs font-mono text-white">
                  {(check.metrics.answer_relevance * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
