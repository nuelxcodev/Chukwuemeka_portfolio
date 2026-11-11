"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MathUtils } from "three";
import { store } from "@/lib/store";
import { Orbits } from "./Orbits";
import { SCENE_TARGETS } from "./targets";
import {
  coreFragment,
  coreVertex,
  particleFragment,
  particleVertex,
} from "./shaders";

/**
 * Owns the whole 3D composition. Every frame it eases position, scale,
 * colour and energy toward the target for the active section, so the object
 * glides between sections instead of cutting.
 */
export function Rig() {
  const pos = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const viewport = useThree((s) => s.viewport);
  const width = useThree((s) => s.size.width);
  const compact = width < 768;

  const colorA = useMemo(() => new THREE.Color(SCENE_TARGETS[0].a), []);
  const colorB = useMemo(() => new THREE.Color(SCENE_TARGETS[0].b), []);
  const targetA = useMemo(() => new THREE.Color(), []);
  const targetB = useMemo(() => new THREE.Color(), []);
  const energy = useRef(0);

  const coreMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: coreVertex,
        fragmentShader: coreFragment,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: 0.3 },
          uOpacity: { value: 1 },
          uColorA: { value: colorA },
          uColorB: { value: colorB },
        },
      }),
    [colorA, colorB],
  );

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
          uSize: { value: 26 },
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
    const count = compact ? 1800 : 4200;
    const positions = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const r = 2.2 + Math.pow(Math.random(), 1.6) * 2.4;
      const k = Math.sqrt(1 - u * u);
      positions[i * 3] = r * k * Math.cos(theta);
      positions[i * 3 + 1] = r * u * 0.8; // slightly flattened shell
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
      coreMat.dispose();
      particleMat.dispose();
    },
    [coreMat, particleMat],
  );
  useEffect(() => () => particleGeo.dispose(), [particleGeo]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const reduced = store.reduced;
    const t = reduced ? 0 : state.clock.elapsedTime;
    const k = SCENE_TARGETS[store.section] ?? SCENE_TARGETS[0];
    const lambda = reduced ? 60 : 2.4;
    const narrow = viewport.width < 5.2;

    // Position + scale, responsive to the visible world-space size.
    const fit = MathUtils.clamp(viewport.width / 8, 0.5, 1.15);
    const tx = narrow ? 0 : k.x * viewport.width;
    const ty = (narrow ? k.my : k.y) * viewport.height;
    const g = pos.current;
    if (g) {
      g.position.x = MathUtils.damp(g.position.x, tx, lambda, dt);
      g.position.y = MathUtils.damp(g.position.y, ty, lambda, dt);
      const s = MathUtils.damp(g.scale.x, k.s * fit, lambda, dt);
      g.scale.setScalar(s);
    }

    // Rotation: idle drift + scroll progress + pointer parallax.
    const sp = spin.current;
    if (sp) {
      const targetY = t * 0.1 + store.progress * Math.PI * 4 + store.pointerX * 0.4;
      const targetX = store.progress * 1.2 - store.pointerY * 0.25;
      sp.rotation.y = MathUtils.damp(sp.rotation.y, targetY, 3, dt);
      sp.rotation.x = MathUtils.damp(sp.rotation.x, targetX, 3, dt);
    }

    // Scroll velocity feeds a smoothed "energy" that agitates the surface.
    const targetEnergy = reduced ? 0 : Math.min(Math.abs(store.velocity) / 40, 1);
    energy.current = MathUtils.damp(energy.current, targetEnergy, 4, dt);

    // Colours + opacity ease toward the section palette.
    const ck = 1 - Math.exp(-lambda * dt);
    colorA.lerp(targetA.set(k.a), ck);
    colorB.lerp(targetB.set(k.b), ck);

    const cu = coreMat.uniforms;
    cu.uTime.value = t;
    cu.uAmp.value = 0.3 + energy.current * 0.28;
    cu.uOpacity.value = MathUtils.damp(cu.uOpacity.value, k.o, lambda, dt);

    const pu = particleMat.uniforms;
    pu.uTime.value = t;
    pu.uEnergy.value = energy.current;
    pu.uPixelRatio.value = state.gl.getPixelRatio();
    pu.uOpacity.value = MathUtils.damp(pu.uOpacity.value, 0.25 + k.o * 0.75, lambda, dt);
  });

  return (
    <group ref={pos}>
      <group ref={spin}>
        <mesh material={coreMat}>
          <icosahedronGeometry args={[1.45, compact ? 14 : 24]} />
        </mesh>
        <Orbits color={colorA} />
      </group>
      <points geometry={particleGeo} material={particleMat} />
    </group>
  );
}
