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
    assert response.json() == {"status": "healthy", "service": "clinical-trials-nlp"}

def test_vector_search():
    payload = {"query": "EGFR+ lung cancer phase III", "top_k": 3}
    response = client.post("/api/trials/search", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
    assert len(data["results"]) == 3
    assert "similarity_score" in data["results"][0]

def test_nlp_parser():
    payload = {"criteria_text": "Inclusion: Patients with Age > 18 and positive EGFR mutation."}
    response = client.post("/api/trials/parse", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "extracted_entities" in data
    assert len(data["extracted_entities"]) >= 2
