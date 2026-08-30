'use client';
import { ActionChip } from '@/app/actions/physician_copilot';
import { Zap, FlaskConical, Droplet, ShieldAlert, Pill, FileText, Check } from 'lucide-react';

interface ActionChipsTrayProps {
  actionChips: ActionChip[];
  onExecuteAction: (action: ActionChip) => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  ORDER: { bg: "bg-cyan-500/10", text: "text-cyan-300", border: "border-cyan-500/30 hover:border-cyan-500/60" },
  MEDICATION: { bg: "bg-purple-500/10", text: "text-purple-300", border: "border-purple-500/30 hover:border-purple-500/60" },
  SAFETY_HOLD: { bg: "bg-red-500/10", text: "text-red-300", border: "border-red-500/30 hover:border-red-500/60" },
  NOTE: { bg: "bg-neon-500/10", text: "text-neon-300", border: "border-neon-500/30 hover:border-neon-500/60" }
};

export function ActionChipsTray({ actionChips, onExecuteAction }: ActionChipsTrayProps) {
  return (
    <div className="glass-panel p-4 rounded-3xl border border-white/10 space-y-3">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-neon-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Suggested Clinical Action Chips</h4>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase">1-Click Order Execution</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {actionChips.map((chip) => {
          const styling = CATEGORY_COLORS[chip.category] || CATEGORY_COLORS.ORDER;
          const isExecuted = chip.status === 'EXECUTED';

          return (
            <button
              key={chip.id}
              onClick={() => onExecuteAction(chip)}
              disabled={isExecuted}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                isExecuted
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 opacity-80'
                  : `${styling.bg} ${styling.border} ${styling.text} hover:scale-[1.02]`
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs font-bold leading-tight">
                  {isExecuted ? '✓ ' : '⚡ '} {chip.label}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 line-clamp-2 mt-1 leading-snug">
                {chip.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
