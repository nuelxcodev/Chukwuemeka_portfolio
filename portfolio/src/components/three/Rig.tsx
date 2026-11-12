"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MathUtils } from "three";
import { store } from "@/lib/store";
import { makeCodeTexture } from "./codeTexture";
import { SCENE_TARGETS } from "./targets";
import { particleFragment, particleVertex } from "./shaders";
import {
  CodeWindows,
  DataBits,
  LayerStack,
  Laptop,
  NetworkGraph,
  ServerRacks,
  type Shared,
} from "./TechObjects";

/**
 * Owns the 3D composition. Each section has an object "on stage"; the others
 * scale to zero. Position, scale, colour and energy ease toward the active
 * section's target every frame, so everything glides instead of cutting.
 */
export function Rig() {
  const pos = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const stage = useRef<Array<THREE.Group | null>>([]);
  const viewport = useThree((s) => s.viewport);
  const width = useThree((s) => s.size.width);
  const compact = width < 768;

  const colorA = useMemo(() => new THREE.Color(SCENE_TARGETS[0].a), []);
  const colorB = useMemo(() => new THREE.Color(SCENE_TARGETS[0].b), []);
  const targetA = useMemo(() => new THREE.Color(), []);
  const targetB = useMemo(() => new THREE.Color(), []);
  const energy = useRef(0);
  const lastLight = useRef<boolean | null>(null);

  const lightA = useRef<THREE.PointLight>(null);
  const lightB = useRef<THREE.PointLight>(null);

  /* ---- shared materials + code textures ---- */
  const textures = useMemo(
    () => [1, 2, 3, 4].map((seed) => makeCodeTexture(seed, "#c8ff4d")),
    [],
  );
  const shared = useMemo<Shared>(
    () => ({
      body: new THREE.MeshStandardMaterial({
        color: "#0c1019",
        metalness: 0.55,
        roughness: 0.4,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }),
      edge: new THREE.LineBasicMaterial({ color: colorA, toneMapped: false }),
      edgeSoft: new THREE.LineBasicMaterial({
        color: colorB,
        transparent: true,
        opacity: 0.45,
        toneMapped: false,
      }),
      glow: new THREE.MeshBasicMaterial({ color: colorA, toneMapped: false }),
      dim: new THREE.MeshBasicMaterial({ color: "#252b3a", toneMapped: false }),
      screens: textures.map(
        (map) => new THREE.MeshBasicMaterial({ map, toneMapped: false }),
      ),
    }),
    [colorA, colorB, textures],
  );

  /* ---- particle field ---- */
  const particleMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 22 },
          uPixelRatio: { value: 1 },
          uEnergy: { value: 0 },
          uOpacity: { value: 1 },
          uColorA: { value: colorA },
          uColorB: { value: colorB },
        },
      }),
    [colorA, colorB],
  );
  const particleGeo = useMemo(() => {
    const count = compact ? 1400 : 3200;
    const positions = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const r = 3.2 + Math.pow(Math.random(), 1.4) * 3.2;
      const k = Math.sqrt(1 - u * u);
      positions[i * 3] = r * k * Math.cos(theta);
      positions[i * 3 + 1] = r * u * 0.7;
      positions[i * 3 + 2] = r * k * Math.sin(theta);
      rand[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    return g;
  }, [compact]);

  useEffect(
    () => () => {
      textures.forEach((t) => t.dispose());
      Object.values(shared).forEach((v) =>
        Array.isArray(v) ? v.forEach((x) => x.dispose()) : v.dispose(),
      );
      particleMat.dispose();
    },
    [textures, shared, particleMat],
  );
  useEffect(() => () => particleGeo.dispose(), [particleGeo]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const reduced = store.reduced;
    const t = reduced ? 0 : state.clock.elapsedTime;
    const k = SCENE_TARGETS[store.section] ?? SCENE_TARGETS[0];
    const lambda = reduced ? 60 : 2.4;
    const narrow = viewport.width < 5.2;

    /* stage position + scale */
    const fit = MathUtils.clamp(viewport.width / 8, 0.5, 1.15);
    const tx = narrow ? 0 : k.x * viewport.width;
    const ty = (narrow ? k.my : k.y) * viewport.height;
    const g = pos.current;
    if (g) {
      g.position.x = MathUtils.damp(g.position.x, tx, lambda, dt);
      g.position.y = MathUtils.damp(g.position.y, ty, lambda, dt);
      g.scale.setScalar(MathUtils.damp(g.scale.x, k.s * fit, lambda, dt));
    }

    /* swap the on-stage object: scale the others to zero */
    stage.current.forEach((grp, i) => {
      if (!grp) return;
      const on = i === k.obj ? 1 : 0;
      const s = MathUtils.damp(grp.scale.x, on, reduced ? 60 : 5, dt);
      grp.visible = s > 0.02;
      grp.scale.setScalar(Math.max(s, 0.0001));
      grp.rotation.y = (1 - s) * 1.4;
    });

    /* gentle sway (so screens stay readable) + scroll tilt + pointer parallax */
    const sp = spin.current;
    if (sp) {
      const ty2 = Math.sin(t * 0.3) * 0.35 + store.pointerX * 0.4 - 0.25;
      const tx2 = 0.2 + store.progress * 0.25 - store.pointerY * 0.18;
      sp.rotation.y = MathUtils.damp(sp.rotation.y, ty2, 3, dt);
      sp.rotation.x = MathUtils.damp(sp.rotation.x, tx2, 3, dt);
    }

    /* scroll velocity -> energy */
    const targetEnergy = reduced ? 0 : Math.min(Math.abs(store.velocity) / 40, 1);
    energy.current = MathUtils.damp(energy.current, targetEnergy, 4, dt);

    /* theme: light mode needs darker ink, solid (not additive) particles, paler chassis */
    const light = store.theme === "light";
    if (lastLight.current !== light) {
      lastLight.current = light;
      shared.body.color.set(light ? "#d7dce8" : "#0c1019");
      shared.dim.color.set(light ? "#a9b1c4" : "#252b3a");
      particleMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      particleMat.needsUpdate = true;
    }

    /* colours */
    const ck = 1 - Math.exp(-lambda * dt);
    targetA.set(k.a);
    targetB.set(k.b);
    if (light) {
      targetA.multiplyScalar(0.5);
      targetB.multiplyScalar(0.5);
    }
    colorA.lerp(targetA, ck);
    colorB.lerp(targetB, ck);
    // materials copy colours on construction, so push the live palette each frame
    shared.edge.color.copy(colorA);
    shared.glow.color.copy(colorA);
    shared.edgeSoft.color.copy(colorB);
    if (lightA.current) lightA.current.color.copy(colorA);
    if (lightB.current) lightB.current.color.copy(colorB);

    /* scrolling code on every screen */
    textures.forEach((tex, i) => {
      tex.offset.y = (t * (0.025 + i * 0.006) + i * 0.25) % 1;
    });

    const pu = particleMat.uniforms;
    pu.uTime.value = t;
    pu.uEnergy.value = energy.current;
    pu.uPixelRatio.value = state.gl.getPixelRatio();
    pu.uOpacity.value = MathUtils.damp(pu.uOpacity.value, 0.25 + k.o * 0.5, lambda, dt);
  });

  const objects = [Laptop, ServerRacks, CodeWindows, NetworkGraph, LayerStack];

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <pointLight ref={lightA} position={[-3, 2, 3]} intensity={38} decay={2} />
      <pointLight ref={lightB} position={[3, -2, 2]} intensity={24} decay={2} />

      <group ref={pos}>
        <group ref={spin}>
          {objects.map((Obj, i) => (
            <group
              key={i}
              ref={(el) => {
                stage.current[i] = el;
              }}
              visible={i === 0}
              scale={i === 0 ? 1 : 0.0001}
            >
              <Obj m={shared} />
            </group>
          ))}
          <DataBits m={shared} />
        </group>
        <points geometry={particleGeo} material={particleMat} />
      </group>
    </>
  );
}
