import { Search, Bell } from 'lucide-react';
export function Header() {
  return (
    <header className="h-20 flex items-center justify-between px-8 z-10 w-full pt-4">
      <div className="flex items-center glass-panel rounded-full px-5 py-2.5 w-[400px] border-white/10 focus-within:border-neon-500/50 transition-colors">
        <Search className="h-4 w-4 text-zinc-400" />
        <input type="text" placeholder="Search assets, patients, or ask AI..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-zinc-200 placeholder:text-zinc-500" />
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2.5 glass-panel rounded-full text-zinc-400 hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-neon-400 rounded-full neon-glow"></span>
        </button>
        <div className="flex items-center gap-3 glass-panel rounded-full p-1.5 pr-5">
          <div className="h-9 w-9 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=11" alt="Doctor" className="h-full w-full object-cover opacity-90" />
          </div>
          <div className="flex flex-col"><p className="text-sm font-medium text-zinc-200">Dr. Sarah J.</p><a href="/auth/login" className="text-[10px] text-zinc-500 hover:text-neon-400">Secure Logout</a></div>
        </div>
      </div>
    </header>
  );
}
