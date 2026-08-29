from typing import List, Dict, Any
from models.schemas import ClinicalCaseInput

SAMPLE_CASES: List[ClinicalCaseInput] = [
    ClinicalCaseInput(
        case_id="case-sepsis-aki-01",
        patient_name="Robert Chen (Ward 3B)",
        age=68,
        gender="Male",
        chief_complaint="Acute onset fever (38.9°C), rigors, confusion, and worsening productive cough for 48 hours.",
        vitals={
            "heart_rate": 118,
            "blood_pressure": "88/54",
            "mean_arterial_pressure": 65,
            "resp_rate": 26,
            "spO2": "91% on room air",
            "temperature": "38.9°C"
        },
        labs={
            "wbc": "17.8 x10^3/uL",
            "serum_creatinine": "2.4 mg/dL (Baseline 1.0)",
            "egfr": "28 mL/min/1.73m2",
            "serum_lactate": "3.4 mmol/L",
            "procalcitonin": "4.2 ng/mL",
            "potassium": "5.1 mEq/L"
        },
        current_medications=[
            "Lisinopril 20mg PO Daily",
            "Metformin 1000mg PO BID",
            "Atorvastatin 40mg PO Daily",
            "Metoprolol Tartrate 25mg PO BID"
        ],
        allergies=["Penicillin (Anaphylaxis: Hives, Bronchospasm in 2018)"],
        imaging_summary="CXR: Dense patchy consolidation in right lower lobe with small reactive pleural effusion. No pneumothorax. Cardiothoracic ratio normal.",
        clinical_notes="Patient is visibly tachypneic and lethargic. qSOFA score = 3 (BP <= 100, RR >= 22, altered mentation). Meets Sepsis-3 criteria."
    ),
    ClinicalCaseInput(
        case_id="case-acs-gib-02",
        patient_name="Eleanor Vance (ICU-2)",
        age=74,
        gender="Female",
        chief_complaint="Substernal crushing chest pressure radiating to left jaw accompanied by diaphoresis and melena stool.",
        vitals={
            "heart_rate": 104,
            "blood_pressure": "102/68",
            "resp_rate": 20,
            "spO2": "95% on 2L nasal cannula",
            "temperature": "36.8°C"
        },
        labs={
            "troponin_i": "2.84 ng/mL (High)",
            "hemoglobin": "8.1 g/dL (Baseline 12.5)",
            "platelets": "142 x10^3/uL",
            "inr": "1.3"
        },
        current_medications=[
            "Aspirin 81mg PO Daily",
            "Apixaban 5mg PO BID (for Atrial Fibrillation)",
            "Amlodipine 5mg PO Daily"
        ],
        allergies=["Sulfa drugs"],
        imaging_summary="ECG: 2mm ST-depression in leads V4-V6 with T-wave inversions. Bedside Echo: Hypokinesis of anterolateral wall, LVEF 45%.",
        clinical_notes="High-risk NSTEMI in the setting of acute upper gastrointestinal bleeding. Dual Antiplatelet Therapy (DAPT) vs. bleeding risk dilemma."
    ),
    ClinicalCaseInput(
        case_id="case-delirium-polypharm-03",
        patient_name="Harold Jenkins (Geriatric Unit)",
        age=82,
        gender="Male",
        chief_complaint="Acute fluctuating delirium, visual hallucinations, and urinary retention after medication change.",
        vitals={
            "heart_rate": 62,
            "blood_pressure": "142/86",
            "resp_rate": 16,
            "spO2": "97% on RA",
            "temperature": "37.1°C"
        },
        labs={
            "serum_sodium": "131 mEq/L",
            "bun": "24 mg/dL",
            "creatinine": "1.1 mg/dL",
            "urinalysis": "Leukocyte esterase positive, Nitrite positive, WBC 30-50/hpf"
        },
        current_medications=[
            "Diphenhydramine 50mg QHS (recently started OTC)",
            "Oxybutynin 10mg PO Daily",
            "Donepezil 10mg PO Daily",
            "Zolpidem 5mg QHS"
        ],
        allergies=["No Known Drug Allergies (NKDA)"],
        imaging_summary="Non-contrast Head CT: Age-appropriate cerebral atrophy and chronic microvascular ischemic changes. No acute hemorrhage.",
        clinical_notes="Significant anticholinergic toxicity burden (Anticholinergic Cognitive Burden score = 7) superimposed on untreated E. coli UTI."
    )
]

def get_case_by_id(case_id: str) -> ClinicalCaseInput:
    for c in SAMPLE_CASES:
        if c.case_id == case_id:
            return c
    return SAMPLE_CASES[0]
