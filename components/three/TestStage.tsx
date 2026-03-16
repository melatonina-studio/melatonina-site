"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type TestStageProps = {
  progress: number;
};

type SceneGroupProps = {
  progress: number;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function remap(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return lerp(outMin, outMax, t);
}

function SceneContent({ progress }: SceneGroupProps) {
  const spatialRef = useRef<THREE.Group>(null);
  const eventRef = useRef<THREE.Group>(null);
  const commerceRef = useRef<THREE.Group>(null);

  const spatialStrength = useMemo(() => clamp(1 - progress * 2, 0, 1), [progress]);
  const eventStrength = useMemo(() => {
    if (progress <= 0.5) return clamp(progress * 2, 0, 1);
    return clamp(1 - (progress - 0.5) * 2, 0, 1);
  }, [progress]);
  const commerceStrength = useMemo(() => clamp((progress - 0.5) * 2, 0, 1), [progress]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (spatialRef.current) {
      spatialRef.current.position.x = lerp(-1.2, -2.2, progress);
      spatialRef.current.rotation.y = t * 0.35;
      spatialRef.current.scale.setScalar(lerp(1, 0.7, progress));
    }

    if (eventRef.current) {
      eventRef.current.position.y = lerp(-0.6, 0.4, eventStrength);
      eventRef.current.rotation.y = t * 0.6;
    }

    if (commerceRef.current) {
      commerceRef.current.position.x = lerp(2.2, 1.0, commerceStrength);
      commerceRef.current.rotation.y = t * 0.5;
      commerceRef.current.rotation.x = t * 0.2;
      commerceRef.current.scale.setScalar(lerp(0.7, 1, commerceStrength));
    }

    const cameraX = remap(progress, 0, 1, -0.4, 0.45);
    const cameraZ = remap(progress, 0, 1, 7.2, 6.2);
    const cameraY = remap(progress, 0, 1, 0.1, 0.3);

    state.camera.position.x = lerp(state.camera.position.x, cameraX, 0.06);
    state.camera.position.y = lerp(state.camera.position.y, cameraY, 0.06);
    state.camera.position.z = lerp(state.camera.position.z, cameraZ, 0.06);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <pointLight position={[-3, 1, 2]} intensity={1.1} color="#88c8ff" />
      <pointLight position={[3, 1, 2]} intensity={1.0} color="#ffb07a" />

      {/* SPATIAL */}
      <group ref={spatialRef}>
        <mesh>
          <torusGeometry args={[1.1, 0.08, 24, 96]} />
          <meshStandardMaterial
            color="#8fc8ff"
            emissive="#4aa3ff"
            emissiveIntensity={0.45 * spatialStrength}
            transparent
            opacity={0.15 + 0.85 * spatialStrength}
            roughness={0.35}
            metalness={0.2}
          />
        </mesh>
      </group>

      {/* EVENT */}
      <group ref={eventRef}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 2.8, 32]} />
          <meshStandardMaterial
            color="#9d7cff"
            emissive="#7c5cff"
            emissiveIntensity={0.65 * eventStrength}
            transparent
            opacity={0.08 + 0.92 * eventStrength}
            roughness={0.25}
            metalness={0.15}
          />
        </mesh>
      </group>

      {/* COMMERCE */}
      <group ref={commerceRef}>
        <mesh>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshStandardMaterial
            color="#ffb26b"
            emissive="#ff8a3d"
            emissiveIntensity={0.45 * commerceStrength}
            transparent
            opacity={0.1 + 0.9 * commerceStrength}
            roughness={0.3}
            metalness={0.18}
          />
        </mesh>
      </group>

      {/* BASE GROUND FEEL */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.65, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#0f1118" roughness={1} metalness={0} />
      </mesh>

      <Environment preset="city" />
    </>
  );
}

export default function TestStage({ progress }: TestStageProps) {
  return (
    <div className="hero-three-layer" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.1, 7.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent progress={progress} />
      </Canvas>
    </div>
  );
}