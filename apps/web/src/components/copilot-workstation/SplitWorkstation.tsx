'use client';
import { useState } from 'react';
import { 
  CopilotChatMessage, 
  EvidenceCitation, 
  ActionChip, 
  PatientChartSummary 
} from '@/app/actions/physician_copilot';
import { CopilotChat } from './CopilotChat';
import { PatientChartTab } from './PatientChartTab';
import { EvidenceViewerTab } from './EvidenceViewerTab';
import { AssessmentPlanTab } from './AssessmentPlanTab';
import { ActiveOrdersTray } from './ActiveOrdersTray';
import { ActionChipsTray } from './ActionChipsTray';
import { User, BookOpen, FileText, Split, Sparkles, CheckCircle2 } from 'lucide-react';

interface SplitWorkstationProps {
  messages: CopilotChatMessage[];
  citations: EvidenceCitation[];
  suggestedActions: ActionChip[];
  chart: PatientChartSummary;
  draftedNote: string;
  onSendMessage: (query: string) => void;
  isLoading: boolean;
}

export function SplitWorkstation({
  messages,
  citations,
  suggestedActions,
  chart,
  draftedNote,
  onSendMessage,
  isLoading
}: SplitWorkstationProps) {
  const [activeTab, setActiveTab] = useState<'chart' | 'evidence' | 'note'>('evidence');
  const [activeCitationId, setActiveCitationId] = useState<number | null>(1);
  const [queuedOrders, setQueuedOrders] = useState<ActionChip[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectCitation = (citId: number) => {
    setActiveCitationId(citId);
    setActiveTab('evidence');
  };

  const handleExecuteAction = (action: ActionChip) => {
    if (!queuedOrders.some(o => o.id === action.id)) {
      setQueuedOrders(prev => [...prev, { ...action, status: 'QUEUED' }]);
      setToastMessage(`Added "${action.label}" to Active Order Basket.`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleRemoveOrder = (id: string) => {
    setQueuedOrders(prev => prev.filter(o => o.id !== id));
  };

  const handleSubmitOrders = () => {
    setToastMessage(`Successfully signed and transmitted ${queuedOrders.length} orders to Epic EHR!`);
    setQueuedOrders([]);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Suggested Action Chips Tray */}
      <ActionChipsTray 
        actionChips={suggestedActions}
        onExecuteAction={handleExecuteAction}
      />

      {/* Active Clinical Orders Cart */}
      <ActiveOrdersTray
        queuedOrders={queuedOrders}
        onRemoveOrder={handleRemoveOrder}
        onSubmitOrders={handleSubmitOrders}
      />

      {/* Main Split-Screen Grid: Left 6 Cols Chat, Right 6 Cols Chart/Evidence Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[680px]">
        {/* Left Pane (50%): Conversational Reasoning */}
        <div className="lg:col-span-6 h-full">
          <CopilotChat
            messages={messages}
            onSendMessage={onSendMessage}
            onSelectCitation={handleSelectCitation}
            onExecuteAction={handleExecuteAction}
            activeCitationId={activeCitationId}
            isLoading={isLoading}
          />
        </div>

        {/* Right Pane (50%): Dynamic Chart & Grounded Evidence Viewer */}
        <div className="lg:col-span-6 h-full glass-panel rounded-3xl border border-white/10 flex flex-col overflow-hidden bg-black/40">
          {/* Tab Navigation Header */}
          <div className="p-3 border-b border-white/10 flex items-center gap-2 bg-zinc-950/60">
            <button
              onClick={() => setActiveTab('evidence')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'evidence'
                  ? 'bg-neon-500/20 text-neon-300 border border-neon-500/40 shadow-[0_0_10px_rgba(163,230,53,0.2)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Grounded Evidence & Guidelines</span>
              {citations.length > 0 && (
                <span className="text-[10px] font-mono bg-white/10 px-1.5 py-0.2 rounded text-neon-400 font-bold">
                  {citations.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('chart')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'chart'
                  ? 'bg-neon-500/20 text-neon-300 border border-neon-500/40 shadow-[0_0_10px_rgba(163,230,53,0.2)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Patient Chart & Telemetry</span>
            </button>

            <button
              onClick={() => setActiveTab('note')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'note'
                  ? 'bg-neon-500/20 text-neon-300 border border-neon-500/40 shadow-[0_0_10px_rgba(163,230,53,0.2)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Drafted Assessment & Plan</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            {activeTab === 'evidence' && (
              <EvidenceViewerTab
                citations={citations}
                activeCitationId={activeCitationId}
                onSelectCitation={setActiveCitationId}
              />
            )}

            {activeTab === 'chart' && (
              <PatientChartTab chart={chart} />
            )}

            {activeTab === 'note' && (
              <AssessmentPlanTab 
                draftedNote={draftedNote} 
                onCommitToEhr={() => setToastMessage("Drafted SOAP note committed to patient EHR chart.")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
