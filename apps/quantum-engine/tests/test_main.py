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
    assert response.json() == {"status": "healthy", "service": "quantum-engine"}

def test_simulate_vqe():
    payload = {
        "molecule": "H2O",
        "basis_set": "sto-3g",
        "qubit_mapping": "jordan_wigner"
    }
    response = client.post("/api/quantum/vqe", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "data" in data
    assert "ground_state_energy_hartree" in data["data"]
