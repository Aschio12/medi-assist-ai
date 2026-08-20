import { Search, Bell, User } from 'lucide-react';
export function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
      <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-96 border border-slate-200 focus-within:ring-2 focus-within:ring-medical-500/20">
        <Search className="h-4 w-4 text-slate-400" />
        <input type="text" placeholder="Search patients, labs, or ask AI..." className="bg-transparent border-none outline-none ml-2 w-full text-sm placeholder:text-slate-400" />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-alert-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
          <div className="h-8 w-8 rounded-full bg-medical-100 flex items-center justify-center text-medical-700 font-semibold text-sm">
            DR
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-700">Dr. Sarah Jenkins</p>
            <p className="text-xs text-slate-400">Cardiology</p>
          </div>
        </div>
      </div>
    </header>
  );
}
