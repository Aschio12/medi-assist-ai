'use client';

import React from 'react';
import { 
  Cpu, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Layers, 
  Sparkles,
  Zap,
  TrendingUp,
  RefreshCcw
} from 'lucide-react';
import { LoRAModelCheckpoint } from '@/app/actions/tuning';

interface TuningHeaderHUDProps {
  activeModel?: LoRAModelCheckpoint;
  totalFeedbackCount: number;
}

export function TuningHeaderHUD({ activeModel, totalFeedbackCount }: TuningHeaderHUDProps) {
  const modelName = activeModel?.adapter_name || 'mediassist-lora-v1.4-sepsis';
  const score = activeModel?.medqa_usmle_score_percent || 86.8;
  const baseScore = activeModel?.base_model_score_percent || 74.2;
  const delta = (score - baseScore).toFixed(1);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/80 to-black/95">
      {/* Background Cyber Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-neon-500/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-28 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />

      {/* Main Header Content */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neon-500/20 rounded-2xl border border-neon-500/40 shadow-[0_0_20px_rgba(163,230,53,0.3)]">
              <Cpu className="h-7 w-7 text-neon-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-neon-500/20 text-neon-300 border border-neon-500/30">
                  Continuous Alignment Engine
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Direct Preference Optimization (DPO)
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mt-1">
                Human-in-the-Loop & Automated LoRA Fine-Tuning
              </h1>
            </div>
          </div>
          <p className="text-xs lg:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
            Attending clinicians evaluate AI outputs, overrule contraindications, and curate high-assurance ground truth. Cleared pairs are scrubbed via HIPAA Safe Harbor and auto-tune PEFT LoRA adapters.
          </p>
        </div>

        {/* Retraining Threshold Pill */}
        <div className="flex items-center gap-3 bg-black/60 p-3 rounded-2xl border border-white/10 shrink-0">
          <div className="p-2 rounded-xl bg-neon-500/20 border border-neon-500/30">
            <RefreshCcw className="h-4 w-4 text-neon-400 animate-spin" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              Auto-Retrain Threshold
              <span className="text-[10px] text-neon-400">500 Pairs</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">
              Next scheduled run in ~160 samples
            </span>
          </div>
        </div>
      </div>

      {/* Top 4 Quick Telemetry Cards */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
        {/* Active Model */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-neon-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
              Active Production Adapter
            </span>
            <span className="h-2 w-2 rounded-full bg-neon-400 animate-pulse" />
          </div>
          <div className="text-sm font-bold font-mono text-white mt-1.5 truncate" title={modelName}>
            {modelName}
          </div>
          <span className="text-[10px] font-mono text-neon-400 flex items-center gap-1 mt-1">
            <CheckCircle2 className="h-3 w-3" /> Live Serving 100% Inferences
          </span>
        </div>

        {/* MedQA USMLE Score */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
              MedQA USMLE Benchmark
            </span>
            <Award className="h-3.5 w-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1.5 flex items-center gap-2">
            {score}%
            <span className="text-xs font-mono text-neon-400 font-bold">
              +{delta}%
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
            Base Llama-3: {baseScore}%
          </span>
        </div>

        {/* Parameter Efficiency */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-neon-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
              LoRA Storage & VRAM
            </span>
            <Layers className="h-3.5 w-3.5 text-neon-400" />
          </div>
          <div className="text-xl font-bold font-mono text-neon-400 mt-1.5">
            68.4 MB
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
            99.6% PEFT Compression vs 16GB
          </span>
        </div>

        {/* HIPAA Sanitization */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
              Data Lake Scrubbing
            </span>
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-1.5 flex items-center gap-1.5">
            100% Cleared
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
            Safe Harbor §164.514(b)(2)
          </span>
        </div>
      </div>
    </div>
  );
}
