export function PatientProfile() {
  return (
    <div className="glass-panel rounded-3xl p-7 flex items-center justify-between">
      <div>
        <h2 className="text-sm font-medium text-zinc-400 tracking-wide uppercase">Patient Overview</h2>
        <div className="mt-2 flex items-baseline gap-4">
          <h1 className="text-4xl font-bold text-white tracking-tight">Robert Chen</h1>
          <span className="text-neon-400 text-sm font-medium neon-text-glow">+ Stable</span>
        </div>
        <p className="text-zinc-500 text-sm mt-3 flex items-center gap-3">
          <span>DOB: 12/04/1965</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
          <span>Male</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
          <span>MRN: #892-441-A</span>
        </p>
      </div>
      <div className="flex gap-4">
        <div className="glass-panel px-6 py-4 rounded-2xl flex flex-col items-center justify-center">
          <span className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Active Meds</span>
          <span className="text-2xl font-bold text-white">14</span>
        </div>
        <div className="glass-panel px-6 py-4 rounded-2xl flex flex-col items-center justify-center border-neon-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-neon-500/5"></div>
          <span className="text-zinc-400 text-xs uppercase tracking-wider mb-1 relative z-10">Health Score</span>
          <span className="text-2xl font-bold text-neon-400 neon-text-glow relative z-10">92%</span>
        </div>
      </div>
    </div>
  );
}
