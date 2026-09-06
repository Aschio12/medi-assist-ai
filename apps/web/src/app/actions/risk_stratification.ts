'use server';

export interface ShapFeatureContribution {
  feature_name: string;
  display_label: string;
  feature_value: string;
  shap_value: number;
  direction: "INCREASES_RISK" | "DECREASES_RISK";
  clinical_rationale: string;
}

export interface LaceScoreDetail {
  length_of_stay_points: number;
  acuity_points: number;
  comorbidity_points: number;
  emergency_visits_points: number;
  total_score: number;
  risk_category: "LOW" | "MODERATE" | "HIGH";
}

export interface HospitalScoreDetail {
  hemoglobin_points: number;
  oncology_points: number;
  sodium_points: number;
  procedure_points: number;
  index_admission_type_points: number;
  admissions_prior_year_points: number;
  length_of_stay_points: number;
  total_score: number;
  risk_category: "LOW" | "INTERMEDIATE" | "HIGH";
}

export interface RiskPrediction {
  patient_id: string;
  readmission_risk_percent: number;
  risk_tier: "CRITICAL_HIGH" | "ELEVATED" | "MODERATE" | "LOW";
  model_auc_roc: number;
  base_population_rate: number;
  lace_score: LaceScoreDetail;
  hospital_score: HospitalScoreDetail;
  top_shap_features: ShapFeatureContribution[];
  estimated_cms_hrrp_penalty_cost: number;
  prediction_timestamp: string;
}

export interface DischargeIntervention {
  id: string;
  title: string;
  category: "TELEHEALTH" | "PHARMACY" | "RPM" | "PCP_APPOINTMENT";
  description: string;
  projected_risk_reduction_percent: number;
  evidence_base: string;
  is_ordered: boolean;
}

export interface CohortPatientSummary {
  patient_id: string;
  patient_name: string;
  room_number: string;
  primary_condition: string;
  readmission_risk_percent: number;
  risk_tier: string;
  top_driver: string;
}

export interface CohortRiskSummary {
  total_inpatient_census: number;
  high_risk_count: number;
  moderate_risk_count: number;
  low_risk_count: number;
  average_readmission_probability: number;
  projected_annual_hrrp_penalty: number;
  patients: CohortPatientSummary[];
}

const FALLBACK_PREDICTION: RiskPrediction = {
  patient_id: "PAT-98421",
  readmission_risk_percent: 78.4,
  risk_tier: "CRITICAL_HIGH",
  model_auc_roc: 0.884,
  base_population_rate: 18.0,
  lace_score: {
    length_of_stay_points: 4,
    acuity_points: 3,
    comorbidity_points: 4,
    emergency_visits_points: 3,
    total_score: 14,
    risk_category: "HIGH"
  },
  hospital_score: {
    hemoglobin_points: 1,
    oncology_points: 0,
    sodium_points: 0,
    procedure_points: 1,
    index_admission_type_points: 1,
    admissions_prior_year_points: 5,
    length_of_stay_points: 0,
    total_score: 8,
    risk_category: "HIGH"
  },
  top_shap_features: [
    {
      feature_name: "lactate_mmol_l",
      display_label: "Serum Lactate (Hyperlactatemia)",
      feature_value: "3.4 mmol/L",
      shap_value: 0.18,
      direction: "INCREASES_RISK",
      clinical_rationale: "Lactate > 2.0 mmol/L indicates persistent cellular hypoperfusion and high post-discharge decompensation risk."
    },
    {
      feature_name: "creatinine_mg_dl",
      display_label: "Acute Kidney Injury (Stage 2)",
      feature_value: "Creatinine 2.4 mg/dL",
      shap_value: 0.15,
      direction: "INCREASES_RISK",
      clinical_rationale: "Acute doubling of baseline creatinine increases 30-day cardiorenal readmission by 2.4x."
    },
    {
      feature_name: "prior_ed_visits_6m",
      display_label: "Frequent ED Utilization (Past 6M)",
      feature_value: "3 Visits",
      shap_value: 0.12,
      direction: "INCREASES_RISK",
      clinical_rationale: "Recurrent emergency department presentations indicate outpatient care fragmentation and vulnerability."
    },
    {
      feature_name: "has_severe_sepsis",
      display_label: "Severe Sepsis Inpatient Episode",
      feature_value: "Positive (qSOFA 3)",
      shap_value: 0.11,
      direction: "INCREASES_RISK",
      clinical_rationale: "Post-sepsis syndrome accounts for 40% of readmissions within 30 days due to immune exhaustion."
    },
    {
      feature_name: "active_medications_count",
      display_label: "Complex Polypharmacy Burden",
      feature_value: "9 Medications",
      shap_value: 0.08,
      direction: "INCREASES_RISK",
      clinical_rationale: ">= 8 medications substantially increases adverse drug interaction and non-compliance risk."
    },
    {
      feature_name: "charlson_comorbidity_index",
      display_label: "Charlson Comorbidity Burden (CCI)",
      feature_value: "Score: 4",
      shap_value: 0.07,
      direction: "INCREASES_RISK",
      clinical_rationale: "Concurrent Type 2 Diabetes and CKD compound physiological reserve decline."
    },
    {
      feature_name: "sodium_meq_l",
      display_label: "Euvolemic Serum Sodium",
      feature_value: "136 mEq/L",
      shap_value: -0.04,
      direction: "DECREASES_RISK",
      clinical_rationale: "Normal sodium level rules out severe hyponatremic hypervolemia, providing protective buffer."
    },
    {
      feature_name: "hemoglobin_g_dl",
      display_label: "Adequate Hemoglobin Buffer",
      feature_value: "10.8 g/dL",
      shap_value: -0.03,
      direction: "DECREASES_RISK",
      clinical_rationale: "Absence of acute hemorrhage preserves oxygen-carrying capacity."
    }
  ],
  estimated_cms_hrrp_penalty_cost: 15209.60,
  prediction_timestamp: "2026-09-06T08:30:00Z"
};

