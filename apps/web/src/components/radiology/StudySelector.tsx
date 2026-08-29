'use client';
import { Layers, FileImage, User, Calendar, Activity } from 'lucide-react';

interface StudySelectorProps {
  currentStudyId: string;
  onSelectStudy: (id: string) => void;
}

const AVAILABLE_STUDIES = [
  {
    id: "study-cxr-pneumonia-01",
    patientName: "Robert Chen",
    patientId: "PAT-98421",
    modality: "Chest PA X-Ray",
    indication: "Severe Pneumonia & Consolidation",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    badgeText: "ACUTE RLL PNEUMONIA"
  },
  {
    id: "study-mri-brain-02",
    patientName: "David Kim",
    patientId: "PAT-44910",
    modality: "Brain MRI (T1+C / FLAIR)",
    indication: "Glioblastoma vs Metastasis",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    badgeText: "RING-ENHANCING LESION"
  }
];

export function StudySelector({ currentStudyId, onSelectStudy }: StudySelectorProps) {
  return (
    <div className="glass-panel p-4 rounded-3xl border border-white/10 flex flex-col gap-3">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-neon-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">PACS DICOM Studies</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase">{AVAILABLE_STUDIES.length} Studies In Queue</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {AVAILABLE_STUDIES.map((study) => {
          const isSelected = currentStudyId === study.id;

          return (
            <div
              key={study.id}
              onClick={() => onSelectStudy(study.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-neon-500/10 border-neon-500/40 shadow-[0_0_15px_rgba(163,230,53,0.15)] scale-[1.01]'
                  : 'bg-black/40 border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <FileImage className={`h-4 w-4 ${isSelected ? 'text-neon-400' : 'text-zinc-400'}`} />
                  <div>
                    <h4 className="text-xs font-bold text-white">{study.patientName}</h4>
                    <p className="text-[10px] font-mono text-zinc-400">{study.patientId}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${study.badgeColor}`}>
                  {study.badgeText}
                </span>
              </div>

              <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                <span className="text-zinc-300 font-medium">{study.modality}</span>
                <span className="text-zinc-500 truncate max-w-[140px]">{study.indication}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
