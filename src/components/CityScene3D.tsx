"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Sparkles, Html } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

// Procedural 3D Low-Poly Motorcycle & Rider Component
function LowPolyMotorcycle({
  color,
  nightMode,
  debugActive,
  phaseOverride,
  elapsedTime,
}: {
  color: string;
  nightMode: boolean;
  debugActive: boolean;
  phaseOverride: string | null;
  elapsedTime: number;
}) {
  const frontWheelRef = useRef<THREE.Mesh>(null);
  const backWheelRef = useRef<THREE.Mesh>(null);

  // Spin wheels during frame updates (only when not frozen in pickup/delivery debug overrides)
  useFrame(() => {
    const isFrozen = phaseOverride === "pickup" || phaseOverride === "delivery" || phaseOverride === "transit";
    if (!isFrozen) {
      if (frontWheelRef.current) frontWheelRef.current.rotation.x += 0.25;
      if (backWheelRef.current) backWheelRef.current.rotation.x += 0.25;
    }
  });

  return (
    <group scale={[2.5, 2.5, 2.5]} position={[0, 0.05, 0]}>
      {/* Leader Line for Motorcycle Body */}
      {debugActive && (
        <Line 
          points={[[0, 0.2, 0], [0, 1.2, 0]]} 
          color="#00ffcc" 
          lineWidth={2.0} 
          opacity={0.8}
          transparent
        />
      )}

      {/* 1. Main Motorcycle Frame */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.24, 0.38, 1.2]} />
        <meshStandardMaterial color="#0b0d1e" roughness={0.05} metalness={0.95} />
      </mesh>
      
      {/* 2. Fuel Tank Accent */}
      <mesh position={[0, 0.38, 0.1]}>
        <boxGeometry args={[0.26, 0.16, 0.48]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.05} 
          metalness={0.9} 
          emissive={color} 
          emissiveIntensity={0.6}
        />
        {debugActive && (
          <Html distanceFactor={5} position={[0, 1.3, 0]} center>
            <div className="bg-black/95 border border-[#00ffcc] text-[9px] text-[#00ffcc] px-2 py-0.5 rounded font-mono uppercase whitespace-nowrap shadow-lg select-none flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#00ffcc] animate-ping" />
              Motorcycle
            </div>
          </Html>
        )}
      </mesh>

      {/* 3. Handlebars */}
      <group position={[0, 0.58, 0.32]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
          <meshStandardMaterial color="#1a1e2b" />
        </mesh>
        <mesh position={[-0.32, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#7ce7ff"} />
        </mesh>
        <mesh position={[0.32, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#7ce7ff"} />
        </mesh>
      </group>

      {/* 4. Headlight Beam (cone indicating direction) */}
      <group position={[0, 0.42, 0.6]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.2, 8]} />
          <meshStandardMaterial color="#0f1422" />
        </mesh>
        <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 10]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, -0.15, 0.9]} rotation={[Math.PI / 2.3, 0, 0]}>
          <coneGeometry args={[0.45, 2.0, 8, 1, true]} />
          <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#ffffff"} transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 5. Front Wheel */}
      <mesh ref={frontWheelRef} position={[0, -0.08, 0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 0.16, 12]} />
        <meshStandardMaterial color="#0a0c10" roughness={0.9} />
        <mesh scale={[1.04, 0.6, 1.04]}>
          <cylinderGeometry args={[0.28, 0.28, 0.18, 12]} />
          <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#7048ff"} />
        </mesh>
      </mesh>

      {/* 6. Back Wheel */}
      <mesh ref={backWheelRef} position={[0, -0.08, -0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 0.16, 12]} />
        <meshStandardMaterial color="#0a0c10" roughness={0.9} />
        <mesh scale={[1.04, 0.6, 1.04]}>
          <cylinderGeometry args={[0.28, 0.28, 0.18, 12]} />
          <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#7048ff"} />
        </mesh>
      </mesh>

      {/* 7. Branded Swift Guard Delivery Box */}
      <group position={[0, 0.48, -0.45]}>
        {debugActive && (
          <Line 
            points={[[0, 0.23, 0], [0, 1.02, 0]]} 
            color="#ff2ca8" 
            lineWidth={2.0} 
            opacity={0.8}
            transparent
          />
        )}
        <mesh>
          <boxGeometry args={[0.5, 0.46, 0.46]} />
          <meshStandardMaterial 
            color={nightMode ? "#ff2ca8" : "#7048ff"} 
            roughness={0.05} 
            emissive={nightMode ? "#ff2ca8" : "#7048ff"} 
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* White side panels to highlight box */}
        <mesh position={[0.26, 0, 0]}>
          <boxGeometry args={[0.01, 0.2, 0.25]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.26, 0, 0]}>
          <boxGeometry args={[0.01, 0.2, 0.25]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {debugActive && (
          <Html distanceFactor={5} position={[0, 1.15, 0]} center>
            <div className="bg-black/95 border border-[#ff2ca8] text-[9px] text-[#ff2ca8] px-2 py-0.5 rounded font-mono uppercase whitespace-nowrap shadow-lg select-none flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#ff2ca8] animate-ping" />
              Delivery Box
            </div>
          </Html>
        )}
      </group>

      {/* 8. Rider Silhouette */}
      <group position={[0, 0.52, 0.05]}>
        {debugActive && (
          <Line 
            points={[[0, 0.35, 0.1], [0, 1.15, 0.1]]} 
            color="#d43bff" 
            lineWidth={2.0} 
            opacity={0.8}
            transparent
          />
        )}
        <mesh rotation={[-Math.PI / 8, 0, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.26]} />
          <meshStandardMaterial color="#050714" roughness={0.4} />
        </mesh>
        <group position={[0, 0.35, 0.1]}>
          <mesh>
            <sphereGeometry args={[0.16, 12, 12]} />
            <meshStandardMaterial color="#090d22" roughness={0.05} />
          </mesh>
          {/* Visor */}
          <mesh position={[0, 0.02, 0.15]} scale={[1, 0.4, 0.6]}>
            <sphereGeometry args={[0.16, 8, 8]} />
            <meshBasicMaterial color={nightMode ? "#ff2ca8" : "#7ce7ff"} />
          </mesh>
        </group>
        {debugActive && (
          <Html distanceFactor={5} position={[0, 1.3, 0.1]} center>
            <div className="bg-black/95 border border-[#d43bff] text-[9px] text-[#d43bff] px-2 py-0.5 rounded font-mono uppercase whitespace-nowrap shadow-lg select-none flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#d43bff] animate-ping" />
              Rider
            </div>
          </Html>
        )}
      </group>

      {/* 9. Floating debug parcel (only when phase=pickup or phase=delivery is locked) */}
      {phaseOverride === "pickup" && (
        <mesh position={[0, 1.25, -0.45]} rotation={[0, elapsedTime * 2, 0]}>
          <boxGeometry args={[0.28, 0.28, 0.28]} />
          <meshStandardMaterial 
            color="#7048ff" 
            emissive="#7048ff" 
            emissiveIntensity={1.0} 
            roughness={0.1}
          />
        </mesh>
      )}

      {phaseOverride === "delivery" && (
        <mesh position={[0, 1.55, -0.45]} rotation={[0, elapsedTime * 2, 0]} scale={[1.3, 1.3, 1.3]}>
          <boxGeometry args={[0.28, 0.28, 0.28]} />
          <meshStandardMaterial 
            color="#ff2ca8" 
            emissive="#ff2ca8" 
            emissiveIntensity={1.2} 
            roughness={0.1}
          />
        </mesh>
      )}
    </group>
  );
}

