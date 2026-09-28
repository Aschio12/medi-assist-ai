import pytest
from fastapi.testclient import TestClient
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import app

client = TestClient(app)

# Minimal mock 837 transaction
MOCK_837 = "ISA*00*          *00*          *ZZ*SENDER         *ZZ*RECEIVER       *260928*1630*U*00401*000000001*0*T*:~GS*HC*SENDER*RECEIVER*20260928*1630*1*X*004010X098A1~ST*837*0001~HL*1**20*1~NM1*85*2*PROVIDER INC*****XX*1234567890~HL*2*1*22*0~NM1*IL*1*DOE*JOHN****MI*999999999~CLM*CLM01*150.00***11::1*Y*A*Y*I~SV1*HC:99213*150.00*UN*1~SE*10*0001~GE*1*1~IEA*1*000000001~"

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200

def test_parse_837():
    response = client.post("/api/edi/parse", json={
        "edi_text": MOCK_837,
        "transaction_type": "837"
    })
    assert response.status_code == 200
    data = response.json()["data"]
    
    assert "interchange" in data
    assert "transactions" in data
    assert len(data["transactions"]) == 1
    
    txn = data["transactions"][0]
    assert txn["providers"][0]["npi"] == "1234567890"

def test_adjudicate_837():
    response = client.post("/api/edi/adjudicate", json={
        "edi_text": MOCK_837,
        "transaction_type": "837"
    })
    assert response.status_code == 200
    data = response.json()
    assert "remittance" in data
