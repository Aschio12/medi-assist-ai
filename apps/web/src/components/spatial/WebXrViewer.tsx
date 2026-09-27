'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, Sphere } from '@react-three/drei';
import { Box, View } from 'lucide-react';

// Mock component simulating a loaded medical glTF mesh
function MedicalMeshMock({ organ }: { organ: string }) {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  // Returns a translucent sphere to simulate a brain or heart volume
  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} castShadow receiveShadow>
      <meshPhysicalMaterial 
        color={organ === "Brain" ? "#a855f7" : "#ef4444"} 
        transmission={0.8}
        opacity={1}
        metalness={0}
        roughness={0}
        ior={1.5}
        thickness={1}
      />
    </Sphere>
  );
}

export function WebXrViewer({ meshData, targetOrgan }: { meshData: any, targetOrgan: string }) {
  return (
    <div className="glass-panel rounded-3xl border-white/10 h-full flex flex-col overflow-hidden relative group">
      
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 backdrop-blur-md">
            <Box className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white drop-shadow-md">WebXR Medical Hologram</h2>
            <p className="text-xs text-zinc-300 drop-shadow">React Three Fiber Volume Rendering</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-10 flex gap-2 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300">
           Vertices: {meshData?.vertex_count ? meshData.vertex_count.toLocaleString() : '---'}
        </div>
        <div className="bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300">
           Polygons: {meshData?.face_count ? meshData.face_count.toLocaleString() : '---'}
        </div>
      </div>
      
      <div className="absolute top-6 right-6 z-10">
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.5)]">
           <View className="h-4 w-4" /> Enter AR / VisionOS
        </button>
      </div>
      
      <div className="flex-1 w-full bg-[#0a0a0a] cursor-move">
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
           <color attach="background" args={['#0a0a0a']} />
           <ambientLight intensity={0.5} />
           <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
           <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
           
           <Suspense fallback={null}>
             <Grid infiniteGrid fadeDistance={20} cellColor="#ffffff" sectionColor="#a855f7" sectionThickness={1} cellThickness={0.5} opacity={0.1} />
             {meshData && <MedicalMeshMock organ={targetOrgan} />}
             <Environment preset="city" />
           </Suspense>
           
           <OrbitControls 
             makeDefault 
             autoRotate={false} 
             enableDamping 
             dampingFactor={0.05} 
             minDistance={3} 
             maxDistance={15} 
           />
        </Canvas>
      </div>
    </div>
  );
}
