from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class Icd10Code(BaseModel):
    code: str
    description: str
    category: str # "PRIMARY" | "SECONDARY" | "COMORBIDITY"
    hcc_category: Optional[str] = None # Hierarchical Condition Category (e.g. HCC 115)
    hcc_weight: Optional[float] = 0.0
    specificity_level: str # "HIGH" | "MEDIUM" | "UNSPECIFIED"
    documentation_citation: str

class CptCode(BaseModel):
    code: str
    description: str
    category: str # "E_M" | "PROCEDURAL" | "DIAGNOSTIC" | "LAB"
    units: int = 1
    work_rvu: float
    total_rvu: float
    standard_fee: float
    recommended_modifiers: List[str] = []
    active_modifiers: List[str] = []
    medical_necessity_icd10: List[str] = []

class MdmCategoryScore(BaseModel):
    tier: str # "MINIMAL" | "LOW" | "MODERATE" | "HIGH"
    score_points: int
    rationale: str
    evidence_extracted: List[str]

class MdmEvaluation(BaseModel):
    problems_addressed: MdmCategoryScore
    data_reviewed: MdmCategoryScore
    management_risk: MdmCategoryScore
    overall_mdm_level: str # "Straightforward" | "Low" | "Moderate" | "High"
    recommended_em_code: str
    em_code_title: str
    time_based_alternative: Optional[str] = None

class NcciViolation(BaseModel):
    code_pair: List[str]
    column_1_code: str
    column_2_code: str
    policy_name: str
    modifier_allowed: bool
    recommended_action: str
    resolution_status: str # "RESOLVED" | "FLAGGED"

class ClaimDenialRisk(BaseModel):
    clean_claim_probability: float = Field(..., ge=0.0, le=1.0)
    denial_risk_percentage: float
    risk_level: str # "CLEAN" | "LOW_RISK" | "HIGH_RISK" | "CRITICAL"
    flagged_issues: List[str]
    corrective_actions: List[str]

class InsuranceClaimPackage(BaseModel):
    claim_id: str
    encounter_id: str
    patient_id: str
    patient_name: str
    date_of_service: str
    payer_name: str
    payer_id: str
    place_of_service: str # "21 - Inpatient Hospital" | "11 - Office" | "23 - Emergency Room"
    provider_name: str
    provider_npi: str
    icd10_diagnoses: List[Icd10Code]
    cpt_procedures: List[CptCode]
    mdm_evaluation: MdmEvaluation
    ncci_scrub: List[NcciViolation]
    denial_prediction: ClaimDenialRisk
    total_rvu: float
    estimated_reimbursement: float
    claim_status: str # "SCRUBBED_READY" | "FLAGGED_REVIEW" | "SUBMITTED"
    edi_837_raw: Optional[str] = None
