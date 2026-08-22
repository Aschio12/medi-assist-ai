class MockSepsisModel:
    """
    In production, this would load a pretrained XGBoost or Random Forest model via joblib.load('model.pkl').
    This mock uses a heuristic approximation of model weights for demonstration.
    """
    def predict_proba(self, features: list) -> float:
        hr, sys_bp, temp, rr, wbc, age, qsofa = features
        
        # Simple weighted risk calculation mimicking a trained logistic regression
        risk = 0.0
        if hr > 110: risk += 0.2
        if sys_bp < 90: risk += 0.3
        if temp > 38.3 or temp < 36.0: risk += 0.15
        if rr > 22: risk += 0.15
        if wbc > 12.0 or wbc < 4.0: risk += 0.1
        if qsofa >= 2: risk += 0.2
        
        return min(risk, 0.99) # Cap at 99%

_model_instance = MockSepsisModel()

def get_sepsis_model():
    return _model_instance
