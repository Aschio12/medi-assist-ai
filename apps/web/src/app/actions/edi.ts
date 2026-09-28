'use server';

const BASE_URL = 'http://localhost:8030/api/edi';

export async function parseEdi(ediText: string, type: string) {
  try {
    const res = await fetch(`${BASE_URL}/parse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ edi_text: ediText, transaction_type: type })
    });
    if (!res.ok) throw new Error("EDI Parse failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function adjudicateClaim(ediText: string) {
  try {
    const res = await fetch(`${BASE_URL}/adjudicate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ edi_text: ediText, transaction_type: "837" })
    });
    if (!res.ok) throw new Error("Adjudication failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
