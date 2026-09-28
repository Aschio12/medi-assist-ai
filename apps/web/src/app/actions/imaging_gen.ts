'use server';

export async function synthesizeMedicalImage(modality: string, anatomy: string, pathology: string) {
  try {
    const res = await fetch('http://localhost:8021/api/imaging-gen/synthesize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        modality,
        anatomy,
        pathology,
        resolution: "1024x1024"
      })
    });
    
    if (!res.ok) throw new Error(`Synthesis failed: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("GenAI Synthesis Error:", error);
    return null;
  }
}

export async function superResolveImage(imageId: string) {
  try {
    const res = await fetch('http://localhost:8021/api/imaging-gen/super-resolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_id: imageId,
        scale_factor: 4
      })
    });
    
    if (!res.ok) throw new Error(`Super Resolution failed: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Super Resolution Error:", error);
    return null;
  }
}
