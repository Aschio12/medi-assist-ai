import React from 'react';
import { Sparkles, X } from 'lucide-react';
export function CopilotLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[400px] lg:w-[480px] glass-panel rounded-l-3xl flex flex-col my-4 mr-4 z-20 border-r-0 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-neon-500/10 to-transparent pointer-events-none"></div>
      <div className="h-20 border-b border-white/5 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-neon-500/20 flex items-center justify-center border border-neon-500/30 neon-glow">
            <Sparkles className="h-4 w-4 text-neon-400" />
          </div>
          <div>
            <h2 className="font-semibold text-white tracking-wide">AI Assistant</h2>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Medical Graph Connected</p>
          </div>
        </div>
        <button className="p-2 text-zinc-500 hover:text-white transition-colors bg-white/5 rounded-full"><X className="h-4 w-4" /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 scrollbar-hide">
        {children}
      </div>
    </div>
  );
}