// Procedural Buildings Component with Path Exclusion Zone to reduce occlusion
function Buildings({ nightMode }: { nightMode: boolean }) {
  const count = 38;
  const boxGeom = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  
  const buildingsData = useMemo(() => {
    const data = [];
    let seed = 45;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      const h = random() * 6.5 + 2.8; // slightly shorter buildings to improve visibility
      const w = random() * 1.5 + 0.8;
      const d = random() * 1.5 + 0.8;
      let x = (random() - 0.5) * 32;
      let z = (random() - 0.5) * 24;

      // Distance from building coordinate to diagonal route path (x + z = 0)
      const distToPath = Math.abs(x + z) / Math.sqrt(2);
      if (distToPath < 7.5) {
        // Shift building outwards by at least 6.5 units to keep motorcycle unobstructed
        const direction = Math.sign(x) || 1;
        x += direction * 7.0;
        z += direction * 7.0;
      }

      data.push({ x, z, w, h, d, depthOffset: i % 3 });
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
                color="#070a1a"
                roughness={0.25}
                metalness={0.75}
                emissive="#020308"
              />
            </mesh>
            <mesh geometry={boxGeom} scale={[b.w + 0.03, b.h + 0.03, b.d + 0.03]}>
              <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.16}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Sky Traffic Flow
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
      <group ref={lane1Ref} position={[-10, -1.8, 2]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[0, 0, i * 5]}>
            <boxGeometry args={[0.08, 0.08, 0.15]} />
            <meshBasicMaterial color={nightMode ? "#8c54ff" : "#7ce7ff"} />
          </mesh>
        ))}
      </group>
      <group ref={lane2Ref} position={[10, -1.8, -2]}>
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

