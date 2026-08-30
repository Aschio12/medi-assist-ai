'use client';
import { useState } from 'react';
import { SimplifiedNote } from '@/app/actions/patient_portal';
import { FileText, Sparkles, BookOpen, Volume2, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface NoteSimplifierProps {
  note: SimplifiedNote;
}

export function NoteSimplifier({ note }: NoteSimplifierProps) {
  const [viewMode, setViewMode] = useState<'plain' | 'side-by-side'>('plain');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(note.summary_paragraph);
        utterance.rate = 0.95;
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5">
      {/* Header & Reading Level Gauges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-neon-500/20 rounded-2xl border border-neon-500/30 text-neon-400">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">"Translate My Doctor's Note"</h3>
            <p className="text-zinc-400 text-xs mt-0.5">Plain-English health translation with Flesch-Kincaid scoring</p>
          </div>
        </div>

        {/* Flesch-Kincaid Reading Grade Gauge */}
        <div className="flex items-center gap-3 bg-black/60 border border-white/10 p-2 rounded-2xl">
          <div className="text-right px-2">
            <span className="text-[9px] uppercase font-mono text-zinc-500 font-bold block">Doctor Note Grade</span>
            <span className="text-xs font-mono font-bold text-red-400">Grade {note.original_reading_grade} (College)</span>
          </div>

          <span className="text-zinc-600">➔</span>

          <div className="text-left px-2">
            <span className="text-[9px] uppercase font-mono text-zinc-500 font-bold block">Translated Plain Grade</span>
            <span className="text-xs font-mono font-bold text-neon-400">Grade {note.simplified_reading_grade} (5th Grade)</span>
          </div>
        </div>
      </div>

      {/* Summary Audio & Actions */}
      <div className="p-4 rounded-2xl bg-neon-500/10 border border-neon-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-zinc-200 leading-relaxed max-w-2xl font-medium">
          {note.summary_paragraph}
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-3 py-2 bg-neon-500 text-black font-bold text-xs rounded-xl hover:bg-neon-400 transition-all shadow-[0_0_10px_rgba(163,230,53,0.3)]"
          >
            <Volume2 className="h-3.5 w-3.5" />
            <span>{isSpeaking ? 'Pause Audio' : 'Listen to Summary'}</span>
          </button>
        </div>
      </div>

      {/* Section by Section Breakdown */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider">
          Sentence-by-Sentence Breakdown
        </h4>

        {note.sections.map((section, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <h5 className="font-bold text-white text-xs">{section.title}</h5>
              <span className="text-[10px] font-mono text-neon-400 font-bold bg-neon-500/10 px-2 py-0.5 rounded">
                Key Takeaway
              </span>
            </div>

            {/* Plain English Translation */}
            <p className="text-xs text-zinc-200 leading-relaxed font-normal bg-white/5 p-3 rounded-xl border border-white/5">
              {section.patient_text}
            </p>

            {/* Original Doctor Jargon */}
            <details className="text-[11px] text-zinc-500 cursor-pointer pt-1">
              <summary className="hover:text-zinc-400 transition-colors font-mono">
                View Original Medical Jargon (Doctor's Note)
              </summary>
              <p className="mt-1.5 p-2.5 bg-black/60 rounded-lg border border-white/5 font-mono text-zinc-400 text-[10px] leading-relaxed">
                {section.doctor_text}
              </p>
            </details>
          </div>
        ))}
      </div>

      {/* Action Items for Patient Checklist */}
      <div className="p-4 bg-black/60 border border-white/10 rounded-2xl space-y-2">
        <span className="text-[10px] font-mono uppercase font-bold text-neon-400 block">
          What You Need To Do Today:
        </span>
        <div className="space-y-1.5">
          {note.action_items_for_patient.map((item, idx) => (
            <div key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
