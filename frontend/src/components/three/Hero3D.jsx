import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';

const FloatingShape = ({ position, color, geometry = 'box', scale = 1, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
  });

  return (
    <Float speed={speed * 1.4} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {geometry === 'sphere' && <sphereGeometry args={[0.7, 32, 32]} />}
        {geometry === 'torus' && <torusGeometry args={[0.6, 0.22, 16, 100]} />}
        <MeshDistortMaterial color={color} speed={1.5} distort={0.25} radius={1} roughness={0.15} metalness={0.6} />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const points = useRef();
  const count = 300;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }

  useFrame((state) => {
    if (points.current) points.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#93c5fd" transparent opacity={0.6} />
    </points>
  );
};

const Hero3D = ({ className }) => (
  <div className={className} aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#7C3AED" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#06B6D4" />
        <FloatingShape position={[-1.8, 0.6, 0]} color="#4F46E5" geometry="box" scale={1.1} speed={1} />
        <FloatingShape position={[1.9, -0.4, -1]} color="#7C3AED" geometry="sphere" scale={1} speed={1.3} />
        <FloatingShape position={[0.2, 1.4, -2]} color="#06B6D4" geometry="torus" scale={0.9} speed={0.8} />
        <ParticleField />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  </div>
);

export default Hero3D;
