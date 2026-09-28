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
    assert response.json() == {"status": "healthy", "service": "bci-engine"}

def test_decode_eeg_stream():
    payload = {
        "channel_data": [0.1, -0.2, 0.4, 0.8, -0.1],
        "sampling_rate": 250
    }
    response = client.post("/api/bci/decode", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert data["status"] == "success"
    assert "data" in data
    assert "seizure_probability" in data["data"]
