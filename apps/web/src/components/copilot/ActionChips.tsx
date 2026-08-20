export function ActionChips() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button className="whitespace-nowrap text-xs bg-medical-50 text-medical-700 border border-medical-100 px-3 py-1.5 rounded-full hover:bg-medical-100 font-medium transition-colors">Draft progress note</button>
      <button className="whitespace-nowrap text-xs bg-medical-50 text-medical-700 border border-medical-100 px-3 py-1.5 rounded-full hover:bg-medical-100 font-medium transition-colors">Analyze A1c trend</button>
      <button className="whitespace-nowrap text-xs bg-medical-50 text-medical-700 border border-medical-100 px-3 py-1.5 rounded-full hover:bg-medical-100 font-medium transition-colors">Check drug interactions</button>
    </div>
  );
}
