from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="MediAssist CRISPR Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "crispr-engine"}

class CRISPRRequest(BaseModel):
    target_sequence: str
    pam_sequence: str = "NGG" # SpCas9 PAM

from core.grna_designer import grna_designer
from core.off_target_analyzer import off_target_analyzer

@app.post("/api/crispr/design-grna")
def design_grna(req: CRISPRRequest):
    result = grna_designer.design_candidates(req.target_sequence, req.pam_sequence)
    return {"status": "success", "data": result}

class OffTargetRequest(BaseModel):
    grna_sequence: str
    genome_assembly: str = "hg38"

@app.post("/api/crispr/off-target")
def predict_off_targets(req: OffTargetRequest):
    result = off_target_analyzer.predict_mismatches(req.grna_sequence, req.genome_assembly)
    return {"status": "success", "data": result}
