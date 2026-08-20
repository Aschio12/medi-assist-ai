export function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="bg-white/10 border border-white/5 text-zinc-200 rounded-2xl rounded-tr-sm px-5 py-3 max-w-[85%] text-sm leading-relaxed font-light backdrop-blur-sm">
        {text}
      </div>
    </div>
  );
}
