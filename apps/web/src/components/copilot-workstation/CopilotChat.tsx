'use client';
import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, BookOpen, ShieldCheck, Zap } from 'lucide-react';
import { CopilotChatMessage, ActionChip } from '@/app/actions/physician_copilot';

interface CopilotChatProps {
  messages: CopilotChatMessage[];
  onSendMessage: (query: string) => void;
  onSelectCitation: (citationId: number) => void;
  onExecuteAction: (action: ActionChip) => void;
  activeCitationId: number | null;
  isLoading: boolean;
}

export function CopilotChat({
  messages,
  onSendMessage,
  onSelectCitation,
  onExecuteAction,
  activeCitationId,
  isLoading
}: CopilotChatProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  // Helper to parse [1], [2], etc. in content into interactive buttons
  const renderMessageContent = (text: string) => {
    const parts = text.split(/(\[\d+\])/g);
    return parts.map((part, idx) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const citId = parseInt(match[1], 10);
        const isActive = activeCitationId === citId;
        return (
          <button
            key={idx}
            onClick={() => onSelectCitation(citId)}
            className={`inline-flex items-center justify-center mx-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
              isActive
                ? 'bg-neon-500 text-black shadow-[0_0_10px_rgba(163,230,53,0.6)] scale-110'
                : 'bg-neon-500/20 text-neon-300 border border-neon-500/40 hover:bg-neon-500/30'
            }`}
            title={`View Grounded Evidence [${citId}]`}
          >
            [{citId}]
          </button>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-full bg-black/60 rounded-3xl border border-white/10 overflow-hidden relative">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-950/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neon-500/20 rounded-xl border border-neon-500/30">
            <Sparkles className="h-5 w-5 text-neon-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Clinical Reasoning Copilot</h3>
            <p className="text-zinc-400 text-xs mt-0.5">Grounded in Surviving Sepsis, IDSA & KDIGO Guidelines</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-neon-400 bg-neon-500/10 border border-neon-500/20 px-2.5 py-1 rounded-full">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Real-Time Citation Grounded</span>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="p-2 h-8 w-8 rounded-xl bg-neon-500/20 border border-neon-500/30 text-neon-400 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4" />
              </div>
            )}

            <div className={`p-4 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-zinc-800 text-white border border-white/10'
                : 'bg-black/80 border border-neon-500/20 text-zinc-200 shadow-[0_0_15px_rgba(0,0,0,0.5)]'
            }`}>
              <div className="space-y-2">
                {renderMessageContent(msg.content)}
              </div>

              {/* In-Message Action Chips */}
              {msg.action_chips && msg.action_chips.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-neon-400 flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    <span>Suggested Action Chips</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {msg.action_chips.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => onExecuteAction(action)}
                        className={`text-[11px] font-medium px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                          action.status === 'EXECUTED'
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 line-through'
                            : 'bg-neon-500/10 hover:bg-neon-500/20 border-neon-500/30 text-neon-300 hover:border-neon-500/50'
                        }`}
                      >
                        <span>⚡ {action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="p-2 h-8 w-8 rounded-xl bg-zinc-800 border border-white/10 text-white flex items-center justify-center shrink-0">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-neon-500/5 border border-neon-500/20 rounded-2xl w-fit">
            <span className="w-2 h-2 rounded-full bg-neon-400 animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-neon-400 animate-bounce delay-100"></span>
            <span className="w-2 h-2 rounded-full bg-neon-400 animate-bounce delay-200"></span>
            <span className="text-xs text-neon-400 font-mono">Synthesizing clinical guidelines...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Prompt Box */}
      <form onSubmit={handleSubmit} className="p-4 bg-zinc-950/80 border-t border-white/10 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Copilot about differential diagnosis, dosing, or guidelines..."
          className="flex-1 bg-black/60 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon-500/50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-3 bg-neon-500 text-black font-bold rounded-2xl hover:bg-neon-400 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
