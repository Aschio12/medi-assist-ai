'use server';

export async function aggregateLocalModel(nodeId: string, sampleSize: number) {
  try {
    const res = await fetch('http://localhost:8018/api/federated/aggregate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hospital_node_id: nodeId,
        model_version: 'v2.4.1-fed',
        weight_payload_url: `ipfs://local-weights-${nodeId}`,
        sample_size: sampleSize
      })
    });
    
    if (!res.ok) {
      throw new Error(`Failed to federate model: ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Federated Engine Error:", error);
    return null;
  }
}
