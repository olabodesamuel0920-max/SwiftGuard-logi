"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

// Procedural Buildings Component
function Buildings() {
  const count = 32;
  
  // Reusable geometries and materials
  const boxGeom = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  
  const buildingsData = useMemo(() => {
    const data = [];
    let seed = 42;
    // Pure seeded PRNG to satisfy ESLint hooks purity check
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      const h = random() * 8 + 2;
      const w = random() * 1.5 + 0.8;
      const d = random() * 1.5 + 0.8;
      const x = (random() - 0.5) * 26;
      const z = (random() - 0.5) * 20;
      const depthOffset = i % 3; // depth indexing
      data.push({ x, z, w, h, d, depthOffset });
    }
    return data;
  }, []);

  return (
    <group>
      {buildingsData.map((b, i) => {
        // Neon color scheme variables (electric blue, violet, pink)
        let color = "#1c7cff";
        if (b.depthOffset === 1) color = "#7048ff";
        if (b.depthOffset === 2) color = "#ff2ca8";

        return (
          <group key={i} position={[b.x, b.h / 2 - 2, b.z]}>
            {/* Core building structure */}
            <mesh geometry={boxGeom} scale={[b.w, b.h, b.d]}>
              <meshBasicMaterial color="#080c1e" opacity={0.8} transparent />
            </mesh>
            {/* Holographic Wireframe Outline */}
            <mesh geometry={boxGeom} scale={[b.w + 0.02, b.h + 0.02, b.d + 0.02]}>
              <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.3 + b.depthOffset * 0.15}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Glowing Spline Route & Rider Node
function DeliveryRoute({ reducedMotion }: { reducedMotion: boolean }) {
  const riderRef = useRef<THREE.Mesh>(null);

  // Bezier curve points connecting pickup (left side) to destination (right side)
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-12, -1.8, 8),
      new THREE.Vector3(-7, 0, 4),
      new THREE.Vector3(-2, 1, 1),
      new THREE.Vector3(3, -0.5, -3),
      new THREE.Vector3(8, 0, -6),
      new THREE.Vector3(12, -1.8, -8),
    ]);
  }, []);

  const routePoints = useMemo(() => {
    return curve.getPoints(80);
  }, [curve]);

  useFrame((state) => {
    if (!riderRef.current) return;

    // Animating the package rider position
    // If reducedMotion is enabled, rider stays static at 50% along the path
    const speed = 0.08;
    const time = reducedMotion ? 0.5 : (state.clock.getElapsedTime() * speed) % 1.0;
    
    const position = curve.getPointAt(time);
    riderRef.current.position.copy(position);

    // Minor hover rotation
    if (!reducedMotion) {
      riderRef.current.rotation.y = state.clock.getElapsedTime() * 2;
    }
  });

  return (
    <group>
      {/* Route Glow Path Line */}
      <Line
        points={routePoints}
        color="#7048ff"
        lineWidth={3.5}
        dashed
        dashSize={0.6}
        gapSize={0.4}
      />
      
      {/* Visual Line Shadow */}
      <Line
        points={routePoints.map(p => new THREE.Vector3(p.x, -2, p.z))}
        color="#02040b"
        lineWidth={8}
        opacity={0.4}
        transparent
      />

      {/* Start Node */}
      <mesh position={[-12, -1.8, 8]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial color="#2b8cff" />
      </mesh>
      
      {/* End Node */}
      <mesh position={[12, -1.8, -8]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial color="#ff2ca8" />
      </mesh>

      {/* Rider Agent Marker */}
      <mesh ref={riderRef}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshBasicMaterial color="#ff2ca8" />
        {/* Outer shield mesh */}
        <mesh scale={[1.3, 1.3, 1.3]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshBasicMaterial color="#7048ff" wireframe transparent opacity={0.7} />
        </mesh>
      </mesh>
    </group>
  );
}

// Light rings in sky
function SkyRings() {
  return (
    <group rotation={[Math.PI / 3.5, 0, 0]}>
      {/* Ring 1 */}
      <mesh position={[6, 8, -4]}>
        <ringGeometry args={[5, 5.08, 64]} />
        <meshBasicMaterial color="#7048ff" side={THREE.DoubleSide} opacity={0.12} transparent />
      </mesh>
      {/* Ring 2 */}
      <mesh position={[6, 8, -4]} rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[3, 3.06, 64]} />
        <meshBasicMaterial color="#ff2ca8" side={THREE.DoubleSide} opacity={0.08} transparent />
      </mesh>
    </group>
  );
}

// Parent 3D Canvas export
export default function CityScene3D() {
  const { reducedMotion } = useTheme();

  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[590px]">
      <Canvas
        camera={{ position: [0, 6, 18], fov: 42 }}
        dpr={[1, 1.5]} // Performance optimized DPR cap
        gl={{ antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full rounded-[42px] overflow-hidden border border-[#91aae1]/18 bg-gradient-to-b from-[#081126] via-[#060811] to-[#05060c] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_60px_100px_rgba(0,0,0,0.48)]"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} color="#7048ff" intensity={1.5} />
        <pointLight position={[-10, -5, -10]} color="#ff2ca8" intensity={0.8} />

        <Buildings />
        <DeliveryRoute reducedMotion={reducedMotion} />
        <SkyRings />
        
        {/* Cyber grid floor */}
        <gridHelper args={[60, 40, "#281b54", "#0a0d22"]} position={[0, -2, 0]} />

        {/* Orbit controls with rotation restrictions to keep user within bounds */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4.2}
          maxPolarAngle={Math.PI / 2.2}
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
}
