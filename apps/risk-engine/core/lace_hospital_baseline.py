from models.schemas import PatientClinicalFeatures, LaceScoreDetail, HospitalScoreDetail

def calculate_lace_score(p: PatientClinicalFeatures) -> LaceScoreDetail:
    # 1. Length of Stay (L)
    los = p.length_of_stay_days
    if los < 1:
        los_pts = 0
    elif los < 2:
        los_pts = 1
    elif los < 3:
        los_pts = 2
    elif los < 4:
        los_pts = 3
    elif los < 7:
        los_pts = 4
    elif los < 14:
        los_pts = 5
    else:
        los_pts = 7

    # 2. Acuity of admission (A): Acute/emergency = 3 points
    acuity_pts = 3

    # 3. Comorbidities (C): Charlson score capped at 5
    cci_pts = min(p.charlson_comorbidity_index, 5)

    # 4. Emergency visits in past 6 months (E)
    ed_pts = min(p.prior_ed_visits_6m, 4)

    total = los_pts + acuity_pts + cci_pts + ed_pts
    
    if total >= 10:
        cat = "HIGH"
    elif total >= 5:
        cat = "MODERATE"
    else:
        cat = "LOW"

    return LaceScoreDetail(
        length_of_stay_points=los_pts,
        acuity_points=acuity_pts,
        comorbidity_points=cci_pts,
        emergency_visits_points=ed_pts,
        total_score=total,
        risk_category=cat
    )

def calculate_hospital_score(p: PatientClinicalFeatures) -> HospitalScoreDetail:
    # H: Hemoglobin at discharge < 12 g/dL (1 pt)
    hgb_pts = 1 if p.hemoglobin_g_dl < 12.0 else 0

    # O: Oncology discharge service (2 pts)
    onc_pts = 0

    # S: Sodium level < 135 mEq/L (1 pt)
    na_pts = 1 if p.sodium_meq_l < 135.0 else 0

    # P: Procedure during stay (1 pt)
    proc_pts = 1

    # I: Index admission type (urgent/emergent = 1 pt)
    adm_pts = 1

    # T: Number of hospital admissions in prior year (>= 2: 5 pts; 1: 2 pts)
    if p.prior_inpatient_admissions_12m >= 2:
        admissions_pts = 5
    elif p.prior_inpatient_admissions_12m == 1:
        admissions_pts = 2
    else:
        admissions_pts = 0

    # L: Length of stay >= 5 days (2 pts)
    los_pts = 2 if p.length_of_stay_days >= 5.0 else 0

    total = hgb_pts + onc_pts + na_pts + proc_pts + adm_pts + admissions_pts + los_pts

    if total >= 7:
        cat = "HIGH"
    elif total >= 5:
        cat = "INTERMEDIATE"
    else:
        cat = "LOW"

    return HospitalScoreDetail(
        hemoglobin_points=hgb_pts,
        oncology_points=onc_pts,
        sodium_points=na_pts,
        procedure_points=proc_pts,
        index_admission_type_points=adm_pts,
        admissions_prior_year_points=admissions_pts,
        length_of_stay_points=los_pts,
        total_score=total,
        risk_category=cat
    )
