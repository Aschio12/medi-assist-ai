from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class ClinicianFeedback(BaseModel):
    id: str
    timestamp: str
    physician_name: str
    specialty: str
    clinical_prompt: str
    ai_original_output: str
    rating: str # "THUMBS_UP" | "THUMBS_DOWN"
    correction_category: str # "MEDICATION_ALLERGY" | "DOSAGE_SAFETY" | "DIAGNOSTIC_OMISSION" | "ACCURATE"
    physician_corrected_output: str
    rationale: str
    status: str # "PENDING_REVIEW" | "SANITIZED_INGESTED" | "FINE_TUNED"

class DataLakeRecord(BaseModel):
    id: str
    created_at: str
    prompt: str
    chosen: str
    rejected: str
    phi_sanitization_status: str # "CLEARED_HIPAA_SAFE_HARBOR"
    token_count: int
    data_split: str # "TRAIN" | "VALIDATION"

class LoraHyperparameters(BaseModel):
    rank: int = 16
    lora_alpha: int = 32
    lora_dropout: float = 0.05
    target_modules: List[str] = ["q_proj", "v_proj", "k_proj", "o_proj"]
    learning_rate: float = 0.0002
    epochs: int = 3
    batch_size: int = 4

class TrainingLossStep(BaseModel):
    step: int
    epoch: float
    loss: float
    val_loss: float
    learning_rate: float

class TrainingJobStatus(BaseModel):
    job_id: str
    status: str # "IDLE" | "PREPARING_DATA" | "TRAINING" | "COMPLETED"
    base_model: str # "Meta-Llama-3.1-8B-Instruct" | "Mistral-7B-Instruct"
    adapter_name: str
    total_epochs: int
    current_epoch: int
    progress_percent: float
    current_loss: float
    training_steps: List[TrainingLossStep]
    estimated_time_remaining_seconds: int

class LoRAModelCheckpoint(BaseModel):
    checkpoint_id: str
    adapter_name: str
    created_at: str
    training_samples_used: int
    final_loss: float
    medqa_usmle_score_percent: float
    base_model_score_percent: float
    is_active_in_production: bool
    download_size_mb: float
