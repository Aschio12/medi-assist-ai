'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Layers, 
  Award, 
  ArrowUpRight, 
  Download, 
  Server, 
  HardDrive, 
  Check, 
  Clock, 
  Activity, 
  Zap, 
  ShieldCheck,
  Radio
} from 'lucide-react';
import { LoRAModelCheckpoint, activateModelCheckpoint } from '@/app/actions/tuning';

interface ModelCheckpointRegistryProps {
  initialModels: LoRAModelCheckpoint[];
}

export function ModelCheckpointRegistry({ initialModels }: ModelCheckpointRegistryProps) {
  const [models, setModels] = useState<LoRAModelCheckpoint[]>(initialModels);
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [activeSuccessId, setActiveSuccessId] = useState<string | null>(null);

  const handleActivate = async (checkpointId: string) => {
    setActivatingId(checkpointId);
    try {
      const res = await activateModelCheckpoint(checkpointId);
      setModels((prev) =>
        prev.map((m) => ({
          ...m,
          is_active_in_production: m.checkpoint_id === checkpointId
        }))
      );
      setActiveSuccessId(checkpointId);
      setTimeout(() => setActiveSuccessId(null), 3000);
    } catch (err) {
      console.error('Activate model error:', err);
    } finally {
      setActivatingId(null);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/85 to-black/95">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-neon-500/20 rounded-2xl border border-neon-500/30">
            <Layers className="h-6 w-6 text-neon-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
              LoRA Model Adapter Checkpoint Registry
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                PEFT Hub
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Versioned adapters • Benchmarked against USMLE MedQA dataset
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <HardDrive className="h-4 w-4 text-cyan-400" />
          <span>Adapter Size: ~68 MB (vs 16 GB Base Llama-3)</span>
        </div>
      </div>

      {/* Checkpoints Grid */}
      <div className="mt-6 space-y-4">
        {models.map((m) => {
          const delta = (m.medqa_usmle_score_percent - m.base_model_score_percent).toFixed(1);

          return (
            <div
              key={m.checkpoint_id}
              className={`p-5 rounded-2xl border transition-all ${
                m.is_active_in_production
                  ? 'bg-gradient-to-r from-neon-950/20 via-black/80 to-black/90 border-neon-500/50 shadow-[0_0_25px_rgba(163,230,53,0.15)]'
                  : 'bg-black/60 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Checkpoint Name & Badges */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-white flex items-center gap-2">
                      {m.adapter_name}
                      {m.is_active_in_production && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-500"></span>
                        </span>
                      )}
                    </span>
                    {m.is_active_in_production ? (
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-neon-500/20 text-neon-300 border border-neon-500/40 uppercase font-bold flex items-center gap-1">
                        <Radio className="h-3 w-3 text-neon-400 animate-pulse" />
                        ACTIVE IN PRODUCTION
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-white/10 uppercase">
                        STANDBY CHECKPOINT
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                    <span>ID: {m.checkpoint_id}</span>
                    <span>•</span>
                    <span>Trained on: {m.training_samples_used} MD pairs</span>
                    <span>•</span>
                    <span>Final Loss: <span className="text-neon-400">{m.final_loss}</span></span>
                    <span>•</span>
                    <span>Size: {m.download_size_mb} MB</span>
                  </div>
                </div>

                {/* Benchmark Metrics & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* MedQA Score Badge */}
                  <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                      <Award className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold font-mono text-white">
                          {m.medqa_usmle_score_percent}%
                        </span>
                        <span className="text-[10px] font-mono text-neon-400 font-bold flex items-center">
                          +{delta}% <ArrowUpRight className="h-3 w-3" />
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase">
                        MedQA USMLE Benchmark
                      </span>
                    </div>
                  </div>

                  {/* Deploy Button */}
                  {m.is_active_in_production ? (
                    <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neon-500/20 border border-neon-500/40 text-neon-300 font-mono text-xs font-bold">
                      <CheckCircle2 className="h-4 w-4 text-neon-400" />
                      Live Serving Traffic
                    </div>
                  ) : (
                    <button
                      onClick={() => handleActivate(m.checkpoint_id)}
                      disabled={activatingId === m.checkpoint_id}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black/80 hover:bg-neon-500/20 text-zinc-300 hover:text-neon-300 border border-white/15 hover:border-neon-500/40 font-mono text-xs font-bold transition-all"
                    >
                      {activatingId === m.checkpoint_id ? (
                        <>
                          <Activity className="h-3.5 w-3.5 animate-spin text-neon-400" />
                          Activating...
                        </>
                      ) : (
                        <>
                          <Zap className="h-3.5 w-3.5 text-neon-400" />
                          1-Click Deploy
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
