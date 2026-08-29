'use client';
import { MdmEvaluation } from '@/app/actions/billing';
import { Scale, CheckCircle2, ShieldAlert, Cpu, Award } from 'lucide-react';

interface MdmLevelingMatrixProps {
  evaluation: MdmEvaluation;
}

const TIER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  HIGH: { bg: "bg-neon-500/20", text: "text-neon-300", border: "border-neon-500/40" },
  MODERATE: { bg: "bg-cyan-500/20", text: "text-cyan-300", border: "border-cyan-500/40" },
  LOW: { bg: "bg-amber-500/20", text: "text-amber-300", border: "border-amber-500/40" },
  MINIMAL: { bg: "bg-zinc-800", text: "text-zinc-400", border: "border-white/10" }
};

export function MdmLevelingMatrix({ evaluation }: MdmLevelingMatrixProps) {
  const elements = [
    {
      title: "1. Problems Addressed",
      score: evaluation.problems_addressed,
      subtitle: "Number & Complexity of Presenting Conditions"
    },
    {
      title: "2. Data Analyzed",
      score: evaluation.data_reviewed,
      subtitle: "Tests Ordered, Independent Interpretation, External Notes"
    },
    {
      title: "3. Management Risk",
      score: evaluation.management_risk,
      subtitle: "Parenteral Drugs, Inpatient Admission, Toxicity Risk"
    }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/80 to-black/95">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-neon-500/20 border border-neon-500/40 rounded-2xl">
            <Scale className="h-6 w-6 text-neon-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">AMA Medical Decision Making (MDM) Engine</h3>
              <span className="text-[10px] font-mono font-bold bg-neon-500/20 text-neon-300 border border-neon-500/30 px-2 py-0.5 rounded uppercase">
                2024 CPT MATRIX
              </span>
            </div>
            <p className="text-zinc-400 text-xs mt-0.5">Automated E/M leveling satisfying 2 of 3 CMS scoring criteria</p>
          </div>
        </div>

        {/* Calculated E/M Code Badge */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-zinc-500 font-bold block">Adjudicated E/M Code</span>
            <span className="text-lg font-mono font-bold text-neon-400">
              CPT {evaluation.recommended_em_code}
            </span>
          </div>
          <div className="h-9 w-9 rounded-2xl bg-neon-500/20 border border-neon-500/40 flex items-center justify-center text-neon-400 font-bold text-xs">
            HIGH
          </div>
        </div>
      </div>

      {/* 3-Tier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {elements.map((el, idx) => {
          const styling = TIER_COLORS[el.score.tier] || TIER_COLORS.LOW;

          return (
            <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-white">{el.title}</h4>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase border ${styling.bg} ${styling.text} ${styling.border}`}>
                    {el.score.tier}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 font-mono">{el.subtitle}</p>
                <p className="text-xs text-zinc-300 mt-2.5 leading-relaxed">{el.score.rationale}</p>
              </div>

              {/* Evidence Bullet Points */}
              <div className="pt-2 border-t border-white/5 space-y-1">
                {el.score.evidence_extracted.map((ev, eIdx) => (
                  <div key={eIdx} className="text-[11px] text-zinc-400 flex items-start gap-1.5 leading-tight">
                    <span className="text-neon-400 font-mono">›</span>
                    <span className="truncate">{ev}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rationale Footer */}
      <div className="p-3 bg-neon-500/5 border border-neon-500/20 rounded-2xl flex items-center justify-between text-xs text-zinc-300">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-neon-400" />
          <span><strong>Audit Defense Rule:</strong> 2 of 3 categories scored as HIGH MDM, securely defending CPT {evaluation.recommended_em_code} against payer downcoding audits.</span>
        </div>
        <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">{evaluation.time_based_alternative}</span>
      </div>
    </div>
  );
}
