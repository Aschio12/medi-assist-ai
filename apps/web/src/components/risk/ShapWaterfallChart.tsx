'use client';
import { ShapFeatureContribution } from '@/app/actions/risk_stratification';
import { Sparkles, TrendingUp, TrendingDown, HelpCircle, Activity } from 'lucide-react';

interface ShapWaterfallChartProps {
  shapFeatures: ShapFeatureContribution[];
  baseRate: number;
  finalRisk: number;
}

export function ShapWaterfallChart({ shapFeatures, baseRate, finalRisk }: ShapWaterfallChartProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-cyan-400" />
          <h3 className="font-bold text-white text-sm">
            TreeSHAP Feature Attribution & Waterfall Breakdown
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
          <span>Base Rate: <strong className="text-zinc-200">{baseRate}%</strong></span>
          <span>➔</span>
          <span>Final Risk: <strong className="text-red-400">{finalRisk}%</strong></span>
        </div>
      </div>

      <p className="text-xs text-zinc-400 leading-relaxed">
        Local Shapley values (φ) quantify each individual clinical factor's contribution toward elevating or mitigating the patient's 30-day readmission risk above the baseline population.
      </p>

      {/* Waterfall Bars */}
      <div className="space-y-3 pt-2">
        {shapFeatures.map((feat, idx) => {
          const isRiskRaiser = feat.direction === 'INCREASES_RISK';
          const pctWidth = Math.min(Math.abs(feat.shap_value) * 320, 100);

          return (
            <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div className="flex items-center gap-2">
                  {isRiskRaiser ? (
                    <TrendingUp className="h-4 w-4 text-red-400 shrink-0" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-cyan-400 shrink-0" />
                  )}
                  <span className="font-bold text-white">{feat.display_label}</span>
                  <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                    {feat.feature_value}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] shrink-0">
                  <span className={isRiskRaiser ? "text-red-400 font-bold" : "text-cyan-400 font-bold"}>
                    {isRiskRaiser ? `+${(feat.shap_value * 100).toFixed(1)}%` : `${(feat.shap_value * 100).toFixed(1)}%`}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-zinc-500">
                    {isRiskRaiser ? 'Elevates Risk' : 'Mitigates Risk'}
                  </span>
                </div>
              </div>

              {/* Graphical Impact Bar */}
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex items-center">
                <div
                  style={{ width: `${pctWidth}%` }}
                  className={`h-full rounded-full transition-all duration-700 ${
                    isRiskRaiser
                      ? 'bg-gradient-to-r from-red-500 to-amber-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                      : 'bg-gradient-to-r from-cyan-500 to-neon-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                  }`}
                />
              </div>

              {/* Clinical Rationale */}
              <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">
                {feat.clinical_rationale}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
