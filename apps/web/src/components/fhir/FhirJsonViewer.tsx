'use client';
import { useState } from 'react';
import { FileCode, Copy, Check, ShieldCheck } from 'lucide-react';

interface FhirJsonViewerProps {
  resource: Record<string, any> | null;
}

export function FhirJsonViewer({ resource }: FhirJsonViewerProps) {
  const [copied, setCopied] = useState(false);

  if (!resource) {
    return (
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-center text-xs text-zinc-500 font-mono h-[380px]">
        Select a FHIR resource to inspect raw JSON payload
      </div>
    );
  }

  const jsonString = JSON.stringify(resource, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 flex flex-col h-[380px]">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4 text-cyan-400" />
          <h4 className="text-xs font-bold text-white font-mono uppercase">
            {resource.resourceType}/{resource.id}
          </h4>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white rounded-xl transition-colors"
        >
          {copied ? <Check className="h-3 w-3 text-neon-400" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? 'Copied' : 'Copy JSON'}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-black/80 border border-white/5 rounded-2xl p-3 font-mono text-[11px] text-neon-300 leading-relaxed scrollbar-hide">
        <pre className="whitespace-pre-wrap">{jsonString}</pre>
      </div>
    </div>
  );
}
