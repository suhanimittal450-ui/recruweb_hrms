import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const groupRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    if (wireRef.current) wireRef.current.rotation.y = -state.clock.elapsedTime * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1.7, 64, 64]} />
        <MeshDistortMaterial color="#4F46E5" distort={0.18} speed={1.2} roughness={0.2} metalness={0.7} />
      </mesh>
      <mesh ref={wireRef} scale={1.12}>
        <sphereGeometry args={[1.7, 24, 24]} />
        <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

const OrbitNode = ({ radius, speed, offset, color }) => {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.6) * 0.6, Math.sin(t) * radius);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.09, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
    </mesh>
  );
};

const OrbitRing = ({ radius, tilt }) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i += 1) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return pts;
  }, [radius]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line rotation={[tilt, 0, 0]}>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color="#7C3AED" transparent opacity={0.35} />
    </line>
  );
};

const MarketingHero3D = ({ className }) => (
  <div className={className} aria-hidden="true">
    <Canvas camera={{ position: [0, 0.6, 6.2], fov: 42 }} dpr={[1, 1.6]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 4, 6]} intensity={1.4} color="#7C3AED" />
        <pointLight position={[-6, -3, -4]} intensity={1} color="#06B6D4" />

        <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.7}>
          <Globe />
        </Float>

        <OrbitRing radius={2.6} tilt={0.35} />
        <OrbitRing radius={3.1} tilt={-0.2} />
        <OrbitNode radius={2.6} speed={0.5} offset={0} color="#06B6D4" />
        <OrbitNode radius={2.6} speed={0.5} offset={2.4} color="#4F46E5" />
        <OrbitNode radius={3.1} speed={0.35} offset={1.1} color="#10B981" />
        <OrbitNode radius={3.1} speed={0.35} offset={4} color="#F59E0B" />

        <Sparkles count={80} scale={8} size={2} speed={0.4} color="#93c5fd" />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  </div>
);

export default MarketingHero3D;
