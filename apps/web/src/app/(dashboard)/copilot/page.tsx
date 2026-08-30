'use client';
import { useState, useEffect } from 'react';
import { Split, Sparkles, User, RefreshCw, Zap } from 'lucide-react';
import { 
  fetchCopilotReasoning, 
  fetchPatientChartSummary, 
  CopilotChatMessage, 
  EvidenceCitation, 
  ActionChip, 
  PatientChartSummary 
} from '@/app/actions/physician_copilot';
import { SplitWorkstation } from '@/components/copilot-workstation/SplitWorkstation';

export default function CopilotPage() {
  const [messages, setMessages] = useState<CopilotChatMessage[]>([]);
  const [citations, setCitations] = useState<EvidenceCitation[]>([]);
  const [suggestedActions, setSuggestedActions] = useState<ActionChip[]>([]);
  const [chart, setChart] = useState<PatientChartSummary | null>(null);
  const [draftedNote, setDraftedNote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initData = async () => {
    setIsLoading(true);
    try {
      const [chartData, copilotData] = await Promise.all([
        fetchPatientChartSummary(),
        fetchCopilotReasoning("Initial Sepsis Evaluation and Antimicrobial Stewardship Plan")
      ]);
      setChart(chartData);
      setMessages([copilotData.message]);
      setCitations(copilotData.citations);
      setSuggestedActions(copilotData.suggested_actions);
      setDraftedNote(copilotData.drafted_ap_note);
    } catch (err) {
      console.error("Failed to load Copilot data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const handleSendMessage = async (queryText: string) => {
    const userMsg: CopilotChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      content: queryText,
      timestamp: "Just now",
      cited_ids: [],
      action_chips: []
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetchCopilotReasoning(queryText);
      setMessages(prev => [...prev, res.message]);
      setCitations(res.citations);
      setSuggestedActions(res.suggested_actions);
      setDraftedNote(res.drafted_ap_note);
    } catch (err) {
      console.error("Error sending query:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full p-8 flex flex-col relative z-10 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-500/20 rounded-xl border border-neon-500/30">
              <Split className="h-6 w-6 text-neon-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              The Physician's Copilot Split-Screen Dashboard
            </h1>
          </div>
          <p className="text-zinc-400 text-sm mt-1">
            Dual-pane clinical reasoning workstation with live guideline citation highlighting and 1-click order chips.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={initData}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 rounded-xl text-xs font-semibold transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync Chart</span>
          </button>

          <div className="flex items-center gap-2 bg-neon-500/10 border border-neon-500/30 px-3 py-2 rounded-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-500"></span>
            </span>
            <span className="text-neon-400 font-mono text-xs font-bold uppercase tracking-wider">
              Grounded AI Online
            </span>
          </div>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      {chart && (
        <SplitWorkstation
          messages={messages}
          citations={citations}
          suggestedActions={suggestedActions}
          chart={chart}
          draftedNote={draftedNote}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
