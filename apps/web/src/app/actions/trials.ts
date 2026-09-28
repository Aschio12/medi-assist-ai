'use server';

const BASE_URL = 'http://localhost:8025/api/trials';

export async function searchClinicalTrials(query: string, topK: number = 5) {
  try {
    const res = await fetch(`${BASE_URL}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, top_k: topK })
    });
    if (!res.ok) throw new Error("Search failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function parseTrialCriteria(criteriaText: string) {
  try {
    const res = await fetch(`${BASE_URL}/parse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ criteria_text: criteriaText })
    });
    if (!res.ok) throw new Error("Parse failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
