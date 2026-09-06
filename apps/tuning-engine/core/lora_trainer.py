import time
import uuid
from typing import List
from models.schemas import TrainingJobStatus, TrainingLossStep, LoraHyperparameters

CURRENT_JOB: TrainingJobStatus = TrainingJobStatus(
    job_id="job-lora-run-8821",
    status="COMPLETED",
    base_model="Meta-Llama-3.1-8B-Instruct",
    adapter_name="mediassist-lora-v1.4-sepsis",
    total_epochs=3,
    current_epoch=3,
    progress_percent=100.0,
    current_loss=0.482,
    training_steps=[
        TrainingLossStep(step=50, epoch=0.5, loss=2.41, val_loss=2.35, learning_rate=0.0002),
        TrainingLossStep(step=100, epoch=1.0, loss=1.84, val_loss=1.79, learning_rate=0.00018),
        TrainingLossStep(step=150, epoch=1.5, loss=1.22, val_loss=1.20, learning_rate=0.00014),
        TrainingLossStep(step=200, epoch=2.0, loss=0.88, val_loss=0.85, learning_rate=0.00010),
        TrainingLossStep(step=250, epoch=2.5, loss=0.62, val_loss=0.61, learning_rate=0.00005),
        TrainingLossStep(step=300, epoch=3.0, loss=0.48, val_loss=0.47, learning_rate=0.00001)
    ],
    estimated_time_remaining_seconds=0
)

def trigger_lora_training(params: LoraHyperparameters) -> TrainingJobStatus:
    global CURRENT_JOB
    job_id = f"job-lora-{uuid.uuid4().hex[:6]}"
    
    CURRENT_JOB = TrainingJobStatus(
        job_id=job_id,
        status="TRAINING",
        base_model="Meta-Llama-3.1-8B-Instruct",
        adapter_name=f"mediassist-lora-v1.5-r{params.rank}",
        total_epochs=params.epochs,
        current_epoch=1,
        progress_percent=33.3,
        current_loss=1.42,
        training_steps=[
            TrainingLossStep(step=50, epoch=0.5, loss=2.38, val_loss=2.31, learning_rate=params.learning_rate),
            TrainingLossStep(step=100, epoch=1.0, loss=1.42, val_loss=1.39, learning_rate=params.learning_rate * 0.8)
        ],
        estimated_time_remaining_seconds=180
    )
    return CURRENT_JOB

def get_current_job_status() -> TrainingJobStatus:
    return CURRENT_JOB
