export function PatientRiskTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-neon-400 font-bold tracking-widest border-b border-white/5 uppercase tracking-widest">
          <tr>
            <th className="pb-4 font-semibold">Patient</th>
            <th className="pb-4 font-semibold">Room</th>
            <th className="pb-4 font-semibold">Current Sepsis Probability</th>
            <th className="pb-4 font-semibold">Key ML Drivers (SHAP)</th>
            <th className="pb-4 font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-zinc-300">
          <tr className="hover:bg-white/5 transition-colors group">
            <td className="py-4 font-medium text-white">James Wilson</td>
            <td className="py-4 font-mono text-xs">ICU-4</td>
            <td className="py-4">
              <div className="flex items-center gap-3">
                <span className="text-red-400 font-bold text-lg">91%</span>
                <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-bold uppercase">Critical</span>
              </div>
            </td>
            <td className="py-4 text-xs font-mono text-zinc-400">Hypotension (+0.3), Tachycardia (+0.2)</td>
            <td className="py-4 text-right"><button className="px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors">Order Lactate</button></td>
          </tr>
          <tr className="hover:bg-white/5 transition-colors group">
            <td className="py-4 font-medium text-white">Elena Rodriguez</td>
            <td className="py-4 font-mono text-xs">MED-12</td>
            <td className="py-4">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 font-bold text-lg">65%</span>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold uppercase">High Risk</span>
              </div>
            </td>
            <td className="py-4 text-xs font-mono text-zinc-400">Leukocytosis (+0.1), Fever (+0.15)</td>
            <td className="py-4 text-right"><button className="px-3 py-1.5 bg-white/5 text-zinc-300 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">Review Chart</button></td>
          </tr>
          <tr className="hover:bg-white/5 transition-colors group">
            <td className="py-4 font-medium text-white">Robert Chen</td>
            <td className="py-4 font-mono text-xs">MED-8</td>
            <td className="py-4">
              <div className="flex items-center gap-3">
                <span className="text-neon-400 font-bold text-lg">12%</span>
                <span className="text-[10px] bg-neon-500/10 text-neon-400 border border-neon-500/30 px-2 py-0.5 rounded font-bold uppercase">Low Risk</span>
              </div>
            </td>
            <td className="py-4 text-xs font-mono text-zinc-400">None</td>
            <td className="py-4 text-right"><button className="px-3 py-1.5 bg-white/5 text-zinc-300 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">Review Chart</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
