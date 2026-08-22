from pydantic import BaseModel
from typing import List

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    patient_id: str

class ChatResponse(BaseModel):
    response: str
    fhir_sources_used: List[str]
