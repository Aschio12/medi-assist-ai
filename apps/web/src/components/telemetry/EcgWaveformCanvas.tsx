'use client';

import React, { useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';

export function EcgWaveformCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataBuffer = useRef<number[]>([]);
  const MAX_POINTS = 300;

  useEffect(() => {
    // Connect to WebSocket Telemetry Engine
    const ws = new WebSocket('ws://localhost:8015/ws/telemetry');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.vitals && data.vitals.ecg_mv) {
        dataBuffer.current.push(data.vitals.ecg_mv);
        if (dataBuffer.current.length > MAX_POINTS) {
          dataBuffer.current.shift();
        }
      }
    };

    let animationFrameId: number;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < width; i += 20) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
      }
      for (let i = 0; i < height; i += 20) {
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
      }
      ctx.stroke();

      // Draw ECG Line
      ctx.beginPath();
      ctx.strokeStyle = '#22d3ee'; // Cyber cyan
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';

      const points = dataBuffer.current;
      const step = width / MAX_POINTS;

      // Scale ECG (-2 to +3 mV range roughly) mapped to canvas height
      const mapY = (val: number) => {
        const normalized = (val + 2) / 5; 
        return height - (normalized * height);
      };

      for (let i = 0; i < points.length; i++) {
        const x = i * step;
        const y = mapY(points[i]);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      ws.close();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <Activity className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Live ECG Waveform</h2>
          <p className="text-xs text-zinc-400">High-frequency WebGL/Canvas rendering (60fps)</p>
        </div>
      </div>
      
      <div className="flex-1 w-full bg-black/60 rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center p-4 min-h-[200px]">
         {/* Internal Canvas element for high performance painting */}
         <canvas 
            ref={canvasRef}
            width={800}
            height={200}
            className="w-full h-full object-contain"
         />
      </div>
    </div>
  );
}
