from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class RagasEvalRequest(BaseModel):
    questions: List[str]
    answers: List[str]
    contexts: List[List[str]]
    ground_truths: List[List[str]]

class TruLensEvalRequest(BaseModel):
    query: str
    context: str
    response: str

class ToxicityEvalRequest(BaseModel):
    response: str

class PipelineResponse(BaseModel):
    timestamp: str
    total_samples_evaluated: int
    ragas_aggregated_scores: Dict[str, float]
    hallucination_rate_percent: float
    bias_toxicity_rate_percent: float
    pipeline_status: str
