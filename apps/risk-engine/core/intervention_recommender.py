from typing import List
from models.schemas import DischargeIntervention, CohortRiskSummary, CohortPatientSummary

STANDARD_INTERVENTIONS: List[DischargeIntervention] = [
    DischargeIntervention(
        id="int-telehealth-48h",
        title="48-Hour Virtual Telehealth Transition Visit",
        category="TELEHEALTH",
        description="Schedule mandatory virtual video check-in within 48 hours of discharge to review vitals, hydration, and sepsis recovery.",
        projected_risk_reduction_percent=14.5,
        evidence_base="JAMA Network Open 2023: Early post-discharge telehealth reduces 30-day readmissions by 18% in high-risk sepsis cohorts.",
        is_ordered=True
    ),
    DischargeIntervention(
        id="int-pharmacy-medrec",
        title="Clinical Pharmacist Home Medication Reconciliation",
        category="PHARMACY",
        description="Pharmacist outbound phone consultation to confirm Metformin and Lisinopril holds, verify antibiotic completion, and check drug-drug interactions.",
        projected_risk_reduction_percent=12.0,
        evidence_base="Annals of Internal Medicine: Pharmacist-led transitions of care lower 30-day ED visits by 35% in polypharmacy patients.",
        is_ordered=True
    ),
    DischargeIntervention(
        id="int-rpm-cellular",
        title="Cellular Remote Patient Monitoring (RPM) Kit Dispatch",
        category="RPM",
        description="Dispatch cellular-enabled continuous pulse oximeter, blood pressure cuff, and digital weight scale with automated daily clinical telemetry alerts.",
        projected_risk_reduction_percent=16.2,
        evidence_base="NEJM Catalyst: Cellular RPM reduces 30-day all-cause readmissions from 24% to 9% in cardiorenal/respiratory patients.",
        is_ordered=False
    ),
    DischargeIntervention(
        id="int-pcp-7day",
        title="7-Day In-Person Primary Care Clinic Follow-up",
        category="PCP_APPOINTMENT",
        description="Lock in priority follow-up appointment with Dr. Alex Rivera (Primary Care) with repeat BMP lab panel for renal monitoring.",
        projected_risk_reduction_percent=10.8,
        evidence_base="CMS HRRP Core Guidelines: Documented 7-day PCP visit fulfills transitional care management (CPT 99496).",
        is_ordered=False
    )
]

COHORT_DATA: CohortRiskSummary = CohortRiskSummary(
    total_inpatient_census=24,
    high_risk_count=6,
    moderate_risk_count=11,
    low_risk_count=7,
    average_readmission_probability=41.2,
    projected_annual_hrrp_penalty=182400.0,
    patients=[
        CohortPatientSummary(
            patient_id="PAT-98421",
            patient_name="Robert Chen",
            room_number="ICU-4B",
            primary_condition="Severe Sepsis / AKI Stage 2",
            readmission_risk_percent=78.4,
            risk_tier="CRITICAL_HIGH",
            top_driver="Serum Lactate (3.4 mmol/L)"
        ),
        CohortPatientSummary(
            patient_id="PAT-44109",
            patient_name="Eleanor Vance",
            room_number="MED-210",
            primary_condition="Acute Decompensated Heart Failure",
            readmission_risk_percent=72.1,
            risk_tier="CRITICAL_HIGH",
            top_driver="Prior Inpatient Admissions (3 in 12M)"
        ),
        CohortPatientSummary(
            patient_id="PAT-55823",
            patient_name="Marcus Brody",
            room_number="SURG-104",
            primary_condition="COPD Exacerbation",
            readmission_risk_percent=64.8,
            risk_tier="ELEVATED",
            top_driver="SpO2 Desaturation (89%)"
        ),
        CohortPatientSummary(
            patient_id="PAT-66120",
            patient_name="Sophia Martinez",
            room_number="MED-215",
            primary_condition="Community-Acquired Pneumonia",
            readmission_risk_percent=52.3,
            risk_tier="ELEVATED",
            top_driver="High Charlson Index (CCI 5)"
        ),
        CohortPatientSummary(
            patient_id="PAT-77312",
            patient_name="James Wilson",
            room_number="MED-218",
            primary_condition="Post-Op Cholecystectomy",
            readmission_risk_percent=18.5,
            risk_tier="LOW",
            top_driver="Normal Baseline Renal Function"
        )
    ]
)

def get_recommended_interventions() -> List[DischargeIntervention]:
    return STANDARD_INTERVENTIONS

def get_cohort_risk_summary() -> CohortRiskSummary:
    return COHORT_DATA
