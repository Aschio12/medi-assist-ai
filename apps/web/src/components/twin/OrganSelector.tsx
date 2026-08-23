import { Settings2, ScanEye } from 'lucide-react';

export function OrganSelector() {
  return (
    <div className="glass-panel rounded-3xl p-6 flex-1 flex flex-col">
      <h3 className="text-sm uppercase tracking-widest text-zinc-500 font-bold mb-4 flex items-center gap-2">
        <Settings2 className="h-4 w-4" /> View Options
      </h3>
      
      <div className="space-y-3 flex-1">
        <button className="w-full flex items-center justify-between px-4 py-3 bg-neon-500/10 border border-neon-500/30 rounded-xl text-neon-300 font-medium text-sm transition-colors hover:bg-neon-500/20">
          <span>Cardiovascular System</span>
          <ScanEye className="h-4 w-4" />
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-zinc-300 font-medium text-sm transition-colors hover:bg-white/10">
          <span>Respiratory System</span>
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-zinc-300 font-medium text-sm transition-colors hover:bg-white/10">
          <span>Nervous System</span>
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <button className="w-full bg-neon-500 text-black font-bold py-3 rounded-xl hover:bg-neon-400 transition-colors shadow-[0_0_15px_rgba(163,230,53,0.4)]">
          Simulate Intervention
        </button>
        <p className="text-center text-[10px] text-zinc-500 mt-3">Powered by Xenon ML Prediction Engine</p>
      </div>
    </div>
  );
}
