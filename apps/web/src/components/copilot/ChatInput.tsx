'use client';
import { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import { redactClinicalNotes } from '@/app/actions/redact';

interface ChatInputProps {
  onSend?: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    
    // First, pass through Privacy Gateway (Phase 4)
    const sanitized = await redactClinicalNotes(text);
    
    if (onSend) {
      onSend(sanitized.redacted);
    }
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input 
        type="text" 
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={disabled}
        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-4 pr-24 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-neon-500/50 transition-colors"
        placeholder="Ask about vitals, labs, or history..."
      />
      <div className="absolute right-2 top-2 flex items-center gap-1">
        <button type="button" className="p-1.5 text-zinc-500 hover:text-white transition-colors"><Mic className="h-4 w-4" /></button>
        <button 
          type="submit" 
          disabled={disabled || !text.trim()}
          className="p-1.5 bg-neon-500 text-black rounded-lg hover:bg-neon-400 transition-colors disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
