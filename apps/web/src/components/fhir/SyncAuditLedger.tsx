'use client';
import { SyncAuditLog } from '@/app/actions/fhir';
import { ShieldCheck, ArrowRightLeft, Clock, CheckCircle2 } from 'lucide-react';

interface SyncAuditLedgerProps {
  logs: SyncAuditLog[];
}

export function SyncAuditLedger({ logs }: SyncAuditLedgerProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-neon-400" />
          <h3 className="font-bold text-white text-sm">FHIR Sync Transaction Audit Ledger</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase">{logs.length} Transactions</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border border-white/5 rounded-2xl overflow-hidden">
          <thead className="bg-white/5 text-neon-400 font-mono uppercase font-bold text-[11px]">
            <tr>
              <th className="p-3">Action</th>
              <th className="p-3">Resource Type</th>
              <th className="p-3">Target EHR</th>
              <th className="p-3">Status</th>
              <th className="p-3">Latency</th>
              <th className="p-3">SHA-256 Hash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-black/40 text-zinc-300">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-white/5 transition-colors">
                <td className="p-3 font-mono font-bold text-white">
                  <span className="bg-white/10 px-2 py-1 rounded text-cyan-300">
                    {log.action}
                  </span>
                </td>
                <td className="p-3 font-medium text-zinc-200">
                  {log.resource_type}
                </td>
                <td className="p-3 text-zinc-400">
                  {log.target}
                </td>
                <td className="p-3 font-mono">
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px]">
                    HTTP {log.http_status} OK
                  </span>
                </td>
                <td className="p-3 font-mono text-zinc-400">
                  {log.latency_ms}ms
                </td>
                <td className="p-3 font-mono text-[10px] text-zinc-500 truncate max-w-[140px]">
                  {log.hash}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
