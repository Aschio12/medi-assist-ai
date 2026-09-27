'use client';

import React from 'react';
import { UploadCloud, FileCog } from 'lucide-react';

export function DicomUploadForm({ onAnalyze, loading }: { onAnalyze: () => void, loading: boolean }) {
  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col justify-center items-center text-center">
      <div className="h-16 w-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 border border-purple-500/30">
        <UploadCloud className="h-8 w-8 text-purple-400" />
      </div>
      
      <h3 className="text-lg font-bold text-white mb-2">Upload DICOM Series</h3>
      <p className="text-xs text-zinc-400 max-w-sm mb-6">
        Securely upload raw CT or MRI slices. The Spatial Engine will use MONAI to segment the target organ and generate a 3D WebXR mesh.
      </p>

      <div className="w-full max-w-xs space-y-4">
        <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500">
          <option>Target: Brain (Glioblastoma)</option>
          <option>Target: Heart (Atrium)</option>
          <option>Target: Liver</option>
        </select>

        <button 
          onClick={onAnalyze}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
        >
          {loading ? (
             <>Processing Volume...</>
          ) : (
             <><FileCog className="h-4 w-4" /> Start 3D Reconstruction</>
          )}
        </button>
      </div>
    </div>
  );
}