const FALLBACK_INTERVENTIONS: DischargeIntervention[] = [
  {
    id: "int-telehealth-48h",
    title: "48-Hour Virtual Telehealth Transition Visit",
    category: "TELEHEALTH",
    description: "Schedule mandatory virtual video check-in within 48 hours of discharge to review vitals, hydration, and sepsis recovery.",
    projected_risk_reduction_percent: 14.5,
    evidence_base: "JAMA Network Open 2023: Early post-discharge telehealth reduces 30-day readmissions by 18% in high-risk sepsis cohorts.",
    is_ordered: true
  },
  {
    id: "int-pharmacy-medrec",
    title: "Clinical Pharmacist Home Medication Reconciliation",
    category: "PHARMACY",
    description: "Pharmacist outbound phone consultation to confirm Metformin and Lisinopril holds, verify antibiotic completion, and check drug-drug interactions.",
    projected_risk_reduction_percent: 12.0,
    evidence_base: "Annals of Internal Medicine: Pharmacist-led transitions of care lower 30-day ED visits by 35% in polypharmacy patients.",
    is_ordered: true
  },
  {
    id: "int-rpm-cellular",
    title: "Cellular Remote Patient Monitoring (RPM) Kit Dispatch",
    category: "RPM",
    description: "Dispatch cellular-enabled continuous pulse oximeter, blood pressure cuff, and digital weight scale with automated daily clinical telemetry alerts.",
    projected_risk_reduction_percent: 16.2,
    evidence_base: "NEJM Catalyst: Cellular RPM reduces 30-day all-cause readmissions from 24% to 9% in cardiorenal/respiratory patients.",
    is_ordered: false
  },
  {
    id: "int-pcp-7day",
    title: "7-Day In-Person Primary Care Clinic Follow-up",
    category: "PCP_APPOINTMENT",
    description: "Lock in priority follow-up appointment with Dr. Alex Rivera (Primary Care) with repeat BMP lab panel for renal monitoring.",
    projected_risk_reduction_percent: 10.8,
    evidence_base: "CMS HRRP Core Guidelines: Documented 7-day PCP visit fulfills transitional care management (CPT 99496).",
    is_ordered: false
  }
];

const FALLBACK_COHORT: CohortRiskSummary = {
  total_inpatient_census: 24,
  high_risk_count: 6,
  moderate_risk_count: 11,
  low_risk_count: 7,
  average_readmission_probability: 41.2,
  projected_annual_hrrp_penalty: 182400.0,
  patients: [
    {
      patient_id: "PAT-98421",
      patient_name: "Robert Chen",
      room_number: "ICU-4B",
      primary_condition: "Severe Sepsis / AKI Stage 2",
      readmission_risk_percent: 78.4,
      risk_tier: "CRITICAL_HIGH",
      top_driver: "Serum Lactate (3.4 mmol/L)"
    },
    {
      patient_id: "PAT-44109",
      patient_name: "Eleanor Vance",
      room_number: "MED-210",
      primary_condition: "Acute Decompensated Heart Failure",
      readmission_risk_percent: 72.1,
      risk_tier: "CRITICAL_HIGH",
      top_driver: "Prior Inpatient Admissions (3 in 12M)"
    },
    {
      patient_id: "PAT-55823",
      patient_name: "Marcus Brody",
      room_number: "SURG-104",
      primary_condition: "COPD Exacerbation",
      readmission_risk_percent: 64.8,
      risk_tier: "ELEVATED",
      top_driver: "SpO2 Desaturation (89%)"
    },
    {
      patient_id: "PAT-66120",
      patient_name: "Sophia Martinez",
      room_number: "MED-215",
      primary_condition: "Community-Acquired Pneumonia",
      readmission_risk_percent: 52.3,
      risk_tier: "ELEVATED",
      top_driver: "High Charlson Index (CCI 5)"
    },
    {
      patient_id: "PAT-77312",
      patient_name: "James Wilson",
      room_number: "MED-218",
      primary_condition: "Post-Op Cholecystectomy",
      readmission_risk_percent: 18.5,
      risk_tier: "LOW",
      top_driver: "Normal Baseline Renal Function"
    }
  ]
};

export async function fetchPatientRiskPrediction(patientId: string = "PAT-98421"): Promise<RiskPrediction> {
  try {
    const URL = process.env.RISK_ENGINE_URL || 'http://localhost:8011/api/v1/risk/predict';
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient_id: patientId }),
      cache: 'no-store'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct risk prediction fetch failed, using fallback.", err);
  }
  return FALLBACK_PREDICTION;
}

export async function fetchDischargeInterventions(): Promise<DischargeIntervention[]> {
  try {
    const URL = process.env.RISK_ENGINE_URL || 'http://localhost:8011/api/v1/risk/interventions';
    const res = await fetch(URL, { method: 'GET', cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct interventions fetch failed, using fallback.", err);
  }
  return FALLBACK_INTERVENTIONS;
}

export async function fetchCohortRiskSummary(): Promise<CohortRiskSummary> {
  try {
    const URL = process.env.RISK_ENGINE_URL || 'http://localhost:8011/api/v1/risk/cohort';
    const res = await fetch(URL, { method: 'GET', cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Direct cohort summary fetch failed, using fallback.", err);
  }
  return FALLBACK_COHORT;
}
