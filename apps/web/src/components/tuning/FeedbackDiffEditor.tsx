'use client';

import React, { useState } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  RefreshCw, 
  FileEdit, 
  AlertOctagon,
  Stethoscope,
  Info
} from 'lucide-react';
import { submitClinicianCorrection, ClinicianFeedback } from '@/app/actions/tuning';

interface PresetCase {
  id: string;
  label: string;
  badge: string;
  physicianName: string;
  specialty: string;
  clinicalPrompt: string;
  aiOriginalOutput: string;
  defaultCorrection: string;
  defaultCategory: string;
  defaultRationale: string;
  defaultRating: 'THUMBS_DOWN' | 'THUMBS_UP';
}

const PRESET_CASES: PresetCase[] = [
  {
    id: 'case-1',
    label: 'Case #1: Sepsis + Anaphylaxis',
    badge: 'Beta-Lactam Risk',
    physicianName: 'Dr. Alex Rivera, MD',
    specialty: 'Critical Care & Pulmonology',
    clinicalPrompt: 'Recommend empirical antibiotic regimen for 68yo male with severe sepsis (MAP 60 mmHg, Lactate 3.8 mmol/L) and right lower lobe pneumonia. History indicates prior ICU admission for drug-induced anaphylaxis.',
    aiOriginalOutput: 'Administer IV Piperacillin-Tazobactam (Zosyn) 3.375g q6h combined with Vancomycin 15mg/kg IV loading dose. Initiate norepinephrine infusion for septic shock if fluid bolus fails to achieve MAP > 65 mmHg.',
    defaultCorrection: 'CRITICAL SAFETY CONTRAINDICATION: Patient has documented severe IgE-mediated beta-lactam anaphylaxis and concurrent AKI (Cr 2.4 mg/dL). Avoid Piperacillin-Tazobactam. Administer IV Aztreonam 1g q8h (renal-dosed monobactam) plus IV Levofloxacin 500mg initial dose, combined with Vancomycin with AUC-guided therapeutic drug monitoring.',
    defaultCategory: 'MEDICATION_ALLERGY',
    defaultRationale: 'Model failed to verify allergy flags for penicillin-class beta-lactams, which poses immediate risk of fatal anaphylactic shock. Substituted monobactam (Aztreonam) with zero cross-reactivity.',
    defaultRating: 'THUMBS_DOWN'
  },
  {
    id: 'case-2',
    label: 'Case #2: Acute Kidney Injury',
    badge: 'Nephrotoxic Risk',
    physicianName: 'Dr. Sarah Jenkins, MD',
    specialty: 'Nephrology & Internal Medicine',
    clinicalPrompt: 'Evaluate medication regimen for 74yo female with Type 2 Diabetes admitted with acute pyelonephritis and acute kidney injury (serum creatinine spiked from baseline 0.9 to 2.6 mg/dL; eGFR 22 mL/min).',
    aiOriginalOutput: 'Maintain outpatient regimen of Metformin 1000mg BID and Lisinopril 20mg daily to ensure glycaemic and blood pressure targets are maintained. Add Ciprofloxacin 400mg IV q12h.',
    defaultCorrection: 'CRITICAL SAFETY HOLD: Immediately suspend Metformin due to high risk of fatal metformin-associated lactic acidosis (MALA) with eGFR < 30. Discontinue Lisinopril (ACE-inhibitor) to stop efferent arteriolar vasodilation and worsening intra-renal hemodynamics. Adjust Ciprofloxacin to 200mg q12h or switch to Cefepime 1g q24h based on local antibiogram.',
    defaultCategory: 'DOSAGE_SAFETY',
    defaultRationale: 'Continuing Metformin and ACE-inhibitors during acute doubling of serum creatinine is a major patient safety violation violating KDIGO acute renal guidelines.',
    defaultRating: 'THUMBS_DOWN'
  },
  {
    id: 'case-3',
    label: 'Case #3: Surviving Sepsis Protocol',
    badge: 'Guideline Compliant',
    physicianName: 'Dr. Marcus Brody, MD',
    specialty: 'Infectious Disease',
    clinicalPrompt: 'Review 3-hour bundle resuscitation protocol for 61yo female presenting with septic shock secondary to acute cholangitis (BP 82/48, HR 126, Lactate 4.2).',
    aiOriginalOutput: '1. Measure blood lactate level; 2. Obtain blood cultures prior to administration of antibiotics; 3. Administer broad-spectrum empiric antibiotics (Meropenem 1g IV); 4. Administer 30 mL/kg balanced crystalloids (Plasma-Lyte 2100 mL) within first 3 hours; 5. Initiate Norepinephrine if MAP remains < 65 mmHg.',
    defaultCorrection: '1. Measure blood lactate level; 2. Obtain blood cultures prior to administration of antibiotics; 3. Administer broad-spectrum empiric antibiotics (Meropenem 1g IV); 4. Administer 30 mL/kg balanced crystalloids (Plasma-Lyte 2100 mL) within first 3 hours; 5. Initiate Norepinephrine if MAP remains < 65 mmHg.',
    defaultCategory: 'CLINICAL_GUIDELINE_VIOLATION',
    defaultRationale: 'Fully adheres to Surviving Sepsis Campaign 2021 guidelines and emergent ER resuscitation timing benchmarks.',
    defaultRating: 'THUMBS_UP'
  }
];

