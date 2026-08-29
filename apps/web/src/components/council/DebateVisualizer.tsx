'use client';
import { useState } from 'react';
import { DebateRound, AgentArgument } from '@/app/actions/council';
import { MessageSquare, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Bookmark, Cpu } from 'lucide-react';

interface DebateVisualizerProps {
  rounds: DebateRound[];
  activeAgentId?: string;
  onSelectAgent?: (id: string) => void;
}

const AGENT_COLORS: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  diagnostician: { border: "border-neon-500/40", bg: "bg-neon-500/5", text: "text-neon-400", badge: "bg-neon-500/20 text-neon-300" },
  pharmacist: { border: "border-cyan-500/40", bg: "bg-cyan-500/5", text: "text-cyan-400", badge: "bg-cyan-500/20 text-cyan-300" },
  radiologist: { border: "border-purple-500/40", bg: "bg-purple-500/5", text: "text-purple-400", badge: "bg-purple-500/20 text-purple-300" },
  stewardship: { border: "border-amber-500/40", bg: "bg-amber-500/5", text: "text-amber-400", badge: "bg-amber-500/20 text-amber-300" },
  cmo: { border: "border-emerald-500/40", bg: "bg-emerald-500/5", text: "text-emerald-400", badge: "bg-emerald-500/20 text-emerald-300" }
};

export function DebateVisualizer({ rounds, activeAgentId, onSelectAgent }: DebateVisualizerProps) {
  const [expandedCoT, setExpandedCoT] = useState<Record<string, boolean>>({});

  const toggleCoT = (key: string) => {
    setExpandedCoT(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {rounds.map((round) => (
        <div key={round.round_number} className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden">
          {/* Round Header */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 text-white font-mono text-xs font-bold">
                R{round.round_number}
              </span>
              <div>
                <h3 className="font-semibold text-white text-sm">{round.title}</h3>
                <p className="text-zinc-400 text-xs mt-0.5">{round.focus}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded text-zinc-400">
              {round.arguments.length} Arguments Recorded
            </span>
          </div>

          {/* Argument Cards */}
          <div className="space-y-4">
            {round.arguments.map((arg, idx) => {
              const styling = AGENT_COLORS[arg.agent_id] || AGENT_COLORS.diagnostician;
              const cotKey = `${round.round_number}-${arg.agent_id}-${idx}`;
              const isCoTOpen = expandedCoT[cotKey] ?? false;

              return (
                <div 
                  key={idx}
                  onClick={() => onSelectAgent?.(arg.agent_id)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${styling.border} ${styling.bg} hover:border-white/30`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${styling.badge}`}>
                        {arg.role}
                      </span>
                      <h4 className="font-semibold text-white text-xs">{arg.agent_name}</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                        <span>Confidence:</span>
                        <span className={`font-bold ${styling.text}`}>{(arg.confidence_score * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Primary Statement */}
                  <p className="text-zinc-200 text-sm leading-relaxed mb-4">
                    {arg.statement}
                  </p>

                  {/* Proposed Interventions & Flagged Risks Chips */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {arg.proposed_interventions.map((item, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-black/40 border border-white/10 text-zinc-300 px-2.5 py-1 rounded-lg">
                        <CheckCircle2 className="h-3 w-3 text-neon-400" />
                        {item}
                      </span>
                    ))}
                    {arg.flagged_risks.map((risk, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-red-500/10 border border-red-500/30 text-red-400 px-2.5 py-1 rounded-lg">
                        <AlertTriangle className="h-3 w-3" />
                        {risk}
                      </span>
                    ))}
                  </div>

                  {/* Chain of Thought Toggle */}
                  {arg.chain_of_thought && arg.chain_of_thought.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleCoT(cotKey); }}
                        className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-mono transition-colors"
                      >
                        <Cpu className="h-3.5 w-3.5 text-neon-400" />
                        <span>Chain-of-Thought Reasoning ({arg.chain_of_thought.length} steps)</span>
                        {isCoTOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      </button>

                      {isCoTOpen && (
                        <div className="mt-3 p-3 bg-black/60 rounded-xl border border-white/5 space-y-1.5 text-xs text-zinc-300 font-mono">
                          {arg.chain_of_thought.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2">
                              <span className="text-neon-400">›</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Citations */}
                  {arg.citations && arg.citations.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                      <Bookmark className="h-3 w-3 text-zinc-400" />
                      <span>Evidence:</span>
                      {arg.citations.map((cite, cIdx) => (
                        <span key={cIdx} className="bg-white/5 px-1.5 py-0.5 rounded border border-white/5 text-zinc-400">
                          {cite}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
