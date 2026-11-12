"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { store } from "@/lib/store";

/** Materials shared by every object so colour changes happen in one place. */
export type Shared = {
  body: THREE.MeshStandardMaterial;
  edge: THREE.LineBasicMaterial;
  edgeSoft: THREE.LineBasicMaterial;
  glow: THREE.MeshBasicMaterial;
  dim: THREE.MeshBasicMaterial;
  screens: THREE.MeshBasicMaterial[];
};

type V3 = [number, number, number];

/* ----------------------------- primitives ----------------------------- */

/** Dark solid box with glowing edges: the visual language of the whole scene. */
function Box({
  size,
  position = [0, 0, 0],
  rotation,
  m,
  material,
  edges = true,
}: {
  size: V3;
  position?: V3;
  rotation?: V3;
  m: Shared;
  material?: THREE.Material;
  edges?: boolean;
}) {
  const [sx, sy, sz] = size;
  const geo = useMemo(() => new THREE.BoxGeometry(sx, sy, sz), [sx, sy, sz]);
  const eg = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  useEffect(
    () => () => {
      geo.dispose();
      eg.dispose();
    },
    [geo, eg],
  );
  return (
    <group position={position} rotation={rotation}>
      <mesh geometry={geo} material={material ?? m.body} />
      {edges && <lineSegments geometry={eg} material={m.edge} />}
    </group>
  );
}

/** A thin window with a scrolling code screen that gently bobs. */
function FloatPanel({
  size,
  position,
  rotY = 0,
  screen,
  phase = 0,
  m,
}: {
  size: [number, number];
  position: V3;
  rotY?: number;
  screen: number;
  phase?: number;
  m: Shared;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = store.reduced ? 0 : state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + phase) * 0.07;
  });
  const [w, h] = size;
  return (
    <group ref={ref} position={position} rotation={[0, rotY, 0]}>
      <Box size={[w, h, 0.05]} m={m} />
      <mesh position={[0, -0.04, 0.03]} material={m.screens[screen % m.screens.length]}>
        <planeGeometry args={[w - 0.14, h - 0.2]} />
      </mesh>
      {/* title-bar dots */}
      {[-1, 0, 1].map((i) => (
        <mesh key={i} position={[-w / 2 + 0.13 + (i + 1) * 0.1, h / 2 - 0.08, 0.03]} material={m.glow}>
          <circleGeometry args={[0.025, 12]} />
        </mesh>
      ))}
    </group>
  );
}

/* ----------------------------- objects ----------------------------- */

/** Hero: laptop running code, flanked by two floating editor windows. */
export function Laptop({ m }: { m: Shared }) {
  return (
    <group position={[0, -0.85, 0]}>
      <Box size={[2.6, 0.1, 1.7]} m={m} />
      <Box size={[2.3, 0.02, 0.78]} position={[0, 0.06, -0.2]} m={m} />
      <Box size={[0.8, 0.02, 0.4]} position={[0, 0.06, 0.55]} m={m} />
      {/* lid, hinged at the back edge */}
      <group position={[0, 0.05, -0.85]} rotation={[-0.3, 0, 0]}>
        <Box size={[2.6, 1.7, 0.06]} position={[0, 0.85, 0]} m={m} />
        <mesh position={[0, 0.85, 0.035]} material={m.screens[0]}>
          <planeGeometry args={[2.4, 1.5]} />
        </mesh>
      </group>
      <FloatPanel size={[1.2, 0.8]} position={[-2.1, 1.35, 0.3]} rotY={0.55} screen={1} phase={0.5} m={m} />
      <FloatPanel size={[1.0, 0.7]} position={[2.05, 0.35, 0.5]} rotY={-0.5} screen={2} phase={2} m={m} />
    </group>
  );
}

