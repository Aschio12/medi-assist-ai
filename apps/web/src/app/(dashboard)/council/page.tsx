'use client';
import { useState, useEffect } from 'react';
import { Bot, Network, Sparkles, UserCog, CheckCircle, RefreshCw, Cpu } from 'lucide-react';
import { fetchCouncilDebate, CouncilResponse } from '@/app/actions/council';
import { AgentRoster } from '@/components/council/AgentRoster';
import { CaseSelector } from '@/components/council/CaseSelector';
import { DebateVisualizer } from '@/components/council/DebateVisualizer';
import { ConflictMatrix } from '@/components/council/ConflictMatrix';
import { ConsensusReport } from '@/components/council/ConsensusReport';
import { HumanInterventionModal } from '@/components/council/HumanInterventionModal';

export default function ClinicalCouncilPage() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-sepsis-aki-01");
  const [councilData, setCouncilData] = useState<CouncilResponse | null>(null);
  const [isDebating, setIsDebating] = useState<boolean>(false);
  const [activeAgentId, setActiveAgentId] = useState<string | undefined>(undefined);
  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState<boolean>(false);
  const [interventionNotice, setInterventionNotice] = useState<string | null>(null);

  const loadDeliberation = async (caseId: string) => {
    setIsDebating(true);
    try {
      const data = await fetchCouncilDebate(caseId);
      setCouncilData(data);
    } catch (err) {
      console.error("Council deliberation error:", err);
    } finally {
      setIsDebating(false);
    }
  };

  useEffect(() => {
    loadDeliberation(selectedCaseId);
  }, [selectedCaseId]);

  const handleTriggerDebate = () => {
    loadDeliberation(selectedCaseId);
  };

  const handleIntervention = (directive: string) => {
    setInterventionNotice(`Physician Directive Broadcasted: "${directive.slice(0, 70)}..."`);
    loadDeliberation(selectedCaseId);
  };

  return (
    <div className="h-full w-full p-8 flex flex-col relative z-10 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-500/20 rounded-xl border border-neon-500/30">
              <Network className="h-6 w-6 text-neon-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Multi-Agent Clinical Council & Consensus Engine
            </h1>
          </div>
          <p className="text-zinc-400 text-sm mt-1">
            Autonomous multi-disciplinary clinical debate (Internal Medicine, Pharmacotherapy, Radiology, Stewardship, CMO).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsInterventionModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white rounded-xl text-xs font-semibold transition-colors"
          >
            <UserCog className="h-4 w-4 text-neon-400" />
            <span>Physician Interjection</span>
          </button>

          <div className="flex items-center gap-2 bg-neon-500/10 border border-neon-500/30 px-3 py-2 rounded-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-500"></span>
            </span>
            <span className="text-neon-400 font-mono text-xs font-bold uppercase tracking-wider">
              5 Agents Online
            </span>
          </div>
        </div>
      </div>

      {/* Intervention Notice Banner */}
      {interventionNotice && (
        <div className="mb-6 p-4 rounded-2xl bg-neon-500/10 border border-neon-500/30 flex items-center justify-between text-xs text-neon-300">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-neon-400" />
            <span>{interventionNotice}</span>
          </div>
          <button onClick={() => setInterventionNotice(null)} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Committee Swarm Roster */}
      <div className="mb-6">
        <AgentRoster activeAgentId={activeAgentId} isDebating={isDebating} />
      </div>

      {/* Case Selector */}
      <div className="mb-6">
        <CaseSelector 
          selectedCaseId={selectedCaseId}
          onSelectCase={setSelectedCaseId}
          isDebating={isDebating}
          onTriggerDebate={handleTriggerDebate}
        />
      </div>

      {/* Main Grid: Deliberation Debate Flow on Left, Adjudication on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Multi-Round Debate Stream */}
        <div className="lg:col-span-7 space-y-6">
          {councilData && (
            <DebateVisualizer 
              rounds={councilData.rounds}
              activeAgentId={activeAgentId}
              onSelectAgent={setActiveAgentId}
            />
          )}
        </div>

        {/* Right 5 Cols: Conflict Resolution & Final Consensus */}
        <div className="lg:col-span-5 space-y-6">
          {councilData && (
            <>
              <ConflictMatrix conflicts={councilData.consensus.conflicts_resolved} />
              <ConsensusReport consensus={councilData.consensus} />
            </>
          )}
        </div>
      </div>

      {/* Physician Intervention Modal */}
      <HumanInterventionModal 
        isOpen={isInterventionModalOpen}
        onClose={() => setIsInterventionModalOpen(false)}
        onSubmitIntervention={handleIntervention}
      />
    </div>
  );
}
