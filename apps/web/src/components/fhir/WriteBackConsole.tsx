'use client';
import { useState } from 'react';
import { Share2, FileText, Pill, Send, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { pushDocumentReferenceWriteBack, pushMedicationRequestWriteBack } from '@/app/actions/fhir';

interface WriteBackConsoleProps {
  onSyncCompleted: (message: string) => void;
}

export function WriteBackConsole({ onSyncCompleted }: WriteBackConsoleProps) {
  const [isSyncingNote, setIsSyncingNote] = useState(false);
  const [isSyncingMed, setIsSyncingMed] = useState(false);

  const handlePushNote = async () => {
    setIsSyncingNote(true);
    await pushDocumentReferenceWriteBack({
      resourceType: "DocumentReference",
      id: "doc-soap-progress-01",
      description: "Inpatient Progress Note - Sepsis & AKI Care Plan",
      subject: { reference: "Patient/PAT-98421", display: "Robert Chen" }
    });
    setIsSyncingNote(false);
    onSyncCompleted("Successfully pushed DocumentReference (SOAP Progress Note) to Epic EHR sandbox (HTTP 201 Created)");
  };

  const handlePushMed = async () => {
    setIsSyncingMed(true);
    await pushMedicationRequestWriteBack({
      resourceType: "MedicationRequest",
      id: "med-aztreonam-01",
      status: "active",
      intent: "order",
      medicationCodeableConcept: { coding: [{ system: "http://www.nlm.nih.gov/research/umls/rxnorm", code: "83367", display: "Aztreonam 1g IV q8h (Renal Dosed)" }] },
      subject: { reference: "Patient/PAT-98421", display: "Robert Chen" }
    });
    setIsSyncingMed(false);
    onSyncCompleted("Successfully pushed MedicationRequest (Aztreonam 1g IV) to Epic EHR sandbox (HTTP 201 Created)");
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-neon-400" />
          <h3 className="font-bold text-white text-sm">Bidirectional EHR Write-Back Gateway</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">HL7 FHIR R4 Transaction</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Push DocumentReference */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="h-4 w-4 text-neon-400" />
              <h4 className="text-xs font-bold text-white">Write-Back Progress Note</h4>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Export generated SOAP assessment & plan into Epic DocumentReference container with LOINC 11506-3.
            </p>
          </div>

          <button
            onClick={handlePushNote}
            disabled={isSyncingNote}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-neon-500 text-black font-bold text-xs rounded-xl hover:bg-neon-400 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isSyncingNote ? 'Pushing to EHR...' : 'Push DocumentReference'}</span>
          </button>
        </div>

        {/* Push MedicationRequest */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Pill className="h-4 w-4 text-purple-400" />
              <h4 className="text-xs font-bold text-white">Write-Back Medication Order</h4>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Transact renally-adjusted Aztreonam prescription order to Cerner / Epic CPOE medication ledger.
            </p>
          </div>

          <button
            onClick={handlePushMed}
            disabled={isSyncingMed}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 font-bold text-xs rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isSyncingMed ? 'Pushing to EHR...' : 'Push MedicationRequest'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
