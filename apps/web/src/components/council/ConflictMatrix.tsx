'use client';
import { ConflictItem } from '@/app/actions/council';
import { AlertCircle, CheckCircle, ShieldAlert, GitMerge } from 'lucide-react';

interface ConflictMatrixProps {
  conflicts: ConflictItem[];
}

export function ConflictMatrix({ conflicts }: ConflictMatrixProps) {
  if (!conflicts || conflicts.length === 0) {
    return (
      <div className="glass-panel p-6 rounded-3xl border border-white/10 text-center">
        <CheckCircle className="h-8 w-8 text-neon-400 mx-auto mb-2" />
        <h4 className="text-white font-semibold text-sm">Full Committee Consensus</h4>
        <p className="text-zinc-400 text-xs mt-1">Zero medical disagreements detected across specialist agents.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <GitMerge className="h-5 w-5 text-amber-400" />
          <h3 className="font-semibold text-white text-sm">Conflict Resolution Matrix</h3>
        </div>
        <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-bold">
          {conflicts.length} Reconciliations
        </span>
      </div>

      <div className="space-y-3">
        {conflicts.map((item) => (
          <div key={item.id} className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">{item.topic}</h4>
              </div>
              <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {item.resolution_status}
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">{item.description}</p>

            {item.resolution_notes && (
              <div className="mt-2 pt-2 border-t border-white/5 flex items-start gap-2 text-xs text-neon-300 bg-neon-500/5 p-2 rounded-xl border border-neon-500/20">
                <span className="font-bold font-mono text-[10px] uppercase text-neon-400">CMO Ruling:</span>
                <span>{item.resolution_notes}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
