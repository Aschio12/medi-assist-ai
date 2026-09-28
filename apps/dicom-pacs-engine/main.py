from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

from core.parser import DICOMStreamParser
from core.dimse_network import pacs_network
from core.volume_rendering import RayCaster
from core.image_filters import ConvolutionEngine

app = FastAPI(title="MediAssist DICOM PACS Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "dicom-pacs-engine"}

@app.post("/api/pacs/c-echo")
def pacs_echo(aetitle: str):
    success = pacs_network.c_echo(aetitle)
    return {"status": "success" if success else "failed"}

class FindQuery(BaseModel):
    query_level: str
    dataset: Dict[str, Any]

@app.post("/api/pacs/c-find")
def pacs_find(query: FindQuery):
    results = pacs_network.c_find(query.query_level, query.dataset)
    return {"status": "success", "matches": len(results), "data": results}

@app.post("/api/dicom/parse")
async def parse_dicom_file(file: UploadFile = File(...)):
    contents = await file.read()
    parser = DICOMStreamParser()
    try:
        metadata = parser.parse_header(contents)
        return {"status": "success", "metadata": metadata}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/dicom/render-volume")
def render_3d_volume():
    # Mocking a small 10x10x10 density volume for the RayCaster test
    import random
    mock_volume = [[[random.random() for _ in range(10)] for _ in range(10)] for _ in range(10)]
    caster = RayCaster(mock_volume, (10, 10, 10))
    image = caster.render_mip_image(64, 64)
    
    return {"status": "success", "message": "Rendered 64x64 MIP projection", "pixels": len(image)*len(image[0])}
