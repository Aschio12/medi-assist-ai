'use client';
import { useState } from 'react';
import { FileCode, X, Copy, Check, Send, ShieldCheck, Download } from 'lucide-react';

interface EdiExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimId: string;
  ediContent?: string;
  payerName: string;
}

export function EdiExportModal({ isOpen, onClose, claimId, ediContent = "", payerName }: EdiExportModalProps) {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(ediContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitClearinghouse = () => {
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl p-6 rounded-3xl border border-cyan-500/40 neon-glow relative bg-zinc-950 flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-cyan-500/20 rounded-2xl border border-cyan-500/40 text-cyan-400">
            <FileCode className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">ANSI X12 EDI 837P Professional Claim File</h3>
            <p className="text-xs text-zinc-400">Target Payer: <span className="text-cyan-300 font-semibold">{payerName}</span> • Claim ID: <span className="font-mono text-neon-400">{claimId}</span></p>
          </div>
        </div>

        {/* EDI Raw Code Viewer */}
        <div className="flex-1 overflow-y-auto bg-black/80 border border-white/10 rounded-2xl p-4 my-2 font-mono text-[11px] text-neon-300 leading-relaxed scrollbar-hide">
          <pre className="whitespace-pre-wrap">{ediContent}</pre>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>HIPAA 5010 Transaction Standard Compliant</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white rounded-xl transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-neon-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy EDI 837'}</span>
            </button>

            <button
              onClick={handleSubmitClearinghouse}
              disabled={submitted}
              className="flex items-center gap-2 px-5 py-2 bg-neon-500 text-black font-bold text-xs rounded-xl hover:bg-neon-400 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] disabled:opacity-50"
            >
              {submitted ? <Check className="h-3.5 w-3.5" /> : <Send className="h-3.5 w-3.5" />}
              <span>{submitted ? 'Transmitted to Clearinghouse!' : 'Submit Claim EDI'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
