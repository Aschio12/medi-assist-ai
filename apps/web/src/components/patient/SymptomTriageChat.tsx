'use client';
import { useState } from 'react';
import { TriageAssessment } from '@/app/actions/patient_portal';
import { Bot, Send, User, AlertTriangle, PhoneCall, ShieldAlert, CheckCircle2, Sparkles } from 'lucide-react';

interface SymptomTriageChatProps {
  onRunTriage: (symptomQuery: string) => Promise<TriageAssessment>;
}

export function SymptomTriageChat({ onRunTriage }: SymptomTriageChatProps) {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; assessment?: TriageAssessment }>>([
    {
      sender: 'bot',
      text: "Hello Robert. I am your 24/7 AI Triage Companion. How are you feeling right now? Describe any new or concerning symptoms."
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsThinking(true);

    try {
      const assessment = await onRunTriage(userText);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: assessment.recommendation_title,
          assessment: assessment
        }
      ]);
    } catch (err) {
      console.error("Triage failed:", err);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between h-[520px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-neon-400" />
          <h3 className="font-bold text-white text-sm">24/7 AI Symptom Triage Companion</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">ESI Protocol V5</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'bot' && (
              <div className="p-1.5 h-7 w-7 rounded-lg bg-neon-500/20 text-neon-400 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4" />
              </div>
            )}

            <div className={`p-3.5 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
              m.sender === 'user'
                ? 'bg-zinc-800 text-white border border-white/10'
                : m.assessment?.dispatch_911_alert
                  ? 'bg-red-500/15 border border-red-500/40 text-red-200'
                  : 'bg-black/60 border border-white/10 text-zinc-200'
            }`}>
              <p className="font-semibold">{m.text}</p>

              {/* Assessment Action Steps if Present */}
              {m.assessment && (
                <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                  <div className="space-y-1">
                    {m.assessment.action_steps.map((step, sIdx) => (
                      <div key={sIdx} className="text-[11px] flex items-start gap-1.5 text-zinc-300">
                        <span className="text-neon-400 font-bold">•</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 bg-black/40 rounded-xl border border-white/5 text-[10px] font-mono text-zinc-400">
                    🏥 <strong>Nearest Recommended Facility:</strong> {m.assessment.nearest_care_facility}
                  </div>
                </div>
              )}
            </div>

            {m.sender === 'user' && (
              <div className="p-1.5 h-7 w-7 rounded-lg bg-zinc-800 text-white flex items-center justify-center shrink-0">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 p-3 bg-neon-500/5 border border-neon-500/20 rounded-2xl w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-bounce"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-bounce delay-100"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-bounce delay-200"></span>
            <span className="text-xs text-neon-400 font-mono">Assessing symptom urgency...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="relative mt-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="E.g., 'I have a mild fever' or 'I feel chest pressure'..."
          className="w-full bg-black/60 border border-white/15 rounded-2xl pl-4 pr-12 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon-500/50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isThinking}
          className="absolute right-1.5 top-1.5 p-2 bg-neon-500 text-black rounded-xl hover:bg-neon-400 transition-colors disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}
