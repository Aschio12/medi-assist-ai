from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="MediAssist Generative AI & FHIR Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "AI Engine Online"}

from models.schemas import ChatRequest, ChatResponse
from core.rag_pipeline import generate_medical_response
from core.fhir_client import fetch_patient_fhir_bundle

@app.get("/api/v1/fhir/patient/{patient_id}")
async def get_fhir_patient(patient_id: str):
    return fetch_patient_fhir_bundle(patient_id)

@app.post("/api/v1/chat", response_model=ChatResponse)
async def chat_with_copilot(request: ChatRequest):
    last_message = request.messages[-1].content
    result = generate_medical_response(last_message, request.patient_id)
    
    return ChatResponse(
        response=result["text"],
        fhir_sources_used=result["sources"]
    )

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok", "service": "ai-engine", "llm_connected": True}
