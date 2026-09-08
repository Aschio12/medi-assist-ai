import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from models.schemas import RagasEvalRequest, TruLensEvalRequest, ToxicityEvalRequest, PipelineResponse
from core.ragas_evaluator import ragas_evaluator
from core.trulens_monitor import trulens_monitor
from core.toxicity_bias import toxicity_bias_detector
from pipelines.nightly_eval import nightly_pipeline

load_dotenv()

app = FastAPI(
    title="MediAssist Evaluation Engine",
    description="Clinical AI Evaluation using RAGAS and TruLens (Hallucination, Toxicity, Bias)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "eval-engine"}

@app.post("/api/v1/eval/ragas")
def evaluate_ragas_batch(req: RagasEvalRequest):
    """Evaluates a batch of RAG inferences using RAGAS."""
    if not os.getenv("OPENAI_API_KEY"):
        return {"status": "error", "error": "Missing LLM Judge credentials for RAGAS"}
    
    return ragas_evaluator.evaluate_clinical_batch(
        questions=req.questions,
        answers=req.answers,
        contexts=req.contexts,
        ground_truths=req.ground_truths
    )

@app.post("/api/v1/eval/trulens/hallucination")
def evaluate_hallucination(req: TruLensEvalRequest):
    """Uses TruLens RAG Triad to evaluate context relevance, groundedness, and answer relevance."""
    if not os.getenv("OPENAI_API_KEY"):
        return {"status": "error", "error": "Missing LLM Judge credentials for TruLens"}
        
    return trulens_monitor.evaluate_clinical_response(
        query=req.query,
        context=req.context,
        response=req.response
    )

@app.post("/api/v1/eval/trulens/toxicity")
def evaluate_toxicity_bias(req: ToxicityEvalRequest):
    """Uses TruLens to score clinical output for toxicity, maliciousness, and stereotyping."""
    if not os.getenv("OPENAI_API_KEY"):
        return {"status": "error", "error": "Missing LLM Judge credentials for TruLens"}
        
    return toxicity_bias_detector.scan_medical_output(req.response)

@app.post("/api/v1/eval/pipeline/nightly", response_model=PipelineResponse)
def run_nightly_pipeline():
    """Triggers the automated nightly CI/CD evaluation pipeline against the golden dataset."""
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=500, detail="Missing LLM Judge credentials")
        
    return nightly_pipeline.run_pipeline()
