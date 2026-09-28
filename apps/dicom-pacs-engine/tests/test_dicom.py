import pytest
from fastapi.testclient import TestClient
import struct
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import app
from core.parser import DICOMStreamParser

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200

def test_c_echo():
    response = client.post("/api/pacs/c-echo?aetitle=TEST_AET")
    assert response.status_code == 200
    assert response.json()["status"] == "success"

def test_c_find():
    response = client.post("/api/pacs/c-find", json={
        "query_level": "STUDY",
        "dataset": {"PatientID": "12345"}
    })
    assert response.status_code == 200
    assert response.json()["matches"] == 5

def test_dicom_parser():
    # Construct a fake valid DICOM stream
    # 128 bytes of null
    stream = bytearray([0] * 128)
    # Prefix
    stream.extend(b'DICM')
    # Group 2 Element 0 (Meta Length)
    stream.extend(struct.pack("<HH", 0x0002, 0x0000))
    # Explicit VR 'UL'
    stream.extend(b'UL')
    # Length 4
    stream.extend(struct.pack("<H", 4))
    # Value (e.g., 200)
    stream.extend(struct.pack("<I", 200))
    
    parser = DICOMStreamParser()
    meta = parser.parse_header(bytes(stream))
    assert "File Meta Information Group Length" in meta
