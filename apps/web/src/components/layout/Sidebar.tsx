import { Activity, Users, Settings, MessageSquare } from 'lucide-react';
export function Sidebar() {
  return (
    <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col items-center lg:items-start py-6 shadow-sm z-10">
      <div className="px-4 lg:px-6 mb-10 flex items-center gap-3">
        <Activity className="h-8 w-8 text-medical-600" />
        <span className="hidden lg:block font-bold text-xl tracking-tight text-slate-800">MediAssist</span>
      </div>
      <nav className="flex-1 w-full space-y-2 px-3">
        <a href="#" className="flex items-center gap-3 px-3 py-3 bg-medical-50 text-medical-700 rounded-lg transition-colors">
          <Users className="h-5 w-5" />
          <span className="hidden lg:block font-medium">Patients</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-3 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
          <MessageSquare className="h-5 w-5" />
          <span className="hidden lg:block font-medium">AI Copilot</span>
        </a>
      </nav>
      <div className="mt-auto px-3 w-full">
        <a href="#" className="flex items-center gap-3 px-3 py-3 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
          <Settings className="h-5 w-5" />
          <span className="hidden lg:block font-medium">Settings</span>
        </a>
      </div>
    </aside>
  );
}
