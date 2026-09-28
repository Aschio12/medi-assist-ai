from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="MediAssist GenAI Imaging Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "imaging-gen-engine"}

class SyntheticImageRequest(BaseModel):
    modality: str
    anatomy: str
    pathology: str
    resolution: str = "512x512"

from core.diffusion_model import latent_diffusion
from core.super_resolution import super_resolution_model

@app.post("/api/imaging-gen/synthesize")
def generate_synthetic_image(req: SyntheticImageRequest):
    result = latent_diffusion.generate(req.modality, req.anatomy, req.pathology, req.resolution)
    return {"status": "success", "data": result}

class SuperResolutionRequest(BaseModel):
    image_id: str
    scale_factor: int = 4

@app.post("/api/imaging-gen/super-resolve")
def super_resolve_image(req: SuperResolutionRequest):
    result = super_resolution_model.enhance(req.image_id, req.scale_factor)
    return {"status": "success", "data": result}
