import asyncio
import json
import random
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="MediAssist BCI Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

from core.mne_pipeline import mne_pipeline
from core.neural_decoder import neural_decoder

class EegEpochRequest(BaseModel):
    patient_id: str
    eeg_buffer_matrix: list

@app.post("/api/bci/decode")
def decode_eeg_epoch(req: EegEpochRequest):
    features = mne_pipeline.extract_features(req.eeg_buffer_matrix)
    prediction = neural_decoder.predict_seizure_risk(features["psd_features"])
    
    return {
        "status": "success",
        "patient_id": req.patient_id,
        "features": features,
        "prediction": prediction
    }
@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "bci-engine"}

@app.websocket("/ws/eeg-stream")
async def eeg_stream(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Generate simulated 8-channel EEG data array
            channels = ["Fp1", "Fp2", "C3", "C4", "P3", "P4", "O1", "O2"]
            eeg_data = {
                ch: round(random.uniform(-50.0, 50.0), 2) for ch in channels
            }
            payload = {
                "timestamp": asyncio.get_event_loop().time(),
                "data": eeg_data
            }
            await websocket.send_json(payload)
            await asyncio.sleep(0.1) # 10 Hz refresh rate for UI visualization
    except WebSocketDisconnect:
        print("EEG WebSocket client disconnected")
