export function RiskScore() {
  return (
    <div className="glass-panel p-6 rounded-3xl h-[300px] flex flex-col justify-between relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-neon-500/5 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div>
        <h3 className="font-semibold text-zinc-200">AI Insights & Strategy</h3>
        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
          Patient's cardiovascular stability improved by 8% this week. We recommend maintaining current Beta-blocker dosage.
        </p>
      </div>
      
      <div className="flex justify-center items-center flex-1 my-4">
        {/* Mock Circular Gauge */}
        <div className="relative h-32 w-32 rounded-full border-[6px] border-zinc-800 flex items-center justify-center">
          <svg className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="64" cy="64" r="61" fill="none" stroke="#a3e635" strokeWidth="6" strokeDasharray="383" strokeDashoffset="95" className="drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]" />
          </svg>
          <div className="text-center">
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-1">Safety Margin</span>
            <span className="text-3xl font-bold text-white">82</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between border-t border-white/5 pt-4">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase">Risk Level</p>
          <p className="text-sm font-medium text-zinc-200">Low</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-zinc-500 uppercase">Next Review</p>
          <p className="text-sm font-medium text-zinc-200">14 Days</p>
        </div>
      </div>
    </div>
  );
}
