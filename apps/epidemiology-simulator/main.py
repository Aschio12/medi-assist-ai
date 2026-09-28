from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List

from core.seir_model import SEIRModel
from core.agent_based_model import SpatialOutbreakEngine

app = FastAPI(title="MediAssist Epidemiological Simulator", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "epidemiology-simulator"}

class SEIRRequest(BaseModel):
    beta: float
    sigma: float
    gamma: float
    population: float
    days: int

@app.post("/api/epi/simulate-seir")
def simulate_seir(req: SEIRRequest):
    try:
        model = SEIRModel(beta=req.beta, sigma=req.sigma, gamma=req.gamma, N=req.population)
        
        # Start with 1 exposed, 0 infectious, 0 recovered
        S0 = req.population - 1
        results = model.simulate(days=req.days, dt=0.1, S0=S0, E0=1, I0=0, R0=0)
        
        formatted = []
        for i, res in enumerate(results):
            formatted.append({
                "day": i,
                "S": int(res[0]),
                "E": int(res[1]),
                "I": int(res[2]),
                "R": int(res[3])
            })
            
        return {"status": "success", "data": formatted}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

class ABMRequest(BaseModel):
    grid_size: int = 100
    beta: float
    sigma: float
    gamma: float
    mortality: float
    steps: int

@app.post("/api/epi/simulate-spatial")
def simulate_spatial(req: ABMRequest):
    try:
        engine = SpatialOutbreakEngine(grid_size=req.grid_size)
        engine.seed_infection(x=req.grid_size//2, y=req.grid_size//2, radius=2)
        
        history = []
        for step in range(req.steps):
            stats = engine.step_cellular_automata(req.beta, req.sigma, req.gamma, req.mortality)
            history.append({
                "step": step,
                "stats": stats,
                # Return downsampled grid to save bandwidth
                "grid": engine.grid if step == req.steps - 1 else None 
            })
            
        return {"status": "success", "history": history}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
