from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class PatientClinicalFeatures(BaseModel):
    patient_id: str
    age: int
    gender: str
    length_of_stay_days: float
    prior_inpatient_admissions_12m: int
    prior_ed_visits_6m: int
    charlson_comorbidity_index: int
    active_medications_count: int
    
    # Real-time Vitals
    heart_rate_bpm: float
    systolic_bp_mmhg: float
    diastolic_bp_mmhg: float
    respiratory_rate_bpm: float
    spo2_percent: float
    temperature_c: float
    
    # Critical Lab Markers
    lactate_mmol_l: float
    creatinine_mg_dl: float
    hemoglobin_g_dl: float
    sodium_meq_l: float
    bun_mg_dl: float
    wbc_k_ul: float
    
    # Diagnosis Flags
    has_severe_sepsis: bool
    has_pneumonia: bool
    has_acute_kidney_injury: bool
    has_diabetes_mellitus: bool
    has_heart_failure: bool

class ShapFeatureContribution(BaseModel):
    feature_name: str
    display_label: str
    feature_value: str
    shap_value: float # Positive increases risk, negative decreases risk
    direction: str # "INCREASES_RISK" | "DECREASES_RISK"
    clinical_rationale: str

class LaceScoreDetail(BaseModel):
    length_of_stay_points: int
    acuity_points: int
    comorbidity_points: int
    emergency_visits_points: int
    total_score: int # Max 19
    risk_category: str # "LOW" | "MODERATE" | "HIGH"

class HospitalScoreDetail(BaseModel):
    hemoglobin_points: int
    oncology_points: int
    sodium_points: int
    procedure_points: int
    index_admission_type_points: int
    admissions_prior_year_points: int
    length_of_stay_points: int
    total_score: int # Max 13+
    risk_category: str # "LOW" | "INTERMEDIATE" | "HIGH"

class RiskPrediction(BaseModel):
    patient_id: str
    readmission_risk_percent: float
    risk_tier: str # "CRITICAL_HIGH" | "ELEVATED" | "MODERATE" | "LOW"
    model_auc_roc: float
    base_population_rate: float
    
    # Comparison with traditional clinical scores
    lace_score: LaceScoreDetail
    hospital_score: HospitalScoreDetail
    
    # Model Explainability
    top_shap_features: List[ShapFeatureContribution]
    estimated_cms_hrrp_penalty_cost: float
    prediction_timestamp: str

class DischargeIntervention(BaseModel):
    id: str
    title: str
    category: str # "TELEHEALTH" | "PHARMACY" | "RPM" | "PCP_APPOINTMENT"
    description: str
    projected_risk_reduction_percent: float
    evidence_base: str
    is_ordered: bool = False

class CohortPatientSummary(BaseModel):
    patient_id: str
    patient_name: str
    room_number: str
    primary_condition: str
    readmission_risk_percent: float
    risk_tier: str
    top_driver: str

class CohortRiskSummary(BaseModel):
    total_inpatient_census: int
    high_risk_count: int
    moderate_risk_count: int
    low_risk_count: int
    average_readmission_probability: float
    projected_annual_hrrp_penalty: float
    patients: List[CohortPatientSummary]
