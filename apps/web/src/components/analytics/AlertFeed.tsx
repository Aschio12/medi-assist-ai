import { BellRing, Activity } from 'lucide-react';

export function AlertFeed() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4">
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-1 bg-red-500"></div>
        <div className="flex items-start gap-3">
          <BellRing className="h-5 w-5 text-red-400 mt-0.5 animate-bounce" />
          <div>
            <h4 className="text-red-400 font-bold text-sm">SEPSIS PROTOCOL TRIGGERED</h4>
            <p className="text-zinc-300 text-xs mt-1 leading-relaxed">James Wilson (ICU-4) probability exceeded 80% threshold. Immediate intervention required.</p>
            <span className="text-[10px] text-zinc-500 mt-2 block font-mono">2 mins ago</span>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-1 bg-amber-500"></div>
        <div className="flex items-start gap-3">
          <Activity className="h-5 w-5 text-amber-400 mt-0.5" />
          <div>
            <h4 className="text-amber-400 font-bold text-sm">Risk Trajectory Escalation</h4>
            <p className="text-zinc-300 text-xs mt-1 leading-relaxed">Elena Rodriguez (MED-12) risk jumped from 22% to 65% in 4 hours.</p>
            <span className="text-[10px] text-zinc-500 mt-2 block font-mono">1 hr ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
