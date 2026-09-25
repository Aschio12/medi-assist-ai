from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
import json
import logging
from typing import List

app = FastAPI(title="MediAssist Telemetry Engine (IoMT)", version="1.0.0")

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                logging.error(f"WebSocket broadcast error: {e}")

manager = ConnectionManager()

from core.mqtt_broker import SimulatedMqttClient

mqtt_client = SimulatedMqttClient(broadcast_callback=manager.broadcast)

@app.on_event("startup")
async def startup_event():
    # Start the simulated MQTT listener in a background task
    asyncio.create_task(mqtt_client.start_listening())

@app.on_event("shutdown")
def shutdown_event():
    mqtt_client.stop()

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "telemetry-engine"}

@app.websocket("/ws/telemetry")
async def websocket_telemetry_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive, listen for client pings if needed
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
