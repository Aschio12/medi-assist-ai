'use server';

export interface ClinicianFeedback {
  id: string;
  timestamp: string;
  physician_name: string;
  specialty: string;
  clinical_prompt: string;
  ai_original_output: string;
  rating: "THUMBS_UP" | "THUMBS_DOWN";
  correction_category: string;
  physician_corrected_output: string;
  rationale: string;
  status: string;
}

export interface DataLakeRecord {
  id: string;
  created_at: string;
  prompt: string;
  chosen: string;
  rejected: string;
  phi_sanitization_status: string;
  token_count: number;
  data_split: string;
}

export interface TrainingLossStep {
  step: number;
  epoch: number;
  loss: number;
  val_loss: number;
  learning_rate: number;
}

export interface TrainingJobStatus {
  job_id: string;
  status: "IDLE" | "PREPARING_DATA" | "TRAINING" | "COMPLETED";
  base_model: string;
  adapter_name: string;
  total_epochs: number;
  current_epoch: number;
  progress_percent: number;
  current_loss: number;
  training_steps: TrainingLossStep[];
  estimated_time_remaining_seconds: number;
}

export interface LoRAModelCheckpoint {
  checkpoint_id: string;
  adapter_name: string;
  created_at: string;
  training_samples_used: number;
  final_loss: number;
  medqa_usmle_score_percent: number;
  base_model_score_percent: number;
  is_active_in_production: boolean;
  download_size_mb: number;
}

const FALLBACK_FEEDBACK: ClinicianFeedback[] = [
  {
    id: "fb-001",
    timestamp: "2026-09-06T09:15:00Z",
    physician_name: "Dr. Alex Rivera, MD",
    specialty: "Critical Care & Pulmonology",
    clinical_prompt: "Recommend empirical antibiotic regimen for 68yo male with severe sepsis and right lower lobe pneumonia.",
    ai_original_output: "Administer IV Piperacillin-Tazobactam (Zosyn) 3.375g q6h combined with Vancomycin 15mg/kg.",
    rating: "THUMBS_DOWN",
    correction_category: "MEDICATION_ALLERGY",
    physician_corrected_output: "Patient has documented severe IgE-mediated beta-lactam anaphylaxis and acute renal impairment (Cr 2.4). Immediately avoid Piperacillin-Tazobactam. Administer IV Aztreonam 1g q8h (renal-dosed monobactam) plus Doxycycline 100mg PO.",
    rationale: "AI failed to cross-reference documented penicillin anaphylaxis and acute kidney injury Stage 2, which would have triggered fatal anaphylactic shock.",
    status: "SANITIZED_INGESTED"
  },
  {
    id: "fb-002",
    timestamp: "2026-09-06T09:45:00Z",
    physician_name: "Dr. Sarah Jenkins, MD",
    specialty: "Nephrology",
    clinical_prompt: "Review home medication list for inpatient with acute kidney injury (creatinine 2.4 mg/dL).",
    ai_original_output: "Continue home medications including Metformin 1000mg BID and Lisinopril 20mg daily with regular monitoring.",
    rating: "THUMBS_DOWN",
    correction_category: "DOSAGE_SAFETY",
    physician_corrected_output: "CRITICAL SAFETY HOLD: Immediately suspend Metformin due to lactic acidosis risk in acute kidney injury. Discontinue Lisinopril (ACE-inhibitor) to prevent efferent arteriolar vasodilation and worsening renal hypoperfusion. Recheck BMP in 24 hours.",
    rationale: "Metformin and ACE-inhibitors are strictly contraindicated in acute doubling of serum creatinine.",
    status: "SANITIZED_INGESTED"
  },
  {
    id: "fb-003",
    timestamp: "2026-09-06T10:10:00Z",
    physician_name: "Dr. Marcus Brody, MD",
    specialty: "Infectious Disease",
    clinical_prompt: "Evaluate fluid resuscitation plan for severe sepsis with MAP 62 mmHg and lactate 3.4 mmol/L.",
    ai_original_output: "Administer 30 mL/kg IV balanced crystalloids (Plasmalyte 2000 mL) within the first 3 hours. Reassess dynamic perfusion indicators.",
    rating: "THUMBS_UP",
    correction_category: "ACCURATE",
    physician_corrected_output: "Administer 30 mL/kg IV balanced crystalloids (Plasmalyte 2000 mL) within the first 3 hours. Reassess dynamic perfusion indicators.",
    rationale: "Complies 100% with Surviving Sepsis Campaign 2021 guidelines.",
    status: "SANITIZED_INGESTED"
  }
];

