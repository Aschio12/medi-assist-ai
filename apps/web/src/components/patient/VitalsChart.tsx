'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '12:00 PM', heartRate: 72, o2: 98 },
  { time: '3:00 PM', heartRate: 75, o2: 97 },
  { time: '6:00 PM', heartRate: 85, o2: 96 },
  { time: '9:00 PM', heartRate: 82, o2: 98 },
  { time: '12:00 AM', heartRate: 95, o2: 95 },
  { time: '3:00 AM', heartRate: 78, o2: 97 },
  { time: '6:00 AM', heartRate: 74, o2: 98 },
  { time: '9:00 AM', heartRate: 72, o2: 99 },
];

export function VitalsChart() {
  return (
    <div className="glass-panel p-6 rounded-3xl h-[340px] flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-semibold text-zinc-200 tracking-wide">Heart Rate & O2 Saturation</h3>
          <p className="text-xs text-zinc-500 mt-1">Real-time telemetric monitoring</p>
        </div>
        <div className="flex gap-1 bg-black/40 p-1 rounded-full border border-white/5 shadow-inner">
          <button className="px-4 py-1.5 text-xs font-semibold rounded-full bg-neon-500/20 text-neon-300 shadow-[0_0_10px_rgba(163,230,53,0.2)]">24h</button>
          <button className="px-4 py-1.5 text-xs font-medium rounded-full text-zinc-500 hover:text-white transition-colors">7d</button>
        </div>
      </div>
      
      <div className="flex-1 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHeartRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a3e635" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#a3e635" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorO2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#71717a', fontWeight: 500}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#71717a', fontWeight: 500}} domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip 
              contentStyle={{backgroundColor: 'rgba(9, 9, 11, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)'}}
              itemStyle={{fontSize: '13px', fontWeight: 600}}
              labelStyle={{color: '#a1a1aa', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em'}}
            />
            <Area 
              type="monotone" 
              dataKey="heartRate" 
              name="Heart Rate (bpm)"
              stroke="#a3e635" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorHeartRate)" 
              activeDot={{ r: 6, fill: '#a3e635', stroke: '#050505', strokeWidth: 3 }}
              style={{ filter: 'drop-shadow(0px 4px 8px rgba(163,230,53,0.4))' }}
            />
            <Area 
              type="monotone" 
              dataKey="o2" 
              name="O2 Saturation (%)"
              stroke="#3b82f6" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorO2)" 
              activeDot={{ r: 5, fill: '#3b82f6', stroke: '#050505', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
