from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging

app = FastAPI(title="MediAssist Spatial Engine (WebXR)", version="1.0.0")

class DicomUploadRequest(BaseModel):
    patient_id: str
    dicom_url: str
    target_organ: str

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "spatial-engine"}

from core.dicom_to_mesh import mesh_segmenter
from core.surgical_planner import surgical_planner

@app.post("/api/spatial/reconstruct")
def reconstruct_3d_mesh(req: DicomUploadRequest):
    # 1. Run AI Segmentation and Mesh Generation
    mesh_data = mesh_segmenter.generate_mesh(req.dicom_url, req.target_organ)
    
    # 2. Calculate optimal surgical pathways
    surgical_plan = surgical_planner.calculate_optimal_path(req.target_organ)
    
    return {
        "status": "success",
        "patient_id": req.patient_id,
        "mesh": mesh_data,
        "surgical_plan": surgical_plan
    }
