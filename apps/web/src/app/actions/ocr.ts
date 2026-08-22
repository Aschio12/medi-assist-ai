'use server';

export async function processDocumentWithOCR(formData: FormData) {
  try {
    const OCR_API_URL = process.env.OCR_ENGINE_URL || 'http://localhost:8001/api/v1/process-document';
    
    // Mocking response for local dev if Python microservice is not explicitly connected
    if (!process.env.OCR_ENGINE_URL) {
      console.warn("Mocking OCR processing.");
      return { success: true };
    }

    const res = await fetch(OCR_API_URL, {
      method: 'POST',
      body: formData
    });
    
    if (!res.ok) throw new Error('OCR Extraction failed');
    return await res.json();
  } catch (error) {
    console.error("OCR Engine Error:", error);
    throw new Error("Unable to process document.");
  }
}
