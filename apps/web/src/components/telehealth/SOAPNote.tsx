import { FileText, Sparkles } from 'lucide-react';

export function SOAPNote() {
  return (
    <div className="glass-panel rounded-3xl h-full flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-neon-500/5 to-transparent pointer-events-none"></div>
      
      <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center z-10">
        <h3 className="font-semibold text-white flex items-center gap-2 tracking-wide">
          <FileText className="h-5 w-5 text-neon-400" />
          Auto-Generated SOAP Note
        </h3>
        <div className="h-6 w-6 rounded-full bg-neon-500/10 flex items-center justify-center border border-neon-500/30 neon-glow animate-pulse">
          <Sparkles className="h-3 w-3 text-neon-400" />
        </div>
      </div>
      
      <div className="flex-1 p-6 space-y-6 overflow-y-auto z-10 scrollbar-hide">
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Subjective</h4>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-zinc-300 font-light leading-relaxed">
            Patient reports feeling "much better" since recent Beta-blocker adjustment. Notes reduction in nighttime tachycardia. Mentions mild, transient dizziness upon standing yesterday morning. Home BP readings reported at <span className="text-neon-300 font-medium bg-neon-500/10 px-1 rounded">118/75</span>.
          </div>
        </div>
        
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Objective</h4>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-zinc-300 font-light leading-relaxed">
            [Awaiting telemetry sync...] <br/>
            Current HR: 72 bpm. <br/>
            O2 Sat: 98%.
          </div>
        </div>
        
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Assessment</h4>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-zinc-300 font-light leading-relaxed">
            Well-controlled hypertension and stable tachycardia on current medication regimen. Mild orthostatic hypotension suspected due to isolated dizziness episode.
          </div>
        </div>
        
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Plan (Draft)</h4>
          <div className="bg-neon-500/5 border border-neon-500/20 rounded-xl p-4 text-sm text-zinc-200 font-light leading-relaxed">
            1. Continue current Beta-blocker dosage.<br/>
            2. Advise patient to rise slowly from seated/supine positions.<br/>
            3. Follow up in 3 months.
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-white/5 z-10 bg-black/20">
        <button className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-colors shadow-lg">
          Sign & Export to EHR
        </button>
      </div>
    </div>
  );
}
