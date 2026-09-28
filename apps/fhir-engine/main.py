from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
from core.fhir_models import Patient, Observation, Condition, Bundle
import uuid

app = FastAPI(title="MediAssist FHIR Interoperability Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory mock FHIR store
fhir_store: Dict[str, Dict[str, Any]] = {
    "Patient": {},
    "Observation": {},
    "Condition": {}
}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "fhir-engine"}

@app.post("/api/fhir/Patient", response_model=Patient)
def create_patient(patient: Patient):
    if not patient.id:
        patient.id = str(uuid.uuid4())
    fhir_store["Patient"][patient.id] = patient.dict(exclude_none=True)
    return patient

@app.get("/api/fhir/Patient/{patient_id}", response_model=Patient)
def get_patient(patient_id: str):
    patient_data = fhir_store["Patient"].get(patient_id)
    if not patient_data:
        raise HTTPException(status_code=404, detail="Patient not found")
    return Patient(**patient_data)

@app.post("/api/fhir/Observation", response_model=Observation)
def create_observation(obs: Observation):
    if not obs.id:
        obs.id = str(uuid.uuid4())
    fhir_store["Observation"][obs.id] = obs.dict(exclude_none=True)
    return obs

@app.get("/api/fhir/Patient/{patient_id}/$everything")
def get_patient_everything(patient_id: str):
    """
    Simulates the FHIR $everything operation to return a Bundle of the patient and all associated records.
    """
    patient_data = fhir_store["Patient"].get(patient_id)
    if not patient_data:
        raise HTTPException(status_code=404, detail="Patient not found")
        
    entries = [{"resource": Patient(**patient_data)}]
    
    # Add observations
    for obs in fhir_store["Observation"].values():
        if obs.get("subject", {}).get("reference") == f"Patient/{patient_id}":
            entries.append({"resource": Observation(**obs)})
            
    # Add conditions
    for cond in fhir_store["Condition"].values():
        if cond.get("subject", {}).get("reference") == f"Patient/{patient_id}":
            entries.append({"resource": Condition(**cond)})
            
    bundle = Bundle(
        type="searchset",
        total=len(entries),
        entry=entries
    )
    return bundle

from core.trial_matcher import trial_matcher
from core.pharmacovigilance import pv_monitor

@app.post("/api/fhir/Patient/{patient_id}/match-trials")
def match_patient_trials(patient_id: str):
    bundle = get_patient_everything(patient_id)
    matches = trial_matcher.evaluate_patient(bundle.dict())
    return {"status": "success", "matches": matches}

@app.post("/api/fhir/Patient/{patient_id}/pv-scan")
def scan_patient_pv(patient_id: str):
    bundle = get_patient_everything(patient_id)
    signals = pv_monitor.detect_signals(bundle.dict())
    return {"status": "success", "signals": signals}
