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
    assert response.json() == {"status": "healthy", "service": "fhir-engine"}

def test_create_and_fetch_patient():
    patient_payload = {
        "resourceType": "Patient",
        "active": True,
        "name": [
            {
                "use": "official",
                "family": "Doe",
                "given": ["John", "Alexander"]
            }
        ],
        "gender": "male",
        "birthDate": "1980-05-15",
        "telecom": [
            {
                "system": "phone",
                "value": "555-123-4567",
                "use": "mobile"
            },
            {
                "system": "email",
                "value": "j.doe@example.com",
                "use": "home"
            }
        ],
        "address": [
            {
                "use": "home",
                "type": "physical",
                "line": ["123 Fake Street", "Apt 4B"],
                "city": "Springfield",
                "state": "IL",
                "postalCode": "62704",
                "country": "USA"
            }
        ]
    }
    
    # Create Patient
    create_resp = client.post("/api/fhir/Patient", json=patient_payload)
    assert create_resp.status_code == 200
    patient_data = create_resp.json()
    assert "id" in patient_data
    patient_id = patient_data["id"]
    
    # Fetch Patient
    get_resp = client.get(f"/api/fhir/Patient/{patient_id}")
    assert get_resp.status_code == 200
    fetched_data = get_resp.json()
    assert fetched_data["name"][0]["family"] == "Doe"

def test_patient_everything_bundle():
    # 1. Create Patient
    patient_payload = {
        "resourceType": "Patient",
        "name": [{"family": "Smith", "given": ["Jane"]}],
        "gender": "female"
    }
    p_resp = client.post("/api/fhir/Patient", json=patient_payload)
    p_id = p_resp.json()["id"]
    
    # 2. Create Observation for Patient
    obs_payload = {
        "resourceType": "Observation",
        "status": "final",
        "code": {
            "coding": [{"system": "http://loinc.org", "code": "8480-6", "display": "Systolic blood pressure"}]
        },
        "subject": {"reference": f"Patient/{p_id}"},
        "valueQuantity": {"value": 120, "unit": "mmHg"}
    }
    client.post("/api/fhir/Observation", json=obs_payload)
    
    # 3. Get $everything
    bundle_resp = client.get(f"/api/fhir/Patient/{p_id}/$everything")
    assert bundle_resp.status_code == 200
    bundle = bundle_resp.json()
    assert bundle["resourceType"] == "Bundle"
    assert bundle["total"] == 2 # 1 patient + 1 observation
    assert len(bundle["entry"]) == 2
