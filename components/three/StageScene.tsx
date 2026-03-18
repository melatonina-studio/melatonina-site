"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type SceneName = "spatial" | "event" | "commerce";

type Props = {
  scene: SceneName;
  progress: number;
};

function StageSet({ progress }: { progress: number }) {
  const rootRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rootRef.current) return;

    // micro movimento, molto leggero
    rootRef.current.rotation.y = THREE.MathUtils.lerp(
      rootRef.current.rotation.y,
      THREE.MathUtils.lerp(-0.08, 0.08, progress),
      0.05
    );

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      THREE.MathUtils.lerp(-0.12, 0.12, progress),
      0.04
    );

    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      1.6,
      0.04
    );

    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      6.6,
      0.04
    );

    state.camera.lookAt(0, 1, 0);
  });

  return (
    <group ref={rootRef}>
      {/* LUCI BASE */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[2.5, 4, 4]} intensity={0.8} color="#ffffff" />

      {/* LUCI DIETRO LE QUINTE */}
      <pointLight position={[-3.2, 2.2, -1.2]} intensity={2.2} color="#6ea8ff" />
      <pointLight position={[3.2, 2.2, -1.2]} intensity={2.2} color="#7c5cff" />
      <pointLight position={[0, 4.7, -1.4]} intensity={2.4} color="#ffd7a6" />

      {/* PAVIMENTO GENERALE / FONDO */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#07090f" roughness={1} metalness={0} />
      </mesh>

      {/* PALCO CON SPESSORE */}
      <mesh position={[0, 0.28, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[5.8, 0.56, 3.8]} />
        <meshStandardMaterial color="#12151d" roughness={0.8} metalness={0.08} />
      </mesh>

      {/* PIANO SUPERIORE DEL PALCO - LEGGERMENTE PIÙ CHIARO */}
      <mesh position={[0, 0.57, 0.2]} receiveShadow>
        <boxGeometry args={[5.55, 0.03, 3.55]} />
        <meshStandardMaterial color="#191d27" roughness={0.65} metalness={0.06} />
      </mesh>

      {/* BOCCA SCENA - PANNELLO LATERALE SINISTRO */}
      <mesh position={[-3.05, 2.2, -0.25]}>
        <planeGeometry args={[1.05, 4.7]} />
        <meshStandardMaterial color="#0b0f17" roughness={0.95} metalness={0.02} />
      </mesh>

      {/* BOCCA SCENA - PANNELLO LATERALE DESTRO */}
      <mesh position={[3.05, 2.2, -0.25]}>
        <planeGeometry args={[1.05, 4.7]} />
        <meshStandardMaterial color="#0b0f17" roughness={0.95} metalness={0.02} />
      </mesh>

      {/* BOCCA SCENA - PANNELLO SUPERIORE */}
      <mesh position={[0, 4.55, -0.25]}>
        <planeGeometry args={[7.15, 1.05]} />
        <meshStandardMaterial color="#0c1018" roughness={0.95} metalness={0.02} />
      </mesh>

      {/* FONDALE INTERNO */}
      <mesh position={[0, 2.15, -1.4]}>
        <planeGeometry args={[5.15, 3.75]} />
        <meshStandardMaterial color="#0b1220" roughness={0.9} metalness={0.03} />
      </mesh>

      {/* BORDI / MASCHERAMENTO PALCO PER DARGLI PIÙ LETTURA */}
      <mesh position={[0, 0.3, 2.06]}>
        <boxGeometry args={[5.9, 0.62, 0.12]} />
        <meshStandardMaterial color="#0c0f16" roughness={0.85} metalness={0.04} />
      </mesh>

      {/* GLOW MOLTO SEMPLICE SUL FONDALE */}
      <mesh position={[0, 2.0, -1.2]}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial
          color="#2e5f99"
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function StageScene({ scene, progress }: Props) {
  return (
    <div className="stage-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.6, 6.6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <StageSet progress={progress} />
      </Canvas>
    </div>
  );
}