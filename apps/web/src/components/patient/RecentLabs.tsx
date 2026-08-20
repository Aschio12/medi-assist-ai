export function RecentLabs() {
  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-zinc-200">Recent Lab Analysis</h3>
        <button className="text-neon-400 text-xs font-medium bg-neon-500/10 px-3 py-1.5 rounded-full hover:bg-neon-500/20 transition-colors">View All</button>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-zinc-500 border-b border-white/5">
          <tr><th className="pb-3 font-normal">Biomarker</th><th className="pb-3 font-normal">Value</th><th className="pb-3 font-normal text-right">Trend</th></tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          <tr className="hover:bg-white/5 transition-colors group">
            <td className="py-4 text-zinc-300">Hemoglobin A1c</td>
            <td className="py-4 font-medium text-white">5.4%</td>
            <td className="py-4 text-right text-neon-400 text-xs font-medium">+0.2%</td>
          </tr>
          <tr className="hover:bg-white/5 transition-colors group">
            <td className="py-4 text-zinc-300">LDL Cholesterol</td>
            <td className="py-4 font-medium text-white">92 mg/dL</td>
            <td className="py-4 text-right text-neon-400 text-xs font-medium">-1.4%</td>
          </tr>
          <tr className="hover:bg-white/5 transition-colors group">
            <td className="py-4 text-zinc-300">Creatinine</td>
            <td className="py-4 font-medium text-white">1.1 mg/dL</td>
            <td className="py-4 text-right text-yellow-400 text-xs font-medium">+0.8%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
