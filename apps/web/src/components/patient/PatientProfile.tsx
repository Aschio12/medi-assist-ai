export function PatientProfile() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start gap-6">
      <div className="h-20 w-20 rounded-2xl bg-slate-100 object-cover overflow-hidden flex-shrink-0">
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Patient" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Robert Chen</h2>
            <p className="text-slate-500 text-sm mt-1">DOB: 12/04/1965 (58y) • Male • MRN: #892-441-A</p>
          </div>
          <span className="px-3 py-1 bg-warning-100 text-warning-700 rounded-full text-xs font-semibold uppercase tracking-wider">
            High Fall Risk
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div><p className="text-xs text-slate-400 uppercase tracking-wider">Blood Type</p><p className="font-semibold text-slate-700">O Positive</p></div>
          <div><p className="text-xs text-slate-400 uppercase tracking-wider">Height</p><p className="font-semibold text-slate-700">5'10"</p></div>
          <div><p className="text-xs text-slate-400 uppercase tracking-wider">Weight</p><p className="font-semibold text-slate-700">185 lbs</p></div>
          <div><p className="text-xs text-slate-400 uppercase tracking-wider">Allergies</p><p className="font-semibold text-alert-600">Penicillin</p></div>
        </div>
      </div>
    </div>
  );
}
