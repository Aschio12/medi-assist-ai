'use server';

const BASE_URL = 'http://localhost:8028/api';

export async function pingPacsNode(aetitle: string) {
  try {
    const res = await fetch(`${BASE_URL}/pacs/c-echo?aetitle=${aetitle}`, { method: 'POST' });
    if (!res.ok) throw new Error("C-ECHO failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function queryPacs(queryLevel: string, dataset: any) {
  try {
    const res = await fetch(`${BASE_URL}/pacs/c-find`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query_level: queryLevel, dataset })
    });
    if (!res.ok) throw new Error("C-FIND failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function triggerVolumeRender() {
  try {
    const res = await fetch(`${BASE_URL}/dicom/render-volume`, { method: 'POST' });
    if (!res.ok) throw new Error("Render failed");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
