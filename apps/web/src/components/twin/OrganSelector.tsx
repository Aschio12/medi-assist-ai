import { Settings2, Activity, Wind, Cpu } from 'lucide-react';

export function OrganSelector() {
  return (
    <div className="glass-panel rounded-3xl p-6 flex-1 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-neon-500/10 rounded-full blur-[50px] pointer-events-none"></div>
      
      <h3 className="text-sm uppercase tracking-widest text-zinc-500 font-bold mb-4 flex items-center gap-2">
        <Settings2 className="h-4 w-4" /> Semantic Layers
      </h3>
      
      <div className="space-y-3 flex-1">
        <button className="w-full flex items-center justify-between px-4 py-3 bg-neon-500/10 border border-neon-500/30 rounded-xl text-neon-300 font-medium text-sm transition-all hover:bg-neon-500/20 group">
          <div className="flex items-center gap-3">
            <Activity className="h-4 w-4" />
            <span>Cardiovascular System</span>
          </div>
          <span className="text-[9px] uppercase font-bold bg-neon-500/20 px-2 py-1 rounded">Active</span>
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-zinc-300 font-medium text-sm transition-all hover:bg-white/10 group">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full border-2 border-current opacity-70"></div>
            <span>Respiratory System</span>
          </div>
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-zinc-300 font-medium text-sm transition-all hover:bg-white/10 group">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full border-2 border-current opacity-70"></div>
            <span>Nervous System</span>
          </div>
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <button className="w-full bg-neon-500 text-black font-bold py-3 rounded-xl hover:bg-neon-400 transition-colors shadow-[0_0_15px_rgba(163,230,53,0.4)]">
          Execute ML Simulation
        </button>
        <p className="text-center text-[10px] text-zinc-500 mt-3">Rerouting localized drug delivery matrix</p>
      </div>
    </div>
  );
}
