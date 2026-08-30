'use client';
import { useState } from 'react';
import { CDSCard } from '@/app/actions/ehr_sync';
import { Zap, AlertTriangle, CheckCircle2, ShieldAlert, ExternalLink, RefreshCw, Layers } from 'lucide-react';

interface CdsHooksSimulatorProps {
  cards: CDSCard[];
  currentHook: 'patient-view' | 'order-select' | 'order-sign';
  onSelectHook: (hook: 'patient-view' | 'order-select' | 'order-sign') => void;
  onApplySuggestion: (suggestionLabel: string) => void;
  isLoading: boolean;
}

export function CdsHooksSimulator({
  cards,
  currentHook,
  onSelectHook,
  onApplySuggestion,
  isLoading
}: CdsHooksSimulatorProps) {
  const hookOptions = [
    { id: 'patient-view', label: 'patient-view (Chart Open)' },
    { id: 'order-select', label: 'order-select (CPOE Selection)' },
    { id: 'order-sign', label: 'order-sign (Signing Pre-Check)' }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      {/* Header & Hook Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-neon-400" />
          <h3 className="font-bold text-white text-sm">CDS Hooks v2.0 Live Service Registry</h3>
        </div>

        {/* Hook Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {hookOptions.map(h => (
            <button
              key={h.id}
              onClick={() => onSelectHook(h.id as any)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all ${
                currentHook === h.id
                  ? 'bg-neon-500 text-black shadow-[0_0_10px_rgba(163,230,53,0.3)]'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center p-8 gap-2 text-xs text-neon-400 font-mono">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Evaluating CDS Hooks prefetch rules...</span>
          </div>
        ) : (
          cards.map((card) => {
            const isCritical = card.indicator === 'critical';
            const isWarning = card.indicator === 'warning';

            return (
              <div
                key={card.uuid}
                className={`p-4 rounded-2xl border transition-all space-y-3 ${
                  isCritical
                    ? 'bg-red-500/10 border-red-500/30'
                    : isWarning
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-black/40 border-white/10'
                }`}
              >
                {/* Card Title & Indicator */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {isCritical ? (
                      <ShieldAlert className="h-5 w-5 text-red-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
                    )}
                    <h4 className="text-xs font-bold text-white leading-tight">
                      {card.summary}
                    </h4>
                  </div>
                  <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    isCritical
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {card.indicator}
                  </span>
                </div>

                {/* Card Detail */}
                <p className="text-xs text-zinc-300 leading-relaxed font-normal bg-black/40 p-3 rounded-xl border border-white/5">
                  {card.detail}
                </p>

                {/* Source Citation */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>Source: <strong className="text-zinc-300">{card.source.label}</strong></span>
                  {card.source.url && (
                    <a href={card.source.url} target="_blank" rel="noreferrer" className="text-neon-400 hover:underline flex items-center gap-1">
                      <span>Guideline Spec</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>

                {/* Suggestions Actions */}
                {card.suggestions && card.suggestions.length > 0 && (
                  <div className="pt-2 border-t border-white/5 space-y-2">
                    {card.suggestions.map((sug) => (
                      <button
                        key={sug.uuid}
                        onClick={() => onApplySuggestion(sug.label)}
                        className="flex items-center justify-between w-full p-2.5 rounded-xl bg-neon-500/15 border border-neon-500/30 hover:bg-neon-500/25 text-neon-300 text-xs font-bold transition-all"
                      >
                        <span className="truncate">{sug.label}</span>
                        <span className="text-[10px] font-mono uppercase bg-neon-500 text-black px-2 py-0.5 rounded ml-2 shrink-0">
                          1-Click Execute
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
