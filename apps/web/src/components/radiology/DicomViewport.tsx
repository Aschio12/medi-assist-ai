'use client';
import { useState, useRef } from 'react';
import { DicomStudy, BoundingBox } from '@/app/actions/vision';
import { VisionOverlays } from './VisionOverlays';
import { MeasurementCalipers } from './MeasurementCalipers';

interface DicomViewportProps {
  study: DicomStudy;
  windowWidth: number;
  windowLevel: number;
  showAiBoxes: boolean;
  showSegmentations: boolean;
  isInverted: boolean;
  zoom: number;
  activeBoxId?: string;
  onSelectBox?: (box: BoundingBox) => void;
}

export function DicomViewport({
  study,
  windowWidth,
  windowLevel,
  showAiBoxes,
  showSegmentations,
  isInverted,
  zoom,
  activeBoxId,
  onSelectBox
}: DicomViewportProps) {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoverHU, setHoverHU] = useState<number>(45);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
    // Dynamic HU estimation based on cursor position
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    
    // Simulate HU based on region (e.g. lung periphery is negative, consolidation is +40, ribs +600)
    if (relX > 0.55 && relX < 0.8 && relY > 0.5 && relY < 0.75) {
      setHoverHU(Math.floor(35 + Math.random() * 20)); // Consolidation
    } else if (relY < 0.2 || relX < 0.2 || relX > 0.8) {
      setHoverHU(Math.floor(450 + Math.random() * 150)); // Bone / rib
    } else {
      setHoverHU(Math.floor(-650 + Math.random() * 80)); // Normal aerated lung
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Contrast calculation based on Window Width & Window Level
  const contrastFactor = Math.min(2.5, Math.max(0.5, 2000 / Math.max(100, windowWidth)));
  const brightnessOffset = Math.min(1.5, Math.max(0.6, (windowLevel + 1000) / 1000));

  return (
    <div 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="w-full h-full min-h-[500px] bg-black rounded-3xl border border-white/10 relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* HU & Measurement Calipers HUD */}
      <MeasurementCalipers currentHU={hoverHU} />

      {/* Grid overlay for medical measurement */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      {/* Main Medical Image Viewport Container */}
      <div 
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transition: isDragging ? 'none' : 'transform 0.15s ease-out'
        }}
        className="relative w-[480px] h-[480px] sm:w-[540px] sm:h-[540px] flex items-center justify-center"
      >
        {/* Procedural High-Fidelity Radiograph Render */}
        <div 
          style={{
            filter: `contrast(${contrastFactor}) brightness(${brightnessOffset}) ${isInverted ? 'invert(1)' : ''}`,
            transition: 'filter 0.2s ease-out'
          }}
          className="w-full h-full rounded-2xl bg-zinc-900 overflow-hidden relative shadow-2xl border border-white/5 flex items-center justify-center"
        >
          {study.study_id === 'study-cxr-pneumonia-01' ? (
            /* Chest Radiograph Anatomy Silhouette */
            <div className="w-full h-full relative bg-radial from-zinc-800 to-black p-4 flex items-center justify-center">
              {/* Lungs Cavity (Dark Aerated Fields) */}
              <div className="absolute w-[80%] h-[75%] flex justify-between px-6">
                {/* Left Lung Field */}
                <div className="w-[42%] h-full rounded-[40px_10px_60px_30px] bg-gradient-to-b from-black via-zinc-950 to-zinc-900 border border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-400 via-transparent to-transparent"></div>
                </div>

                {/* Right Lung Field (with Dense Consolidation Infiltrate) */}
                <div className="w-[42%] h-full rounded-[10px_40px_30px_60px] bg-gradient-to-b from-black via-zinc-950 to-zinc-900 border border-white/5 relative overflow-hidden">
                  {/* RLL Consolidation Opacity */}
                  <div className="absolute bottom-4 right-2 w-28 h-24 rounded-full bg-gradient-to-tr from-zinc-300 via-zinc-400 to-transparent opacity-80 blur-sm"></div>
                  {/* Small Pleural Effusion Meniscus */}
                  <div className="absolute bottom-0 right-0 w-16 h-8 bg-zinc-300 opacity-90 rounded-tl-full blur-[1px]"></div>
                </div>
              </div>

              {/* Central Cardiac Silhouette (Heart) & Mediastinum */}
              <div className="w-36 h-48 rounded-[30px_50px_60px_40px] bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-200 opacity-90 shadow-inner blur-[1px] relative z-10 -mr-6"></div>

              {/* Spine Column & Rib Arcs */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-around items-center opacity-25">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-3/4 h-3 rounded-full border-t border-b border-zinc-400"></div>
                ))}
              </div>
            </div>
          ) : (
            /* Brain Axial MRI Silhouette */
            <div className="w-full h-full relative bg-black flex items-center justify-center p-6">
              {/* Cranium / Skull Contour */}
              <div className="w-[85%] h-[90%] rounded-[120px] bg-zinc-950 border-4 border-zinc-400 relative overflow-hidden flex items-center justify-center">
                {/* Brain Hemispheres */}
                <div className="w-full h-full flex divide-x divide-zinc-700/50 p-3">
                  {/* Left Hemisphere (with Necrotic Ring Lesion) */}
                  <div className="w-1/2 h-full relative p-4">
                    {/* Ring-enhancing tumor core */}
                    <div className="absolute top-16 left-6 w-28 h-28 rounded-full border-4 border-zinc-200 bg-zinc-950 shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-black"></div>
                    </div>
                    {/* Vasogenic Edema FLAIR halo */}
                    <div className="absolute top-10 left-2 w-36 h-36 rounded-full bg-zinc-400 opacity-40 blur-md pointer-events-none"></div>
                  </div>

                  {/* Right Hemisphere (Normal Anatomy) */}
                  <div className="w-1/2 h-full relative p-4 bg-radial from-zinc-800 to-zinc-950">
                    <div className="w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-400 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Vision Overlays (Bounding Boxes & Segmentation Contours) */}
        <VisionOverlays
          boundingBoxes={study.bounding_boxes}
          segmentations={study.segmentations}
          showAiBoxes={showAiBoxes}
          showSegmentations={showSegmentations}
          activeBoxId={activeBoxId}
          onSelectBox={onSelectBox}
        />
      </div>

      {/* Viewport Meta Badges in corners */}
      <div className="absolute bottom-4 left-4 z-30 pointer-events-none">
        <div className="bg-black/80 px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono text-zinc-400">
          <span>Patient: <strong className="text-white">{study.patient_name}</strong></span> | <span>ID: <strong className="text-neon-400">{study.patient_id}</strong></span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-30 pointer-events-none">
        <div className="bg-black/80 px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono text-zinc-400">
          <span>Modality: <strong className="text-cyan-400">{study.modality}</strong></span>
        </div>
      </div>
    </div>
  );
}
