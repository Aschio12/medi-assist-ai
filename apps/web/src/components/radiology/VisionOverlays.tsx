'use client';
import { BoundingBox, SegmentationContour } from '@/app/actions/vision';
import { AlertCircle, Target, Sparkles } from 'lucide-react';

interface VisionOverlaysProps {
  boundingBoxes: BoundingBox[];
  segmentations: SegmentationContour[];
  showAiBoxes: boolean;
  showSegmentations: boolean;
  activeBoxId?: string;
  onSelectBox?: (box: BoundingBox) => void;
}

export function VisionOverlays({
  boundingBoxes,
  segmentations,
  showAiBoxes,
  showSegmentations,
  activeBoxId,
  onSelectBox
}: VisionOverlaysProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* 1. Segmentation Polygon Masks (SVG) */}
      {showSegmentations && (
        <svg className="w-full h-full absolute inset-0">
          {segmentations.map((seg) => {
            const pointsString = seg.points.map(p => `${p[0]}%,${p[1]}%`).join(' ');
            return (
              <polygon
                key={seg.id}
                points={pointsString}
                fill={seg.color}
                fillOpacity={seg.opacity}
                stroke={seg.color}
                strokeWidth="2"
                strokeDasharray="4 2"
                className="animate-pulse"
              />
            );
          })}
        </svg>
      )}

      {/* 2. AI Vision Bounding Boxes */}
      {showAiBoxes && boundingBoxes.map((box) => {
        const isSelected = activeBoxId === box.id;
        
        return (
          <div
            key={box.id}
            onClick={() => onSelectBox?.(box)}
            style={{
              left: `${box.x}%`,
              top: `${box.y}%`,
              width: `${box.width}%`,
              height: `${box.height}%`,
              borderColor: box.color
            }}
            className={`absolute border-2 rounded-xl pointer-events-auto cursor-pointer transition-all duration-200 ${
              isSelected ? 'shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-[1.02]' : 'hover:scale-[1.01]'
            }`}
          >
            {/* Box Header Badge */}
            <div 
              style={{ backgroundColor: box.color }}
              className="absolute -top-7 left-0 px-2 py-0.5 rounded text-black font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md whitespace-nowrap"
            >
              <Target className="h-3 w-3" />
              <span>{box.label}</span>
              <span className="opacity-90">({(box.confidence * 100).toFixed(0)}%)</span>
            </div>

            {/* Corner Crosshair Accents */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: box.color }}></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2" style={{ borderColor: box.color }}></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2" style={{ borderColor: box.color }}></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: box.color }}></div>
          </div>
        );
      })}
    </div>
  );
}
