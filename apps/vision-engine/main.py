from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from models.schemas import DicomStudy, RadiologyReport
from core.study_repository import SAMPLE_STUDIES, get_study_by_id

app = FastAPI(
    title="MediAssist Medical Vision AI & DICOM Engine",
    description="High-performance DICOM rendering and deep learning computer vision inference for medical imaging.",
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
        "service": "vision-engine",
        "status": "online",
        "modalities_supported": ["CXR", "CT", "MRI", "ULTRASOUND"],
        "ai_vision_models": ["Pneumonia-SAM-v2", "Glioma-Seg-3D", "PE-Detector-Fast"]
    }

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "service": "vision-engine",
        "port": 8005,
        "gpu_acceleration": "CUDA/Metal WebGL Simulation Ready"
    }

@app.get("/api/v1/vision/studies", response_model=List[DicomStudy])
def list_studies():
    return SAMPLE_STUDIES

@app.get("/api/v1/vision/studies/{study_id}", response_model=DicomStudy)
def get_study(study_id: str):
    study = get_study_by_id(study_id)
    return study

@app.post("/api/v1/vision/analyze/{study_id}", response_model=RadiologyReport)
def analyze_study(study_id: str):
    study = get_study_by_id(study_id)
    return study.report
