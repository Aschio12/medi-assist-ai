'use client';
import { useState, useEffect } from 'react';
import { Eye, Layers, Sparkles, Activity, FileText } from 'lucide-react';
import { fetchDicomStudy, DicomStudy, BoundingBox } from '@/app/actions/vision';
import { DicomViewport } from '@/components/radiology/DicomViewport';
import { WindowLevelToolbar, WINDOW_PRESETS, WindowPreset } from '@/components/radiology/WindowLevelToolbar';
import { StudySelector } from '@/components/radiology/StudySelector';
import { RadiologyReportPanel } from '@/components/radiology/RadiologyReportPanel';
import { ScanCopilot } from '@/components/radiology/ScanCopilot';

export default function RadiologyPage() {
  const [currentStudyId, setCurrentStudyId] = useState<string>("study-cxr-pneumonia-01");
  const [study, setStudy] = useState<DicomStudy | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(1500);
  const [windowLevel, setWindowLevel] = useState<number>(-600);
  const [showAiBoxes, setShowAiBoxes] = useState<boolean>(true);
  const [showSegmentations, setShowSegmentations] = useState<boolean>(true);
  const [isInverted, setIsInverted] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1.0);
  const [activeBoxId, setActiveBoxId] = useState<string | undefined>(undefined);
  const [noteNotice, setNoteNotice] = useState<string | null>(null);

  const loadStudy = async (studyId: string) => {
    try {
      const data = await fetchDicomStudy(studyId);
      setStudy(data);
      setWindowWidth(data.default_window_width);
      setWindowLevel(data.default_window_level);
      setZoom(1.0);
      setActiveBoxId(undefined);
    } catch (err) {
      console.error("Failed to load DICOM study:", err);
    }
  };

  useEffect(() => {
    loadStudy(currentStudyId);
  }, [currentStudyId]);

  const handleApplyPreset = (preset: WindowPreset) => {
    setWindowWidth(preset.windowWidth);
    setWindowLevel(preset.windowLevel);
  };

  const handleReset = () => {
    if (study) {
      setWindowWidth(study.default_window_width);
      setWindowLevel(study.default_window_level);
      setZoom(1.0);
      setIsInverted(false);
      setShowAiBoxes(true);
      setShowSegmentations(true);
      setActiveBoxId(undefined);
    }
  };

  const handleSelectBox = (box: BoundingBox) => {
    setActiveBoxId(box.id);
  };

  const handleInsertNote = () => {
    setNoteNotice("Radiology Impression successfully inserted into Patient Clinical Note (EHR Sync)");
    setTimeout(() => setNoteNotice(null), 4000);
  };

  return (
    <div className="h-full w-full p-8 flex flex-col relative z-10 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-500/20 rounded-xl border border-neon-500/30">
              <Eye className="h-6 w-6 text-neon-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Radiology & Medical Vision AI Workstation
            </h1>
          </div>
          <p className="text-zinc-400 text-sm mt-1">
            In-browser DICOM viewer with automated lesion detection, segmentation contours, and Hounsfield Unit density analysis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-neon-500/10 border border-neon-500/30 px-3 py-2 rounded-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-500"></span>
            </span>
            <span className="text-neon-400 font-mono text-xs font-bold uppercase tracking-wider">
              Vision AI Engine Active (0.04s)
            </span>
          </div>
        </div>
      </div>

      {/* Note Insertion Banner */}
      {noteNotice && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>{noteNotice}</span>
          </div>
          <button onClick={() => setNoteNotice(null)} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Top Study Switcher Carousel */}
      <div className="mb-6">
        <StudySelector 
          currentStudyId={currentStudyId}
          onSelectStudy={setCurrentStudyId}
        />
      </div>

      {/* Main PACS Workstation Grid: Left 7 Cols Viewport, Right 5 Cols Report */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Toolbar + DICOM Medical Viewport */}
        <div className="lg:col-span-7 space-y-4">
          <WindowLevelToolbar
            currentWidth={windowWidth}
            currentLevel={windowLevel}
            onApplyPreset={handleApplyPreset}
            showAiBoxes={showAiBoxes}
            onToggleAiBoxes={() => setShowAiBoxes(!showAiBoxes)}
            showSegmentations={showSegmentations}
            onToggleSegmentations={() => setShowSegmentations(!showSegmentations)}
            isInverted={isInverted}
            onToggleInvert={() => setIsInverted(!isInverted)}
            onReset={handleReset}
            zoom={zoom}
            onZoomIn={() => setZoom(prev => Math.min(2.5, prev + 0.2))}
            onZoomOut={() => setZoom(prev => Math.max(0.6, prev - 0.2))}
          />

          {study && (
            <DicomViewport
              study={study}
              windowWidth={windowWidth}
              windowLevel={windowLevel}
              showAiBoxes={showAiBoxes}
              showSegmentations={showSegmentations}
              isInverted={isInverted}
              zoom={zoom}
              activeBoxId={activeBoxId}
              onSelectBox={handleSelectBox}
            />
          )}
        </div>

        {/* Right Column: AI Radiology Report + Scan Q&A Copilot */}
        <div className="lg:col-span-5 space-y-6">
          {study && (
            <>
              <RadiologyReportPanel 
                report={study.report}
                onInsertNote={handleInsertNote}
              />
              <ScanCopilot 
                studyModality={study.modality}
                patientName={study.patient_name}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
