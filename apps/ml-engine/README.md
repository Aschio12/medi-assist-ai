# Predictive ML Engine (Phase 7)
This microservice houses the Machine Learning models used for real-time clinical decision support.
- **Sepsis Prediction:** Approximates a Logistic/XGBoost model based on continuous telemetry data (qSOFA and SIRS criteria).
- **Explainable AI:** Outputs contributing factors (simulating SHAP values) so doctors understand *why* the AI flagged a patient.
