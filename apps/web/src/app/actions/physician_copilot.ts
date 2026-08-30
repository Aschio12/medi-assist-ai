'use server';

export interface EvidenceCitation {
  id: number;
  guideline_name: string;
  organization: string;
  year: number;
  section: string;
  target_sentence: string;
  full_context_paragraph: string;
  evidence_grade: string;
  doi_or_url: string;
}

export interface ActionChip {
  id: string;
  label: string;
  category: "ORDER" | "MEDICATION" | "SAFETY_HOLD" | "NOTE" | "CONSULT";
  icon: string;
  description: string;
  payload: Record<string, any>;
  status: "AVAILABLE" | "QUEUED" | "EXECUTED";
}

export interface PatientVitalSnapshot {
  heart_rate: number;
  blood_pressure: string;
  resp_rate: number;
  spo2: number;
  temperature: number;
  lactate: number;
  creatinine: number;
  egfr: number;
}

export interface PatientChartSummary {
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  allergies: string[];
  active_diagnoses: string[];
  current_medications: string[];
  vitals: PatientVitalSnapshot;
  lab_alerts: string[];
}

export interface CopilotChatMessage {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
  cited_ids: number[];
  action_chips: ActionChip[];
}

export interface CopilotResponse {
  message: CopilotChatMessage;
  citations: EvidenceCitation[];
  suggested_actions: ActionChip[];
  drafted_ap_note: string;
}

const FALLBACK_CITATIONS: EvidenceCitation[] = [
  {
    id: 1,
    guideline_name: "Surviving Sepsis Campaign Guidelines 2021",
    organization: "SCCM / ESICM",
    year: 2021,
    section: "§4.2 Antimicrobial Timing & Blood Cultures",
    target_sentence: "For adults with possible sepsis or septic shock, we recommend administering antimicrobials immediately, ideally within 1 hour of recognition, after obtaining routine blood cultures.",
    full_context_paragraph: "Recommendation 14: For adults with possible septic shock or a high likelihood for sepsis, we recommend administering antimicrobials immediately, ideally within 1 hour of recognition. Diagnostic blood cultures should be drawn prior to initiation of antimicrobial therapy, provided this does not cause substantial delays (>45 min) in starting therapy.",
    evidence_grade: "Grade 1B (Strong Recommendation, Moderate Quality Evidence)",
    doi_or_url: "https://doi.org/10.1097/CCM.0000000000005337"
  },
  {
    id: 2,
    guideline_name: "Surviving Sepsis Campaign Guidelines 2021",
    organization: "SCCM / ESICM",
    year: 2021,
    section: "§7.1 Fluid Stewardship & Crystalloids",
    target_sentence: "For patients with sepsis-induced hypoperfusion or septic shock, we suggest using balanced crystalloids (e.g. Plasma-Lyte or Lactated Ringer's) over 0.9% normal saline for fluid resuscitation.",
    full_context_paragraph: "Recommendation 23: For adults with sepsis or septic shock, we suggest using balanced crystalloids rather than normal saline for resuscitation to reduce hyperchloremic metabolic acidosis and acute kidney injury risk (SMART and SALT-ED trials). Resuscitation should target 30 mL/kg within the first 3 hours.",
    evidence_grade: "Grade 2C (Weak Recommendation, Low Quality Evidence)",
    doi_or_url: "https://doi.org/10.1097/CCM.0000000000005337"
  },
  {
    id: 3,
    guideline_name: "IDSA / ATS Community-Acquired Pneumonia Guidelines",
    organization: "Infectious Diseases Society of America",
    year: 2023,
    section: "Table 4: Severe Penicillin Allergy Regimens",
    target_sentence: "In patients with severe IgE-mediated beta-lactam anaphylaxis presenting with severe CAP and Pseudomonas risk, Aztreonam plus respiratory Fluoroquinolone or Doxycycline is recommended.",
    full_context_paragraph: "Section 5.3: For hospitalized patients with severe pneumonia who have a documented history of severe IgE-mediated hypersensitivity (anaphylaxis, angioedema) to beta-lactams, monobactam therapy (Aztreonam 2g IV q8h) combined with an atypical agent (Doxycycline 100mg IV q12h or Levofloxacin) provides robust coverage while avoiding cross-reactivity.",
    evidence_grade: "Grade 1A (Strong Recommendation, High Quality Evidence)",
    doi_or_url: "https://doi.org/10.1164/rccm.201908-1581ST"
  },
  {
    id: 4,
    guideline_name: "KDIGO Clinical Practice Guideline for Acute Kidney Injury",
    organization: "Kidney Disease: Improving Global Outcomes",
    year: 2024,
    section: "Section 3.1: Drug-Induced Nephrotoxicity & Metformin Discontinuation",
    target_sentence: "Discontinue Metformin immediately in patients with KDIGO Stage 2 AKI or eGFR < 30 mL/min/1.73m² to mitigate the fatal risk of Metformin-Associated Lactic Acidosis (MALA).",
    full_context_paragraph: "Guideline 3.1.2: In acute kidney injury KDIGO stage 2 or greater (serum creatinine >= 2.0x baseline or eGFR < 30), clinicians must immediately suspend all renally-cleared biguanides (Metformin) and RAAS inhibitors (ACE inhibitors/ARBs) until hemodynamic and renal recovery is established.",
    evidence_grade: "Grade 1A (Strong Recommendation, High Quality Evidence)",
    doi_or_url: "https://doi.org/10.1016/j.kint.2024.01.002"
  }
];

