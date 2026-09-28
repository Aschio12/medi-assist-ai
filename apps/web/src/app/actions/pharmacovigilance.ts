'use server';

const BASE_URL = 'http://localhost:8026/api/pv';

export async function analyzeToxicityRisk(drugs: string[], conditions: string[]) {
  try {
    const res = await fetch(`${BASE_URL}/analyze-risk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient_drugs: drugs, patient_conditions: conditions })
    });
    if (!res.ok) throw new Error("Analysis failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