/** About: two server racks with blinking status LEDs. */
function Rack({ x, m, seed }: { x: number; m: Shared; seed: number }) {
  const leds = useRef<Array<THREE.Mesh | null>>([]);
  const units = [0, 1, 2, 3, 4, 5];
  useFrame((state) => {
    const t = store.reduced ? 0 : state.clock.elapsedTime;
    leds.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.material = Math.sin(t * 3 + i * 1.7 + seed) > 0.15 ? m.glow : m.dim;
    });
  });
  return (
    <group position={[x, 0, 0]}>
      <Box size={[1.3, 2.7, 1.0]} m={m} />
      {units.map((u) => {
        const y = -1.07 + u * 0.43;
        return (
          <group key={u} position={[0, y, 0.5]}>
            <Box size={[1.12, 0.3, 0.06]} m={m} />
            {[0, 1, 2].map((k) => (
              <mesh
                key={k}
                position={[-0.42 + k * 0.1, 0, 0.04]}
                ref={(el) => {
                  leds.current[u * 3 + k] = el;
                }}
                material={m.dim}
              >
                <boxGeometry args={[0.05, 0.05, 0.02]} />
              </mesh>
            ))}
            {/* vent slits */}
            {[0, 1, 2, 3].map((k) => (
              <mesh key={k} position={[0.18 + k * 0.1, 0, 0.035]} material={m.dim}>
                <boxGeometry args={[0.02, 0.18, 0.01]} />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
}

export function ServerRacks({ m }: { m: Shared }) {
  return (
    <group>
      <Rack x={-0.85} m={m} seed={0} />
      <Rack x={0.85} m={m} seed={3} />
    </group>
  );
}

/** Experience: three floating editor windows at different depths. */
export function CodeWindows({ m }: { m: Shared }) {
  return (
    <group>
      <FloatPanel size={[2.2, 1.4]} position={[-1.1, 0.55, 0.3]} rotY={0.4} screen={0} phase={0} m={m} />
      <FloatPanel size={[2.0, 1.3]} position={[1.0, 0.0, -0.4]} rotY={-0.35} screen={1} phase={1.4} m={m} />
      <FloatPanel size={[1.6, 1.0]} position={[-0.1, -0.95, 0.8]} rotY={0.05} screen={2} phase={2.6} m={m} />
    </group>
  );
}

/** Projects: a service mesh with data packets travelling along the links. */
export function NetworkGraph({ m }: { m: Shared }) {
  const { nodes, edges, lineGeo } = useMemo(() => {
    const n = 16;
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const a = golden * i;
      pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r).multiplyScalar(1.7));
    }
    const pairs: Array<[number, number]> = [];
    const seen = new Set<string>();
    pts.forEach((p, i) => {
      pts
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
        .forEach(({ j }) => {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (!seen.has(key)) {
            seen.add(key);
            pairs.push([i, j]);
          }
        });
    });
    const verts: number[] = [];
    pairs.forEach(([a, b]) => verts.push(...pts[a].toArray(), ...pts[b].toArray()));
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return { nodes: pts, edges: pairs, lineGeo: g };
  }, []);

  useEffect(() => () => lineGeo.dispose(), [lineGeo]);

  const packets = useRef<Array<THREE.Mesh | null>>([]);
  useFrame((state) => {
    const t = store.reduced ? 0 : state.clock.elapsedTime;
    packets.current.forEach((mesh, i) => {
      if (!mesh) return;
      const [a, b] = edges[(i * 3) % edges.length];
      const p = (t * (0.25 + (i % 3) * 0.08) + i * 0.37) % 1;
      mesh.position.lerpVectors(nodes[a], nodes[b], p);
    });
  });

  return (
    <group>
      <lineSegments geometry={lineGeo} material={m.edgeSoft} />
      {nodes.map((p, i) => (
        <mesh key={i} position={p} material={i % 4 === 0 ? m.glow : m.body}>
          <octahedronGeometry args={[i % 4 === 0 ? 0.11 : 0.085, 0]} />
        </mesh>
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            packets.current[i] = el;
          }}
          material={m.glow}
        >
          <sphereGeometry args={[0.045, 10, 10]} />
        </mesh>
      ))}
    </group>
  );
}

/** Stack: layered slabs: client, API, database, infrastructure. */
export function LayerStack({ m }: { m: Shared }) {
  const cube = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = store.reduced ? 0 : state.clock.elapsedTime;
    if (cube.current) {
      cube.current.rotation.y = t * 0.6;
      cube.current.position.y = 1.55 + Math.sin(t) * 0.08;
    }
  });
  return (
    <group position={[0, -0.2, 0]}>
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} position={[0, -0.85 + i * 0.42, 0]} rotation={[0, i * 0.2, 0]}>
          <Box size={[2.4, 0.14, 2.4]} m={m} />
          <mesh position={[-0.55, 0.08, 1.0]} material={m.glow}>
            <boxGeometry args={[0.9 - (i % 3) * 0.2, 0.012, 0.05]} />
          </mesh>
          <mesh position={[0.7, 0.08, 1.0]} material={m.dim}>
            <boxGeometry args={[0.4, 0.012, 0.05]} />
          </mesh>
        </group>
      ))}
      <group ref={cube} position={[0, 1.55, 0]}>
        <Box size={[0.5, 0.5, 0.5]} m={m} />
      </group>
    </group>
  );
}

/** Always-on: tiny data bits orbiting the active object. */
export function DataBits({ m }: { m: Shared }) {
  const bits = useRef<Array<THREE.Mesh | null>>([]);
  useFrame((state) => {
    const t = store.reduced ? 0 : state.clock.elapsedTime;
    bits.current.forEach((mesh, i) => {
      if (!mesh) return;
      const r = 2.7 + (i % 3) * 0.35;
      const a = t * (0.3 - (i % 3) * 0.06) + i * 0.9;
      mesh.position.set(Math.cos(a) * r, Math.sin(a * 1.3 + i) * 1.1, Math.sin(a) * r);
      mesh.rotation.set(t + i, t * 0.7, 0);
    });
  });
  return (
    <group>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            bits.current[i] = el;
          }}
          material={i % 2 ? m.glow : m.dim}
        >
          <boxGeometry args={[0.09, 0.09, 0.09]} />
        </mesh>
      ))}
    </group>
  );
}
