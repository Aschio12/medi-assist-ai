'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  { time: '12:00 PM', value: 72 }, { time: '3:00 PM', value: 75 },
  { time: '6:00 PM', value: 85 }, { time: '9:00 PM', value: 82 },
  { time: '12:00 AM', value: 95 }, { time: '3:00 AM', value: 78 },
  { time: '6:00 AM', value: 74 }, { time: '9:00 AM', value: 72 },
];
export function VitalsChart() {
  return (
    <div className="glass-panel p-6 rounded-3xl h-[300px] flex flex-col relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-neon-500/10 to-transparent pointer-events-none"></div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-zinc-200">Heart Rate Dynamics</h3>
        <div className="flex gap-2">
          <span className="px-3 py-1 text-xs rounded-full bg-neon-500/20 text-neon-300 border border-neon-500/30">24h</span>
          <span className="px-3 py-1 text-xs rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer">1W</span>
        </div>
      </div>
      <div className="flex-1 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#71717a'}} dy={10} />
            <Tooltip 
              contentStyle={{backgroundColor: 'rgba(9, 9, 11, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff'}}
              itemStyle={{color: '#a3e635'}}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#a3e635" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 6, fill: '#a3e635', stroke: '#000', strokeWidth: 2 }}
              style={{ filter: 'drop-shadow(0px 4px 8px rgba(163,230,53,0.5))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
