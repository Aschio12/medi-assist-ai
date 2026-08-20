import { AlertTriangle } from 'lucide-react';
export function RiskScore() {
  return (
    <div className="bg-gradient-to-br from-alert-50 to-white rounded-xl border border-alert-100 p-5 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-alert-100 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
      <div className="flex items-start justify-between relative z-10">
        <div>
          <h3 className="font-semibold text-alert-900 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-alert-500" />
            Sepsis Risk Alert
          </h3>
          <p className="text-sm text-alert-700 mt-1">Elevated HR and recent infection history.</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-alert-600">18%</span>
          <p className="text-[10px] text-alert-500 uppercase tracking-wider font-semibold">Probability</p>
        </div>
      </div>
      <button className="w-full mt-4 bg-white border border-alert-200 text-alert-700 text-sm font-medium py-2 rounded-lg hover:bg-alert-50 transition-colors shadow-sm">View Protocol Guidelines</button>
    </div>
  );
}
