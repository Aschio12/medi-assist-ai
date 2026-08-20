export function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="bg-slate-800 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] shadow-sm text-sm leading-relaxed">
        {text}
      </div>
    </div>
  );
}
