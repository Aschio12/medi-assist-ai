export function ActionChips() {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      <button className="text-[11px] bg-transparent text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-zinc-200 transition-colors">Draft note</button>
      <button className="text-[11px] bg-transparent text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-zinc-200 transition-colors">Analyze trends</button>
    </div>
  );
}
