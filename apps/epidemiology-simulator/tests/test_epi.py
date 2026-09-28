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

def test_seir_simulation():
    response = client.post("/api/epi/simulate-seir", json={
        "beta": 0.3,
        "sigma": 0.2,
        "gamma": 0.1,
        "population": 1000,
        "days": 10
    })
    assert response.status_code == 200
    data = response.json()
    assert "data" in data
    assert len(data["data"]) == 11 # 0 to 10

def test_spatial_simulation():
    response = client.post("/api/epi/simulate-spatial", json={
        "grid_size": 20,
        "beta": 0.3,
        "sigma": 0.2,
        "gamma": 0.1,
        "mortality": 0.05,
        "steps": 5
    })
    assert response.status_code == 200
    data = response.json()
    assert "history" in data
    assert len(data["history"]) == 5
    assert "grid" in data["history"][-1]
