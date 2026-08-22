'use server';

export async function submitCopilotQuery(query: string, patientId: string = "12345") {
  try {
    const AI_API_URL = process.env.AI_ENGINE_URL || 'http://localhost:8003/api/v1/chat';
    
    // Mocking response if server isn't up
    if (!process.env.AI_ENGINE_URL) {
      console.warn("Mocking AI response. AI Engine URL not set.");
      // Simulate delay
      await new Promise(r => setTimeout(r, 1200));
      return { 
        text: `Based on the latest FHIR records, Robert's vitals are stable. You asked: "${query}"`,
        sources: ["Mock.FHIR.Local"]
      };
    }

    const res = await fetch(AI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        messages: [{ role: 'user', content: query }], 
        patient_id: patientId 
      })
    });
    
    if (!res.ok) throw new Error('AI Generation failed');
    const data = await res.json();
    return { text: data.response, sources: data.fhir_sources_used };
  } catch (error) {
    console.error("AI Engine Error:", error);
    throw new Error("Unable to reach AI Copilot.");
  }
}
