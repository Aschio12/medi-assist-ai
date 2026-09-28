'use server';

export async function designGuideRNAs(targetSequence: string, pamSequence: string = "NGG") {
  try {
    const res = await fetch('http://localhost:8022/api/crispr/design-grna', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        target_sequence: targetSequence,
        pam_sequence: pamSequence
      })
    });
    
    if (!res.ok) throw new Error(`gRNA design failed: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("CRISPR Design Error:", error);
    return null;
  }
}

export async function analyzeOffTargets(grnaSequence: string) {
  try {
    const res = await fetch('http://localhost:8022/api/crispr/off-target', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grna_sequence: grnaSequence,
        genome_assembly: "hg38"
      })
    });
    
    if (!res.ok) throw new Error(`Off-target analysis failed: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Off-Target Error:", error);
    return null;
  }
}
