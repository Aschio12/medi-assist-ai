'use server';

const BASE_URL = 'http://localhost:8029/api/genomics';

export async function alignSequences(seq1: string, seq2: string, type: string) {
  try {
    const res = await fetch(`${BASE_URL}/align`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seq1, seq2, type })
    });
    if (!res.ok) throw new Error("Alignment failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function assembleGenome(reads: string[], k: number) {
  try {
    const res = await fetch(`${BASE_URL}/assemble`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reads, k })
    });
    if (!res.ok) throw new Error("Assembly failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
