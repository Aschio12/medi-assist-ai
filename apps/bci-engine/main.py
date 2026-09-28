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
