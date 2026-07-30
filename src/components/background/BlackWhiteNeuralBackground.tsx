'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

const ParticleNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleCount = 600; // Increased count for better shape definition
  const maxDistance = 1.2;

  // Generate particles
  const [positions, colors] = useMemo(() => {
    const pos = [];
    const col = [];

    // Brain dimensions
    const a = 5; // length (z-axis)
    const b = 3.5; // height (y-axis)
    const c = 4; // width (x-axis)

    let i = 0;
    while (i < particleCount) {
      // Generate random point in a bounding box
      const x = (Math.random() - 0.5) * c * 2;
      const y = (Math.random() - 0.5) * b * 2;
      const z = (Math.random() - 0.5) * a * 2;

      // Ellipsoid equation
      const inEllipsoid = (x*x)/(c*c) + (y*y)/(b*b) + (z*z)/(a*a) <= 1;
      
      // Hemisphere gap (longitudinal fissure)
      const inGap = Math.abs(x) < 0.2;

      // Bottom carve (to make it look more like a brain profile)
      const isBrainStemArea = y < -1.5 && z > 1;

      if (inEllipsoid && !inGap && !isBrainStemArea) {
        pos.push(x, y, z);
        
        // Lavanda sutil con variación — tonos terapéuticos
        const variation = Math.random() * 0.15;
        col.push(
          0.78 + variation,   // R — tinte lavanda
          0.72 + variation,   // G
          0.98 + variation * 0.5  // B — más azul-violeta
        );
        i++;
      }
    }

    return [new Float32Array(pos), new Float32Array(col)];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Very slow rotation
    pointsRef.current.rotation.y = time * 0.05;
    linesRef.current.rotation.y = time * 0.05;
    
    // Tilt the brain slightly
    pointsRef.current.rotation.x = 0.2;
    linesRef.current.rotation.x = 0.2;

    const scale = 1 + Math.sin(time * 0.5) * 0.02;
    pointsRef.current.scale.set(scale, scale, scale);
    
    // Dynamic connections (optimized for performance)
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const linePositions = [];
    const lineColors = [];

    for (let i = 0; i < particleCount; i++) {
      let connections = 0;
      for (let j = i + 1; j < particleCount; j++) {
        if (connections >= 4) break; // limit connections per node for optimization and subtlety

        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Don't connect across the hemispheres
        const crossHemisphere = Math.sign(pos[i * 3]) !== Math.sign(pos[j * 3]);

        if (dist < maxDistance && !crossHemisphere) {
          const alpha = (1.0 - (dist / maxDistance)) * 0.15; // Extremely subtle lines
          
          linePositions.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );

          const cArray = pointsRef.current.geometry.attributes.color.array;
          lineColors.push(
            cArray[i * 3], cArray[i * 3 + 1], cArray[i * 3 + 2], alpha,
            cArray[j * 3], cArray[j * 3 + 1], cArray[j * 3 + 2], alpha
          );
          
          connections++;
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
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </>
  );
};

export const BlackWhiteNeuralBackground: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  if (!mounted) {
    return <div className="fixed inset-0 z-[-1] pointer-events-none bg-calm-50 dark:bg-[#0c0a1a]" />;
  }

  // Fondos terapéuticos: lavanda claro / índigo profundo
  const bgColor = isDark ? '#0c0a1a' : '#faf8ff';

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none transition-opacity duration-1000">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: bgColor, width: '100vw', height: '100vh' }}
      >
        <fog attach="fog" args={[bgColor, 6, 15]} />
        <ParticleNetwork />
      </Canvas>
      <div className="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-[1px]" />
    </div>
  );
};
