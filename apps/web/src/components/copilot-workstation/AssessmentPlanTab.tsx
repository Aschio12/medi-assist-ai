'use client';
import { useState } from 'react';
import { FileText, Copy, Check, Send, ShieldCheck, Sparkles } from 'lucide-react';

interface AssessmentPlanTabProps {
  draftedNote: string;
  onCommitToEhr?: () => void;
}

export function AssessmentPlanTab({ draftedNote, onCommitToEhr }: AssessmentPlanTabProps) {
  const [copied, setCopied] = useState(false);
  const [committed, setCommitted] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(draftedNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommit = () => {
    setCommitted(true);
    onCommitToEhr?.();
    setTimeout(() => setCommitted(false), 3000);
  };

  return (
    <div className="space-y-4 text-xs flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-neon-400" />
            <h4 className="font-bold text-white text-sm">Drafted Assessment & Plan (SOAP)</h4>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Inpatient Progress Note</span>
        </div>

        {/* Note Body */}
        <div className="p-4 bg-black/60 border border-white/10 rounded-2xl my-3 font-mono text-[11px] text-zinc-200 leading-relaxed whitespace-pre-wrap">
          {draftedNote}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
        <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>SMART on FHIR Ready • Epic Hyperspace Compatible</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white rounded-xl transition-colors font-medium text-xs"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-neon-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleCommit}
            disabled={committed}
            className="flex items-center gap-2 px-4 py-2 bg-neon-500 text-black font-bold text-xs rounded-xl hover:bg-neon-400 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] disabled:opacity-50"
          >
            {committed ? <Check className="h-3.5 w-3.5" /> : <Send className="h-3.5 w-3.5" />}
            <span>{committed ? 'Committed to EHR!' : 'Sign & Commit to EHR'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
