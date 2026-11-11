"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { store } from "@/lib/store";

/** Two thin rings and three satellite nodes: a nod to graphs and networks. */
export function Orbits({ color }: { color: THREE.Color }) {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const sats = useRef<Array<THREE.Mesh | null>>([]);

  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
      }),
    [],
  );
  const satMat = useMemo(() => new THREE.MeshBasicMaterial(), []);

  useFrame((state) => {
    const t = store.reduced ? 0 : state.clock.elapsedTime;
    ringMat.color.copy(color);
    satMat.color.copy(color);
    if (ringA.current) {
      ringA.current.rotation.x = 1.1 + t * 0.08;
      ringA.current.rotation.y = t * 0.05;
    }
    if (ringB.current) {
      ringB.current.rotation.x = -0.6 - t * 0.06;
      ringB.current.rotation.z = t * 0.07;
    }
    sats.current.forEach((m, i) => {
      if (!m) return;
      const radius = 2.1 + i * 0.28;
      const a = t * (0.35 - i * 0.07) + i * 2.1;
      m.position.set(Math.cos(a) * radius, Math.sin(a * 0.8) * 0.9, Math.sin(a) * radius);
    });
  });

  return (
    <group>
      <mesh ref={ringA} material={ringMat}>
        <torusGeometry args={[2.1, 0.004, 8, 220]} />
      </mesh>
      <mesh ref={ringB} material={ringMat}>
        <torusGeometry args={[2.45, 0.003, 8, 220]} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            sats.current[i] = el;
          }}
          material={satMat}
        >
          <sphereGeometry args={[0.045 - i * 0.008, 16, 16]} />
        </mesh>
      ))}
    </group>
  );
}
