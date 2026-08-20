import { Pill } from 'lucide-react';
export function MedicationsList() {
  const meds = [
    { name: 'Lisinopril', dose: '10mg', freq: 'Daily', status: 'Active' },
    { name: 'Atorvastatin', dose: '20mg', freq: 'Bedtime', status: 'Active' },
    { name: 'Metformin', dose: '500mg', freq: 'BID with meals', status: 'Active' }
  ];
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-semibold text-slate-700">Active Medications</h3>
        <button className="text-medical-600 text-sm font-medium hover:underline">View All</button>
      </div>
      <div className="divide-y divide-slate-100">
        {meds.map((m, i) => (
          <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
            <div className="h-10 w-10 rounded-full bg-medical-50 flex items-center justify-center text-medical-600">
              <Pill className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-800">{m.name} <span className="text-slate-500 font-normal">{m.dose}</span></p>
              <p className="text-xs text-slate-500 mt-0.5">{m.freq}</p>
            </div>
            <span className="text-xs font-medium text-medical-700 bg-medical-50 px-2 py-1 rounded">{m.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
