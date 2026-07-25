'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

const ParticleNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleCount = 150;
  const maxDistance = 1.5;

  // Generate particles
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#0891b2'); // Cyan
    const color2 = new THREE.Color('#7c3aed'); // Violet
    const color3 = new THREE.Color('#f59e0b'); // Amber

    for (let i = 0; i < particleCount; i++) {
      // Random position in a sphere-like volume
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;

      // Random color mix
      const rand = Math.random();
      const mixedColor = rand < 0.4 ? color1 : rand < 0.8 ? color2 : color3;
      
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Slow rotation
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = time * 0.025;
    linesRef.current.rotation.y = time * 0.05;
    linesRef.current.rotation.x = time * 0.025;

    // Breathing effect (pulsating opacity/size)
    const scale = 1 + Math.sin(time * 0.5) * 0.1;
    pointsRef.current.scale.set(scale, scale, scale);
    linesRef.current.scale.set(scale, scale, scale);
    
    // Dynamic connections
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const linePositions = [];
    const lineColors = [];

    let vertexCount = 0;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          const alpha = 1.0 - (dist / maxDistance);
          
          linePositions.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );

          // Get colors of connected nodes
          const cArray = pointsRef.current.geometry.attributes.color.array;
          
          lineColors.push(
            cArray[i * 3], cArray[i * 3 + 1], cArray[i * 3 + 2], alpha,
            cArray[j * 3], cArray[j * 3 + 1], cArray[j * 3 + 2], alpha
          );
          
          vertexCount++;
        }
      }
    }

    linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesRef.current.geometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4));
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
};

export const NeuralBackground: React.FC = () => {
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
        style={{ background: isDark ? '#020617' : '#f8fafc' }} // slate-950 or slate-50
      >
        <fog attach="fog" args={[isDark ? '#020617' : '#f8fafc', 3, 8]} />
        <ParticleNetwork />
      </Canvas>
      {/* Overlay to reduce intensity and blend with UI */}
      <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/70 backdrop-blur-[2px]" />
    </div>
  );
};
