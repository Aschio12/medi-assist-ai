from pydantic import BaseModel, Field
from typing import List, Optional

class SepsisFeatures(BaseModel):
    heart_rate: float = Field(..., description="Heart Rate (bpm)")
    sys_bp: float = Field(..., description="Systolic Blood Pressure (mmHg)")
    temp_celsius: float = Field(..., description="Temperature in Celsius")
    resp_rate: float = Field(..., description="Respiratory Rate (breaths/min)")
    wbc_count: float = Field(..., description="White Blood Cell count (10^9/L)")
    age: int = Field(..., description="Patient age")

class PredictionResponse(BaseModel):
    risk_score: float = Field(..., description="Probability of sepsis (0.0 to 1.0)")
    risk_level: str = Field(..., description="Low, Moderate, High, Critical")
    contributing_factors: List[str] = Field(..., description="Key features driving the prediction")
