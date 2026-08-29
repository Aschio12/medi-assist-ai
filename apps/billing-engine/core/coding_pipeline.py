from typing import List
from models.schemas import Icd10Code, CptCode

def extract_diagnoses_for_case(case_id: str) -> List[Icd10Code]:
    if "sepsis" in case_id:
        return [
            Icd10Code(
                code="R65.20",
                description="Severe Sepsis without Septic Shock",
                category="PRIMARY",
                hcc_category="HCC 2 (Sepsis)",
                hcc_weight=0.584,
                specificity_level="HIGH",
                documentation_citation="qSOFA score 3, hypotension, lactate 3.4 mmol/L, meeting Sepsis-3 consensus definitions."
            ),
            Icd10Code(
                code="J18.9",
                description="Pneumonia, Unspecified Organism (Right Lower Lobe Consolidation)",
                category="SECONDARY",
                hcc_category="HCC 115 (Pneumonia)",
                hcc_weight=0.172,
                specificity_level="HIGH",
                documentation_citation="CXR demonstrates dense focal alveolar opacification with air bronchograms in right lower lung field."
            ),
            Icd10Code(
                code="N17.9",
                description="Acute Kidney Injury, Unspecified (Stage 2)",
                category="COMORBIDITY",
                hcc_category="HCC 135 (Acute Renal Failure)",
                hcc_weight=0.298,
                specificity_level="HIGH",
                documentation_citation="Creatinine increased to 2.4 mg/dL from baseline 1.0 (2.4x baseline, KDIGO Stage 2)."
            ),
            Icd10Code(
                code="Z88.0",
                description="Allergy status to penicillin (Anaphylactic history)",
                category="COMORBIDITY",
                hcc_category=None,
                hcc_weight=0.0,
                specificity_level="HIGH",
                documentation_citation="Documented anaphylactic reaction in 2018; required non-beta-lactam antimicrobial regimen."
            )
        ]
    elif "acs" in case_id:
        return [
            Icd10Code(
                code="I21.4",
                description="Non-ST Elevation Myocardial Infarction (NSTEMI)",
                category="PRIMARY",
                hcc_category="HCC 86 (Acute Myocardial Infarction)",
                hcc_weight=0.412,
                specificity_level="HIGH",
                documentation_citation="Troponin I elevated at 2.84 ng/mL with 2mm ST-depressions in V4-V6."
            ),
            Icd10Code(
                code="K92.2",
                description="Gastrointestinal Hemorrhage, Unspecified (Melena)",
                category="SECONDARY",
                hcc_category="HCC 107 (GI Hemorrhage)",
                hcc_weight=0.215,
                specificity_level="HIGH",
                documentation_citation="Melena stool, acute hemoglobin drop to 8.1 g/dL while on oral anticoagulation."
            )
        ]
    else:
        return [
            Icd10Code(
                code="E11.65",
                description="Type 2 Diabetes Mellitus with Hyperglycemia",
                category="PRIMARY",
                hcc_category="HCC 19 (Diabetes with Chronic Complications)",
                hcc_weight=0.302,
                specificity_level="HIGH",
                documentation_citation="Fasting plasma glucose > 220 mg/dL, HbA1c 8.8%."
            ),
            Icd10Code(
                code="I10",
                description="Essential (Primary) Hypertension",
                category="COMORBIDITY",
                hcc_category=None,
                hcc_weight=0.0,
                specificity_level="HIGH",
                documentation_citation="Clinic blood pressure 148/92 mmHg on dual antihypertensive therapy."
            )
        ]

def extract_procedures_for_case(case_id: str) -> List[CptCode]:
    if "sepsis" in case_id:
        return [
            CptCode(
                code="99223",
                description="Initial Hospital Care, per day (High Complexity Medical Decision Making)",
                category="E_M",
                units=1,
                work_rvu=3.86,
                total_rvu=5.72,
                standard_fee=228.45,
                recommended_modifiers=["25"],
                active_modifiers=["25"],
                medical_necessity_icd10=["R65.20", "J18.9", "N17.9"]
            ),
            CptCode(
                code="36556",
                description="Insertion of non-tunneled centrally inserted central venous catheter (CVC); age 5 years or older",
                category="PROCEDURAL",
                units=1,
                work_rvu=2.35,
                total_rvu=7.82,
                standard_fee=312.80,
                recommended_modifiers=[],
                active_modifiers=[],
                medical_necessity_icd10=["R65.20"]
            ),
            CptCode(
                code="71045",
                description="Radiologic examination, chest; single view (Portable CXR)",
                category="DIAGNOSTIC",
                units=1,
                work_rvu=0.22,
                total_rvu=0.88,
                standard_fee=35.20,
                recommended_modifiers=["26"],
                active_modifiers=["26"],
                medical_necessity_icd10=["J18.9"]
            ),
            CptCode(
                code="87040",
                description="Culture, bacterial; blood, aerobic with isolation and presump ID (x2 sets)",
                category="LAB",
                units=2,
                work_rvu=0.0,
                total_rvu=0.74,
                standard_fee=29.60,
                recommended_modifiers=[],
                active_modifiers=[],
                medical_necessity_icd10=["R65.20"]
            )
        ]
    else:
        return [
            CptCode(
                code="99215",
                description="Office or other outpatient visit for established patient (High Complexity MDM)",
                category="E_M",
                units=1,
                work_rvu=2.80,
                total_rvu=4.85,
                standard_fee=194.00,
                recommended_modifiers=[],
                active_modifiers=[],
                medical_necessity_icd10=["E11.65", "I10"]
            )
        ]
