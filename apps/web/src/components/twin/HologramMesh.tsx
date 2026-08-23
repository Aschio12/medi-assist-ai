'use client';
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { FresnelShader } from './shaders/FresnelShader';

export function HologramMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const heartRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // Create the shader material
  const customMaterial = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        "c": { value: 1.0 },
        "p": { value: 3.0 },
        "glowColor": { value: new THREE.Color(0x22d3ee) }, // Cyber Cyan rim
        "viewVector": { value: camera.position }
      },
      vertexShader: FresnelShader.vertexShader,
      fragmentShader: FresnelShader.fragmentShader,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    return mat;
  }, [camera]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Update shader view vector so rim lighting always faces camera
      customMaterial.uniforms.viewVector.value = camera.position;
    }
    
    if (heartRef.current) {
      // Beating animation (simulating ~72 BPM)
      const heartbeat = 1.0 + Math.abs(Math.sin(state.clock.elapsedTime * 3.6)) * 0.15;
      heartRef.current.scale.setScalar(heartbeat);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 2.5, 0]} material={customMaterial}>
        <sphereGeometry args={[0.6, 32, 32]} />
      </mesh>
      
      {/* Torso */}
      <mesh position={[0, 0.5, 0]} material={customMaterial}>
        <capsuleGeometry args={[0.9, 2, 32, 32]} />
      </mesh>
      
      {/* Left Arm */}
      <mesh position={[-1.4, 0.5, 0]} rotation={[0, 0, 0.2]} material={customMaterial}>
        <capsuleGeometry args={[0.3, 1.8, 32, 32]} />
      </mesh>
      
      {/* Right Arm */}
      <mesh position={[1.4, 0.5, 0]} rotation={[0, 0, -0.2]} material={customMaterial}>
        <capsuleGeometry args={[0.3, 1.8, 32, 32]} />
      </mesh>
      
      {/* Beating Heart Organ (Neon Green) */}
      <mesh ref={heartRef} position={[0.2, 0.8, 0.4]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#a3e635" emissive="#a3e635" emissiveIntensity={1.5} transparent opacity={0.9} />
        <Html distanceFactor={8} position={[0.5, 0, 0]}>
          <div className="bg-black/60 border border-neon-500/30 px-2 py-1 rounded text-neon-400 font-mono text-xs whitespace-nowrap">
            HR: 72 BPM
          </div>
        </Html>
      </mesh>
      
      {/* Lungs Abstraction */}
      <mesh position={[-0.4, 0.8, 0.2]}>
        <capsuleGeometry args={[0.2, 0.5, 16, 16]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} transparent opacity={0.4} wireframe />
      </mesh>
      <mesh position={[0.4, 0.8, 0.2]}>
        <capsuleGeometry args={[0.2, 0.5, 16, 16]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} transparent opacity={0.4} wireframe />
      </mesh>
    </group>
  );
}
