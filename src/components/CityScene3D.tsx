"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

// Procedural 3D Low-Poly Motorcycle & Rider Component
function LowPolyMotorcycle({ color, nightMode }: { color: string; nightMode: boolean }) {
  const frontWheelRef = useRef<THREE.Mesh>(null);
  const backWheelRef = useRef<THREE.Mesh>(null);

  // Spin wheels during frame updates
  useFrame(() => {
    if (frontWheelRef.current) frontWheelRef.current.rotation.x += 0.2;
    if (backWheelRef.current) backWheelRef.current.rotation.x += 0.2;
  });

  return (
    <group scale={[0.8, 0.8, 0.8]}>
      {/* 1. Main Motorcycle Frame */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.22, 0.35, 1.1]} />
        <meshStandardMaterial color="#0c0f24" roughness={0.2} metalness={0.9} />
      </mesh>
      
      {/* 2. Fuel Tank Accent */}
      <mesh position={[0, 0.36, 0.1]}>
        <boxGeometry args={[0.24, 0.15, 0.45]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </mesh>

      {/* 3. Handlebars */}
      <group position={[0, 0.55, 0.3]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.65, 8]} />
          <meshStandardMaterial color="#2d334a" />
        </mesh>
        {/* Neon handlebar grips */}
        <mesh position={[-0.3, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#7ce7ff"} />
        </mesh>
        <mesh position={[0.3, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#7ce7ff"} />
        </mesh>
      </group>

      {/* 4. Headlight Beam (cone indicating direction) */}
      <group position={[0, 0.4, 0.55]}>
        {/* Headlight lamp casing */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.18, 8]} />
          <meshStandardMaterial color="#1a2238" />
        </mesh>
        {/* Glow Lens */}
        <mesh position={[0, 0, 0.09]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 10]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Procedural Light Cone */}
        <mesh position={[0, -0.15, 0.8]} rotation={[Math.PI / 2.3, 0, 0]}>
          <coneGeometry args={[0.4, 1.8, 8, 1, true]} />
          <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#ffffff"} transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 5. Front Wheel */}
      <mesh ref={frontWheelRef} position={[0, -0.1, 0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.26, 0.26, 0.14, 12]} />
        <meshStandardMaterial color="#11131a" roughness={0.8} />
        {/* Neon rim strip */}
        <mesh scale={[1.02, 0.6, 1.02]}>
          <cylinderGeometry args={[0.26, 0.26, 0.16, 12]} />
          <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#7048ff"} />
        </mesh>
      </mesh>

      {/* 6. Back Wheel */}
      <mesh ref={backWheelRef} position={[0, -0.1, -0.45]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.26, 0.26, 0.14, 12]} />
        <meshStandardMaterial color="#11131a" roughness={0.8} />
        {/* Neon rim strip */}
        <mesh scale={[1.02, 0.6, 1.02]}>
          <cylinderGeometry args={[0.26, 0.26, 0.16, 12]} />
          <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#7048ff"} />
        </mesh>
      </mesh>

      {/* 7. Branded Swift Guard Delivery Box */}
      <group position={[0, 0.45, -0.4]}>
        {/* Box base */}
        <mesh>
          <boxGeometry args={[0.45, 0.42, 0.42]} />
          <meshStandardMaterial color={nightMode ? "#ff2ca8" : "#7048ff"} roughness={0.2} />
        </mesh>
        {/* White brand monogram decal plates */}
        <mesh position={[0.23, 0, 0]}>
          <boxGeometry args={[0.01, 0.18, 0.22]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.23, 0, 0]}>
          <boxGeometry args={[0.01, 0.18, 0.22]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* 8. Rider Silhouette leaning forward */}
      <group position={[0, 0.5, 0]}>
        {/* Torso */}
        <mesh rotation={[-Math.PI / 8, 0, 0]}>
          <boxGeometry args={[0.28, 0.46, 0.24]} />
          <meshStandardMaterial color="#070a1a" roughness={0.5} />
        </mesh>
        {/* Helmet */}
        <mesh position={[0, 0.32, 0.1]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#0f1530" roughness={0.1} />
          {/* Glowing Visor */}
          <mesh position={[0, 0.02, 0.1]} scale={[1, 0.4, 0.6]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#7ce7ff"} />
          </mesh>
        </mesh>
      </group>
    </group>
  );
}

// Procedural Buildings Component
function Buildings({ nightMode }: { nightMode: boolean }) {
  const count = 36;
  const boxGeom = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  
  const buildingsData = useMemo(() => {
    const data = [];
    let seed = 42;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      const h = random() * 8 + 3.2;
      const w = random() * 1.6 + 0.8;
      const d = random() * 1.6 + 0.8;
      const x = (random() - 0.5) * 26;
      const z = (random() - 0.5) * 20;
      const depthOffset = i % 3;
      data.push({ x, z, w, h, d, depthOffset });
    }
    return data;
  }, []);

  return (
    <group>
      {buildingsData.map((b, i) => {
        let color = "#1c7cff";
        if (b.depthOffset === 1) color = "#7048ff";
        if (b.depthOffset === 2) color = "#ff2ca8";

        if (nightMode) {
          if (b.depthOffset === 0) color = "#8c54ff";
          if (b.depthOffset === 1) color = "#d43bff";
          if (b.depthOffset === 2) color = "#ff2ca8";
        }

        return (
          <group key={i} position={[b.x, b.h / 2 - 2, b.z]}>
            <mesh geometry={boxGeom} scale={[b.w, b.h, b.d]}>
              <meshStandardMaterial
                color="#0c112b"
                roughness={0.15}
                metalness={0.85}
                emissive="#030510"
              />
            </mesh>
            <mesh geometry={boxGeom} scale={[b.w + 0.03, b.h + 0.03, b.d + 0.03]}>
              <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.4 + b.depthOffset * 0.1}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Elevated Sky Traffic Flow (glowing boxes mimicking background traffic streams)
function SkyTraffic({ nightMode }: { nightMode: boolean }) {
  const lane1Ref = useRef<THREE.Group>(null);
  const lane2Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (lane1Ref.current) {
      lane1Ref.current.position.z = ((elapsed * 1.5) % 30) - 15;
    }
    if (lane2Ref.current) {
      lane2Ref.current.position.z = -(((elapsed * 1.2) % 30) - 15);
    }
  });

  return (
    <group>
      {/* Lane 1: Leftward blue traffic flow */}
      <group ref={lane1Ref} position={[-8, -1.8, 0]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[0, 0, i * 5]}>
            <boxGeometry args={[0.08, 0.08, 0.15]} />
            <meshBasicMaterial color={nightMode ? "#8c54ff" : "#7ce7ff"} />
          </mesh>
        ))}
      </group>
      {/* Lane 2: Rightward red/pink traffic flow */}
      <group ref={lane2Ref} position={[8, -1.8, 0]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[0, 0, -(i * 5)]}>
            <boxGeometry args={[0.08, 0.08, 0.15]} />
            <meshBasicMaterial color="#ff2ca8" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Glowing Spline Route & Rider Node
interface RouteProps {
  nightMode: boolean;
  reducedMotion: boolean;
}

function DeliveryRoute({ nightMode, reducedMotion }: RouteProps) {
  const riderGroupRef = useRef<THREE.Group>(null);
  const startNodeRef = useRef<THREE.Mesh>(null);
  const endNodeRef = useRef<THREE.Mesh>(null);

  // Bezier curve points connecting pickup to destination
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
    const elapsed = state.clock.getElapsedTime();
    
    // Slow acceleration loop at startup (cinematic entry)
    const isIntro = elapsed < 2.5 && !reducedMotion;
    const speed = isIntro ? (elapsed / 2.5) * 0.08 : 0.08;
    const time = reducedMotion ? 0.5 : (elapsed * speed) % 1.0;

    // 1. Move rider along curve
    if (riderGroupRef.current) {
      const position = curve.getPointAt(time);
      riderGroupRef.current.position.copy(position);

      // Orient rider forward along the path tangent
      const tangent = curve.getTangentAt(time).normalize();
      const targetRotation = Math.atan2(tangent.x, tangent.z);
      riderGroupRef.current.rotation.y = targetRotation;
    }

    // 2. Pickup and Delivery node scale animations
    if (startNodeRef.current) {
      const scale = time < 0.18;
      const val = scale
        ? 1.0 + Math.sin(elapsed * 12) * 0.25
        : 1.0 + Math.sin(elapsed * 2) * 0.08;
      startNodeRef.current.scale.set(val, val, val);
    }

    if (endNodeRef.current) {
      const scale = time > 0.82;
      const val = scale
        ? 1.0 + Math.sin(elapsed * 12) * 0.25
        : 1.0 + Math.sin(elapsed * 2) * 0.08;
      endNodeRef.current.scale.set(val, val, val);
    }
  });

  return (
    <group>
      {/* 3D Elevated Vacuum Transit road tube */}
      <mesh>
        <tubeGeometry args={[curve, 80, 0.16, 8, false]} />
        <meshStandardMaterial
          color={nightMode ? "#3a0c5c" : "#0d1b3e"}
          transparent
          opacity={0.65}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Route neon core path */}
      <Line
        points={routePoints}
        color={nightMode ? "#ff2ca8" : "#7048ff"}
        lineWidth={3.5}
      />

      {/* Start Node (Pickup Location) */}
      <mesh ref={startNodeRef} position={[-12, -1.8, 8]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color={nightMode ? "#7ce7ff" : "#2b8cff"} />
        {/* Ring outline */}
        <mesh scale={[1.3, 1.3, 1.3]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial color={nightMode ? "#7ce7ff" : "#2b8cff"} wireframe transparent opacity={0.3} />
        </mesh>
      </mesh>
      
      {/* End Node (Delivery Destination) */}
      <mesh ref={endNodeRef} position={[12, -1.8, -8]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color="#ff2ca8" />
        {/* Ring outline */}
        <mesh scale={[1.3, 1.3, 1.3]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial color="#ff2ca8" wireframe transparent opacity={0.3} />
        </mesh>
      </mesh>

      {/* Procedural 3D Rider & Motorcycle Group */}
      <group ref={riderGroupRef}>
        <LowPolyMotorcycle color={nightMode ? "#d43bff" : "#2b8cff"} nightMode={nightMode} />
      </group>
    </group>
  );
}

// Decorative Sky Rings
function SkyRings({ nightMode }: { nightMode: boolean }) {
  return (
    <group rotation={[Math.PI / 3.5, 0, 0]}>
      <mesh position={[6, 8, -4]}>
        <ringGeometry args={[5, 5.08, 64]} />
        <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#7048ff"} side={THREE.DoubleSide} opacity={0.16} transparent />
      </mesh>
      <mesh position={[6, 8, -4]} rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[3, 3.06, 64]} />
        <meshBasicMaterial color={nightMode ? "#d43bff" : "#ff2ca8"} side={THREE.DoubleSide} opacity={0.12} transparent />
      </mesh>
    </group>
  );
}

// Sub-component wrapper to call useFrame within Canvas context
function SceneContent({ nightMode, reducedMotion }: RouteProps) {
  const sceneGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!sceneGroupRef.current) return;

    const elapsed = state.clock.getElapsedTime();
    const isIntro = elapsed < 2.5 && !reducedMotion;

    // 1. Cinematic Camera Fly-in / sweep tracking
    if (isIntro) {
      const progress = elapsed / 2.5;
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease out
      state.camera.position.y = THREE.MathUtils.lerp(18, 8, ease);
      state.camera.position.z = THREE.MathUtils.lerp(30, 22, ease);
      state.camera.lookAt(0, -1, 0);
    } else {
      // 2. Parallax effect (mouse and touch movement) after intro finishes
      const targetRotY = state.pointer.x * 0.28;
      const targetRotX = -state.pointer.y * 0.12;
      
      sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.y, targetRotY, 0.05);
      sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.x, targetRotX, 0.05);

      // Camera offset tracking rider position
      const time = (state.clock.getElapsedTime() * 0.08) % 1.0;
      const offsetTargetX = time < 0.5 ? -3 : 3;
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, offsetTargetX + targetRotY, 0.01);
    }
  });

  return (
    <group ref={sceneGroupRef}>
      <Buildings nightMode={nightMode} />
      
      <DeliveryRoute nightMode={nightMode} reducedMotion={reducedMotion} />
      
      <SkyTraffic nightMode={nightMode} />

      <SkyRings nightMode={nightMode} />

      {!reducedMotion && (
        <Sparkles
          count={70}
          scale={[32, 12, 22]}
          size={1.6}
          speed={0.4}
          color={nightMode ? "#ff2ca8" : "#7ce7ff"}
        />
      )}
      
      {/* Cyber grid floor */}
      <gridHelper args={[60, 40, nightMode ? "#d43bff" : "#281b54", "#0a0d22"]} position={[0, -2, 0]} />
    </group>
  );
}

// Parent 3D Canvas
export default function CityScene3D() {
  const { nightMode, reducedMotion } = useTheme();

  return (
    <div className="w-full h-[280px] md:h-[590px] rounded-[42px] overflow-hidden border border-[#91aae1]/18 bg-gradient-to-b from-[#081126] via-[#060811] to-[#05060c] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_60px_100px_rgba(0,0,0,0.48)]">
      <Canvas
        camera={{ position: [0, 8, 22], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <ambientLight intensity={nightMode ? 0.22 : 0.4} />
        
        <pointLight
          position={[12, 12, 10]}
          color={nightMode ? "#ff2ca8" : "#2b8cff"}
          intensity={2.0}
        />
        <pointLight
          position={[-12, -6, -10]}
          color={nightMode ? "#8c54ff" : "#7048ff"}
          intensity={1.5}
        />

        <SceneContent nightMode={nightMode} reducedMotion={reducedMotion} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4.5}
          maxPolarAngle={Math.PI / 2.1}
          minAzimuthAngle={-Math.PI / 5}
          maxAzimuthAngle={Math.PI / 5}
        />
      </Canvas>
    </div>
  );
}
