import { Mic, Paperclip, ArrowUp } from 'lucide-react';
export function ChatInput() {
  return (
    <div className="p-5 border-t border-white/5 bg-[#050505]/50 backdrop-blur-md relative z-10">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-neon-500/50 focus-within:bg-white/10 transition-all shadow-inner relative overflow-hidden">
        <textarea placeholder="Ask about guidelines, patient history..." className="w-full bg-transparent border-none outline-none resize-none h-12 text-sm px-3 py-2 text-zinc-200 placeholder:text-zinc-600 font-light" />
        <div className="flex justify-between items-center mt-1 px-1">
          <div className="flex gap-1">
            <button className="p-2 text-zinc-500 hover:text-neon-300 hover:bg-neon-500/10 rounded-xl transition-colors"><Mic className="h-4 w-4" /></button>
            <button className="p-2 text-zinc-500 hover:text-neon-300 hover:bg-neon-500/10 rounded-xl transition-colors"><Paperclip className="h-4 w-4" /></button>
          </div>
          <button className="bg-neon-500 hover:bg-neon-400 text-zinc-950 p-2.5 rounded-xl transition-all shadow-[0_0_10px_rgba(163,230,53,0.4)]">
            <ArrowUp className="h-4 w-4 font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
