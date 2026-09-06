import math
from models.schemas import PatientClinicalFeatures

# Default patient data (Robert Chen - Sepsis & AKI)
DEFAULT_PATIENT_FEATURES = PatientClinicalFeatures(
    patient_id="PAT-98421",
    age=68,
    gender="Male",
    length_of_stay_days=4.5,
    prior_inpatient_admissions_12m=2,
    prior_ed_visits_6m=3,
    charlson_comorbidity_index=4,
    active_medications_count=9,
    heart_rate_bpm=104.0,
    systolic_bp_mmhg=94.0,
    diastolic_bp_mmhg=58.0,
    respiratory_rate_bpm=24.0,
    spo2_percent=92.0,
    temperature_c=38.8,
    lactate_mmol_l=3.4,
    creatinine_mg_dl=2.4,
    hemoglobin_g_dl=10.8,
    sodium_meq_l=136.0,
    bun_mg_dl=38.0,
    wbc_k_ul=14.6,
    has_severe_sepsis=True,
    has_pneumonia=True,
    has_acute_kidney_injury=True,
    has_diabetes_mellitus=True,
    has_heart_failure=False
)

def sigmoid(x: float) -> float:
    return 1.0 / (1.0 + math.exp(-x))

def predict_30day_readmission_risk(p: PatientClinicalFeatures) -> float:
    """
    Ensemble decision tree log-odds simulator parameterized from MIMIC-IV / CMS HRRP readmission cohorts.
    Base intercept: -1.50 (corresponds to ~18% base readmission rate in general inpatient population).
    """
    log_odds = -1.50
    
    # Prior healthcare utilization (strongest non-linear weights)
    log_odds += min(p.prior_inpatient_admissions_12m * 0.42, 1.26)
    log_odds += min(p.prior_ed_visits_6m * 0.31, 0.93)
    
    # Comorbidity & polypharmacy
    log_odds += min(p.charlson_comorbidity_index * 0.18, 0.90)
    if p.active_medications_count >= 8:
        log_odds += 0.35
    elif p.active_medications_count >= 5:
        log_odds += 0.18
        
    # Acute clinical acuity (Vitals & Labs)
    if p.lactate_mmol_l >= 2.0:
        log_odds += (p.lactate_mmol_l - 2.0) * 0.38
    if p.creatinine_mg_dl >= 1.5:
        log_odds += (p.creatinine_mg_dl - 1.5) * 0.45
    if p.hemoglobin_g_dl < 11.0:
        log_odds += (11.0 - p.hemoglobin_g_dl) * 0.28
    if p.spo2_percent < 94.0:
        log_odds += (94.0 - p.spo2_percent) * 0.12
    if p.heart_rate_bpm > 100.0:
        log_odds += 0.22

    # High-risk diagnosis flags
    if p.has_severe_sepsis:
        log_odds += 0.54
    if p.has_acute_kidney_injury:
        log_odds += 0.48
    if p.has_pneumonia:
        log_odds += 0.32
    if p.has_diabetes_mellitus:
        log_odds += 0.25

    # Length of Stay penalty
    if p.length_of_stay_days >= 4.0:
        log_odds += 0.24

    probability = sigmoid(log_odds)
    return round(probability * 100.0, 1)

def get_risk_tier(risk_percent: float) -> str:
    if risk_percent >= 70.0:
        return "CRITICAL_HIGH"
    elif risk_percent >= 50.0:
        return "ELEVATED"
    elif risk_percent >= 25.0:
        return "MODERATE"
    else:
        return "LOW"
