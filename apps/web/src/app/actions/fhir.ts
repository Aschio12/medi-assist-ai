'use server';

const BASE_URL = 'http://localhost:8024/api/fhir';

export async function createFhirPatient(patientData: any) {
  try {
    const res = await fetch(`${BASE_URL}/Patient`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData)
    });
    if (!res.ok) throw new Error("Failed to create Patient");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getFhirEverything(patientId: string) {
  try {
    const res = await fetch(`${BASE_URL}/Patient/${patientId}/$everything`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Failed to fetch FHIR Bundle");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function matchClinicalTrials(patientId: string) {
  try {
    const res = await fetch(`${BASE_URL}/Patient/${patientId}/match-trials`, {
      method: 'POST',
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Failed to match trials");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function scanPharmacovigilance(patientId: string) {
  try {
    const res = await fetch(`${BASE_URL}/Patient/${patientId}/pv-scan`, {
      method: 'POST',
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Failed to run PV scan");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
