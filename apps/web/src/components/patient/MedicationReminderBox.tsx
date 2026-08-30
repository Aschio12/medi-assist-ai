'use client';
import { useState } from 'react';
import { MedicationScheduleItem } from '@/app/actions/patient_portal';
import { Pill, Check, Bell, AlertTriangle, Clock, Sparkles } from 'lucide-react';

interface MedicationReminderBoxProps {
  medications: MedicationScheduleItem[];
  onToggleDose: (medId: string) => void;
  onSendReminderNotification: (medId: string) => void;
}

export function MedicationReminderBox({
  medications,
  onToggleDose,
  onSendReminderNotification
}: MedicationReminderBoxProps) {
  const [activeSlot, setActiveSlot] = useState<string>('ALL');

  const slots = ['ALL', 'MORNING', 'AFTERNOON', 'EVENING', 'BEDTIME'];
  const filteredMeds = activeSlot === 'ALL'
    ? medications
    : medications.filter(m => m.timing_slot === activeSlot);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Pill className="h-5 w-5 text-purple-400" />
          <h3 className="font-bold text-white text-sm">Smart Pill Box & Daily Dosing Schedule</h3>
        </div>

        {/* Time Slot Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {slots.map(slot => (
            <button
              key={slot}
              onClick={() => setActiveSlot(slot)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all ${
                activeSlot === slot
                  ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Medication Cards List */}
      <div className="space-y-3">
        {filteredMeds.map((med) => {
          const isPaused = med.critical_warning?.includes('SAFETY HOLD');

          return (
            <div
              key={med.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isPaused
                  ? 'bg-red-500/10 border-red-500/30'
                  : med.is_taken
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-black/40 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Med Details */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className={`text-xs font-bold ${isPaused ? 'text-red-400' : 'text-white'}`}>
                    {med.drug_name}
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400 font-bold bg-white/5 px-2 py-0.5 rounded">
                    {med.dosage}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-300 font-medium">
                  {med.meal_cue} • <span className="text-zinc-500">{med.purpose}</span>
                </p>

                <p className="text-[10px] font-mono text-zinc-500">
                  Pill Appearance: <span className="text-zinc-400">{med.pill_appearance}</span>
                </p>

                {med.critical_warning && (
                  <p className="text-[10px] text-red-300 font-mono font-bold pt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                    <span>{med.critical_warning}</span>
                  </p>
                )}
              </div>

              {/* Actions: Take Checkbox & Push Notification Trigger */}
              <div className="flex items-center gap-2 shrink-0">
                {!isPaused && (
                  <button
                    onClick={() => onSendReminderNotification(med.id)}
                    className="p-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl transition-colors border border-white/10"
                    title="Send Push Reminder to Mobile App"
                  >
                    <Bell className="h-4 w-4" />
                  </button>
                )}

                {!isPaused && (
                  <button
                    onClick={() => onToggleDose(med.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      med.is_taken
                        ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>{med.is_taken ? 'Taken ✓' : 'Mark as Taken'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
