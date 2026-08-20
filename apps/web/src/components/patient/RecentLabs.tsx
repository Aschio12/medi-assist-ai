export function RecentLabs() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="font-semibold text-slate-700 mb-4">Recent Lab Results</h3>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50">
          <tr><th className="px-4 py-3 rounded-l-lg">Test</th><th className="px-4 py-3">Result</th><th className="px-4 py-3 rounded-r-lg">Ref Range</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr><td className="px-4 py-3 font-medium">Hemoglobin A1c</td><td className="px-4 py-3 text-alert-600 font-semibold">7.2% ↑</td><td className="px-4 py-3 text-slate-500">&lt; 5.7%</td></tr>
          <tr><td className="px-4 py-3 font-medium">LDL Cholesterol</td><td className="px-4 py-3 text-slate-800">95 mg/dL</td><td className="px-4 py-3 text-slate-500">&lt; 100 mg/dL</td></tr>
          <tr><td className="px-4 py-3 font-medium">Creatinine</td><td className="px-4 py-3 text-slate-800">0.9 mg/dL</td><td className="px-4 py-3 text-slate-500">0.7 - 1.3 mg/dL</td></tr>
        </tbody>
      </table>
    </div>
  );
}
