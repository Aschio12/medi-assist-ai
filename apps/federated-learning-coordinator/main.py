from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI(title="MediAssist Federated Learning Coordinator", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "federated-learning-coordinator"}

class EdgeWeightPayload(BaseModel):
    node_id: str
    encrypted_weights: List[float]
    sample_size: int

from core.weight_aggregator import fed_aggregator

@app.post("/api/federated/sync-weights")
def receive_edge_weights(payload: EdgeWeightPayload):
    success = fed_aggregator.register_weights(payload.node_id, payload.encrypted_weights, payload.sample_size)
    return {"status": "success", "registered": success}

@app.post("/api/federated/aggregate")
def perform_fedavg_aggregation():
    result = fed_aggregator.perform_fedavg()
    return result