const FALLBACK_DATALAKE: DataLakeRecord[] = [
  {
    id: "dpo-rec-0001",
    created_at: "2026-09-06T09:15:00Z",
    prompt: "Recommend empirical antibiotic regimen for 68yo male with severe sepsis and right lower lobe pneumonia.",
    chosen: "Patient has documented severe IgE-mediated beta-lactam anaphylaxis and acute renal impairment (Cr 2.4). Immediately avoid Piperacillin-Tazobactam. Administer IV Aztreonam 1g q8h plus Doxycycline 100mg PO.",
    rejected: "Administer IV Piperacillin-Tazobactam (Zosyn) 3.375g q6h combined with Vancomycin 15mg/kg.",
    phi_sanitization_status: "CLEARED_HIPAA_SAFE_HARBOR",
    token_count: 142,
    data_split: "TRAIN"
  },
  {
    id: "dpo-rec-0002",
    created_at: "2026-09-06T09:45:00Z",
    prompt: "Review home medication list for inpatient with acute kidney injury (creatinine 2.4 mg/dL).",
    chosen: "CRITICAL SAFETY HOLD: Immediately suspend Metformin due to lactic acidosis risk in acute kidney injury. Discontinue Lisinopril to prevent efferent arteriolar vasodilation.",
    rejected: "Continue home medications including Metformin 1000mg BID and Lisinopril 20mg daily with regular monitoring.",
    phi_sanitization_status: "CLEARED_HIPAA_SAFE_HARBOR",
    token_count: 118,
    data_split: "TRAIN"
  }
];

const FALLBACK_JOB: TrainingJobStatus = {
  job_id: "job-lora-run-8821",
  status: "COMPLETED",
  base_model: "Meta-Llama-3.1-8B-Instruct",
  adapter_name: "mediassist-lora-v1.4-sepsis",
  total_epochs: 3,
  current_epoch: 3,
  progress_percent: 100.0,
  current_loss: 0.482,
  training_steps: [
    { step: 50, epoch: 0.5, loss: 2.41, val_loss: 2.35, learning_rate: 0.0002 },
    { step: 100, epoch: 1.0, loss: 1.84, val_loss: 1.79, learning_rate: 0.00018 },
    { step: 150, epoch: 1.5, loss: 1.22, val_loss: 1.20, learning_rate: 0.00014 },
    { step: 200, epoch: 2.0, loss: 0.88, val_loss: 0.85, learning_rate: 0.00010 },
    { step: 250, epoch: 2.5, loss: 0.62, val_loss: 0.61, learning_rate: 0.00005 },
    { step: 300, epoch: 3.0, loss: 0.48, val_loss: 0.47, learning_rate: 0.00001 }
  ],
  estimated_time_remaining_seconds: 0
};

const FALLBACK_MODELS: LoRAModelCheckpoint[] = [
  {
    checkpoint_id: "chk-v1.4-active",
    adapter_name: "mediassist-lora-v1.4-sepsis",
    created_at: "2026-09-06T08:00:00Z",
    training_samples_used: 1240,
    final_loss: 0.482,
    medqa_usmle_score_percent: 86.8,
    base_model_score_percent: 74.2,
    is_active_in_production: true,
    download_size_mb: 68.4
  },
  {
    checkpoint_id: "chk-v1.3-archive",
    adapter_name: "mediassist-lora-v1.3-antibiotics",
    created_at: "2026-08-28T14:30:00Z",
    training_samples_used: 890,
    final_loss: 0.640,
    medqa_usmle_score_percent: 82.4,
    base_model_score_percent: 74.2,
    is_active_in_production: false,
    download_size_mb: 68.2
  },
  {
    checkpoint_id: "chk-v1.2-archive",
    adapter_name: "mediassist-lora-v1.2-baseline",
    created_at: "2026-08-15T11:00:00Z",
    training_samples_used: 450,
    final_loss: 0.812,
    medqa_usmle_score_percent: 78.1,
    base_model_score_percent: 74.2,
    is_active_in_production: false,
    download_size_mb: 67.9
  }
];

