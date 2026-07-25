'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

const BrainHemisphere = ({ position, rotationOffset }: { position: [number, number, number], rotationOffset: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    // Very slow rotation and floating
    meshRef.current.rotation.y = time * 0.1 + rotationOffset;
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {/* Low poly geometry to look like a wireframe network */}
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial 
        color="#0891b2" // Cyan
        wireframe={true} 
        transparent={true} 
        opacity={0.8} 
      />
    </mesh>
  );
};

export const WireframeBrain: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-slate-50 dark:bg-slate-950" />
    );
  }

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none transition-opacity duration-1000">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: isDark ? '#020617' : '#f8fafc' }}
      >
        <fog attach="fog" args={[isDark ? '#020617' : '#f8fafc', 5, 12]} />
        
        {/* Left Hemisphere */}
        <BrainHemisphere position={[-0.8, 0, 0]} rotationOffset={0} />
        
        {/* Right Hemisphere */}
        <BrainHemisphere position={[0.8, 0, 0]} rotationOffset={Math.PI} />
      </Canvas>
      {/* Overlay to reduce intensity and blend with UI */}
      <div className="absolute inset-0 bg-white/20 dark:bg-slate-950/30 backdrop-blur-[1px]" />
    </div>
  );
};
