'use client';
import { useState } from 'react';
import { ConsensusAdjudication } from '@/app/actions/council';
import { Award, Check, FileCheck, AlertOctagon, Activity, Pill, ShieldCheck, ArrowRight } from 'lucide-react';

interface ConsensusReportProps {
  consensus: ConsensusAdjudication;
  onApproveOrders?: () => void;
}

export function ConsensusReport({ consensus, onApproveOrders }: ConsensusReportProps) {
  const [signed, setSigned] = useState(false);

  const handleSign = () => {
    setSigned(true);
    onApproveOrders?.();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/80 to-black/95">
      {/* Glow header badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-neon-500/20 border border-neon-500/40 rounded-2xl">
            <Award className="h-6 w-6 text-neon-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">Adjudicated Clinical Consensus</h3>
              <span className="text-[10px] font-mono font-bold bg-neon-500/20 text-neon-300 border border-neon-500/30 px-2 py-0.5 rounded uppercase">
                {consensus.icd10_code}
              </span>
            </div>
            <p className="text-zinc-400 text-xs mt-0.5">Synthesized by {consensus.adjudicator_name}</p>
          </div>
        </div>

        {/* Confidence rating badge */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-zinc-500 font-semibold block">Consensus Confidence</span>
            <span className="text-lg font-bold font-mono text-neon-400">
              {(consensus.confidence_rating * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-8 w-8 rounded-full border-2 border-neon-400 flex items-center justify-center text-neon-400 font-bold text-xs">
            A+
          </div>
        </div>
      </div>

      {/* Primary Diagnosis & Differentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold tracking-wider">Primary Working Diagnosis</span>
          <p className="text-white text-sm font-semibold">{consensus.primary_diagnosis}</p>
          <p className="text-xs text-zinc-400">ICD-10 Categorization: <span className="text-neon-400 font-mono">{consensus.icd10_code}</span></p>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold tracking-wider">Differential Probabilities</span>
          <div className="space-y-1">
            {consensus.differential_diagnoses.map((diff, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-zinc-300">{diff.diagnosis}</span>
                <span className="font-mono text-neon-400 font-bold">{diff.probability}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agreed Action Protocol */}
      <div className="mb-6 space-y-2">
        <h4 className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-2">
          <Activity className="h-4 w-4 text-neon-400" />
          Consensus Care Protocol
        </h4>
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          {consensus.agreed_treatment_plan.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200">
              <span className="text-neon-400 font-mono font-bold mt-0.5">›</span>
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prescriptions Table */}
      <div className="mb-6 space-y-2">
        <h4 className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-2">
          <Pill className="h-4 w-4 text-cyan-400" />
          Ordered Pharmacotherapy (Renally Adjusted)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-white/5 rounded-2xl overflow-hidden">
            <thead className="bg-white/5 text-neon-400 font-mono uppercase font-bold">
              <tr>
                <th className="p-3">Medication</th>
                <th className="p-3">Dose</th>
                <th className="p-3">Route</th>
                <th className="p-3">Frequency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-black/40 text-zinc-300">
              {consensus.prescriptions.map((rx, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-semibold text-white">{rx.drug}</td>
                  <td className="p-3 font-mono text-neon-400">{rx.dose}</td>
                  <td className="p-3 text-zinc-400">{rx.route}</td>
                  <td className="p-3 text-zinc-300 font-mono">{rx.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Critical Contraindications Alert Box */}
      <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-2">
        <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
          <AlertOctagon className="h-4 w-4" />
          Safety Blacklist / Hard Contraindications
        </div>
        <ul className="space-y-1 text-xs text-red-200">
          {consensus.critical_contraindications.map((contra, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>{contra}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Attending Physician Sign-off Action Bar */}
      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-zinc-400 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Human-in-the-Loop Safeguard: Physician signature required prior to EHR commit.</span>
        </div>

        <button
          onClick={handleSign}
          disabled={signed}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
            signed
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
              : 'bg-neon-500 text-black hover:bg-neon-400 shadow-[0_0_20px_rgba(163,230,53,0.4)]'
          }`}
        >
          {signed ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Signed & Transmitted to EHR (SMART on FHIR)</span>
            </>
          ) : (
            <>
              <FileCheck className="h-4 w-4" />
              <span>Approve & Sign Orders</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