export async function fetchClinicianFeedback(): Promise<ClinicianFeedback[]> {
  try {
    const URL = process.env.TUNING_ENGINE_URL || 'http://localhost:8012/api/v1/tuning/feedback';
    const res = await fetch(URL, { method: 'GET', cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct feedback fetch failed, using fallback.", err);
  }
  return FALLBACK_FEEDBACK;
}

export async function submitClinicianCorrection(payload: {
  physicianName: string;
  specialty: string;
  clinicalPrompt: string;
  aiOriginalOutput: string;
  rating: "THUMBS_UP" | "THUMBS_DOWN";
  correctionCategory: string;
  physicianCorrectedOutput: string;
  rationale: string;
}): Promise<ClinicianFeedback> {
  try {
    const URL = process.env.TUNING_ENGINE_URL || 'http://localhost:8012/api/v1/tuning/feedback';
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        physician_name: payload.physicianName,
        specialty: payload.specialty,
        clinical_prompt: payload.clinicalPrompt,
        ai_original_output: payload.aiOriginalOutput,
        rating: payload.rating,
        correction_category: payload.correctionCategory,
        physician_corrected_output: payload.physicianCorrectedOutput,
        rationale: payload.rationale
      }),
      cache: 'no-store'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct feedback submission failed, using fallback.", err);
  }

  return {
    id: "fb-" + Date.now(),
    timestamp: new Date().toISOString(),
    physician_name: payload.physicianName,
    specialty: payload.specialty,
    clinical_prompt: payload.clinicalPrompt,
    ai_original_output: payload.aiOriginalOutput,
    rating: payload.rating,
    correction_category: payload.correctionCategory,
    physician_corrected_output: payload.physicianCorrectedOutput,
    rationale: payload.rationale,
    status: "SANITIZED_INGESTED"
  };
}

export async function fetchDataLakeRecords(): Promise<DataLakeRecord[]> {
  try {
    const URL = process.env.TUNING_ENGINE_URL || 'http://localhost:8012/api/v1/tuning/datalake';
    const res = await fetch(URL, { method: 'GET', cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct datalake fetch failed, using fallback.", err);
  }
  return FALLBACK_DATALAKE;
}

export async function fetchTrainingStatus(): Promise<TrainingJobStatus> {
  try {
    const URL = process.env.TUNING_ENGINE_URL || 'http://localhost:8012/api/v1/tuning/train/status';
    const res = await fetch(URL, { method: 'GET', cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct training status fetch failed, using fallback.", err);
  }
  return FALLBACK_JOB;
}

export async function triggerLoraFineTuning(params: {
  rank: number;
  loraAlpha: number;
  epochs: number;
  learningRate: number;
}): Promise<TrainingJobStatus> {
  try {
    const URL = process.env.TUNING_ENGINE_URL || 'http://localhost:8012/api/v1/tuning/train/trigger';
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rank: params.rank,
        lora_alpha: params.loraAlpha,
        epochs: params.epochs,
        learning_rate: params.learningRate
      }),
      cache: 'no-store'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct trigger training failed, using fallback.", err);
  }

  return {
    ...FALLBACK_JOB,
    job_id: "job-lora-" + Date.now(),
    status: "TRAINING",
    current_epoch: 1,
    progress_percent: 33.3,
    current_loss: 1.42
  };
}

export async function fetchModelCheckpoints(): Promise<LoRAModelCheckpoint[]> {
  try {
    const URL = process.env.TUNING_ENGINE_URL || 'http://localhost:8012/api/v1/tuning/models';
    const res = await fetch(URL, { method: 'GET', cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct model fetch failed, using fallback.", err);
  }
  return FALLBACK_MODELS;
}

export async function activateModelCheckpoint(checkpointId: string): Promise<LoRAModelCheckpoint> {
  try {
    const URL = process.env.TUNING_ENGINE_URL || `http://localhost:8012/api/v1/tuning/models/${checkpointId}/activate`;
    const res = await fetch(URL, { method: 'POST', cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct activate model failed, using fallback.", err);
  }
  const m = FALLBACK_MODELS.find(x => x.checkpoint_id === checkpointId) || FALLBACK_MODELS[0];
  return { ...m, is_active_in_production: true };
}
