'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface AnomalyProps {
  position: [number, number, number];
  color: string;
  scale: number;
  label: string;
}

export function AnomalyHeatmap({ position, color, scale, label }: AnomalyProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Pulsing effect based on severity
      const scaleBase = scale;
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1;
      meshRef.current.scale.setScalar(scaleBase + pulse);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={2} 
          transparent 
          opacity={0.6} 
        />
      </mesh>
      
      {/* UI Label floating in 3D space */}
      <Html center position={[0, 1.2, 0]} distanceFactor={10}>
        <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border shadow-lg whitespace-nowrap" style={{ borderColor: color }}>
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color }}>{label}</span>
        </div>
      </Html>
    </group>
  );
}
