'use server';

import { revalidatePath } from 'next/cache';

// Mock server actions to interact with the pv-engine microservice

export async function extractAdeFromNotes(noteText: string) {
  // In production, this fetches from http://pv-engine.svc.cluster.local:8014/analyze-ade
  // For UI mockup, we'll simulate the pv-engine response
  await new Promise(res => setTimeout(res, 800));
  
  if (noteText.toLowerCase().includes('lisinopril')) {
      return {
          entities: [{ drug: "Lisinopril", adverse_event: "Severe Maculopapular Rash", confidence_score: 0.94 }],
          requires_medwatch: true
      };
  }
  
  return { entities: [], requires_medwatch: false };
}

export async function lookupOpenFda(drug: string) {
  // Simulates calling http://pv-engine.svc.cluster.local:8014/fda-lookup
  await new Promise(res => setTimeout(res, 600));
  
  return {
    drug: drug,
    top_adverse_events: [
      { event_term: "DIZZINESS", report_count: 14502 },
      { event_term: "COUGH", report_count: 11200 },
      { event_term: "FATIGUE", report_count: 9805 },
      { event_term: "RASH", report_count: 4500 }
    ]
  };
}

export async function generateMedWatchForm(patientId: string, drug: string, event: string) {
    // Simulates calling http://pv-engine.svc.cluster.local:8014/generate-medwatch
    await new Promise(res => setTimeout(res, 1200));
    
    return {
        status: "DRAFT_READY_FOR_REVIEW",
        report_id: "MW-A8B9C10",
        message: "FDA Form 3500 successfully drafted and queued for Medical Officer sign-off."
    };
}
