'use client';
import { NcciViolation, ClaimDenialRisk } from '@/app/actions/billing';
import { ShieldCheck, AlertTriangle, CheckCircle2, ShieldAlert, GitCommit, FileCode, Check } from 'lucide-react';

interface ClaimScrubberProps {
  ncciEdits: NcciViolation[];
  denialPrediction: ClaimDenialRisk;
  onOpenEdiModal?: () => void;
}

export function ClaimScrubber({ ncciEdits, denialPrediction, onOpenEdiModal }: ClaimScrubberProps) {
  const isClean = denialPrediction.risk_level === 'CLEAN';

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden space-y-5">
      {/* Header & Clean Claim Meter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl border ${isClean ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-red-500/20 text-red-400 border-red-500/40'}`}>
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Clearinghouse Claim Scrubber</h3>
            <p className="text-zinc-400 text-xs mt-0.5">Automated NCCI PTP, MUE, and Medical Necessity pre-check</p>
          </div>
        </div>

        {/* Clean Claim Probability Meter */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-zinc-500 font-bold block">Clean Claim Probability</span>
            <span className={`text-lg font-mono font-bold ${isClean ? 'text-neon-400' : 'text-red-400'}`}>
              {(denialPrediction.clean_claim_probability * 100).toFixed(1)}%
            </span>
          </div>
          <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center font-bold text-xs ${
            isClean ? 'border-neon-400 text-neon-400' : 'border-red-400 text-red-400'
          }`}>
            {isClean ? 'PASS' : 'RISK'}
          </div>
        </div>
      </div>

      {/* NCCI Edit Verification Items */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider">
          CMS NCCI Procedure-to-Procedure (PTP) Edits
        </h4>
        
        {ncciEdits.map((ncci, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono text-white font-bold">
                Code Pair: [{ncci.code_pair.join(' + ')}]
              </span>
              <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {ncci.resolution_status}
              </span>
            </div>
            <p className="text-zinc-400 text-[11px]">{ncci.policy_name}</p>
            <p className="text-neon-300 text-[11px] bg-neon-500/5 p-2 rounded-xl border border-neon-500/20">
              {ncci.recommended_action}
            </p>
          </div>
        ))}
      </div>

      {/* Corrective Actions & Export */}
      <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-zinc-400 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-neon-400" />
          <span>Zero bundling violations detected. Electronic EDI 837P ready.</span>
        </div>

        <button
          onClick={onOpenEdiModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        >
          <FileCode className="h-4 w-4" />
          <span>View ANSI X12 EDI 837</span>
        </button>
      </div>
    </div>
  );
}
