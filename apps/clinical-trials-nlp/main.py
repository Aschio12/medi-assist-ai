from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI(title="MediAssist GenAI Clinical Trials NLP Pipeline", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "clinical-trials-nlp"}

class SearchRequest(BaseModel):
    query: str
    top_k: int = 5

class ParseRequest(BaseModel):
    criteria_text: str

from core.nlp_parser import nlp_parser
from core.vector_db import vector_db

@app.post("/api/trials/search")
def vector_search_trials(req: SearchRequest):
    results = vector_db.semantic_search(req.query, req.top_k)
    return {"status": "success", "results": results}

@app.post("/api/trials/parse")
def parse_criteria(req: ParseRequest):
    result = nlp_parser.parse_criteria(req.criteria_text)
    return result
