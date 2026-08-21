import { AlertCircle, TrendingUp } from 'lucide-react';

export function RiskScore() {
  const score = 82;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-panel p-7 rounded-3xl h-[340px] flex flex-col justify-between relative group overflow-hidden">
      {/* Background ambient glow based on score */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-neon-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-neon-500/20 transition-all duration-700"></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-zinc-100 flex items-center gap-2 tracking-wide">
            AI Risk Stratification
          </h3>
          <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed max-w-[200px]">
            Cardiovascular stability improved. Maintaining current Beta-blocker dosage recommended.
          </p>
        </div>
        <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-sm">
          <AlertCircle className="h-4 w-4 text-neon-400" />
        </div>
      </div>
      
      <div className="relative z-10 flex justify-center items-center flex-1 my-2">
        <div className="relative h-40 w-40 flex items-center justify-center">
          {/* SVG Circular Gauge */}
          <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle 
              cx="50" cy="50" r={radius} 
              fill="transparent" 
              stroke="rgba(255,255,255,0.03)" 
              strokeWidth="8" 
            />
            {/* Progress Bar */}
            <circle 
              cx="50" cy="50" r={radius} 
              fill="transparent" 
              stroke="#a3e635" 
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference} 
              strokeDashoffset={strokeDashoffset} 
              className="drop-shadow-[0_0_12px_rgba(163,230,53,0.6)] transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="text-center mt-1">
            <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] block mb-0.5">Safety Margin</span>
            <span className="text-5xl font-black text-white tracking-tighter drop-shadow-md">{score}</span>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-4 mt-2">
        <div>
          <p className="text-[9px] text-zinc-500 uppercase tracking-[0.15em] font-semibold mb-1.5">Status</p>
          <div className="flex items-center gap-1.5 bg-neon-500/10 border border-neon-500/20 px-2.5 py-1 rounded-md shadow-[0_0_10px_rgba(163,230,53,0.1)]">
            <TrendingUp className="h-3 w-3 text-neon-400" />
            <p className="text-[11px] font-semibold text-neon-300">Improving</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-zinc-500 uppercase tracking-[0.15em] font-semibold mb-1.5">Next Review</p>
          <p className="text-sm font-medium text-zinc-200">14 Days</p>
        </div>
      </div>
    </div>
  );
}
