import * as THREE from 'three';

// Custom WebGL Shader for X-Ray / Holographic Rim Lighting
export const FresnelShader = {
  uniforms: {
    "c": { type: "f", value: 1.0 },
    "p": { type: "f", value: 3.0 },
    "glowColor": { type: "c", value: new THREE.Color(0xa3e635) },
    "viewVector": { type: "v3", value: new THREE.Vector3(0,0,8) }
  },
  vertexShader: `
    uniform vec3 viewVector;
    uniform float c;
    uniform float p;
    varying float intensity;
    void main() {
      vec3 vNormal = normalize( normalMatrix * normal );
      vec3 vNormel = normalize( normalMatrix * viewVector );
      intensity = pow( c - dot(vNormal, vNormel), p );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    uniform vec3 glowColor;
    varying float intensity;
    void main() {
      vec3 glow = glowColor * intensity;
      gl_FragColor = vec4( glow, 1.0 );
    }
  `
};
