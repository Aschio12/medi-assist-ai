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
