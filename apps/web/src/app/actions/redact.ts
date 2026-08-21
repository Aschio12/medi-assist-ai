'use server';

export async function redactClinicalNotes(text: string) {
  try {
    // In production, this points to the internal Python Privacy Gateway container
    // For local dev without the python server running, we mock the behavior
    const REDACT_API_URL = process.env.PRIVACY_GATEWAY_URL || 'http://localhost:8000/api/v1/redact';
    
    // Mocking response if server isn't up
    if (!process.env.PRIVACY_GATEWAY_URL) {
      console.warn("Mocking redaction. Privacy Gateway URL not set.");
      const mockedRedacted = text.replace(/(Robert Chen|Sarah|MRN: #[0-9A-Z-]+)/gi, '<REDACTED>');
      return { redacted: mockedRedacted, itemsRedacted: 1 };
    }

    const res = await fetch(REDACT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language: 'en' })
    });
    
    if (!res.ok) throw new Error('Redaction failed');
    const data = await res.json();
    return { redacted: data.redacted_text, itemsRedacted: data.items_redacted };
  } catch (error) {
    console.error("Privacy Gateway Error:", error);
    // Fail closed: if redaction fails, block the request entirely to prevent PHI leak
    throw new Error("Unable to verify PHI redaction. Request blocked.");
  }
}
