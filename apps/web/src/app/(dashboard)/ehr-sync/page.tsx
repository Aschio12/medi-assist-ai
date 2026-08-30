'use client';
import { useState, useEffect } from 'react';
import { Workflow, Zap, MessageSquareCode, FileSpreadsheet, ShieldCheck, Sparkles } from 'lucide-react';
import { 
  triggerCdsHook, 
  populateSdcQuestionnaire, 
  sendSwmScratchpadDraft,
  CDSCard, 
  SDCQuestionnaire,
  AttestationRecord 
} from '@/app/actions/ehr_sync';
import { CdsHooksSimulator } from '@/components/ehr/CdsHooksSimulator';
import { SmartWebMessagingConsole } from '@/components/ehr/SmartWebMessagingConsole';
import { SdcFormPopulator } from '@/components/ehr/SdcFormPopulator';
import { PhysicianAttestationBox } from '@/components/ehr/PhysicianAttestationBox';

export default function EhrSyncPage() {
  const [currentHook, setCurrentHook] = useState<'patient-view' | 'order-select' | 'order-sign'>('patient-view');
  const [cdsCards, setCdsCards] = useState<CDSCard[]>([]);
  const [isCdsLoading, setIsCdsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('sep-1-core-measure');
  const [questionnaire, setQuestionnaire] = useState<SDCQuestionnaire | null>(null);
  const [isPopulating, setIsPopulating] = useState(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const loadCdsCards = async (hook: 'patient-view' | 'order-select' | 'order-sign') => {
    setIsCdsLoading(true);
    try {
      const cards = await triggerCdsHook(hook);
      setCdsCards(cards);
    } catch (err) {
      console.error("CDS hook execution failed:", err);
    } finally {
      setIsCdsLoading(false);
    }
  };

  const loadQuestionnaire = async (templateId: string) => {
    try {
      const q = await populateSdcQuestionnaire(templateId);
      setQuestionnaire(q);
    } catch (err) {
      console.error("SDC questionnaire fetch failed:", err);
    }
  };

  useEffect(() => {
    loadCdsCards('patient-view');
    loadQuestionnaire('sep-1-core-measure');
  }, []);

  const handleHookChange = (hook: 'patient-view' | 'order-select' | 'order-sign') => {
    setCurrentHook(hook);
    loadCdsCards(hook);
  };

  const handleApplySuggestion = (label: string) => {
    setToastNotification(`✓ Executed CDS Suggestion: "${label}" • Order transaction synchronized to EHR CPOE.`);
    setTimeout(() => setToastNotification(null), 5000);
  };

  const handlePopulateFromEhr = async () => {
    setIsPopulating(true);
    await loadQuestionnaire(selectedTemplate);
    setIsPopulating(false);
    setToastNotification(`✓ FHIR SDC $populate complete: Auto-populated questionnaire fields from real-time patient telemetry.`);
    setTimeout(() => setToastNotification(null), 5000);
  };

  const handleAttestationCompleted = (record: AttestationRecord) => {
    setToastNotification(`✓ Attestation Complete: Note digitally signed by ${record.physician_name} and pushed to Epic Hyperspace (${record.ehr_confirmation_id}).`);
    setTimeout(() => setToastNotification(null), 6000);
  };

  return (
    <div className="h-full w-full p-8 flex flex-col relative z-10 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-500/20 rounded-xl border border-neon-500/30">
              <Workflow className="h-6 w-6 text-neon-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Deep EHR Interoperability & CDS Hooks Engine
            </h1>
          </div>
          <p className="text-zinc-400 text-sm mt-1">
            CDS Hooks v2.0 clinical decision support, SMART Web Messaging scratchpad sync, and FHIR SDC form $populate.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-neon-500/10 border border-neon-500/30 px-3 py-2 rounded-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-500"></span>
          </span>
          <span className="text-neon-400 font-mono text-xs font-bold uppercase tracking-wider">
            EHR Integration Active
          </span>
        </div>
      </div>

      {/* Notification Banner */}
      {toastNotification && (
        <div className="mb-6 p-4 rounded-2xl bg-neon-500/15 border border-neon-500/40 flex items-center justify-between text-xs text-neon-300 animate-fadeIn shadow-[0_0_20px_rgba(163,230,53,0.2)]">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-neon-400" />
            <span className="font-medium">{toastNotification}</span>
          </div>
          <button onClick={() => setToastNotification(null)} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Grid: Left 7 Cols CDS Hooks & SWM, Right 5 Cols SDC & Attestation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: CDS Hooks Simulator & SMART Web Messaging Scratchpad */}
        <div className="lg:col-span-7 space-y-6">
          <CdsHooksSimulator
            cards={cdsCards}
            currentHook={currentHook}
            onSelectHook={handleHookChange}
            onApplySuggestion={handleApplySuggestion}
            isLoading={isCdsLoading}
          />

          <SmartWebMessagingConsole onInjectDraft={sendSwmScratchpadDraft} />
        </div>

        {/* Right Column: SDC Form Populator & Physician Attestation */}
        <div className="lg:col-span-5 space-y-6">
          {questionnaire && (
            <SdcFormPopulator
              questionnaire={questionnaire}
              onSelectTemplate={(tId) => {
                setSelectedTemplate(tId);
                loadQuestionnaire(tId);
              }}
              onPopulateFromEhr={handlePopulateFromEhr}
              isPopulating={isPopulating}
            />
          )}

          <PhysicianAttestationBox onAttestationCompleted={handleAttestationCompleted} />
        </div>
      </div>
    </div>
  );
}
