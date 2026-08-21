export function RoleSelector() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <button className="border border-neon-500/50 bg-neon-500/10 text-neon-300 py-3 rounded-xl text-sm font-medium transition-colors">
        Physician
      </button>
      <button className="border border-white/10 bg-white/5 text-zinc-400 hover:text-white py-3 rounded-xl text-sm font-medium transition-colors">
        Patient
      </button>
    </div>
  );
}
