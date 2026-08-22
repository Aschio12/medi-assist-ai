'use client';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { time: '00:00', risk: 12 }, { time: '04:00', risk: 15 },
  { time: '08:00', risk: 14 }, { time: '12:00', risk: 28 },
  { time: '16:00', risk: 45 }, { time: '20:00', risk: 82 },
  { time: 'Now', risk: 91 }
];

export function RiskTrajectoryChart() {
  return (
    <div className="h-full w-full pb-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="riskColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a3e635" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#a3e635" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="criticalColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} />
          <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
            itemStyle={{ color: '#a3e635' }}
          />
          <Area type="monotone" dataKey="risk" stroke="#a3e635" strokeWidth={3} fillOpacity={1} fill="url(#riskColor)" />
          {/* Critical Threshold Line */}
          <line x1="0" y1="80" x2="100%" y2="80" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