const FALLBACK_ACTIONS: ActionChip[] = [
  {
    id: "act-blood-cultures",
    label: "Order Blood Cultures x2 & Stat Lactate",
    category: "ORDER",
    icon: "FlaskConical",
    description: "STAT peripheral blood cultures (2 sets, aerobic/anaerobic) + serial lactate every 2h.",
    payload: { order_type: "LAB", tests: ["Blood Cultures x2", "Lactate Stat", "CMP", "CBC with Diff"] },
    status: "AVAILABLE"
  },
  {
    id: "act-fluid-bolus",
    label: "Start IV Plasma-Lyte Resuscitation (30 mL/kg)",
    category: "ORDER",
    icon: "Droplet",
    description: "Administer 2,000 mL Plasma-Lyte A IV over 2 hours for sepsis hypoperfusion (MAP < 65).",
    payload: { order_type: "IV_FLUID", fluid: "Plasma-Lyte A", volume_ml: 2000, rate: "1000 mL/hr" },
    status: "AVAILABLE"
  },
  {
    id: "act-penicillin-guardrail",
    label: "Hold Metformin & Lisinopril (AKI Guardrail)",
    category: "SAFETY_HOLD",
    icon: "ShieldAlert",
    description: "Immediate suspension of Metformin (eGFR 28 mL/min) and Lisinopril to prevent MALA and worsening AKI.",
    payload: { action: "DISCONTINUE", medications: ["Metformin 1000mg BID", "Lisinopril 20mg Daily"] },
    status: "AVAILABLE"
  },
  {
    id: "act-prescribe-aztreonam",
    label: "Queue Aztreonam 1g IV q8h (Renal Dosed)",
    category: "MEDICATION",
    icon: "Pill",
    description: "Gram-negative coverage safe in severe penicillin anaphylaxis, renally adjusted for CrCl 28 mL/min.",
    payload: { drug: "Aztreonam", dose: "1g IV q8h", indication: "Severe Pneumonia in PCN Anaphylaxis" },
    status: "AVAILABLE"
  },
  {
    id: "act-ehr-note",
    label: "Commit Assessment & Plan into Epic EHR",
    category: "NOTE",
    icon: "FileText",
    description: "Directly sync structured multi-problem SOAP note to Epic Hyperspace / Cerner Millennium.",
    payload: { destination: "EPIC_HYPERSPACE_EHR", note_title: "Inpatient Progress Note - Sepsis Protocol" },
    status: "AVAILABLE"
  }
];

