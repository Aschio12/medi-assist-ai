'use client';

import React, { useState } from 'react';
import { triggerVolumeRender } from '@/app/actions/dicom';
import { DicomViewer3D } from '@/components/dicom/DicomViewer3D';
import { DimseNetwork } from '@/components/dicom/DimseNetwork';
import { Box, Play } from 'lucide-react';

export default function DicomPacsDashboard() {
  const [renderResult, setRenderResult] = useState<any>(null);
  const [isRendering, setIsRendering] = useState(false);

  const handleRender = async () => {
    setIsRendering(true);
    const res = await triggerVolumeRender();
    setRenderResult(res);
    setIsRendering(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.15)] relative overflow-hidden bg-gradient-to-br from-black to-slate-900">
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center w-max gap-1">
              <Box className="h-3 w-3" /> Enterprise Imaging
            </span>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mt-2">
              DICOM PACS 3D Engine
            </h1>
            <p className="text-xs lg:text-sm text-cyan-200/60 mt-2 max-w-3xl">
              Strict NEMA standard DICOM parser and DIMSE network protocol simulator. Features hardware-accelerated Raycasting and Marching Cubes 3D Volume Rendering directly from raw slice metadata.
            </p>
          </div>
          <div>
             <button 
                onClick={handleRender} 
                disabled={isRendering} 
                className="flex items-center gap-2 bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/50 text-sm font-bold px-5 py-3 rounded-xl transition-all disabled:opacity-50"
             >
                <Play className={`h-4 w-4 ${isRendering ? 'animate-pulse' : ''}`} /> 
                {isRendering ? 'Processing Raycast...' : 'Render 3D Volume'}
             </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        {/* Left Column - 3D Viewer (takes up 2 cols) */}
        <div className="h-full lg:col-span-2">
           <DicomViewer3D renderResult={renderResult} />
        </div>

        {/* Right - DIMSE Network */}
        <div className="h-full">
           <DimseNetwork />
        </div>
      </div>

    </div>
  );
}
