from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class GlossaryTerm(BaseModel):
    medical_term: str
    plain_english: str
    analogy: str

class SimplifiedNoteSection(BaseModel):
    title: str
    doctor_text: str
    patient_text: str
    key_takeaway: str

class SimplifiedNote(BaseModel):
    patient_id: str
    original_doctor_note: str
    original_reading_grade: float
    simplified_reading_grade: float
    summary_paragraph: str
    action_items_for_patient: List[str]
    sections: List[SimplifiedNoteSection]
    glossary: List[GlossaryTerm]

class MedicationScheduleItem(BaseModel):
    id: str
    drug_name: str
    dosage: str
    timing_slot: str # "MORNING" | "AFTERNOON" | "EVENING" | "BEDTIME"
    meal_cue: str # "Take with breakfast", "Take on empty stomach"
    purpose: str # "For high blood pressure", "For kidney protection"
    pill_appearance: str # "Oval white pill marked M-10", "Round yellow tablet"
    is_taken: bool = False
    refill_remaining: int
    critical_warning: Optional[str] = None

class TriageMessage(BaseModel):
    sender: str # "user" | "bot"
    text: str
    timestamp: str

class TriageAssessment(BaseModel):
    urgency_level: str # "EMERGENCY_911" | "URGENT_CARE" | "ROUTINE_APPOINTMENT" | "SELF_CARE"
    esi_score: int # 1 (Resuscitation), 2 (Emergent), 3 (Urgent), 4 (Less Urgent), 5 (Non-urgent)
    recommendation_title: str
    action_steps: List[str]
    warning_signs: List[str]
    dispatch_911_alert: bool
    nearest_care_facility: str

class PushNotificationPayload(BaseModel):
    title: str
    body: str
    tag: str
    scheduled_time: str
    action_url: str
