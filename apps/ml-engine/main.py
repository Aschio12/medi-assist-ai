from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="MediAssist Predictive AI Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ML Engine Online"}

from models.schema import SepsisFeatures, PredictionResponse
from core.feature_engineering import extract_features
from core.model import get_sepsis_model

@app.post("/api/v1/predict/sepsis", response_model=PredictionResponse)
async def predict_sepsis(data: SepsisFeatures):
    model = get_sepsis_model()
    
    # 1. Feature Engineering
    features = extract_features(data)
    
    # 2. Model Inference
    risk_score = model.predict_proba(features)
    
    # 3. Stratification
    if risk_score > 0.75: level = "Critical"
    elif risk_score > 0.5: level = "High"
    elif risk_score > 0.25: level = "Moderate"
    else: level = "Low"
    
    # 4. Explainability (SHAP values mock)
    factors = []
    if data.sys_bp < 100: factors.append("Hypotension")
    if data.heart_rate > 100: factors.append("Tachycardia")
    if data.wbc_count > 12: factors.append("Leukocytosis")
    
    return PredictionResponse(
        risk_score=risk_score,
        risk_level=level,
        contributing_factors=factors if factors else ["None"]
    )
