'use client';
import { useState } from 'react';
import { RadiologyReport } from '@/app/actions/vision';
import { FileText, AlertTriangle, Check, Copy, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface RadiologyReportPanelProps {
  report: RadiologyReport;
  onInsertNote?: () => void;
}

export function RadiologyReportPanel({ report, onInsertNote }: RadiologyReportPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `RADIOLOGY REPORT\nTechnique: ${report.technique}\nFindings:\n${report.findings.join('\n')}\nImpression:\n${report.impression.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onInsertNote?.();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-500/20 border border-neon-500/30 rounded-xl">
              <FileText className="h-5 w-5 text-neon-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">AI-Assisted Radiology Report</h3>
              <p className="text-zinc-400 text-xs mt-0.5">{report.modality} Evaluation</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Vision AI Match</span>
            <span className="text-xs font-mono font-bold text-neon-400">
              {(report.ai_confidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Critical Alert Warning Banner if applicable */}
        {report.critical_alert && (
          <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-red-300">
            <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-400 uppercase font-mono tracking-wider block text-[10px]">Critical Radiologic Alert</strong>
              <span>{report.actionable_recommendation}</span>
            </div>
          </div>
        )}

        {/* Clinical Indication */}
        <div className="mb-4 p-3 bg-black/40 border border-white/5 rounded-2xl">
          <span className="text-[10px] uppercase font-mono text-zinc-500 font-bold block mb-1">Clinical Indication</span>
          <p className="text-xs text-zinc-200">{report.clinical_indication}</p>
        </div>

        {/* Findings */}
        <div className="mb-4 space-y-2">
          <span className="text-[10px] uppercase font-mono text-zinc-400 font-bold tracking-wider block">Detailed Radiologic Findings</span>
          <div className="p-3 bg-black/40 border border-white/5 rounded-2xl space-y-1.5">
            {report.findings.map((finding, idx) => (
              <div key={idx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                <span className="text-neon-400 font-mono">›</span>
                <span>{finding}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Impression (The Core Diagnosis) */}
        <div className="mb-4 space-y-2">
          <span className="text-[10px] uppercase font-mono text-neon-400 font-bold tracking-wider block">Impression</span>
          <div className="p-3.5 bg-neon-500/5 border border-neon-500/20 rounded-2xl space-y-2">
            {report.impression.map((imp, idx) => (
              <p key={idx} className="text-xs font-medium text-white leading-relaxed">
                {imp}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
        <div className="text-[10px] text-zinc-500 flex items-center gap-1.5 font-mono">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Preliminary AI Draft • Requires Radiologist Attestation</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-neon-500 text-black font-bold text-xs rounded-xl hover:bg-neon-400 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)]"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied to Clipboard' : 'Insert into EHR Note'}</span>
        </button>
      </div>
    </div>
  );
}
