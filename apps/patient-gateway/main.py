from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

from models.schemas import SimplifiedNote, MedicationScheduleItem, TriageAssessment, PushNotificationPayload
from core.simplification_engine import simplify_clinical_note
from core.medication_reminder import get_medication_schedule, generate_push_reminder
from core.triage_engine import evaluate_symptom_triage

app = FastAPI(
    title="MediAssist Patient Empowerment Gateway",
    description="Flesch-Kincaid Note Simplifier, Smart Medication Reminders, and ESI Symptom Triage Chatbot.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "service": "patient-gateway",
        "status": "online",
        "features": ["5th-Grade Note Translation", "Smart Medication Adherence", "Emergency Symptom Triage"]
    }

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "service": "patient-gateway",
        "port": 8009,
        "target_flesch_kincaid_grade": 4.9,
        "active_patient": "Robert Chen (PAT-98421)"
    }

@app.post("/api/v1/patient/simplify-note", response_model=SimplifiedNote)
def simplify_note(payload: Dict[str, str] = Body(default={})):
    patient_id = payload.get("patient_id", "PAT-98421")
    doctor_note = payload.get("doctor_note", "")
    return simplify_clinical_note(patient_id, doctor_note)

@app.get("/api/v1/patient/medications", response_model=List[MedicationScheduleItem])
def get_medications(patient_id: str = "PAT-98421"):
    return get_medication_schedule(patient_id)

@app.post("/api/v1/patient/medications/{med_id}/reminder", response_model=PushNotificationPayload)
def trigger_reminder(med_id: str):
    return generate_push_reminder(med_id)

@app.post("/api/v1/patient/triage", response_model=TriageAssessment)
def triage_symptoms(payload: Dict[str, str] = Body(...)):
    user_query = payload.get("symptoms", "")
    return evaluate_symptom_triage(user_query)
