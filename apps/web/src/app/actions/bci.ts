'use server';

export async function decodeEegEpoch(patientId: string, epochData: any[]) {
  try {
    const res = await fetch('http://localhost:8020/api/bci/decode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient_id: patientId,
        eeg_buffer_matrix: epochData
      })
    });
    
    if (!res.ok) throw new Error(`Neural decoding failed: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("BCI Decoding Error:", error);
    return null;
  }
}
