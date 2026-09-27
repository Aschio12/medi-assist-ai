'use server';

export async function reconstructDicomToMesh(patientId: string, targetOrgan: string) {
  try {
    const res = await fetch('http://localhost:8017/api/spatial/reconstruct', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient_id: patientId,
        dicom_url: `s3://medi-assist-dicom/series/${patientId}/axial_t2`,
        target_organ: targetOrgan
      })
    });
    
    if (!res.ok) {
      throw new Error(`Failed to reconstruct 3D mesh: ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Spatial Engine Error:", error);
    return null;
  }
}
