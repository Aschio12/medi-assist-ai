'use client';
import { useState } from 'react';
import { SWMMessage } from '@/app/actions/ehr_sync';
import { MessageSquareCode, Send, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';

interface SmartWebMessagingConsoleProps {
  onInjectDraft: (draftText: string) => Promise<SWMMessage>;
}

export function SmartWebMessagingConsole({ onInjectDraft }: SmartWebMessagingConsoleProps) {
  const [draftContent, setDraftContent] = useState<string>(
    "### ASSESSMENT & PLAN\n" +
    "1. **Severe Sepsis secondary to RLL Pneumonia (ICD-10 R65.20)**\n" +
    "   - qSOFA 3, Lactate 3.4 mmol/L, BP 88/54.\n" +
    "   - Administer 2000 mL Plasmalyte balanced crystalloid bolus.\n" +
    "   - Initiate IV Aztreonam 1g q8h + Doxycycline 100mg (Penicillin allergy safe).\n\n" +
    "2. **Acute Kidney Injury Stage 2 (ICD-10 N17.9)**\n" +
    "   - Baseline Cr 1.1 -> 2.4 mg/dL secondary to septic hypoperfusion.\n" +
    "   - Suspend Metformin and Lisinopril for nephroprotection.\n" +
    "   - Strict I&O monitoring, recheck BMP in 6 hours."
  );
  const [swmLog, setSwmLog] = useState<SWMMessage | null>(null);
  const [isInjecting, setIsInjecting] = useState(false);

  const handleInject = async () => {
    setIsInjecting(true);
    const res = await onInjectDraft(draftContent);
    setSwmLog(res);
    setIsInjecting(false);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <MessageSquareCode className="h-5 w-5 text-cyan-400" />
          <h3 className="font-bold text-white text-sm">SMART Web Messaging (SWM postMessage Bridge)</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Epic Scratchpad v1</span>
      </div>

      <p className="text-xs text-zinc-400 leading-relaxed">
        Directly stream AI-generated clinical documentation drafts into Epic Hyperspace's note editor scratchpad via HTML5 postMessage envelopes.
      </p>

      {/* Editor & Inject Button */}
      <div className="space-y-2">
        <textarea
          rows={6}
          value={draftContent}
          onChange={e => setDraftContent(e.target.value)}
          className="w-full bg-black/80 border border-white/15 rounded-2xl p-4 font-mono text-xs text-zinc-200 focus:outline-none focus:border-cyan-500/50 leading-relaxed scrollbar-hide"
        />

        <button
          onClick={handleInject}
          disabled={isInjecting}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-cyan-500 text-black font-bold text-xs rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
          <span>{isInjecting ? 'Injecting into Epic Scratchpad...' : 'Inject Draft into Epic Hyperspace (scratchpad.update)'}</span>
        </button>
      </div>

      {/* SWM postMessage Event Log */}
      {swmLog && (
        <div className="p-3 bg-black/60 border border-cyan-500/30 rounded-2xl space-y-1.5 font-mono text-[10px] text-cyan-300">
          <div className="flex items-center justify-between">
            <span className="font-bold">postMessage Payload Transmitted</span>
            <span className="text-emerald-400 font-bold">STATUS: {swmLog.status}</span>
          </div>
          <p className="text-zinc-400 truncate">Target: {swmLog.targetIframe} • Action: {swmLog.action} • MsgID: {swmLog.messageId}</p>
        </div>
      )}
    </div>
  );
}
