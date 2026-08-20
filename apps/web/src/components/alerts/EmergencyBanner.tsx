export function EmergencyBanner() {
  return (
    <div className="bg-alert-600 text-white px-4 py-2.5 text-sm font-medium flex justify-between items-center shadow-md">
      <span>🚨 CRITICAL: Patient flagged for immediate cardiology review (Tachycardia detected).</span>
      <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-xs transition-colors">Acknowledge</button>
    </div>
  );
}
