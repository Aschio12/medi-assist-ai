from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class EvidenceCitation(BaseModel):
    id: int
    guideline_name: str
    organization: str # "Surviving Sepsis Campaign", "IDSA/ATS", "KDIGO", "ACC/AHA"
    year: int
    section: str
    target_sentence: str
    full_context_paragraph: str
    evidence_grade: str # "Grade 1A (Strong)", "Grade 1B", "Expert Consensus"
    doi_or_url: str

class ActionChip(BaseModel):
    id: str
    label: str
    category: str # "ORDER" | "MEDICATION" | "SAFETY_HOLD" | "NOTE" | "CONSULT"
    icon: str
    description: str
    payload: Dict[str, Any]
    status: str = "AVAILABLE" # "AVAILABLE" | "QUEUED" | "EXECUTED"

class PatientVitalSnapshot(BaseModel):
    heart_rate: int
    blood_pressure: str
    resp_rate: int
    spo2: int
    temperature: float
    lactate: float
    creatinine: float
    egfr: int

class PatientChartSummary(BaseModel):
    patient_id: str
    name: str
    age: int
    gender: str
    allergies: List[str]
    active_diagnoses: List[str]
    current_medications: List[str]
    vitals: PatientVitalSnapshot
    lab_alerts: List[str]

class CopilotChatMessage(BaseModel):
    sender: str # "user" | "ai"
    content: str
    timestamp: str
    cited_ids: List[int] = []
    action_chips: List[ActionChip] = []

class CopilotQuery(BaseModel):
    patient_id: str
    query_text: str
    conversation_history: List[CopilotChatMessage] = []

class CopilotResponse(BaseModel):
    message: CopilotChatMessage
    citations: List[EvidenceCitation]
    suggested_actions: List[ActionChip]
    drafted_ap_note: str
