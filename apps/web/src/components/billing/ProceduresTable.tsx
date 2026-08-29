'use client';
import { useState } from 'react';
import { CptCode } from '@/app/actions/billing';
import { FileSpreadsheet, Plus, Check, AlertCircle, DollarSign, Activity } from 'lucide-react';

interface ProceduresTableProps {
  procedures: CptCode[];
  onToggleModifier?: (cptCode: string, modifier: string) => void;
}

export function ProceduresTable({ procedures, onToggleModifier }: ProceduresTableProps) {
  const totalRVU = procedures.reduce((acc, p) => acc + p.total_rvu * p.units, 0);
  const totalFee = procedures.reduce((acc, p) => acc + p.standard_fee * p.units, 0);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-cyan-400" />
          <h3 className="font-bold text-white text-sm">CPT Procedure Charges & Modifiers</h3>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500 uppercase text-[10px] font-bold">Total RVU:</span>
            <span className="text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
              {totalRVU.toFixed(2)} wRVU
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500 uppercase text-[10px] font-bold">Total Expected:</span>
            <span className="text-neon-400 font-bold bg-neon-500/10 border border-neon-500/30 px-2.5 py-0.5 rounded">
              ${totalFee.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border border-white/5 rounded-2xl overflow-hidden">
          <thead className="bg-white/5 text-cyan-400 font-mono uppercase font-bold text-[11px]">
            <tr>
              <th className="p-3">CPT Code</th>
              <th className="p-3">Description</th>
              <th className="p-3">Units</th>
              <th className="p-3">RVU</th>
              <th className="p-3">Modifiers</th>
              <th className="p-3">Fee Schedule</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-black/40 text-zinc-300">
            {procedures.map((proc, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="p-3 font-mono font-bold text-white">
                  <span className="bg-white/10 px-2 py-1 rounded border border-white/10 text-cyan-300">
                    {proc.code}
                  </span>
                </td>
                <td className="p-3 font-medium text-zinc-200">
                  {proc.description}
                </td>
                <td className="p-3 font-mono text-zinc-400">
                  {proc.units}
                </td>
                <td className="p-3 font-mono text-cyan-300">
                  {proc.total_rvu.toFixed(2)}
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {proc.active_modifiers.map((mod, mIdx) => (
                      <span key={mIdx} className="bg-neon-500/20 text-neon-300 border border-neon-500/40 font-mono font-bold text-[10px] px-1.5 py-0.5 rounded">
                        -{mod}
                      </span>
                    ))}
                    {proc.recommended_modifiers.filter(m => !proc.active_modifiers.includes(m)).map((mod, mIdx) => (
                      <button
                        key={mIdx}
                        onClick={() => onToggleModifier?.(proc.code, mod)}
                        className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-mono font-bold text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5 transition-colors"
                      >
                        <Plus className="h-2.5 w-2.5" />
                        <span>-{mod}</span>
                      </button>
                    ))}
                  </div>
                </td>
                <td className="p-3 font-mono font-bold text-neon-400">
                  ${(proc.standard_fee * proc.units).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
