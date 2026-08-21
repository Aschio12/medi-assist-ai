import { Mic, MicOff, Video, VideoOff } from 'lucide-react';

export function VideoGrid() {
  return (
    <div className="glass-panel rounded-3xl p-4 h-[400px] flex gap-4 relative overflow-hidden">
      {/* Patient Video */}
      <div className="flex-1 bg-zinc-900 rounded-2xl relative overflow-hidden border border-white/5">
        <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Patient webcam" />
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-neon-400 neon-glow"></div>
          <span className="text-sm font-medium text-white">Robert Chen (Patient)</span>
        </div>
      </div>
      
      {/* Doctor PIP */}
      <div className="w-64 bg-zinc-900 rounded-2xl relative overflow-hidden border border-neon-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
        <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Doctor webcam" />
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
          <span className="text-sm font-medium text-white">Dr. Sarah (You)</span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 text-white hover:bg-white/20"><Mic className="h-4 w-4" /></button>
          <button className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 text-white hover:bg-white/20"><Video className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}
