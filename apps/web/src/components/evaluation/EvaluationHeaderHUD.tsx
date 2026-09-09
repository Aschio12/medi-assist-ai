'use client';

import React from 'react';
import { 
  Microscope, 
  ShieldCheck, 
  Award, 
  Layers, 
  AlertTriangle,
  Activity,
  CheckCircle2,
  RefreshCcw,
  Zap
} from 'lucide-react';
import { NightlyPipelineReport } from '@/app/actions/evaluation';

interface EvaluationHeaderHUDProps {
  report: NightlyPipelineReport;
}

export function EvaluationHeaderHUD({ report }: EvaluationHeaderHUDProps) {
  const isHealthy = report.pipeline_status === 'PASSED';
  
  return (
    <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/80 to-black/95">
      {/* Background Cyber Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />
      <div className={`absolute bottom-0 right-1/3 w-96 h-28 ${isHealthy ? 'bg-neon-500/10' : 'bg-red-500/10'} blur-[90px] rounded-full pointer-events-none`} />

      {/* Main Header Content */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl border ${isHealthy ? 'bg-cyan-500/20 border-cyan-500/40' : 'bg-red-500/20 border-red-500/40'} shadow-[0_0_20px_rgba(34,211,238,0.2)]`}>
              <Microscope className={`h-7 w-7 ${isHealthy ? 'text-cyan-400' : 'text-red-400'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Continuous AI Observability
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  isHealthy 
                    ? 'bg-neon-500/20 text-neon-300 border-neon-500/30' 
                    : 'bg-red-500/20 text-red-300 border-red-500/30 animate-pulse'
                }`}>
                  PIPELINE {report.pipeline_status}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mt-1">
                Clinical Benchmarking & Toxicity Guardrails
              </h1>
            </div>
          </div>
          <p className="text-xs lg:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
            Automated RAGAS metrics (Faithfulness, Precision) and TruLens Triad (Hallucination, Bias, Toxicity) evaluated against the 1,000-sample medical golden dataset.
          </p>
        </div>

        {/* Timestamp / Health Pill */}
        <div className="flex items-center gap-3 bg-black/60 p-3 rounded-2xl border border-white/10 shrink-0">
          <div className="p-2 rounded-xl bg-black border border-white/10">
            <RefreshCcw className="h-4 w-4 text-zinc-400" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              Last Nightly Run
              <span className="text-[10px] text-zinc-400">
                {new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">
              {report.total_samples_evaluated} golden pairs analyzed
            </span>
          </div>
        </div>
      </div>

      {/* Top Quick Telemetry Cards */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
        
        {/* Overall RAGAS Score */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
              RAGAS Faithfulness
            </span>
            <Award className="h-3.5 w-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1.5 flex items-center gap-2">
            {(report.ragas_aggregated_scores.faithfulness * 100).toFixed(1)}%
          </div>
          <span className="text-[10px] font-mono text-neon-400 flex items-center gap-1 mt-1">
            <CheckCircle2 className="h-3 w-3" /> Grounded in context
          </span>
        </div>

        {/* Hallucination Rate */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-red-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
              Critical Hallucinations
            </span>
            <AlertTriangle className={`h-3.5 w-3.5 ${report.hallucination_rate_percent > 0 ? 'text-red-400 animate-pulse' : 'text-neon-400'}`} />
          </div>
          <div className={`text-xl font-bold font-mono mt-1.5 flex items-center gap-2 ${report.hallucination_rate_percent > 0 ? 'text-red-400' : 'text-neon-400'}`}>
            {report.hallucination_rate_percent.toFixed(2)}%
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
            Target: 0.00%
          </span>
        </div>

        {/* Toxicity & Bias */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
              Toxicity & Bias Failures
            </span>
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
          </div>
          <div className={`text-xl font-bold font-mono mt-1.5 ${report.bias_toxicity_rate_percent > 0 ? 'text-amber-400' : 'text-neon-400'}`}>
            {report.bias_toxicity_rate_percent.toFixed(2)}%
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
            Demographic stereotyping checks
          </span>
        </div>

        {/* Precision */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
              Context Precision
            </span>
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-1.5 flex items-center gap-1.5">
            {(report.ragas_aggregated_scores.context_precision * 100).toFixed(1)}%
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
            Retrieval Top-K relevance
          </span>
        </div>
      </div>
    </div>
  );
}