// Spline Route Component
interface RouteProps {
  nightMode: boolean;
  reducedMotion: boolean;
  debugActive: boolean;
  phaseOverride: string | null;
  setDebugInfo: React.Dispatch<React.SetStateAction<{ time: number; phase: string }>>;
}

function DeliveryRoute({ nightMode, reducedMotion, debugActive, phaseOverride, setDebugInfo }: RouteProps) {
  const riderGroupRef = useRef<THREE.Group>(null);
  const startNodeRef = useRef<THREE.Mesh>(null);
  const endNodeRef = useRef<THREE.Mesh>(null);

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
    
    // Determine spline progress time
    let time = 0.0;
    if (phaseOverride === "pickup") {
      time = 0.02; // motorcycle frozen at pickup
    } else if (phaseOverride === "transit") {
      time = 0.50; // motorcycle frozen at center transit
    } else if (phaseOverride === "delivery") {
      time = 0.98; // motorcycle frozen at destination
    } else if (debugActive && !phaseOverride) {
      time = 0.50; // default debug pauses model in the center
    } else if (reducedMotion) {
      time = 0.50;
    } else {
      // Normal animation
      const isIntro = elapsed < 2.5;
      const speed = isIntro ? (elapsed / 2.5) * 0.08 : 0.08;
      time = (elapsed * speed) % 1.0;
    }

    // Determine current phase name
    let currentPhase = "Transit Phase";
    if (time < 0.18) {
      currentPhase = "Pickup Phase";
    } else if (time > 0.82) {
      currentPhase = "Delivery Phase";
    }

    setDebugInfo({ time, phase: currentPhase });

    // 1. Move rider along spline
    if (riderGroupRef.current) {
      const position = curve.getPointAt(time);
      riderGroupRef.current.position.copy(position);

      const tangent = curve.getTangentAt(time).normalize();
      const targetRotation = Math.atan2(tangent.x, tangent.z);
      riderGroupRef.current.rotation.y = targetRotation;
    }

    // 2. Pickup scale animation (highlighted if phaseOverride === pickup)
    if (startNodeRef.current) {
      if (phaseOverride === "pickup") {
        const val = 2.2 + Math.sin(elapsed * 12) * 0.25;
        startNodeRef.current.scale.set(val, val, val);
      } else {
        const isNear = time < 0.18;
        const val = isNear
          ? 1.3 + Math.sin(elapsed * 12) * 0.2
          : 1.0 + Math.sin(elapsed * 2) * 0.08;
        startNodeRef.current.scale.set(val, val, val);
      }
    }

    // 3. Delivery scale animation (highlighted if phaseOverride === delivery)
    if (endNodeRef.current) {
      if (phaseOverride === "delivery") {
        const val = 2.2 + Math.sin(elapsed * 12) * 0.25;
        endNodeRef.current.scale.set(val, val, val);
      } else {
        const isNear = time > 0.82;
        const val = isNear
          ? 1.3 + Math.sin(elapsed * 12) * 0.2
          : 1.0 + Math.sin(elapsed * 2) * 0.08;
        endNodeRef.current.scale.set(val, val, val);
      }
    }
  });

  return (
    <group>
      {/* elevated sky transit tube */}
      <mesh>
        <tubeGeometry args={[curve, 80, 0.22, 8, false]} />
        <meshStandardMaterial
          color={nightMode ? "#3a0c5c" : "#0d1b3e"}
          transparent
          opacity={0.5}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>

      <Line
        points={routePoints}
        color={nightMode ? "#ff2ca8" : "#7048ff"}
        lineWidth={5.0}
      />

      {/* Start Pickup Node */}
      <mesh ref={startNodeRef} position={[-12, -1.8, 8]}>
        {debugActive && (
          <Line 
            points={[[0, 0, 0], [0, 1.2, 0]]} 
            color="#2b8cff" 
            lineWidth={2.0} 
            opacity={0.8}
            transparent
          />
        )}
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color={phaseOverride === "pickup" ? "#70ffc6" : (nightMode ? "#7ce7ff" : "#2b8cff")} />
        <mesh scale={[1.3, 1.3, 1.3]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial color={phaseOverride === "pickup" ? "#70ffc6" : (nightMode ? "#7ce7ff" : "#2b8cff")} wireframe transparent opacity={0.3} />
        </mesh>
        {debugActive && (
          <Html distanceFactor={5} position={[0, 1.4, 0]} center>
            <div className="bg-black/95 border border-[#2b8cff] text-[9px] text-[#2b8cff] px-2 py-0.5 rounded font-mono uppercase whitespace-nowrap shadow-lg select-none flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2b8cff] shadow" />
              Pickup (Start)
            </div>
          </Html>
        )}
      </mesh>
      
      {/* End Delivery Node */}
      <mesh ref={endNodeRef} position={[12, -1.8, -8]}>
        {debugActive && (
          <Line 
            points={[[0, 0, 0], [0, 1.2, 0]]} 
            color="#ff2ca8" 
            lineWidth={2.0} 
            opacity={0.8}
            transparent
          />
        )}
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color="#ff2ca8" />
        <mesh scale={[1.3, 1.3, 1.3]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial color="#ff2ca8" wireframe transparent opacity={0.3} />
        </mesh>
        {debugActive && (
          <Html distanceFactor={5} position={[0, 1.4, 0]} center>
            <div className="bg-black/95 border border-[#ff2ca8] text-[9px] text-[#ff2ca8] px-2 py-0.5 rounded font-mono uppercase whitespace-nowrap shadow-lg select-none flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2ca8] shadow" />
              Destination (End)
            </div>
          </Html>
        )}
      </mesh>

      {/* 3D Rider & Motorcycle */}
      <group ref={riderGroupRef}>
        <LowPolyMotorcycle
          color={nightMode ? "#d43bff" : "#2b8cff"}
          nightMode={nightMode}
          debugActive={debugActive}
          phaseOverride={phaseOverride}
          elapsedTime={useFrame((s) => s.clock.getElapsedTime()) || 0}
        />
      </group>
    </group>
  );
}

// Sky Rings
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

// Scene Wrapper inside Canvas
interface SceneContentProps {
  nightMode: boolean;
  reducedMotion: boolean;
  debugActive: boolean;
  phaseOverride: string | null;
  setDebugInfo: React.Dispatch<React.SetStateAction<{ time: number; phase: string }>>;
}

function SceneContent({ nightMode, reducedMotion, debugActive, phaseOverride, setDebugInfo }: SceneContentProps) {
  const sceneGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!sceneGroupRef.current) return;

    const elapsed = state.clock.getElapsedTime();
    const isIntro = elapsed < 2.5 && !reducedMotion;

    // Cinematic Camera Fly-in Closer to Path for better model readability
    if (isIntro) {
      const progress = elapsed / 2.5;
      const ease = 1 - Math.pow(1 - progress, 3);
      // Sweeps closer: Y starts at 16, descends to 4.5. Z starts at 28, descends to 14.
      state.camera.position.y = THREE.MathUtils.lerp(16, 4.5, ease);
      state.camera.position.z = THREE.MathUtils.lerp(28, 14, ease);
      state.camera.lookAt(0, -1.2, 0);
    } else {
      // Parallax effect
      const targetRotY = state.pointer.x * 0.28;
      const targetRotX = -state.pointer.y * 0.12;
      
      sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.y, targetRotY, 0.05);
      sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.x, targetRotX, 0.05);

      // Keep camera locked closer if overrides are active
      if (phaseOverride || debugActive) {
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetRotY, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 4.5 + targetRotX, 0.05);
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 14, 0.05);
        state.camera.lookAt(0, -1.2, 0);
      } else {
        const time = (state.clock.getElapsedTime() * 0.08) % 1.0;
        const offsetTargetX = time < 0.5 ? -3 : 3;
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, offsetTargetX + targetRotY, 0.01);
      }
    }
  });

  return (
    <group ref={sceneGroupRef}>
      <Buildings nightMode={nightMode} />
      
      <DeliveryRoute
        nightMode={nightMode}
        reducedMotion={reducedMotion}
        debugActive={debugActive}
        phaseOverride={phaseOverride}
        setDebugInfo={setDebugInfo}
      />
      
      <SkyTraffic nightMode={nightMode} />

      <SkyRings nightMode={nightMode} />

      {!reducedMotion && (
        <Sparkles
          count={75}
          scale={[36, 12, 24]}
          size={1.8}
          speed={0.4}
          color={nightMode ? "#ff2ca8" : "#7ce7ff"}
        />
      )}
      
      <gridHelper args={[60, 40, nightMode ? "#d43bff" : "#281b54", "#0a0d22"]} position={[0, -2, 0]} />
    </group>
  );
}

