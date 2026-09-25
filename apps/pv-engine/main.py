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

from core.ade_extractor import ade_pipeline

@app.post("/analyze-ade", response_model=AdeResponse)
def analyze_adverse_drug_events(note: ClinicalNote):
    result = ade_pipeline.extract_entities(note.note_text)
    return result

from core.openfda_client import fda_client

@app.get("/fda-lookup")
async def lookup_drug_safety(drug: str):
    """Fetches real-world FAERS data from the openFDA API."""
    return await fda_client.get_drug_adverse_events(drug)

from core.medwatch_generator import medwatch_pipeline
from pydantic import BaseModel

class MedWatchRequest(BaseModel):
    patient_id: str
    drug: str
    event: str
    confidence: float

@app.post("/generate-medwatch")
def create_fda_form_3500(req: MedWatchRequest):
    """Generates a drafted FDA Form 3500 based on NLP extraction."""
    return medwatch_pipeline.generate_form_3500(
        patient_id=req.patient_id,
        drug_name=req.drug,
        event_description=req.event,
        nlp_confidence=req.confidence
    )
