'use client';
import { User, Building, Calendar, DollarSign, Activity, FileText } from 'lucide-react';

interface ClaimSelectorProps {
  currentClaimId: string;
  onSelectClaim: (id: string) => void;
}

const ENCOUNTER_CLAIMS = [
  {
    id: "CLM-SEP-98421",
    patientName: "Robert Chen",
    patientId: "PAT-98421",
    dos: "2026-08-28",
    encounterType: "Inpatient Hospital (POS 21)",
    payer: "Blue Cross Medicare Advantage",
    fee: "$606.05",
    rvu: "15.16 wRVU",
    statusBadge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    statusText: "SCRUBBED & CLEAN (98.6%)"
  },
  {
    id: "CLM-OUT-10294",
    patientName: "James Wilson",
    patientId: "PAT-10294",
    dos: "2026-08-27",
    encounterType: "Office / Outpatient (POS 11)",
    payer: "Aetna Commercial Choice POS",
    fee: "$194.00",
    rvu: "4.85 wRVU",
    statusBadge: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    statusText: "PRIOR AUTH VERIFIED (99.2%)"
  }
];

export function ClaimSelector({ currentClaimId, onSelectClaim }: ClaimSelectorProps) {
  return (
    <div className="glass-panel p-4 rounded-3xl border border-white/10 flex flex-col gap-3">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-neon-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Clinical Encounter Claims Queue</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase">{ENCOUNTER_CLAIMS.length} Active Encounters</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ENCOUNTER_CLAIMS.map((claim) => {
          const isSelected = currentClaimId === claim.id;

          return (
            <div
              key={claim.id}
              onClick={() => onSelectClaim(claim.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-neon-500/10 border-neon-500/40 shadow-[0_0_15px_rgba(163,230,53,0.15)] scale-[1.01]'
                  : 'bg-black/40 border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-xs font-bold text-white">{claim.patientName}</h4>
                  <p className="text-[10px] font-mono text-zinc-400">{claim.encounterType}</p>
                </div>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${claim.statusBadge}`}>
                  {claim.statusText}
                </span>
              </div>

              <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-400">{claim.payer}</span>
                <span className="text-neon-400 font-bold">{claim.fee} ({claim.rvu})</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
