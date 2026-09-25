from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="MediAssist Pharmacovigilance Engine", version="1.0.0")

class ClinicalNote(BaseModel):
    patient_id: str
    note_text: str

class AdeEntity(BaseModel):
    drug: str
    adverse_event: str
    confidence_score: float

class AdeResponse(BaseModel):
    entities: List[AdeEntity]
    requires_medwatch: bool

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "pv-engine"}

@app.post("/analyze-ade", response_model=AdeResponse)
def analyze_adverse_drug_events(note: ClinicalNote):
    # Route to internal ClinicalBERT extractor (to be implemented)
    return {
        "entities": [],
        "requires_medwatch": False
    }
