import { Mic, Paperclip, Send } from 'lucide-react';
export function ChatInput() {
  return (
    <div className="p-4 bg-white border-t border-slate-100">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-medical-500/20 focus-within:border-medical-300 transition-all shadow-inner">
        <textarea placeholder="Ask about Robert's labs, medications, or guidelines..." className="w-full bg-transparent border-none outline-none resize-none h-14 text-sm px-2 py-1 placeholder:text-slate-400" />
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-1">
            <button className="p-2 text-slate-400 hover:text-medical-600 hover:bg-medical-50 rounded-lg transition-colors"><Mic className="h-4 w-4" /></button>
            <button className="p-2 text-slate-400 hover:text-medical-600 hover:bg-medical-50 rounded-lg transition-colors"><Paperclip className="h-4 w-4" /></button>
          </div>
          <button className="bg-medical-600 hover:bg-medical-700 text-white p-2 rounded-lg transition-colors shadow-sm">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="text-center text-[10px] text-slate-400 mt-3">AI copilot can make mistakes. Verify clinical information.</p>
    </div>
  );
}
