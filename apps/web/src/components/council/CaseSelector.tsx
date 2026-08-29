'use client';
import { User, Activity, AlertCircle, RefreshCw, FileText } from 'lucide-react';

export interface CaseOption {
  id: string;
  name: string;
  age: number;
  gender: string;
  category: string;
  summary: string;
  vitalsShort: string;
  severity: "CRITICAL" | "HIGH" | "MODERATE";
}

const PRESET_CASES: CaseOption[] = [
  {
    id: "case-sepsis-aki-01",
    name: "Robert Chen (Ward 3B)",
    age: 68,
    gender: "Male",
    category: "Severe Sepsis + AKI + Penicillin Anaphylaxis",
    summary: "Fever 38.9°C, BP 88/54, Creatinine 2.4 (baseline 1.0), Lactate 3.4. History of Penicillin anaphylaxis.",
    vitalsShort: "HR 118 | BP 88/54 | RR 26 | SpO2 91%",
    severity: "CRITICAL"
  },
  {
    id: "case-acs-gib-02",
    name: "Eleanor Vance (ICU-2)",
    age: 74,
    gender: "Female",
    category: "NSTEMI + Acute GI Bleeding on Apixaban",
    summary: "Crushing chest pain, Troponin 2.84, Melena stool, Hgb 8.1. Anticoagulation vs bleeding challenge.",
    vitalsShort: "HR 104 | BP 102/68 | RR 20 | SpO2 95%",
    severity: "CRITICAL"
  },
  {
    id: "case-delirium-polypharm-03",
    name: "Harold Jenkins (Geriatrics)",
    age: 82,
    gender: "Male",
    category: "Anticholinergic Toxicity + Geriatric Delirium",
    summary: "Visual hallucinations, acute urinary retention, OTC Diphenhydramine + Oxybutynin polypharmacy with UTI.",
    vitalsShort: "HR 62 | BP 142/86 | RR 16 | Temp 37.1°C",
    severity: "HIGH"
  }
];

interface CaseSelectorProps {
  selectedCaseId: string;
  onSelectCase: (caseId: string) => void;
  isDebating: boolean;
  onTriggerDebate: () => void;
}

export function CaseSelector({
  selectedCaseId,
  onSelectCase,
  isDebating,
  onTriggerDebate
}: CaseSelectorProps) {
  const current = PRESET_CASES.find(c => c.id === selectedCaseId) || PRESET_CASES[0];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-neon-400" />
            <h3 className="font-semibold text-white text-base">Active Clinical Case</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
              {current.severity} RISK
            </span>
          </div>
          <p className="text-zinc-400 text-xs mt-1">Select patient presentation for Multi-Agent Council deliberation</p>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={selectedCaseId}
            onChange={(e) => onSelectCase(e.target.value)}
            disabled={isDebating}
            className="bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-neon-500/50 transition-colors"
          >
            {PRESET_CASES.map((c) => (
              <option key={c.id} value={c.id} className="bg-zinc-900 text-white">
                {c.name} - {c.category}
              </option>
            ))}
          </select>

          <button
            onClick={onTriggerDebate}
            disabled={isDebating}
            className="flex items-center gap-2 px-5 py-2 bg-neon-500 text-black font-bold text-sm rounded-xl hover:bg-neon-400 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isDebating ? 'animate-spin' : ''}`} />
            {isDebating ? 'Deliberating Council...' : 'Convene Council'}
          </button>
        </div>
      </div>

      {/* Case Details Card */}
      <div className="bg-black/40 rounded-2xl p-4 border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono text-zinc-500 font-semibold tracking-wider">Patient Demographics</span>
          <p className="text-white text-sm font-medium">{current.name}, {current.age}y {current.gender}</p>
          <p className="text-zinc-400 text-xs">{current.category}</p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono text-zinc-500 font-semibold tracking-wider">Presenting Vitals</span>
          <p className="text-neon-400 font-mono text-xs font-semibold">{current.vitalsShort}</p>
          <p className="text-zinc-500 text-[11px]">Continuous telemetry streaming active</p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono text-zinc-500 font-semibold tracking-wider">Clinical Synopsis</span>
          <p className="text-zinc-300 text-xs leading-relaxed line-clamp-2">{current.summary}</p>
        </div>
      </div>
    </div>
  );
}
