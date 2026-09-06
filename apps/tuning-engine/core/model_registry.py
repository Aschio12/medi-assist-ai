from typing import List
from models.schemas import LoRAModelCheckpoint

CHECKPOINTS_REPOSITORY: List[LoRAModelCheckpoint] = [
    LoRAModelCheckpoint(
        checkpoint_id="chk-v1.4-active",
        adapter_name="mediassist-lora-v1.4-sepsis",
        created_at="2026-09-06T08:00:00Z",
        training_samples_used=1240,
        final_loss=0.482,
        medqa_usmle_score_percent=86.8,
        base_model_score_percent=74.2,
        is_active_in_production=True,
        download_size_mb=68.4
    ),
    LoRAModelCheckpoint(
        checkpoint_id="chk-v1.3-archive",
        adapter_name="mediassist-lora-v1.3-antibiotics",
        created_at="2026-08-28T14:30:00Z",
        training_samples_used=890,
        final_loss=0.640,
        medqa_usmle_score_percent=82.4,
        base_model_score_percent=74.2,
        is_active_in_production=False,
        download_size_mb=68.2
    ),
    LoRAModelCheckpoint(
        checkpoint_id="chk-v1.2-archive",
        adapter_name="mediassist-lora-v1.2-baseline",
        created_at="2026-08-15T11:00:00Z",
        training_samples_used=450,
        final_loss=0.812,
        medqa_usmle_score_percent=78.1,
        base_model_score_percent=74.2,
        is_active_in_production=False,
        download_size_mb=67.9
    )
]

def list_checkpoints() -> List[LoRAModelCheckpoint]:
    return CHECKPOINTS_REPOSITORY

def set_active_checkpoint(checkpoint_id: str) -> LoRAModelCheckpoint:
    selected = None
    for chk in CHECKPOINTS_REPOSITORY:
        if chk.checkpoint_id == checkpoint_id:
            chk.is_active_in_production = True
            selected = chk
        else:
            chk.is_active_in_production = False
    return selected or CHECKPOINTS_REPOSITORY[0]
