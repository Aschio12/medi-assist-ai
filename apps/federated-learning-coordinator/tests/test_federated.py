import pytest
from fastapi.testclient import TestClient
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "service": "federated-learning-coordinator"}

def test_fedavg_flow():
    # Sync node 1
    res1 = client.post("/api/federated/sync-weights", json={
        "node_id": "HOSP-1", "encrypted_weights": [0.5, 0.5], "sample_size": 100
    })
    assert res1.status_code == 200
    
    # Sync node 2
    res2 = client.post("/api/federated/sync-weights", json={
        "node_id": "HOSP-2", "encrypted_weights": [1.0, 1.0], "sample_size": 100
    })
    assert res2.status_code == 200
    
    # Aggregate
    res_agg = client.post("/api/federated/aggregate")
    assert res_agg.status_code == 200
    data = res_agg.json()
    assert data["status"] == "success"
    assert data["aggregated_nodes"] == 2
    assert data["total_training_samples"] == 200
    assert data["new_global_weights"] == [0.75, 0.75]
