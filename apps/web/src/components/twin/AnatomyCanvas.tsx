'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import { HologramMesh } from './HologramMesh';
import { AnomalyHeatmap } from './AnomalyHeatmap';

export function AnatomyCanvas() {
  return (
    <div className="w-full h-full cursor-move">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a3e635" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />
        
        <HologramMesh />
        <AnomalyHeatmap position={[0, 1.2, 0.5]} label="Tachycardia Zone" color="#ef4444" scale={0.6} />
        <AnomalyHeatmap position={[-0.8, -1.0, 0]} label="Joint Inflammation" color="#f59e0b" scale={0.4} />

        <Grid 
          infiniteGrid 
          fadeDistance={20} 
          sectionColor="#3f3f46" 
          cellColor="#27272a" 
          position={[0, -3, 0]} 
        />
        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 1.5} 
          minDistance={3} 
          maxDistance={12}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
