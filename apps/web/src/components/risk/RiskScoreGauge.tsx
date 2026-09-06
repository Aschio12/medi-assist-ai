'use client';
import { RiskPrediction } from '@/app/actions/risk_stratification';
import { Gauge, AlertTriangle, ShieldAlert, TrendingUp, DollarSign, Award } from 'lucide-react';

interface RiskScoreGaugeProps {
  prediction: RiskPrediction;
}

export function RiskScoreGauge({ prediction }: RiskScoreGaugeProps) {
  const isCritical = prediction.readmission_risk_percent >= 70.0;
  const isElevated = prediction.readmission_risk_percent >= 50.0;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/80 to-black/95">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Score Gauge & Risk Badge */}
        <div className="flex items-center gap-5">
          {/* Circular Glowing HUD */}
          <div className="relative flex items-center justify-center h-28 w-28 shrink-0">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-white/10"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className={isCritical ? "stroke-red-500" : isElevated ? "stroke-amber-400" : "stroke-neon-500"}
                strokeWidth="10"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * prediction.readmission_risk_percent) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold font-mono text-white">
                {prediction.readmission_risk_percent}%
              </span>
              <span className="text-[9px] font-mono uppercase text-zinc-400 font-bold">
                30D Risk
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full uppercase border ${
                isCritical
                  ? 'bg-red-500/20 text-red-300 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}>
                {prediction.risk_tier.replace('_', ' ')}
              </span>
              <span className="text-[11px] font-mono text-zinc-500">
                Baseline Population: {prediction.base_population_rate}%
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide mt-1.5">
              30-Day Hospital Readmission Risk
            </h2>
            <p className="text-zinc-400 text-xs mt-0.5 max-w-xl leading-relaxed">
              XGBoost ensemble model calibrated on 24 clinical features (AUC 0.884) predicting unbudgeted all-cause readmissions under CMS HRRP guidelines.
            </p>
          </div>
        </div>

        {/* Right: Traditional Benchmark Scores vs Estimated Penalty */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
          {/* LACE Score */}
          <div className="p-3 bg-black/60 border border-white/10 rounded-2xl">
            <span className="text-[9px] uppercase font-mono text-zinc-500 font-bold block">LACE Index</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-bold font-mono text-amber-400">{prediction.lace_score.total_score}</span>
              <span className="text-[10px] text-zinc-500 font-mono">/ 19</span>
            </div>
            <span className="text-[10px] text-amber-300/80 font-mono font-bold block mt-0.5">High Risk Tier</span>
          </div>

          {/* HOSPITAL Score */}
          <div className="p-3 bg-black/60 border border-white/10 rounded-2xl">
            <span className="text-[9px] uppercase font-mono text-zinc-500 font-bold block">HOSPITAL Score</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-bold font-mono text-amber-400">{prediction.hospital_score.total_score}</span>
              <span className="text-[10px] text-zinc-500 font-mono">/ 13+</span>
            </div>
            <span className="text-[10px] text-amber-300/80 font-mono font-bold block mt-0.5">High Risk Tier</span>
          </div>

          {/* CMS HRRP Penalty Impact */}
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl">
            <span className="text-[9px] uppercase font-mono text-red-400 font-bold block flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              <span>CMS Penalty Risk</span>
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-bold font-mono text-white">
                ${prediction.estimated_cms_hrrp_penalty_cost.toLocaleString()}
              </span>
            </div>
            <span className="text-[10px] text-red-300/80 font-mono block mt-0.5">Avoidable Outflow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
