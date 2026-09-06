from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

from models.schemas import (
    ClinicianFeedback,
    DataLakeRecord,
    LoraHyperparameters,
    TrainingJobStatus,
    LoRAModelCheckpoint
)
from core.feedback_collector import submit_feedback, list_feedback
from core.data_lake_sanitizer import export_datalake_records
from core.lora_trainer import trigger_lora_training, get_current_job_status
from core.model_registry import list_checkpoints, set_active_checkpoint

app = FastAPI(
    title="MediAssist Human-in-the-Loop Feedback & Automated LoRA Fine-Tuning Engine",
    description="Captures clinician corrections, sanitizes training pairs into DPO/SFT JSONL, orchestrates PEFT LoRA training runs, and registers active adapters.",
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
        "service": "tuning-engine",
        "status": "online",
        "fine_tuning_method": "PEFT LoRA / QLoRA + DPO Alignment",
        "endpoints": [
            "/api/v1/tuning/feedback",
            "/api/v1/tuning/datalake",
            "/api/v1/tuning/train",
            "/api/v1/tuning/models"
        ]
    }

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "service": "tuning-engine",
        "port": 8012,
        "active_adapter": "mediassist-lora-v1.4-sepsis",
        "medqa_benchmark": "86.8%"
    }

@app.get("/api/v1/tuning/feedback", response_model=List[ClinicianFeedback])
def get_feedback():
    return list_feedback()

@app.post("/api/v1/tuning/feedback", response_model=ClinicianFeedback)
def post_feedback(payload: Dict[str, Any] = Body(...)):
    return submit_feedback(
        physician_name=payload.get("physician_name", "Dr. Alex Rivera, MD"),
        specialty=payload.get("specialty", "Critical Care & Pulmonology"),
        clinical_prompt=payload.get("clinical_prompt", ""),
        ai_original_output=payload.get("ai_original_output", ""),
        rating=payload.get("rating", "THUMBS_DOWN"),
        correction_category=payload.get("correction_category", "MEDICATION_ALLERGY"),
        physician_corrected_output=payload.get("physician_corrected_output", ""),
        rationale=payload.get("rationale", "")
    )

@app.get("/api/v1/tuning/datalake", response_model=List[DataLakeRecord])
def get_datalake():
    return export_datalake_records()

@app.post("/api/v1/tuning/train/trigger", response_model=TrainingJobStatus)
def trigger_training(params: LoraHyperparameters = Body(default=LoraHyperparameters())):
    return trigger_lora_training(params)

@app.get("/api/v1/tuning/train/status", response_model=TrainingJobStatus)
def get_training_status():
    return get_current_job_status()

@app.get("/api/v1/tuning/models", response_model=List[LoRAModelCheckpoint])
def get_models():
    return list_checkpoints()

@app.post("/api/v1/tuning/models/{checkpoint_id}/activate", response_model=LoRAModelCheckpoint)
def activate_model(checkpoint_id: str):
    return set_active_checkpoint(checkpoint_id)
