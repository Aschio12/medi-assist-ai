'use server';

const BASE_URL = 'http://localhost:8027/api/federated';

export async function syncEdgeWeights(nodeId: string, weights: number[], sampleSize: number) {
  try {
    const res = await fetch(`${BASE_URL}/sync-weights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ node_id: nodeId, encrypted_weights: weights, sample_size: sampleSize })
    });
    if (!res.ok) throw new Error("Sync failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function aggregateGlobalModel() {
  try {
    const res = await fetch(`${BASE_URL}/aggregate`, {
      method: 'POST',
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Aggregation failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
