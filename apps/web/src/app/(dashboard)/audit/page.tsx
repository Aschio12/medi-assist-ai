import { Shield } from 'lucide-react';

export default function AuditLogsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
            <Shield className="h-6 w-6 text-neon-400" />
            Immutable Audit Logs
          </h1>
          <p className="text-zinc-400 text-sm mt-2">HIPAA compliant WORM (Write-Once-Read-Many) access logs for PHI redaction events.</p>
        </div>
        <button className="px-4 py-2 bg-white/5 border border-white/10 text-zinc-300 rounded-xl hover:bg-white/10 transition-colors">
          Export CSV
        </button>
      </div>

      <div className="glass-panel rounded-3xl p-6">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-zinc-500 border-b border-white/5 uppercase tracking-widest">
            <tr>
              <th className="pb-4 font-semibold">Timestamp</th>
              <th className="pb-4 font-semibold">Event Type</th>
              <th className="pb-4 font-semibold">Source IP</th>
              <th className="pb-4 font-semibold text-right">Items Redacted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/5 transition-colors group">
              <td className="py-5 text-zinc-300 font-mono text-xs">2026-08-21T12:05:32Z</td>
              <td className="py-5 font-medium text-neon-400">PHI_REDACTION</td>
              <td className="py-5 text-zinc-400 font-mono text-xs">10.0.4.15</td>
              <td className="py-5 text-right font-bold text-white">3</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors group">
              <td className="py-5 text-zinc-300 font-mono text-xs">2026-08-21T11:45:10Z</td>
              <td className="py-5 font-medium text-neon-400">PHI_REDACTION</td>
              <td className="py-5 text-zinc-400 font-mono text-xs">10.0.4.12</td>
              <td className="py-5 text-right font-bold text-white">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
