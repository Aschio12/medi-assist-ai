'use server';

export async function analyzeTumorGenome(patientId: string, tumorType: string) {
  try {
    const res = await fetch('http://localhost:8016/api/genomics/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient_id: patientId,
        vcf_data_url: 's3://medi-assist-genomics/simulated-patient-vcf',
        tumor_type: tumorType
      })
    });
    
    if (!res.ok) {
      throw new Error(`Failed to analyze genome: ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Genomics Engine Error:", error);
    return null;
  }
}