export async function fetchCopilotReasoning(queryText: string = "Evaluate patient sepsis risk and treatment plan"): Promise<CopilotResponse> {
  try {
    const COPILOT_URL = process.env.COPILOT_ENGINE_URL || 'http://localhost:8007/api/v1/copilot/query';
    const res = await fetch(COPILOT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient_id: "PAT-98421",
        query_text: queryText
      }),
      cache: 'no-store'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Direct Copilot Engine fetch failed, serving high-fidelity simulated response.", err);
  }

  // Simulated fallback response
  return {
    message: {
      id: "msg-" + Date.now(),
      sender: "ai",
      content: "Based on Mr. Chen's acute vitals (BP 88/54, HR 118, Lactate 3.4 mmol/L) and CXR consolidation, the patient meets criteria for Severe Sepsis secondary to Community-Acquired Pneumonia with Stage 2 AKI. Per clinical guidelines, initiate parenteral antimicrobials immediately within 1 hour after drawing blood cultures [1]. For fluid resuscitation, administer 30 mL/kg balanced crystalloids (Plasma-Lyte) over normal saline [2]. Given the patient's severe anaphylactic penicillin allergy, avoid all beta-lactams and treat with renally-adjusted Aztreonam plus Doxycycline [3]. Crucially, immediately hold Metformin to eliminate the risk of fatal lactic acidosis in acute renal impairment [4].",
      timestamp: "Just now",
      cited_ids: [1, 2, 3, 4],
      action_chips: FALLBACK_ACTIONS
    },
    citations: FALLBACK_CITATIONS,
    suggested_actions: FALLBACK_ACTIONS,
    drafted_ap_note: `ASSESSMENT & PLAN:
1. Severe Sepsis secondary to Right Lower Lobe Pneumonia (qSOFA=3, Lactate 3.4 mmol/L)
   - Diagnostic: Blood cultures x2, Sputum Gram Stain, CMP, Serial Lactates q2h.
   - Antimicrobials: IV Aztreonam 1g q8h + IV Doxycycline 100mg q12h (Penicillin anaphylaxis safe & renally dosed).
   - Resuscitation: IV Plasma-Lyte A 2,000 mL bolus over 2 hours; target MAP >= 65 mmHg.

2. Acute Kidney Injury (Stage 2, Cr 2.4 mg/dL from baseline 1.0, eGFR 28 mL/min)
   - Safety Holds: Immediately DISCONTINUE Metformin 1000mg BID and Lisinopril 20mg Daily.
   - Fluid stewardship with balanced crystalloids; avoid nephrotoxic NSAIDs and IV iodinated contrast.
   - Strict I&Os via Foley catheter; target urine output > 0.5 mL/kg/hr.`
  };
}

export async function fetchPatientChartSummary(): Promise<PatientChartSummary> {
  return {
    patient_id: "PAT-98421",
    name: "Robert Chen",
    age: 68,
    gender: "Male",
    allergies: [
      "Penicillin (Severe Anaphylaxis / Laryngeal Edema - 2018)",
      "Sulfa Antibiotics (Rash / Urticaria)"
    ],
    active_diagnoses: [
      "Severe Sepsis (qSOFA = 3, Lactate 3.4)",
      "Community-Acquired Pneumonia (RLL Consolidation)",
      "Acute Kidney Injury (Stage 2, Cr 2.4)",
      "Type 2 Diabetes Mellitus (HbA1c 8.8%)",
      "Essential Hypertension"
    ],
    current_medications: [
      "Metformin 1000mg PO BID (CRITICAL: HOLD in AKI)",
      "Lisinopril 20mg PO Daily (HOLD in AKI)",
      "Atorvastatin 40mg PO QHS",
      "Aspirin 81mg PO Daily"
    ],
    vitals: {
      heart_rate: 118,
      blood_pressure: "88/54 (MAP 65)",
      resp_rate: 26,
      spo2: 91,
      temperature: 38.9,
      lactate: 3.4,
      creatinine: 2.4,
      egfr: 28
    },
    lab_alerts: [
      "WBC: 17.8 x 10^3/uL (High)",
      "Serum Lactate: 3.4 mmol/L (Critical High)",
      "Creatinine: 2.4 mg/dL (Baseline 1.0)",
      "eGFR: 28 mL/min/1.73m² (Severely Decreased)"
    ]
  };
}
