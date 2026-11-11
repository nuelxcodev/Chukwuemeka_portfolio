"use client";

import { Canvas } from "@react-three/fiber";
import { Rig } from "./Rig";

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 40, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Rig />
    </Canvas>
  );
}
