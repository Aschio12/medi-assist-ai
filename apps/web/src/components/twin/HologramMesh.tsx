'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function HologramMesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#a3e635" wireframe transparent opacity={0.6} />
      </mesh>
      
      {/* Torso */}
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.9, 2, 16, 32]} />
        <meshBasicMaterial color="#a3e635" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Left Arm */}
      <mesh position={[-1.4, 0.5, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.3, 1.8, 16, 16]} />
        <meshBasicMaterial color="#a3e635" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Right Arm */}
      <mesh position={[1.4, 0.5, 0]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.3, 1.8, 16, 16]} />
        <meshBasicMaterial color="#a3e635" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Inner Core (Organ Abstraction) */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
