'use client';
import { useState, useEffect } from 'react';
import { AudioLines } from 'lucide-react';

const mockTranscript = [
  { speaker: 'Dr. Sarah', text: "Hi Robert, how have you been feeling since we adjusted your Beta-blocker?", time: '10:02 AM' },
  { speaker: 'Robert Chen', text: "Honestly, much better. My heart doesn't feel like it's racing as much at night.", time: '10:02 AM' },
  { speaker: 'Dr. Sarah', text: "That's great to hear. Any dizziness when you stand up quickly?", time: '10:03 AM' },
  { speaker: 'Robert Chen', text: "A little bit yesterday morning, but it passed after a few seconds. My home blood pressure readings have been around 118 over 75.", time: '10:03 AM' }
];

export function AmbientScribe() {
  const [transcript, setTranscript] = useState<{speaker: string, text: string, time: string}[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < mockTranscript.length) {
        setTranscript(prev => [...prev, mockTranscript[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-3xl flex-1 flex flex-col overflow-hidden relative">
      <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
        <h3 className="font-semibold text-zinc-200 flex items-center gap-2">
          <AudioLines className="h-4 w-4 text-neon-400" />
          Live Whisper Transcription
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-neon-400 font-bold bg-neon-500/10 px-2 py-1 rounded-md border border-neon-500/20">Listening</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {transcript.map((line, idx) => (
          <div key={idx} className={`flex gap-3 ${line.speaker === 'Dr. Sarah' ? 'opacity-80' : ''}`}>
            <span className={`text-xs font-bold w-20 flex-shrink-0 mt-0.5 ${line.speaker === 'Dr. Sarah' ? 'text-neon-400' : 'text-zinc-300'}`}>
              {line.speaker}
            </span>
            <div className="flex-1">
              <p className="text-sm text-zinc-200 leading-relaxed font-light">{line.text}</p>
            </div>
            <span className="text-[10px] text-zinc-600">{line.time}</span>
          </div>
        ))}
        <div className="flex gap-3 animate-pulse opacity-50">
          <span className="text-xs font-bold w-20 flex-shrink-0 mt-0.5 text-zinc-500">System</span>
          <p className="text-sm text-zinc-500 leading-relaxed font-light">Transcribing audio stream...</p>
        </div>
      </div>
    </div>
  );
}
