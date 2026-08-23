'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { HologramMesh } from './HologramMesh';
import { AnomalyHeatmap } from './AnomalyHeatmap';

export function AnatomyCanvas() {
  return (
    <div className="w-full h-full cursor-move">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a3e635" />
        
        <HologramMesh />
        
        {/* Adjusted Anomaly to not overlap the new heart */}
        <AnomalyHeatmap position={[-0.6, -1.0, 0.3]} label="Joint Inflammation" color="#ef4444" scale={0.4} />

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
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.3}
        />
        
        {/* Intense Cyberpunk Bloom Effect */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
