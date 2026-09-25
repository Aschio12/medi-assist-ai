import asyncio
import json
import random
import logging
from typing import Callable

class SimulatedMqttClient:
    """
    Simulates a secure MQTT subscription to ICU medical devices 
    and consumer wearables (e.g., Apple Watch, Phillips ICU Monitor).
    """
    
    def __init__(self, broadcast_callback: Callable):
        self.broadcast_callback = broadcast_callback
        self.is_running = False

    async def start_listening(self):
        self.is_running = True
        logging.info("MQTT Client connected to broker. Subscribed to topic: hospital/icu/+/vitals")
        
        # Simulate high-frequency data stream (250Hz in reality, simulating at 10Hz for network stability)
        while self.is_running:
            ecg_value = self._generate_ecg_point()
            spo2_value = random.randint(94, 100)
            heart_rate = random.randint(70, 110)
            
            payload = {
                "patient_id": "ICU-BED-04",
                "device": "Phillips_IntelliVue_MX800",
                "timestamp": asyncio.get_event_loop().time(),
                "vitals": {
                    "ecg_mv": ecg_value,
                    "spo2": spo2_value,
                    "hr": heart_rate
                }
            }
            
            # Send to WebSockets
            await self.broadcast_callback(payload)
            await asyncio.sleep(0.1) # 10Hz update rate

    def _generate_ecg_point(self):
        # Simulate a rough ECG QRS complex using random noise and spikes
        tick = asyncio.get_event_loop().time() * 10
        if int(tick) % 10 == 0:
            return random.uniform(1.0, 2.5) # R peak
        elif int(tick) % 10 == 1:
            return random.uniform(-1.0, -0.5) # S wave
        return random.uniform(-0.1, 0.1) # Baseline noise

    def stop(self):
        self.is_running = False
