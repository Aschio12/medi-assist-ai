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
    assert response.json() == {"status": "healthy", "service": "pharmacovigilance-ai"}

def test_analyze_toxicity_risk():
    payload = {
        "patient_drugs": ["Lisinopril", "Ibuprofen"],
        "patient_conditions": ["Hypertension"]
    }
    response = client.post("/api/pv/analyze-risk", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "composite_risk_score" in data
    assert "warnings" in data
