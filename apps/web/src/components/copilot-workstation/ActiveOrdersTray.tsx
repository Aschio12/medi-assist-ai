'use client';
import { ActionChip } from '@/app/actions/physician_copilot';
import { ShoppingCart, Check, Trash2, Send, ShieldCheck, Zap } from 'lucide-react';

interface ActiveOrdersTrayProps {
  queuedOrders: ActionChip[];
  onRemoveOrder: (id: string) => void;
  onSubmitOrders: () => void;
}

export function ActiveOrdersTray({ queuedOrders, onRemoveOrder, onSubmitOrders }: ActiveOrdersTrayProps) {
  if (queuedOrders.length === 0) return null;

  return (
    <div className="p-4 bg-neon-500/10 border border-neon-500/30 rounded-3xl space-y-3 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4 text-neon-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Active Clinical Order Basket ({queuedOrders.length})
          </h4>
        </div>

        <button
          onClick={onSubmitOrders}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-neon-500 text-black font-bold text-xs rounded-xl hover:bg-neon-400 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)]"
        >
          <Send className="h-3 w-3" />
          <span>Sign & Execute All Orders</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {queuedOrders.map((order) => (
          <div key={order.id} className="p-2.5 bg-black/60 rounded-xl border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="text-neon-400 font-bold">⚡</span>
              <span className="text-zinc-200 font-medium truncate">{order.label}</span>
            </div>

            <button
              onClick={() => onRemoveOrder(order.id)}
              className="p-1 text-zinc-500 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors shrink-0"
              title="Remove from basket"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
