'use server';

export async function simulateVQE(smiles: string) {
  try {
    const res = await fetch('http://localhost:8019/api/quantum/simulate-vqe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        smiles_string: smiles,
        target_protein_id: "NONE"
      })
    });
    
    if (!res.ok) throw new Error(`VQE failed: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Quantum VQE Error:", error);
    return null;
  }
}

export async function predictBindingAffinity(smiles: string, targetProteinId: string) {
  try {
    const res = await fetch('http://localhost:8019/api/quantum/binding-affinity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        smiles_string: smiles,
        target_protein_id: targetProteinId
      })
    });
    
    if (!res.ok) throw new Error(`Binding affinity failed: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Quantum Binding Error:", error);
    return null;
  }
}
