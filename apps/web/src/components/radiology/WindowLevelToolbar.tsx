'use client';
import { Sliders, Sun, Contrast, RotateCcw, ZoomIn, ZoomOut, Move, Eye, EyeOff, Layers } from 'lucide-react';

export interface WindowPreset {
  id: string;
  name: string;
  windowWidth: number;
  windowLevel: number;
  iconLabel: string;
}

export const WINDOW_PRESETS: WindowPreset[] = [
  { id: "lung", name: "Lung Window", windowWidth: 1500, windowLevel: -600, iconLabel: "LUNG" },
  { id: "soft", name: "Soft Tissue", windowWidth: 400, windowLevel: 40, iconLabel: "SOFT" },
  { id: "bone", name: "Bone Window", windowWidth: 2000, windowLevel: 500, iconLabel: "BONE" },
  { id: "brain", name: "Brain Window", windowWidth: 80, windowLevel: 40, iconLabel: "BRAIN" }
];

interface WindowLevelToolbarProps {
  currentWidth: number;
  currentLevel: number;
  onApplyPreset: (preset: WindowPreset) => void;
  showAiBoxes: boolean;
  onToggleAiBoxes: () => void;
  showSegmentations: boolean;
  onToggleSegmentations: () => void;
  isInverted: boolean;
  onToggleInvert: () => void;
  onReset: () => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function WindowLevelToolbar({
  currentWidth,
  currentLevel,
  onApplyPreset,
  showAiBoxes,
  onToggleAiBoxes,
  showSegmentations,
  onToggleSegmentations,
  isInverted,
  onToggleInvert,
  onReset,
  zoom,
  onZoomIn,
  onZoomOut
}: WindowLevelToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-xs">
      {/* Preset Windows */}
      <div className="flex items-center gap-1.5">
        <span className="text-zinc-500 font-mono uppercase font-bold text-[10px] mr-1 hidden sm:inline">W/L Presets:</span>
        {WINDOW_PRESETS.map((p) => {
          const isActive = currentWidth === p.windowWidth && currentLevel === p.windowLevel;
          return (
            <button
              key={p.id}
              onClick={() => onApplyPreset(p)}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold uppercase transition-all ${
                isActive
                  ? 'bg-neon-500 text-black shadow-[0_0_12px_rgba(163,230,53,0.4)]'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {p.iconLabel}
            </button>
          );
        })}
      </div>

      {/* Numerical W/L HUD */}
      <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] text-zinc-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
        <span>W: <strong className="text-neon-400">{currentWidth}</strong></span>
        <span>L: <strong className="text-cyan-400">{currentLevel}</strong></span>
        <span>Zoom: <strong className="text-white">{(zoom * 100).toFixed(0)}%</strong></span>
      </div>

      {/* Viewport Action Tools */}
      <div className="flex items-center gap-1.5">
        {/* Zoom Controls */}
        <button 
          onClick={onZoomIn}
          title="Zoom In"
          className="p-2 rounded-xl bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/5 transition-colors"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button 
          onClick={onZoomOut}
          title="Zoom Out"
          className="p-2 rounded-xl bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/5 transition-colors"
        >
          <ZoomOut className="h-4 w-4" />
        </button>

        {/* Invert */}
        <button 
          onClick={onToggleInvert}
          title="Invert Grayscale"
          className={`p-2 rounded-xl border transition-colors ${
            isInverted ? 'bg-neon-500/20 text-neon-400 border-neon-500/40' : 'bg-white/5 text-zinc-300 border-white/5 hover:text-white'
          }`}
        >
          <Contrast className="h-4 w-4" />
        </button>

        {/* AI Bounding Boxes Toggle */}
        <button
          onClick={onToggleAiBoxes}
          title="Toggle AI Bounding Boxes"
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all ${
            showAiBoxes
              ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
              : 'bg-white/5 text-zinc-400 border-white/5 hover:text-white'
          }`}
        >
          <Eye className="h-3.5 w-3.5" />
          <span>AI Boxes</span>
        </button>

        {/* AI Segmentation Overlays */}
        <button
          onClick={onToggleSegmentations}
          title="Toggle Segmentation Contours"
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all ${
            showSegmentations
              ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
              : 'bg-white/5 text-zinc-400 border-white/5 hover:text-white'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Seg Mask</span>
        </button>

        {/* Reset View */}
        <button 
          onClick={onReset}
          title="Reset Viewport"
          className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
