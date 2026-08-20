'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  { time: '08:00', heartRate: 72, bpSys: 120, bpDia: 80 },
  { time: '12:00', heartRate: 75, bpSys: 125, bpDia: 82 },
  { time: '16:00', heartRate: 82, bpSys: 130, bpDia: 85 },
  { time: '20:00', heartRate: 78, bpSys: 128, bpDia: 84 },
];
export function VitalsChart() {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-64">
      <h3 className="font-semibold text-slate-700 mb-4">Vitals Trend (24h)</h3>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} domain={['dataMin - 10', 'dataMax + 10']} />
            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
            <Line type="monotone" dataKey="heartRate" stroke="#14b8a6" strokeWidth={3} dot={{r: 4, fill: '#14b8a6', strokeWidth: 0}} />
            <Line type="monotone" dataKey="bpSys" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
