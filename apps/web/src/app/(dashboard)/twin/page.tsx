import { UserScan } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ClinicalMetricsOverlay } from '@/components/twin/ClinicalMetricsOverlay';
import { OrganSelector } from '@/components/twin/OrganSelector';

// Disable SSR for Three.js canvas to prevent hydration mismatch
const AnatomyCanvas = dynamic(
  () => import('@/components/twin/AnatomyCanvas').then((mod) => mod.AnatomyCanvas),
  { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-3xl animate-pulse"><span className="text-neon-400 font-mono text-sm">Initializing WebGL Engine...</span></div> }
);

export default function DigitalTwinPage() {
  return (
    <div className="h-full w-full p-8 flex flex-col relative z-10 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
            <UserScan className="h-6 w-6 text-neon-400" />
            3D Digital Twin (James Wilson)
          </h1>
          <p className="text-zinc-400 text-sm mt-2">Real-time anatomical mapping powered by telemetry and ML inference.</p>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <ClinicalMetricsOverlay />
          <OrganSelector />
        </div>
        
        {/* 3D Canvas */}
        <div className="lg:col-span-3 glass-panel rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-black/80">
          <AnatomyCanvas />
          
          {/* Overlay text on canvas */}
          <div className="absolute bottom-6 left-6 pointer-events-none">
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Rendering Mode</p>
              <p className="text-neon-400 font-mono text-sm">Holographic Wireframe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
