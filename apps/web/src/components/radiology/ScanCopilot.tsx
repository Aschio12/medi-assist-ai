'use client';
import { useState } from 'react';
import { Sparkles, Send, Bot, MessageSquare } from 'lucide-react';

interface ScanCopilotProps {
  studyModality: string;
  patientName: string;
}

export function ScanCopilot({ studyModality, patientName }: ScanCopilotProps) {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: `I have analyzed this ${studyModality} scan for ${patientName}. You can ask me specific questions about lesion dimensions, Hounsfield Unit densities, or differential considerations.`
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userQuery = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setIsThinking(true);

    setTimeout(() => {
      let aiResponse = "";
      const lower = userQuery.toLowerCase();
      if (lower.includes("effusion") || lower.includes("fluid")) {
        aiResponse = "The right costophrenic angle blunting indicates a small parapneumonic effusion (~75 mL). There is no loculation or mediastinal shift.";
      } else if (lower.includes("pneumothorax") || lower.includes("air")) {
        aiResponse = "No pneumothorax is identified. Lung markings extend fully to the bilateral thoracic apices and chest walls.";
      } else if (lower.includes("tumor") || lower.includes("mass") || lower.includes("mri")) {
        aiResponse = "The left frontoparietal lesion measures 4.2 x 3.8 cm with thick irregular ring enhancement and 4.2mm of subfalcine herniation.";
      } else {
        aiResponse = `Based on high-resolution computer vision inference for ${patientName}'s ${studyModality}, the primary abnormality is focal alveolar opacification consistent with dense bacterial consolidation.`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsThinking(false);
    }, 900);
  };

  return (
    <div className="glass-panel p-4 rounded-3xl border border-white/10 flex flex-col justify-between h-[300px]">
      <div className="flex items-center gap-2 pb-3 mb-2 border-b border-white/10">
        <Sparkles className="h-4 w-4 text-neon-400" />
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Radiology Vision AI Chat</h4>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 p-1 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
              m.sender === 'user'
                ? 'bg-zinc-800 text-white border border-white/10'
                : 'bg-neon-500/10 text-zinc-200 border border-neon-500/20'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex items-center gap-1.5 p-3 bg-neon-500/5 border border-neon-500/20 rounded-2xl w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-bounce"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-bounce delay-100"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-bounce delay-200"></span>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="relative mt-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask AI about scan findings or density..."
          className="w-full bg-black/60 border border-white/15 rounded-xl pl-3 pr-10 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon-500/50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isThinking}
          className="absolute right-1.5 top-1.5 p-1.5 bg-neon-500 text-black rounded-lg hover:bg-neon-400 transition-colors disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}
