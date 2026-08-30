'use client';
import { useState } from 'react';
import { SDCQuestionnaire } from '@/app/actions/ehr_sync';
import { FileSpreadsheet, Sparkles, CheckCircle2, RefreshCw, Layers } from 'lucide-react';

interface SdcFormPopulatorProps {
  questionnaire: SDCQuestionnaire;
  onSelectTemplate: (templateId: string) => void;
  onPopulateFromEhr: () => void;
  isPopulating: boolean;
}

export function SdcFormPopulator({
  questionnaire,
  onSelectTemplate,
  onPopulateFromEhr,
  isPopulating
}: SdcFormPopulatorProps) {
  const templates = [
    { id: 'sep-1-core-measure', label: 'CMS SEP-1 Sepsis Bundle Compliance' },
    { id: 'inpatient-intake-form', label: 'Inpatient Clinical Admission Assessment' }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      {/* Header & Template Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-neon-400" />
          <h3 className="font-bold text-white text-sm">FHIR SDC Questionnaire ($populate Engine)</h3>
        </div>

        {/* Template Selector */}
        <div className="flex flex-wrap gap-1.5">
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => onSelectTemplate(t.id)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all ${
                questionnaire.id === t.id
                  ? 'bg-neon-500 text-black shadow-[0_0_10px_rgba(163,230,53,0.3)]'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-Populate Button */}
      <div className="p-3 bg-neon-500/10 border border-neon-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-white">{questionnaire.title}</h4>
          <p className="text-[11px] text-zinc-400 mt-0.5">Pre-fill questionnaire answers from EHR FHIR Observations and Ambient transcripts.</p>
        </div>

        <button
          onClick={onPopulateFromEhr}
          disabled={isPopulating}
          className="flex items-center gap-1.5 px-4 py-2 bg-neon-500 text-black font-bold text-xs rounded-xl hover:bg-neon-400 transition-all shadow-[0_0_10px_rgba(163,230,53,0.3)] shrink-0 disabled:opacity-50"
        >
          {isPopulating ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
          <span>{isPopulating ? 'Populating...' : 'Execute $populate from EHR'}</span>
        </button>
      </div>

      {/* Populated Questions Grid */}
      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-hide">
        {questionnaire.items.map((item) => (
          <div key={item.linkId} className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-500 font-bold">Item {item.linkId}</span>
              <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                AI Confidence: {Math.round(item.confidence * 100)}%
              </span>
            </div>

            <p className="font-semibold text-zinc-200">{item.text}</p>

            <div className="p-2 bg-white/5 rounded-xl border border-white/5 text-neon-300 font-medium">
              Answer: <strong>{String(item.answer)}</strong>
            </div>

            <p className="text-[10px] font-mono text-zinc-400">
              Evidence: <span className="text-zinc-300">{item.sourceEvidence}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
