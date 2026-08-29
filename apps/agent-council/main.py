from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

from models.schemas import CouncilResponse, ClinicalCaseInput, AgentProfile
from core.agents import COUNCIL_AGENTS
from core.clinical_cases import SAMPLE_CASES, get_case_by_id
from core.debate_engine import run_council_deliberation

app = FastAPI(
    title="MediAssist Multi-Agent Clinical Council API",
    description="Agentic deliberation & multi-specialty consensus engine for clinical decision support.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "service": "agent-council",
        "status": "online",
        "agents_available": len(COUNCIL_AGENTS),
        "protocol": "LangGraph Multi-Round Clinical Debate"
    }

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "service": "agent-council",
        "port": 8004,
        "active_models": ["diagnostician", "pharmacist", "radiologist", "stewardship", "cmo"]
    }

@app.get("/api/v1/council/agents", response_model=List[AgentProfile])
def get_agents():
    return COUNCIL_AGENTS

@app.get("/api/v1/council/cases", response_model=List[ClinicalCaseInput])
def get_cases():
    return SAMPLE_CASES

@app.post("/api/v1/council/debate", response_model=CouncilResponse)
def debate_clinical_case(case_input: ClinicalCaseInput):
    try:
        response = run_council_deliberation(case_input)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Deliberation engine error: {str(e)}")

@app.get("/api/v1/council/debate/{case_id}", response_model=CouncilResponse)
def debate_case_by_id(case_id: str):
    case = get_case_by_id(case_id)
    return run_council_deliberation(case)
