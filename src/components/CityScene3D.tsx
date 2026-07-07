"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

interface SubComponentProps {
  nightMode: boolean;
  reducedMotion: boolean;
}

// Procedural Buildings Component
function Buildings({ nightMode }: { nightMode: boolean }) {
  const count = 36;
  
  // Reusable geometries
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
      const h = random() * 8 + 3.2; // slightly taller for better composition
      const w = random() * 1.6 + 0.8;
      const d = random() * 1.6 + 0.8;
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
        // Shift neon color scheme dynamically on nightMode
        let color = "#1c7cff"; // day: electric blue
        if (b.depthOffset === 1) color = "#7048ff"; // violet
        if (b.depthOffset === 2) color = "#ff2ca8"; // pink

        if (nightMode) {
          // Night theme shifts color space to deeper purples/magentas
          if (b.depthOffset === 0) color = "#8c54ff";
          if (b.depthOffset === 1) color = "#d43bff";
          if (b.depthOffset === 2) color = "#ff2ca8";
        }

        return (
          <group key={i} position={[b.x, b.h / 2 - 2, b.z]}>
            {/* Core building structure with glowing reflectivity */}
            <mesh geometry={boxGeom} scale={[b.w, b.h, b.d]}>
              <meshStandardMaterial
                color="#0c112b"
                roughness={0.15}
                metalness={0.85}
                emissive="#030510"
              />
            </mesh>
            {/* Holographic Wireframe Outline (brighter for visibility) */}
            <mesh geometry={boxGeom} scale={[b.w + 0.03, b.h + 0.03, b.d + 0.03]}>
              <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.5 + b.depthOffset * 0.15}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Glowing Spline Route & Rider Node
function DeliveryRoute({ nightMode, reducedMotion }: SubComponentProps) {
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
        color={nightMode ? "#ff2ca8" : "#7048ff"}
        lineWidth={4}
      />
      
      {/* Visual Line Shadow */}
      <Line
        points={routePoints.map(p => new THREE.Vector3(p.x, -2, p.z))}
        color="#02040b"
        lineWidth={8}
        opacity={0.5}
        transparent
      />

      {/* Start Node (Pickup) */}
      <mesh position={[-12, -1.8, 8]}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshBasicMaterial color={nightMode ? "#7ce7ff" : "#2b8cff"} />
      </mesh>
      
      {/* End Node (Destination) */}
      <mesh position={[12, -1.8, -8]}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshBasicMaterial color="#ff2ca8" />
      </mesh>

      {/* Rider Agent Marker */}
      <mesh ref={riderRef}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshBasicMaterial color={nightMode ? "#ff86d7" : "#ff2ca8"} />
        {/* Outer shield mesh */}
        <mesh scale={[1.3, 1.3, 1.3]}>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshBasicMaterial color={nightMode ? "#d43bff" : "#7048ff"} wireframe transparent opacity={0.8} />
        </mesh>
      </mesh>
    </group>
  );
}

// Light rings in sky
function SkyRings({ nightMode }: { nightMode: boolean }) {
  return (
    <group rotation={[Math.PI / 3.5, 0, 0]}>
      {/* Ring 1 */}
      <mesh position={[6, 8, -4]}>
        <ringGeometry args={[5, 5.08, 64]} />
        <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#7048ff"} side={THREE.DoubleSide} opacity={0.16} transparent />
      </mesh>
      {/* Ring 2 */}
      <mesh position={[6, 8, -4]} rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[3, 3.06, 64]} />
        <meshBasicMaterial color={nightMode ? "#d43bff" : "#ff2ca8"} side={THREE.DoubleSide} opacity={0.12} transparent />
      </mesh>
    </group>
  );
}

// Parent 3D Canvas export
export default function CityScene3D() {
  const { nightMode, reducedMotion } = useTheme();

  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[590px]">
      <Canvas
        camera={{ position: [0, 7, 20], fov: 42 }}
        dpr={[1, 1.5]} // Performance optimized DPR cap
        gl={{ antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full rounded-[42px] overflow-hidden border border-[#91aae1]/18 bg-gradient-to-b from-[#081126] via-[#060811] to-[#05060c] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_60px_100px_rgba(0,0,0,0.48)]"
      >
        <ambientLight intensity={nightMode ? 0.25 : 0.45} />
        
        {/* Shifting point lights based on Night mode context */}
        <pointLight
          position={[12, 12, 10]}
          color={nightMode ? "#ff2ca8" : "#2b8cff"}
          intensity={2.2}
        />
        <pointLight
          position={[-12, -6, -10]}
          color={nightMode ? "#8c54ff" : "#7048ff"}
          intensity={1.8}
        />

        <Buildings nightMode={nightMode} />
        
        <DeliveryRoute nightMode={nightMode} reducedMotion={reducedMotion} />
        
        <SkyRings nightMode={nightMode} />

        {/* Cinematic Sparkles Overlay - skipped if reduced motion is on */}
        {!reducedMotion && (
          <Sparkles
            count={60}
            scale={[30, 10, 20]}
            size={1.6}
            speed={0.4}
            color={nightMode ? "#ff2ca8" : "#7ce7ff"}
          />
        )}
        
        {/* Cyber grid floor */}
        <gridHelper args={[60, 40, nightMode ? "#d43bff" : "#281b54", "#0a0d22"]} position={[0, -2, 0]} />

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
