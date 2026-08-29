'use client';
import { Icd10Code } from '@/app/actions/billing';
import { Tag, TrendingUp, Check, Bookmark, FileCheck } from 'lucide-react';

interface DiagnosesTableProps {
  diagnoses: Icd10Code[];
}

export function DiagnosesTable({ diagnoses }: DiagnosesTableProps) {
  const totalHcc = diagnoses.reduce((acc, d) => acc + (d.hcc_weight || 0), 0);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-neon-400" />
          <h3 className="font-bold text-white text-sm">Autonomous ICD-10-CM Diagnoses</h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-zinc-500 uppercase text-[10px] font-bold">Total HCC RAF Weight:</span>
          <span className="text-neon-400 font-bold bg-neon-500/10 border border-neon-500/30 px-2 py-0.5 rounded">
            +{totalHcc.toFixed(3)}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border border-white/5 rounded-2xl overflow-hidden">
          <thead className="bg-white/5 text-neon-400 font-mono uppercase font-bold text-[11px]">
            <tr>
              <th className="p-3">ICD-10</th>
              <th className="p-3">Clinical Description</th>
              <th className="p-3">Category</th>
              <th className="p-3">HCC RAF</th>
              <th className="p-3">Citation / Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-black/40 text-zinc-300">
            {diagnoses.map((diag, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="p-3 font-mono font-bold text-white">
                  <span className="bg-white/10 px-2 py-1 rounded border border-white/10 text-neon-300">
                    {diag.code}
                  </span>
                </td>
                <td className="p-3 font-semibold text-zinc-200">
                  {diag.description}
                </td>
                <td className="p-3">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    diag.category === 'PRIMARY'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    {diag.category}
                  </span>
                </td>
                <td className="p-3 font-mono text-xs">
                  {diag.hcc_category ? (
                    <span className="text-amber-300 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      {diag.hcc_category} (+{diag.hcc_weight})
                    </span>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </td>
                <td className="p-3 text-zinc-400 text-[11px] max-w-[280px] leading-tight">
                  {diag.documentation_citation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
