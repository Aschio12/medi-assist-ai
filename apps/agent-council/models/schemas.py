from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class AgentProfile(BaseModel):
    id: str
    name: str
    role: str
    specialty: str
    avatar_color: str
    badge_text: str
    system_objective: str

class ClinicalCaseInput(BaseModel):
    case_id: str
    patient_name: str
    age: int
    gender: str
    chief_complaint: str
    vitals: Dict[str, Any]
    labs: Dict[str, Any]
    current_medications: List[str]
    allergies: List[str]
    imaging_summary: Optional[str] = None
    clinical_notes: Optional[str] = None

class AgentArgument(BaseModel):
    agent_id: str
    agent_name: str
    role: str
    round_number: int
    statement: str
    chain_of_thought: List[str]
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    proposed_interventions: List[str]
    flagged_risks: List[str] = []
    citations: List[str] = []

class ConflictItem(BaseModel):
    id: str
    involved_agents: List[str]
    topic: str
    severity: str # "CRITICAL" | "MODERATE" | "LOW"
    description: str
    resolution_status: str # "FLAGGED" | "RESOLVED" | "OVERRIDDEN"
    resolution_notes: Optional[str] = None

class DebateRound(BaseModel):
    round_number: int
    title: str
    focus: str
    arguments: List[AgentArgument]

class ConsensusAdjudication(BaseModel):
    adjudicator_id: str = "cmo-agent"
    adjudicator_name: str = "Chief Medical Officer Agent"
    primary_diagnosis: str
    icd10_code: str
    differential_diagnoses: List[Dict[str, Any]]
    confidence_rating: float = Field(..., ge=0.0, le=1.0)
    agreed_treatment_plan: List[str]
    prescriptions: List[Dict[str, str]]
    critical_contraindications: List[str]
    monitoring_orders: List[str]
    conflicts_resolved: List[ConflictItem]
    evidence_base: List[str]
    physician_action_required: str

class CouncilResponse(BaseModel):
    case_id: str
    patient_name: str
    deliberation_timestamp: str
    status: str
    rounds: List[DebateRound]
    consensus: ConsensusAdjudication
    metrics: Dict[str, Any]
