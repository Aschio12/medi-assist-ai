'use client';
import { useState, useRef, useEffect } from 'react';
import { BrainCircuit, Database } from 'lucide-react';
import { ChatInput } from './ChatInput';
import { submitCopilotQuery } from '@/app/actions/chat';

type Message = { id: string, role: 'user' | 'ai', text: string, sources?: string[] };

export function CopilotPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', text: 'I have securely connected to the Epic EHR FHIR endpoint. I can analyze lab results, parse vitals, or draft clinical notes for Robert Chen. How can I assist?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await submitCopilotQuery(text);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        text: response.text,
        sources: response.sources
      }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: 'err', role: 'ai', text: 'Error connecting to FHIR engine.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl h-full flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-black/40">
        <h2 className="font-semibold text-white flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-neon-400" />
          Clinical Copilot
        </h2>
        <div className="flex items-center gap-1.5 bg-neon-500/10 border border-neon-500/30 px-2 py-1 rounded text-[10px] font-bold text-neon-400 tracking-widest uppercase">
          <Database className="h-3 w-3" />
          FHIR v4 Sync
        </div>
      </div>
      
      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-hide">
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-zinc-800 text-white border border-white/10' 
                : 'bg-neon-500/5 text-zinc-200 border border-neon-500/20'
            }`}>
              {msg.text}
            </div>
            {msg.sources && (
              <div className="mt-2 flex gap-2">
                {msg.sources.map((src, i) => (
                  <span key={i} className="text-[9px] bg-white/5 text-zinc-500 px-1.5 py-0.5 rounded border border-white/10 font-mono">Cite: {src}</span>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start">
            <div className="bg-neon-500/5 border border-neon-500/20 rounded-2xl p-4 flex gap-1 items-center h-12">
              <div className="w-2 h-2 rounded-full bg-neon-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-neon-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-neon-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-black/40 border-t border-white/5">
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
