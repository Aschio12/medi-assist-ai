'use client';
import { Ruler, Activity, Crosshair } from 'lucide-react';

interface MeasurementCalipersProps {
  cursorPosition?: { x: number; y: number };
  currentHU?: number;
  rulerActive?: boolean;
}

export function MeasurementCalipers({ cursorPosition, currentHU = 42, rulerActive }: MeasurementCalipersProps) {
  return (
    <div className="absolute top-4 left-4 z-30 pointer-events-none space-y-2">
      {/* Density Sampler (Hounsfield Units) */}
      <div className="bg-black/70 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-xs font-mono flex items-center gap-2">
        <Crosshair className="h-3.5 w-3.5 text-neon-400" />
        <span className="text-zinc-400">HU Density:</span>
        <span className={`font-bold ${currentHU > 200 ? 'text-amber-400' : currentHU < 0 ? 'text-cyan-400' : 'text-neon-400'}`}>
          {currentHU > 0 ? `+${currentHU}` : currentHU} HU
        </span>
        <span className="text-[10px] text-zinc-500">
          ({currentHU > 500 ? 'Cortical Bone' : currentHU > 40 ? 'Soft Tissue / Infiltrate' : currentHU < -400 ? 'Lung Parenchyma' : 'Fluid'})
        </span>
      </div>

      {/* Electronic Caliper Marker */}
      <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono flex items-center gap-2 text-zinc-300">
        <Ruler className="h-3.5 w-3.5 text-cyan-400" />
        <span>Lesion Diameter: <strong className="text-white">42.4 mm</strong></span>
      </div>
    </div>
  );
}
