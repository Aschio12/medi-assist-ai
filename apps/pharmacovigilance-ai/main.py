from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI(title="MediAssist Pharmacovigilance AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "pharmacovigilance-ai"}

class RiskRequest(BaseModel):
    patient_drugs: List[str]
    patient_conditions: List[str]

from core.risk_model import pv_risk_model

@app.post("/api/pv/analyze-risk")
def analyze_toxicity_risk(req: RiskRequest):
    result = pv_risk_model.calculate_patient_risk(req.patient_drugs, req.patient_conditions)
    return result

@app.post("/api/pv/detect-signals")
def detect_population_signals():
    # Simulated population level signal detection
    pass