// Parent Canvas
export default function CityScene3D() {
  const { nightMode, reducedMotion } = useTheme();
  const [debugActive, setDebugActive] = useState(false);
  const [phaseOverride, setPhaseOverride] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState({ time: 0, phase: "Transit Phase" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("sceneDebug") === "1") {
        setTimeout(() => {
          setDebugActive(true);
        }, 0);
      }
      const phase = params.get("phase");
      if (phase === "pickup" || phase === "transit" || phase === "delivery") {
        setTimeout(() => {
          setPhaseOverride(phase);
        }, 0);
      }
    }
  }, []);

  return (
    <div className="relative w-full h-[280px] md:h-[590px] rounded-[42px] overflow-hidden border border-[#91aae1]/18 bg-gradient-to-b from-[#081126] via-[#060811] to-[#05060c] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_60px_100px_rgba(0,0,0,0.48)]">
      {/* 3D Scene Debug Overlay */}
      {debugActive && (
        <div 
          id="scene-debug-overlay"
          className="absolute top-4 left-4 z-20 bg-black/95 border border-emerald-500/30 p-3 rounded-xl font-mono text-[9px] text-emerald-400 space-y-1 select-none shadow-lg"
        >
          <div className="font-bold text-white mb-1 uppercase tracking-wider">[Scene Debug Proof]</div>
          <div>COORDINATES: X, Y, Z Spline</div>
          <div>ANIMATION PHASE: {debugInfo.phase}</div>
          <div>RIDER RATE: {(debugInfo.time * 100).toFixed(1)}%</div>
          <div>OVERRIDE: {phaseOverride || "none"}</div>
          <div>LEADER LINES: active</div>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 4.5, 14], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <ambientLight intensity={nightMode ? 0.22 : 0.4} />
        
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

        <SceneContent
          nightMode={nightMode}
          reducedMotion={reducedMotion}
          debugActive={debugActive}
          phaseOverride={phaseOverride}
          setDebugInfo={setDebugInfo}
        />

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
