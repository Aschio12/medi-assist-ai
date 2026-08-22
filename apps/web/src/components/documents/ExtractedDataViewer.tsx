import { CheckCircle2, Table, Tags } from 'lucide-react';

export function ExtractedDataViewer({ fileName }: { fileName: string }) {
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden h-full">
      {/* Left: Original Document Preview */}
      <div className="glass-panel rounded-3xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center">
          <span className="text-sm font-medium text-zinc-300 truncate">{fileName}</span>
          <span className="text-xs bg-neon-500/20 text-neon-400 px-2 py-1 rounded font-semibold border border-neon-500/30">Original</span>
        </div>
        <div className="flex-1 bg-zinc-900 p-8 flex items-center justify-center">
          <div className="w-full max-w-sm h-full max-h-[500px] bg-white rounded-lg shadow-lg opacity-80 animate-pulse flex items-center justify-center">
            <span className="text-zinc-400 font-mono text-sm">[PDF Document Render]</span>
          </div>
        </div>
      </div>

      {/* Right: Extracted JSON/Data */}
      <div className="flex flex-col gap-6 overflow-y-auto scrollbar-hide">
        <div className="bg-neon-500/10 border border-neon-500/30 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-neon-400" />
          <div>
            <h4 className="text-neon-300 font-semibold text-sm">Extraction Complete</h4>
            <p className="text-zinc-400 text-xs mt-0.5">Confidence Score: 98.4%</p>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
            <Table className="h-4 w-4 text-zinc-400" />
            Extracted Lab Results
          </h3>
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 border-b border-white/5">
              <tr><th className="pb-2">Test</th><th className="pb-2">Value</th><th className="pb-2">Flag</th></tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              <tr><td className="py-3">Hemoglobin A1c</td><td className="py-3 font-mono">5.4 %</td><td className="py-3"><span className="text-xs bg-white/10 px-2 py-1 rounded">Normal</span></td></tr>
              <tr><td className="py-3">LDL Cholesterol</td><td className="py-3 font-mono">92 mg/dL</td><td className="py-3"><span className="text-xs bg-white/10 px-2 py-1 rounded">Normal</span></td></tr>
            </tbody>
          </table>
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
            <Tags className="h-4 w-4 text-zinc-400" />
            ICD-10 Mappings
          </h3>
          <div className="flex flex-wrap gap-2">
            <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center gap-3">
              <span className="text-xs font-semibold text-zinc-300">Type 2 Diabetes</span>
              <span className="text-xs font-mono text-neon-400 bg-neon-500/10 px-1.5 rounded">E11.9</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center gap-3">
              <span className="text-xs font-semibold text-zinc-300">Hypertension</span>
              <span className="text-xs font-mono text-neon-400 bg-neon-500/10 px-1.5 rounded">I10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
