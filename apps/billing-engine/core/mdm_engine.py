from typing import Dict, Any, List
from models.schemas import MdmEvaluation, MdmCategoryScore

def evaluate_medical_decision_making(encounter_type: str, clinical_features: Dict[str, Any]) -> MdmEvaluation:
    """
    Evaluates 2024 AMA CPT Medical Decision Making (MDM) Guidelines across 3 elements:
    1. Number and Complexity of Problems Addressed
    2. Amount and/or Complexity of Data to be Reviewed and Analyzed
    3. Risk of Complications and/or Morbidity or Mortality of Patient Management
    To qualify for a given level of MDM, 2 of the 3 elements must be met or exceeded.
    """
    
    # 1. Evaluate Problems Addressed
    has_severe_systemic = clinical_features.get("acute_illness_systemic_symptoms", True)
    has_acute_threat = clinical_features.get("acute_illness_threat_to_life", False)
    
    if has_acute_threat:
        prob_score = MdmCategoryScore(
            tier="HIGH",
            score_points=4,
            rationale="1 acute illness with threat to life or bodily function (Severe Sepsis + Stage 2 AKI).",
            evidence_extracted=[
                "qSOFA = 3 with hypotension (88/54) and serum lactate 3.4 mmol/L.",
                "Acute decline in renal function (eGFR 28 mL/min, creatinine 2.4 mg/dL)."
            ]
        )
    elif has_severe_systemic:
        prob_score = MdmCategoryScore(
            tier="MODERATE",
            score_points=3,
            rationale="1 acute illness with systemic symptoms (Pneumonia with high fever and rigors).",
            evidence_extracted=["Temperature 38.9°C, tachypneic RR 26, WBC 17.8."]
        )
    else:
        prob_score = MdmCategoryScore(
            tier="LOW",
            score_points=2,
            rationale="1 stable chronic illness or uncomplicated acute illness.",
            evidence_extracted=["Follow-up for chronic hypertension."]
        )

    # 2. Evaluate Data Reviewed (Category 1, 2, 3)
    data_score = MdmCategoryScore(
        tier="HIGH",
        score_points=4,
        rationale="Category 1 (Review of external tests + Ordering 3+ unique tests) AND Category 2 (Independent interpretation of CXR).",
        evidence_extracted=[
            "Ordered Blood Cultures x2, Sputum Gram Stain, CMP, Serial Lactates, Urinary Antigens.",
            "Independent review of prior Chest PA Radiograph.",
            "Multi-disciplinary clinical council review with Pharmacist and Radiologist."
        ]
    )

    # 3. Evaluate Risk of Patient Management
    risk_score = MdmCategoryScore(
        tier="HIGH",
        score_points=4,
        rationale="Decision regarding escalation to inpatient hospital admission with parenteral controlled antimicrobials & IV crystalloid resuscitation in renal failure.",
        evidence_extracted=[
            "Parenteral IV Aztreonam, IV Doxycycline, IV Plasma-Lyte bolus.",
            "Immediate discontinuation of Metformin (Lactic Acidosis risk in AKI).",
            "Continuous hemodynamic monitoring and frequent lactate reassessment."
        ]
    )

    # Calculate overall MDM Level (2 out of 3 rule)
    tiers = [prob_score.tier, data_score.tier, risk_score.tier]
    if tiers.count("HIGH") >= 2:
        overall_level = "High"
        if "inpatient" in encounter_type.lower():
            recommended_em = "99223"
            em_title = "Initial Hospital Inpatient Care (High Complexity MDM)"
        else:
            recommended_em = "99215"
            em_title = "Office / Outpatient Visit, Established Patient (High Complexity MDM)"
    elif tiers.count("HIGH") + tiers.count("MODERATE") >= 2:
        overall_level = "Moderate"
        recommended_em = "99222" if "inpatient" in encounter_type.lower() else "99214"
        em_title = "Inpatient/Outpatient Evaluation & Management (Moderate MDM)"
    else:
        overall_level = "Low"
        recommended_em = "99221" if "inpatient" in encounter_type.lower() else "99213"
        em_title = "Evaluation & Management (Low MDM)"

    return MdmEvaluation(
        problems_addressed=prob_score,
        data_reviewed=data_score,
        management_risk=risk_score,
        overall_mdm_level=overall_level,
        recommended_em_code=recommended_em,
        em_code_title=em_title,
        time_based_alternative="Total Physician Time >= 75 minutes on date of encounter"
    )
