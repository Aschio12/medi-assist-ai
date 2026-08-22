import { Loader2, ScanSearch, Database, Tags } from 'lucide-react';

export function ProcessingStatus({ fileName }: { fileName: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-10 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 bg-neon-400 w-full animate-[pulse_2s_ease-in-out_infinite]"></div>
        
        <h3 className="text-lg font-semibold text-white mb-8 flex items-center justify-center gap-3">
          <Loader2 className="h-5 w-5 text-neon-400 animate-spin" />
          Processing {fileName}...
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-zinc-300">
            <div className="h-8 w-8 rounded-full bg-neon-500/20 flex items-center justify-center"><ScanSearch className="h-4 w-4 text-neon-400" /></div>
            <span className="font-medium">Running Tesseract OCR Engine</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500 opacity-50">
            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10"><Database className="h-4 w-4" /></div>
            <span>Extracting Semantic Tables</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500 opacity-50">
            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10"><Tags className="h-4 w-4" /></div>
            <span>Mapping ICD-10 Ontologies</span>
          </div>
        </div>
      </div>
    </div>
  );
}
