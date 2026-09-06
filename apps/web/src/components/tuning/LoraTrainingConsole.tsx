'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Cpu, 
  Play, 
  TrendingDown, 
  CheckCircle, 
  Clock, 
  Zap, 
  RotateCw, 
  Activity, 
  Layers, 
  Sparkles,
  Flame,
  Info
} from 'lucide-react';
import { TrainingJobStatus, triggerLoraFineTuning } from '@/app/actions/tuning';

interface LoraTrainingConsoleProps {
  initialJob: TrainingJobStatus;
}

export function LoraTrainingConsole({ initialJob }: LoraTrainingConsoleProps) {
  const [job, setJob] = useState<TrainingJobStatus>(initialJob);
  const [rank, setRank] = useState<number>(16);
  const [alpha, setAlpha] = useState<number>(32);
  const [epochs, setEpochs] = useState<number>(3);
  const [learningRate, setLearningRate] = useState<number>(0.0002);
  const [isTriggering, setIsTriggering] = useState<boolean>(false);

  // Auto-simulate training progression if status is TRAINING
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (job.status === 'TRAINING' && job.progress_percent < 100) {
      interval = setInterval(() => {
        setJob((prev) => {
          const nextProgress = Math.min(100, prev.progress_percent + 15);
          const nextEpoch = Math.min(prev.total_epochs, Number((prev.current_epoch + 0.4).toFixed(1)));
          const nextLoss = Number(Math.max(0.48, prev.current_loss * 0.88).toFixed(3));
          
          if (nextProgress >= 100) {
            return {
              ...prev,
              status: 'COMPLETED',
              progress_percent: 100,
              current_epoch: prev.total_epochs,
              current_loss: 0.482,
              estimated_time_remaining_seconds: 0
            };
          }
          return {
            ...prev,
            progress_percent: nextProgress,
            current_epoch: nextEpoch,
            current_loss: nextLoss,
            estimated_time_remaining_seconds: Math.max(0, prev.estimated_time_remaining_seconds - 5)
          };
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [job.status, job.progress_percent]);

  const handleStartTraining = async () => {
    setIsTriggering(true);
    try {
      const res = await triggerLoraFineTuning({
        rank,
        loraAlpha: alpha,
        epochs,
        learningRate
      });
      setJob({
        ...res,
        status: 'TRAINING',
        progress_percent: 10,
        current_loss: 2.15,
        estimated_time_remaining_seconds: 45
      });
    } catch (err) {
      console.error('Trigger training error:', err);
    } finally {
      setIsTriggering(false);
    }
  };

  // Compute SVG coordinates for Loss Curve
  const maxLoss = 2.5;
  const minLoss = 0.3;
  const chartWidth = 560;
  const chartHeight = 160;

  const getCoordinates = (steps: typeof job.training_steps, isVal: boolean = false) => {
    if (!steps || steps.length === 0) return '';
    return steps.map((s, idx) => {
      const x = (idx / (steps.length - 1)) * chartWidth;
      const l = isVal ? s.val_loss : s.loss;
      const normalizedY = (l - minLoss) / (maxLoss - minLoss);
      const y = chartHeight - normalizedY * chartHeight;
      return `${idx === 0 ? 'M' : 'L'} ${x} ${Math.max(10, Math.min(chartHeight - 10, y))}`;
    }).join(' ');
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/85 to-black/95">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-neon-500/20 rounded-2xl border border-neon-500/30">
            <Sliders className="h-6 w-6 text-neon-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
              Automated LoRA Fine-Tuning Orchestrator
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase border ${
                job.status === 'TRAINING'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                  : 'bg-neon-500/20 text-neon-300 border-neon-500/40'
              }`}>
                {job.status}
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              PEFT LoRA Adapters • Target: <span className="text-neon-300 font-mono font-medium">{job.base_model}</span>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStartTraining}
          disabled={isTriggering || job.status === 'TRAINING'}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-50 font-mono"
        >
          {job.status === 'TRAINING' ? (
            <>
              <RotateCw className="h-4 w-4 animate-spin" />
              Tuning Epoch {job.current_epoch}/{job.total_epochs}...
            </>
          ) : isTriggering ? (
            <>
              <RotateCw className="h-4 w-4 animate-spin" />
              Initializing CUDA...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-black" />
              Trigger LoRA Fine-Tuning Run
            </>
          )}
        </button>
      </div>

      {/* Grid: Hyperparameters on Left, Live Loss Curves on Right */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hyperparameters Config Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-xs font-mono uppercase text-zinc-300 font-bold flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-cyan-400" />
                PEFT LoRA Hyperparameters
              </span>
              <span className="text-[10px] font-mono text-neon-400 font-bold">
                Target: All Linear Projections
              </span>
            </div>

            {/* Rank Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1">
                <span>LoRA Rank (r)</span>
                <span className="text-neon-400 font-bold">r = {rank}</span>
              </div>
              <input
                type="range"
                min={4}
                max={64}
                step={4}
                value={rank}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setRank(val);
                  setAlpha(val * 2); // Best practice alpha = 2 * r
                }}
                disabled={job.status === 'TRAINING'}
                className="w-full accent-neon-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>4 (Lightweight)</span>
                <span>16 (Optimal Clinical)</span>
                <span>64 (High Capacity)</span>
              </div>
            </div>

            {/* Alpha Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1">
                <span>LoRA Scaling Alpha (α)</span>
                <span className="text-cyan-400 font-bold">α = {alpha}</span>
              </div>
              <input
                type="range"
                min={8}
                max={128}
                step={8}
                value={alpha}
                onChange={(e) => setAlpha(Number(e.target.value))}
                disabled={job.status === 'TRAINING'}
                className="w-full accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>α = 2 × r rule</span>
                <span>Scale: {(alpha / rank).toFixed(1)}x</span>
              </div>
            </div>

            {/* Epochs & Learning Rate */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1">
                  Training Epochs
                </label>
                <select
                  value={epochs}
                  onChange={(e) => setEpochs(Number(e.target.value))}
                  disabled={job.status === 'TRAINING'}
                  className="w-full p-2 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-neon-400"
                >
                  <option value={1}>1 Epoch</option>
                  <option value={2}>2 Epochs</option>
                  <option value={3}>3 Epochs (Standard)</option>
                  <option value={5}>5 Epochs</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1">
                  Learning Rate
                </label>
                <select
                  value={learningRate}
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                  disabled={job.status === 'TRAINING'}
                  className="w-full p-2 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-neon-400"
                >
                  <option value={0.0001}>1e-4 (Conservative)</option>
                  <option value={0.0002}>2e-4 (Recommended)</option>
                  <option value={0.0005}>5e-4 (Aggressive)</option>
                </select>
              </div>
            </div>

            {/* Target Modules Badges */}
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1.5 font-bold">
                Injected Adapters
              </span>
              <div className="flex flex-wrap gap-1">
                {['q_proj', 'k_proj', 'v_proj', 'o_proj', 'gate_proj', 'up_proj', 'down_proj'].map((m) => (
                  <span
                    key={m}
                    className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/80 text-neon-400/90 border border-neon-500/20"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Training Execution & Loss Progression */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Status HUD cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                Current Loss
              </span>
              <div className="text-xl font-bold font-mono text-neon-400 mt-1 flex items-center gap-1.5">
                <TrendingDown className="h-4 w-4 text-neon-400" />
                {job.current_loss}
              </div>
              <span className="text-[10px] font-mono text-zinc-500">
                Initial: 2.41 → Min: 0.48
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                Epoch & Step
              </span>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-1">
                {job.current_epoch} / {job.total_epochs}
              </div>
              <span className="text-[10px] font-mono text-zinc-500">
                Step 300 / 300
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                Progress
              </span>
              <div className="text-xl font-bold font-mono text-white mt-1">
                {job.progress_percent}%
              </div>
              <span className="text-[10px] font-mono text-neon-300">
                {job.status === 'COMPLETED' ? 'Ready for Deployment' : 'GPU Active'}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
            <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Flame className={`h-3.5 w-3.5 ${job.status === 'TRAINING' ? 'text-amber-400 animate-bounce' : 'text-neon-400'}`} />
                Fine-Tuning Convergence Progress
              </span>
              <span className="text-neon-400 font-bold">{job.progress_percent}%</span>
            </div>
            <div className="h-2.5 w-full bg-black/80 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-neon-500 to-neon-400 transition-all duration-500 shadow-[0_0_15px_rgba(163,230,53,0.5)]"
                style={{ width: `${job.progress_percent}%` }}
              />
            </div>
          </div>

          {/* Dynamic Loss Curve SVG Chart */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-zinc-300 font-bold flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-neon-400" />
                Training Loss Curve (DPO Negative Log-Likelihood)
              </span>
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-neon-400">
                  <span className="h-2 w-2 rounded-full bg-neon-400 inline-block" /> Train Loss
                </span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 inline-block" /> Val Loss
                </span>
              </div>
            </div>

            {/* SVG Visualizer */}
            <div className="w-full h-36 bg-black/80 rounded-xl p-2 border border-white/5 relative overflow-hidden">
              <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                {/* Horizontal Grid lines */}
                <line x1="0" y1="40" x2={chartWidth} y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2={chartWidth} y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2={chartWidth} y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                {/* Val Loss Curve (Cyan) */}
                <path
                  d={getCoordinates(job.training_steps, true)}
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  className="transition-all duration-700"
                />

                {/* Train Loss Curve (Neon Green) */}
                <path
                  d={getCoordinates(job.training_steps, false)}
                  fill="none"
                  stroke="#a3e635"
                  strokeWidth="2.5"
                  className="transition-all duration-700 shadow-[0_0_10px_rgba(163,230,53,0.5)]"
                />

                {/* End Point circles */}
                {job.training_steps && job.training_steps.length > 0 && (
                  <circle
                    cx={chartWidth}
                    cy={Math.max(10, Math.min(chartHeight - 10, chartHeight - ((job.current_loss - minLoss) / (maxLoss - minLoss)) * chartHeight))}
                    r="4"
                    fill="#a3e635"
                    className="animate-ping"
                  />
                )}
              </svg>

              <div className="absolute bottom-1 right-2 text-[9px] font-mono text-zinc-500">
                Step 300: Loss = {job.current_loss}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
