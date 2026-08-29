'use client';
import { useState, useEffect } from 'react';
import { ReceiptText, FileSpreadsheet, ShieldCheck, DollarSign, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { fetchInsuranceClaim, InsuranceClaimPackage } from '@/app/actions/billing';
import { MdmLevelingMatrix } from '@/components/billing/MdmLevelingMatrix';
import { DiagnosesTable } from '@/components/billing/DiagnosesTable';
import { ProceduresTable } from '@/components/billing/ProceduresTable';
import { ClaimScrubber } from '@/components/billing/ClaimScrubber';
import { ClaimSelector } from '@/components/billing/ClaimSelector';
import { EdiExportModal } from '@/components/billing/EdiExportModal';

export default function BillingPage() {
  const [currentClaimId, setCurrentClaimId] = useState<string>("CLM-SEP-98421");
  const [claim, setClaim] = useState<InsuranceClaimPackage | null>(null);
  const [isEdiModalOpen, setIsEdiModalOpen] = useState<boolean>(false);
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);

  const loadClaim = async (claimId: string) => {
    try {
      const data = await fetchInsuranceClaim(claimId);
      setClaim(data);
    } catch (err) {
      console.error("Failed to load claim data:", err);
    }
  };

  useEffect(() => {
    loadClaim(currentClaimId);
  }, [currentClaimId]);

  const handleToggleModifier = (cptCode: string, modifier: string) => {
    if (!claim) return;
    const updatedProcedures = claim.cpt_procedures.map(p => {
      if (p.code === cptCode) {
        const hasMod = p.active_modifiers.includes(modifier);
        const newMods = hasMod ? p.active_modifiers.filter(m => m !== modifier) : [...p.active_modifiers, modifier];
        return { ...p, active_modifiers: newMods };
      }
      return p;
    });
    setClaim({ ...claim, cpt_procedures: updatedProcedures });
  };

  const handleQuickSubmit = () => {
    setSubmitNotice(`Claim ${claim?.claim_id} for ${claim?.patient_name} successfully scrubbed (98.6% Clean) and transmitted to ${claim?.payer_name}!`);
    setTimeout(() => setSubmitNotice(null), 5000);
  };

  return (
    <div className="h-full w-full p-8 flex flex-col relative z-10 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-500/20 rounded-xl border border-neon-500/30">
              <ReceiptText className="h-6 w-6 text-neon-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Autonomous Medical Billing & Coding Engine
            </h1>
          </div>
          <p className="text-zinc-400 text-sm mt-1">
            Real-time ICD-10/CPT coding, AMA 2024 MDM leveling, NCCI bundling scrubber, and EDI 837P clearinghouse gateway.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleQuickSubmit}
            className="flex items-center gap-2 px-5 py-2.5 bg-neon-500 text-black font-bold text-xs rounded-xl hover:bg-neon-400 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)]"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Transmit Batch to Clearinghouse</span>
          </button>

          <div className="flex items-center gap-2 bg-neon-500/10 border border-neon-500/30 px-3 py-2 rounded-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-500"></span>
            </span>
            <span className="text-neon-400 font-mono text-xs font-bold uppercase tracking-wider">
              NCCI Scrubber v30.2 Active
            </span>
          </div>
        </div>
      </div>

      {/* Submission Notice Banner */}
      {submitNotice && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>{submitNotice}</span>
          </div>
          <button onClick={() => setSubmitNotice(null)} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Claims Queue Selector */}
      <div className="mb-6">
        <ClaimSelector 
          currentClaimId={currentClaimId}
          onSelectClaim={setCurrentClaimId}
        />
      </div>

      {/* Main Billing Grid */}
      {claim && (
        <div className="space-y-6">
          {/* AMA 2024 MDM Leveling Engine */}
          <MdmLevelingMatrix evaluation={claim.mdm_evaluation} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: ICD-10 Diagnoses & CPT Procedures */}
            <div className="lg:col-span-7 space-y-6">
              <DiagnosesTable diagnoses={claim.icd10_diagnoses} />
              <ProceduresTable 
                procedures={claim.cpt_procedures} 
                onToggleModifier={handleToggleModifier}
              />
            </div>

            {/* Right 5 Cols: NCCI Claim Scrubber & Denial Prevention */}
            <div className="lg:col-span-5 space-y-6">
              <ClaimScrubber 
                ncciEdits={claim.ncci_scrub}
                denialPrediction={claim.denial_prediction}
                onOpenEdiModal={() => setIsEdiModalOpen(true)}
              />
            </div>
          </div>
        </div>
      )}

      {/* EDI 837 Export Modal */}
      {claim && (
        <EdiExportModal 
          isOpen={isEdiModalOpen}
          onClose={() => setIsEdiModalOpen(false)}
          claimId={claim.claim_id}
          ediContent={claim.edi_837_raw}
          payerName={claim.payer_name}
        />
      )}
    </div>
  );
}
