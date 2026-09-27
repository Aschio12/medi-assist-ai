from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI(title="MediAssist Federated Engine", version="1.0.0")

class ModelUpdateRequest(BaseModel):
    hospital_node_id: str
    model_version: str
    weight_payload_url: str
    sample_size: int

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "federated-engine"}

from core.fl_aggregator import fl_aggregator
from core.blockchain_ledger import blockchain_ledger

@app.post("/api/federated/aggregate")
def aggregate_model_weights(req: ModelUpdateRequest):
    # 1. Simulate FedAvg logic
    agg_result = fl_aggregator.process_node_update(req.hospital_node_id, req.sample_size)
    
    # 2. Log weight provenance to Blockchain to prevent poisoning
    ledger_receipt = blockchain_ledger.log_weight_update(
        req.hospital_node_id, 
        agg_result["new_global_round"]
    )
    
    return {
        "status": "success",
        "node_id": req.hospital_node_id,
        "federated_metrics": agg_result,
        "blockchain_receipt": ledger_receipt
    }
