from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from models.schemas import CopilotQuery, CopilotResponse, EvidenceCitation, ActionChip, CopilotChatMessage
from core.evidence_repository import get_all_citations, get_citation_by_id
from core.action_engine import get_action_chips_for_case

app = FastAPI(
    title="MediAssist Physician Copilot Engine",
    description="Conversational Clinical Decision Support with Real-Time Citation Highlighting and Action Suggestion Chips.",
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
        "service": "copilot-engine",
        "status": "online",
        "features": ["Split-Screen Grounding", "Live Citation Highlighting", "1-Click Clinical Action Chips"]
    }

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "service": "copilot-engine",
        "port": 8007,
        "citations_indexed": len(get_all_citations())
    }

@app.get("/api/v1/copilot/citations", response_model=List[EvidenceCitation])
def list_citations():
    return get_all_citations()

@app.get("/api/v1/copilot/citations/{citation_id}", response_model=EvidenceCitation)
def get_citation(citation_id: int):
    cit = get_citation_by_id(citation_id)
    if not cit:
        raise HTTPException(status_code=404, detail="Citation not found")
    return cit

@app.post("/api/v1/copilot/query", response_model=CopilotResponse)
def handle_copilot_query(query: CopilotQuery):
    citations = get_all_citations()
    action_chips = get_action_chips_for_case("sepsis")

    content = (
        "Based on Mr. Chen's acute vitals (BP 88/54, HR 118, Lactate 3.4 mmol/L) and CXR consolidation, "
        "the patient meets criteria for Severe Sepsis secondary to Community-Acquired Pneumonia with Stage 2 AKI. "
        "Per clinical guidelines, initiate parenteral antimicrobials immediately within 1 hour after drawing blood cultures [1]. "
        "For fluid resuscitation, administer 30 mL/kg balanced crystalloids (Plasma-Lyte) over normal saline [2]. "
        "Given the patient's severe anaphylactic penicillin allergy, avoid all beta-lactams and treat with renally-adjusted Aztreonam plus Doxycycline [3]. "
        "Crucially, immediately hold Metformin to eliminate the risk of fatal lactic acidosis in acute renal impairment [4]."
    )

    drafted_ap = (
        "ASSESSMENT & PLAN:\n"
        "1. Severe Sepsis secondary to Right Lower Lobe Pneumonia (qSOFA=3, Lactate 3.4)\n"
        "   - Blood cultures x2, then initiate IV Aztreonam 1g q8h + IV Doxycycline 100mg q12h (PCN Anaphylaxis safe).\n"
        "   - Resuscitate with 2,000 mL IV Plasma-Lyte A over 2 hours; target MAP >= 65 mmHg.\n\n"
        "2. Acute Kidney Injury (Stage 2, Cr 2.4 mg/dL from baseline 1.0)\n"
        "   - HOLD Metformin and Lisinopril immediately.\n"
        "   - Strict I&Os, serial creatinine and lactate monitoring q4h."
    )

    response_message = CopilotChatMessage(
        sender="ai",
        content=content,
        timestamp="Just now",
        cited_ids=[1, 2, 3, 4],
        action_chips=action_chips
    )

    return CopilotResponse(
        message=response_message,
        citations=citations,
        suggested_actions=action_chips,
        drafted_ap_note=drafted_ap
    )
