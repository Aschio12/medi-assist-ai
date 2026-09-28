'use server';

const BASE_URL = 'http://localhost:8031/api/epi';

export async function simulateSeir(beta: number, sigma: number, gamma: number, population: number, days: number) {
  try {
    const res = await fetch(`${BASE_URL}/simulate-seir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ beta, sigma, gamma, population, days })
    });
    if (!res.ok) throw new Error("SEIR Simulation failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function simulateSpatial(gridSize: number, beta: number, sigma: number, gamma: number, mortality: number, steps: number) {
  try {
    const res = await fetch(`${BASE_URL}/simulate-spatial`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grid_size: gridSize, beta, sigma, gamma, mortality, steps })
    });
    if (!res.ok) throw new Error("Spatial Simulation failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
