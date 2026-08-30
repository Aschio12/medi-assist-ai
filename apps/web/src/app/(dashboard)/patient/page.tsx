'use client';
import { useState, useEffect } from 'react';
import { HeartHandshake, PhoneCall, Sparkles, CheckCircle2, Bell, AlertTriangle } from 'lucide-react';
import { 
  fetchSimplifiedNote, 
  fetchMedicationSchedule, 
  evaluateSymptomTriage,
  SimplifiedNote,
  MedicationScheduleItem,
  TriageAssessment
} from '@/app/actions/patient_portal';
import { PortalHeader } from '@/components/patient/PortalHeader';
import { NoteSimplifier } from '@/components/patient/NoteSimplifier';
import { GlossaryChips } from '@/components/patient/GlossaryChips';
import { MedicationReminderBox } from '@/components/patient/MedicationReminderBox';
import { SymptomTriageChat } from '@/components/patient/SymptomTriageChat';

export default function PatientPortalPage() {
  const [note, setNote] = useState<SimplifiedNote | null>(null);
  const [medications, setMedications] = useState<MedicationScheduleItem[]>([]);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const initData = async () => {
    try {
      const [noteData, medsData] = await Promise.all([
        fetchSimplifiedNote(),
        fetchMedicationSchedule()
      ]);
      setNote(noteData);
      setMedications(medsData);
    } catch (err) {
      console.error("Failed to load patient portal data:", err);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const handleToggleDose = (medId: string) => {
    setMedications(prev => prev.map(m => {
      if (m.id === medId) {
        const nextTaken = !m.is_taken;
        if (nextTaken) {
          setToastNotification(`✓ Marked ${m.drug_name} as taken! Keep up the great adherence!`);
          setTimeout(() => setToastNotification(null), 4000);
        }
        return { ...m, is_taken: nextTaken };
      }
      return m;
    }));
  };

  const handleSendReminderNotification = (medId: string) => {
    const med = medications.find(m => m.id === medId);
    setToastNotification(`📲 Push Notification Sent: "Time for your ${med?.drug_name} (${med?.dosage}) • ${med?.meal_cue}"`);
    setTimeout(() => setToastNotification(null), 5000);
  };

  const handleEmergencyClick = () => {
    setToastNotification("🚨 Emergency Mode Activated: Connecting to 911 Emergency Dispatch and sending location to MetroHealth ED...");
    setTimeout(() => setToastNotification(null), 6000);
  };

  const takenCount = medications.filter(m => m.is_taken).length;
  const activeCount = medications.filter(m => !m.critical_warning?.includes('SAFETY HOLD')).length;
  const adherence = activeCount > 0 ? Math.round((takenCount / activeCount) * 100) : 100;

  return (
    <div className="h-full w-full p-8 flex flex-col relative z-10 overflow-y-auto scrollbar-hide">
      {/* Toast Notification Banner */}
      {toastNotification && (
        <div className="mb-6 p-4 rounded-2xl bg-neon-500/15 border border-neon-500/40 flex items-center justify-between text-xs text-neon-300 animate-fadeIn shadow-[0_0_20px_rgba(163,230,53,0.2)]">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-neon-400" />
            <span className="font-medium">{toastNotification}</span>
          </div>
          <button onClick={() => setToastNotification(null)} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Top Patient Greeting & Adherence Banner */}
      <div className="mb-6">
        <PortalHeader
          patientName="Robert"
          adherencePercentage={adherence}
          onEmergencyClick={handleEmergencyClick}
        />
      </div>

      {/* Main Grid: Left 7 Cols Note Simplifier & Glossary, Right 5 Cols Meds & Triage Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 5th-Grade Clinical Note Translator & Glossary */}
        <div className="lg:col-span-7 space-y-6">
          {note && <NoteSimplifier note={note} />}
          {note && <GlossaryChips glossary={note.glossary} />}
        </div>

        {/* Right Column: Smart Pill Box & 24/7 Symptom Triage Chat */}
        <div className="lg:col-span-5 space-y-6">
          <MedicationReminderBox
            medications={medications}
            onToggleDose={handleToggleDose}
            onSendReminderNotification={handleSendReminderNotification}
          />

          <SymptomTriageChat onRunTriage={evaluateSymptomTriage} />
        </div>
      </div>
    </div>
  );
}
