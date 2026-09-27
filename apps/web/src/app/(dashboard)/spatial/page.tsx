'use client';

import React, { useState } from 'react';
import { reconstructDicomToMesh } from '@/app/actions/spatial';
import { WebXrViewer } from '@/components/spatial/WebXrViewer';
import { SurgicalPathways } from '@/components/spatial/SurgicalPathways';
import { DicomUploadForm } from '@/components/spatial/DicomUploadForm';
import { Box, Loader2 } from 'lucide-react';

export default function SpatialDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    // Simulate analyzing a brain MRI
    const res = await reconstructDicomToMesh("PT-104-XR", "Brain");
    setData(res);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden bg-gradient-to-b from-[#1a0b2e] to-black">
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center w-max gap-1">
              <Box className="h-3 w-3" /> Medical XR
            </span>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mt-2">
              Spatial Computing & Surgical AR
            </h1>
            <p className="text-xs lg:text-sm text-purple-200/60 mt-2 max-w-3xl">
              MONAI-driven 3D reconstruction from 2D DICOM slices. Generates interactive holographic meshes and computes collision-free surgical pathways.
            </p>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-mono text-purple-400/50 mb-1">PATIENT ID</div>
             <div className="text-sm font-bold text-white font-mono bg-white/5 px-3 py-1 rounded border border-white/10">PT-104-XR</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Left Column - 3D Viewer */}
        <div className="lg:col-span-2 h-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full glass-panel rounded-3xl border-purple-500/20 bg-[#0a0a0a]">
               <Loader2 className="h-10 w-10 text-purple-500 animate-spin mb-4" />
               <p className="text-purple-300/60 text-sm font-mono">Running MONAI 3D U-Net Segmentation...</p>
               <p className="text-purple-300/40 text-xs mt-2">Extracting Marching Cubes Mesh</p>
            </div>
          ) : data ? (
            <WebXrViewer meshData={data.mesh} targetOrgan="Brain" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full glass-panel rounded-3xl border-dashed border-white/20 bg-black/40">
               <Box className="h-16 w-16 text-white/10 mb-4" />
               <p className="text-zinc-500 text-sm">Upload a DICOM series to begin 3D reconstruction.</p>
            </div>
          )}
        </div>

        {/* Right Column - Controls & Data */}
        <div className="flex flex-col gap-6 h-full">
           <div className="flex-none">
             <DicomUploadForm onAnalyze={handleAnalyze} loading={loading} />
           </div>
           
           <div className="flex-1 overflow-hidden opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards" style={{ animationDelay: data ? '0.2s' : '0s' }}>
             {data ? (
                <SurgicalPathways plan={data.surgical_plan} />
             ) : (
                <div className="glass-panel rounded-3xl border-white/5 h-full flex items-center justify-center">
                  <p className="text-xs text-zinc-600">Surgical path constraints pending...</p>
                </div>
             )}
           </div>
        </div>
      </div>

    </div>
  );
}