const CATEGORIES = [
  { id: 'MEDICATION_ALLERGY', label: 'Medication Allergy / Cross-Reactivity' },
  { id: 'DOSAGE_SAFETY', label: 'Renal / Hepatic Dosage Safety' },
  { id: 'CONTRAINDICATION', label: 'Black Box / Clinical Contraindication' },
  { id: 'CLINICAL_GUIDELINE_VIOLATION', label: 'Guideline Non-Compliance' },
  { id: 'DIAGNOSTIC_OMISSION', label: 'Diagnostic Omission' },
  { id: 'OTHER', label: 'Other Optimization' }
];

export function FeedbackDiffEditor({ onFeedbackSubmitted }: { onFeedbackSubmitted?: (fb: ClinicianFeedback) => void }) {
  const [selectedCase, setSelectedCase] = useState<PresetCase>(PRESET_CASES[0]);
  const [rating, setRating] = useState<'THUMBS_UP' | 'THUMBS_DOWN'>(PRESET_CASES[0].defaultRating);
  const [category, setCategory] = useState<string>(PRESET_CASES[0].defaultCategory);
  const [correctedText, setCorrectedText] = useState<string>(PRESET_CASES[0].defaultCorrection);
  const [rationale, setRationale] = useState<string>(PRESET_CASES[0].defaultRationale);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<ClinicianFeedback | null>(null);

  const handleCaseSelect = (item: PresetCase) => {
    setSelectedCase(item);
    setRating(item.defaultRating);
    setCategory(item.defaultCategory);
    setCorrectedText(item.defaultCorrection);
    setRationale(item.defaultRationale);
    setSubmissionSuccess(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await submitClinicianCorrection({
        physicianName: selectedCase.physicianName,
        specialty: selectedCase.specialty,
        clinicalPrompt: selectedCase.clinicalPrompt,
        aiOriginalOutput: selectedCase.aiOriginalOutput,
        rating: rating,
        correctionCategory: category,
        physicianCorrectedOutput: correctedText,
        rationale: rationale
      });
      setSubmissionSuccess(res);
      if (onFeedbackSubmitted) {
        onFeedbackSubmitted(res);
      }
    } catch (err) {
      console.error('Feedback submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-neon-500/30 neon-glow relative overflow-hidden bg-gradient-to-b from-black/85 to-black/95">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-neon-500/20 rounded-2xl border border-neon-500/30">
              <Stethoscope className="h-6 w-6 text-neon-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                Human-in-the-Loop Clinician Review Console
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                  Active HITL Gate
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Attending Reviewer: <span className="text-neon-300 font-medium">{selectedCase.physicianName}</span> • {selectedCase.specialty}
              </p>
            </div>
          </div>
        </div>

        {/* Case Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          {PRESET_CASES.map((item) => (
            <button
              key={item.id}
              onClick={() => handleCaseSelect(item)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all shrink-0 border ${
                selectedCase.id === item.id
                  ? 'bg-neon-500/20 border-neon-500/50 text-white shadow-[0_0_15px_rgba(163,230,53,0.25)]'
                  : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clinical Scenario Box */}
      <div className="mt-5 p-4 rounded-2xl bg-black/60 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase text-zinc-400 font-bold flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-cyan-400" />
            Clinical Input Prompt (EHR Context)
          </span>
          <span className="text-[10px] font-mono text-zinc-500">
            Tokens: ~{Math.round(selectedCase.clinicalPrompt.length / 4)}
          </span>
        </div>
        <p className="text-sm font-sans text-zinc-200 leading-relaxed">
          {selectedCase.clinicalPrompt}
        </p>
      </div>

      {/* Side-by-Side Diff Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Original AI LLM Output */}
        <div className="flex flex-col rounded-2xl bg-black/70 border border-red-500/30 overflow-hidden">
          <div className="px-4 py-3 bg-red-950/30 border-b border-red-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertOctagon className="h-4 w-4 text-red-400" />
              <span className="text-xs font-mono uppercase font-bold text-red-300">
                Original AI Output (Candidate)
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
              REJECTED / UNVALIDATED
            </span>
          </div>
          <div className="p-4 flex-1">
            <p className="text-sm font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed">
              {selectedCase.aiOriginalOutput}
            </p>
          </div>
          <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
            <span>Base Model: Meta-Llama-3.1-8B-Instruct</span>
            <span className="text-red-400 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> Flagged for Human Overrule
            </span>
          </div>
        </div>

        {/* Right: Clinician Correction */}
        <div className="flex flex-col rounded-2xl bg-black/70 border border-neon-500/40 overflow-hidden shadow-[0_0_20px_rgba(163,230,53,0.1)]">
          <div className="px-4 py-3 bg-neon-950/30 border-b border-neon-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileEdit className="h-4 w-4 text-neon-400" />
              <span className="text-xs font-mono uppercase font-bold text-neon-300">
                Attending Physician Corrected Output (Ground Truth)
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neon-500/20 text-neon-300 border border-neon-500/40">
              CHOSEN DPO TARGET
            </span>
          </div>
          <div className="p-3 flex-1 flex flex-col">
            <textarea
              value={correctedText}
              onChange={(e) => setCorrectedText(e.target.value)}
              rows={5}
              className="w-full h-full p-3 rounded-xl bg-black/80 border border-neon-500/30 text-sm font-mono text-white focus:outline-none focus:border-neon-400 transition-colors resize-none leading-relaxed"
              placeholder="Provide exact clinical ground-truth regimen..."
            />
          </div>
          <div className="px-3 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
            <span className="text-neon-400 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Ready for LoRA DPO Pair Generation
            </span>
            <span className="font-mono text-[10px] text-zinc-500">
              Characters: {correctedText.length}
            </span>
          </div>
        </div>
      </div>

      {/* Review Metadata & Controls Bar */}
      <div className="mt-6 p-5 rounded-2xl bg-black/60 border border-white/10 flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between">
        {/* Rating buttons */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase text-zinc-400 font-bold">
            Clinical Judgment:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRating('THUMBS_DOWN')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                rating === 'THUMBS_DOWN'
                  ? 'bg-red-500/20 text-red-300 border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'bg-black/40 text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              <ThumbsDown className="h-4 w-4 text-red-400" />
              Overrule AI (Correction Needed)
            </button>
            <button
              onClick={() => setRating('THUMBS_UP')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                rating === 'THUMBS_UP'
                  ? 'bg-neon-500/20 text-neon-300 border-neon-500/60 shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                  : 'bg-black/40 text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              <ThumbsUp className="h-4 w-4 text-neon-400" />
              Approve Model
            </button>
          </div>
        </div>

        {/* Category selector */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <span className="text-xs font-mono uppercase text-zinc-400 font-bold shrink-0">
            Error Class:
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-zinc-200 focus:outline-none focus:border-neon-400 w-full lg:w-auto"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rationale Input */}
      <div className="mt-4 p-4 rounded-2xl bg-black/60 border border-white/10">
        <label className="text-xs font-mono uppercase text-zinc-400 font-bold mb-2 block">
          Attending Clinical Rationale & Safety Justification
        </label>
        <input
          type="text"
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
          placeholder="Explain clinical violation, pharmacological reasoning, or medical guidelines..."
          className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/10 text-sm font-sans text-white focus:outline-none focus:border-cyan-400 transition-colors"
        />
      </div>

      {/* Submission Action & Status */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <ShieldCheck className="h-4 w-4 text-cyan-400" />
          <span>Automated HIPAA Safe Harbor scrubs all 18 identifiers upon ingestion</span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-neon-500 hover:bg-neon-400 text-black font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(163,230,53,0.4)] disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin text-black" />
              Sanitizing & Ingesting DPO Pair...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 text-black" />
              Ingest Ground Truth to Training Lake
            </>
          )}
        </button>
      </div>

      {/* Success Notification Banner */}
      {submissionSuccess && (
        <div className="mt-5 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 flex items-start gap-3 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          <Sparkles className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="font-bold text-cyan-300 font-mono flex items-center gap-2">
              Ingestion Cleared: {submissionSuccess.id}
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 text-[10px]">
                HIPAA SAFE HARBOR COMPLIANT
              </span>
            </div>
            <p className="text-zinc-300 mt-1 font-sans">
              Feedback ingested as paired preference sample: <span className="text-red-400 font-mono">rejected</span> (AI output) vs <span className="text-neon-400 font-mono">chosen</span> (physician ground truth). Queued for next LoRA tuning run.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
