'use server';

export async function predictSepsisRisk(features: any) {
  try {
    const ML_API_URL = process.env.ML_ENGINE_URL || 'http://localhost:8002/api/v1/predict/sepsis';
    
    // Mocking response for local dev if Python microservice is not explicitly connected
    if (!process.env.ML_ENGINE_URL) {
      console.warn("Mocking ML prediction.");
      return { risk_score: 0.12, risk_level: "Low", contributing_factors: ["None"] };
    }

    const res = await fetch(ML_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(features)
    });
    
    if (!res.ok) throw new Error('ML Inference failed');
    return await res.json();
  } catch (error) {
    console.error("ML Engine Error:", error);
    throw new Error("Unable to run predictive inference.");
  }
}
