'use client';
import { useState } from 'react';
import { AttestationRecord, submitPhysicianAttestation } from '@/app/actions/ehr_sync';
import { ShieldCheck, Check, Key, Stamp, FileCheck, RefreshCw } from 'lucide-react';

interface PhysicianAttestationBoxProps {
  onAttestationCompleted: (record: AttestationRecord) => void;
}

export function PhysicianAttestationBox({ onAttestationCompleted }: PhysicianAttestationBoxProps) {
  const [physicianName, setPhysicianName] = useState('Dr. Alex Rivera, MD');
  const [licenseNumber, setLicenseNumber] = useState('CA-MED-892147');
  const [verifiedMedicalAccuracy, setVerifiedMedicalAccuracy] = useState(true);
  const [verifiedCodingRules, setVerifiedCodingRules] = useState(true);
  const [isAttesting, setIsAttesting] = useState(false);
  const [signedRecord, setSignedRecord] = useState<AttestationRecord | null>(null);

  const handleSignAndSync = async () => {
    if (!verifiedMedicalAccuracy || !verifiedCodingRules) return;
    setIsAttesting(true);
    const rec = await submitPhysicianAttestation({
      physicianName,
      licenseNumber,
      noteContent: "Attested SOAP Note Content with Sepsis & AKI Care Plan"
    });
    setSignedRecord(rec);
    setIsAttesting(false);
    onAttestationCompleted(rec);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-neon-400" />
          <h3 className="font-bold text-white text-sm">Two-Way EHR Draft Sync & Physician Attestation</h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Cryptographic Attestation</span>
      </div>

      {/* Attestation Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Attesting Physician</label>
          <input
            type="text"
            value={physicianName}
            onChange={e => setPhysicianName(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-neon-500/50"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Medical License / NPI #</label>
          <input
            type="text"
            value={licenseNumber}
            onChange={e => setLicenseNumber(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-neon-500/50"
          />
        </div>
      </div>

      {/* Compliance Checkboxes */}
      <div className="p-3 bg-black/40 border border-white/5 rounded-2xl space-y-2 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
          <input
            type="checkbox"
            checked={verifiedMedicalAccuracy}
            onChange={e => setVerifiedMedicalAccuracy(e.target.checked)}
            className="rounded border-white/20 text-neon-500 focus:ring-0"
          />
          <span>I have reviewed the AI-drafted assessment and verified medical accuracy.</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
          <input
            type="checkbox"
            checked={verifiedCodingRules}
            onChange={e => setVerifiedCodingRules(e.target.checked)}
            className="rounded border-white/20 text-neon-500 focus:ring-0"
          />
          <span>I attest that all ICD-10 and CPT coding recommendations meet CMS billing criteria.</span>
        </label>
      </div>

      {/* Sign & Sync Button */}
      <button
        onClick={handleSignAndSync}
        disabled={isAttesting || !verifiedMedicalAccuracy || !verifiedCodingRules}
        className="flex items-center justify-center gap-2 w-full py-3 bg-neon-500 text-black font-bold text-xs rounded-xl hover:bg-neon-400 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] disabled:opacity-50"
      >
        {isAttesting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Stamp className="h-4 w-4" />}
        <span>{isAttesting ? 'Attesting & Syncing...' : 'Digitally Sign Note & Push Final to EHR (HTTP 201 Created)'}</span>
      </button>

      {/* Signed Confirmation Badge */}
      {signedRecord && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-1 font-mono text-[10px] text-emerald-300 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5" />
              Document Signed & Synced to Epic Hyperspace
            </span>
            <span>{signedRecord.ehr_confirmation_id}</span>
          </div>
          <p className="text-zinc-400 truncate">Signature: {signedRecord.digital_signature_hash}</p>
        </div>
      )}
    </div>
  );
}
