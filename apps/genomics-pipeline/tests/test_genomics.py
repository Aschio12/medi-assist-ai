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

def test_nw_alignment():
    response = client.post("/api/genomics/align", json={
        "seq1": "GATTACA",
        "seq2": "GCATGCG",
        "type": "global"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "Needleman-Wunsch"
    assert "score" in data

def test_sw_alignment():
    response = client.post("/api/genomics/align", json={
        "seq1": "GATTACA",
        "seq2": "GCATGCG",
        "type": "local"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "Smith-Waterman"

def test_kmer_assembly():
    response = client.post("/api/genomics/assemble", json={
        "reads": ["ATG", "TGC", "GCC", "CCG", "CGT", "GTA"],
        "k": 2
    })
    assert response.status_code == 200
    data = response.json()
    assert data["contig_length"] > 0
