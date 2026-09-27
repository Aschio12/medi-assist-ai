from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import time

app = FastAPI(title="MediAssist Quantum Engine", version="1.0.0")

class MoleculeRequest(BaseModel):
    smiles_string: str
    target_protein_id: str

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "quantum-engine"}

from core.vqe_simulator import vqe_simulator
from core.binding_affinity import quantum_binding_predictor

@app.post("/api/quantum/simulate-vqe")
def simulate_vqe(req: MoleculeRequest):
    result = vqe_simulator.estimate_ground_state(req.smiles_string)
    return {"status": "success", "data": result}

@app.post("/api/quantum/binding-affinity")
def calculate_binding_affinity(req: MoleculeRequest):
    result = quantum_binding_predictor.predict_affinity(req.smiles_string, req.target_protein_id)
    return {"status": "success", "data": result}
