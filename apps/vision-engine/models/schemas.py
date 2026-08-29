from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class BoundingBox(BaseModel):
    id: str
    label: str
    confidence: float = Field(..., ge=0.0, le=1.0)
    x: float # Normalized 0 to 100 percentage
    y: float
    width: float
    height: float
    color: str # Hex color e.g. #a3e635 or #ef4444
    severity: str # "CRITICAL" | "HIGH" | "MODERATE" | "BENIGN"
    clinical_note: str

class SegmentationContour(BaseModel):
    id: str
    structure_name: str
    points: List[List[float]] # List of [x, y] coordinates in %
    color: str
    opacity: float = 0.35
    volume_mm3: Optional[float] = None

class VisionFinding(BaseModel):
    id: str
    organ_system: str
    observation: str
    pathology: str
    probability: float
    icd10_code: str
    lung_rads_score: Optional[str] = None
    bi_rads_score: Optional[str] = None

class RadiologyReport(BaseModel):
    study_id: str
    patient_id: str
    patient_name: str
    modality: str # "CXR" | "CT" | "MRI" | "ULTRASOUND"
    clinical_indication: str
    comparison: Optional[str] = None
    technique: str
    findings: List[str]
    impression: List[str]
    ai_confidence: float
    critical_alert: bool = False
    actionable_recommendation: str

class DicomStudy(BaseModel):
    study_id: str
    patient_id: str
    patient_name: str
    age: int
    gender: str
    modality: str
    body_part: str
    study_date: str
    institution: str
    thumbnail_url: str
    slice_count: int
    default_window_width: int
    default_window_level: int
    findings: List[VisionFinding]
    bounding_boxes: List[BoundingBox]
    segmentations: List[SegmentationContour]
    report: RadiologyReport
