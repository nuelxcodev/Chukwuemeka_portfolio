"use client";

import { Canvas } from "@react-three/fiber";
import { Rig } from "./Rig";

export default function Scene() {
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      // slightly above the workstation, looking down so the keyboard and rack tops read
      camera={{ position: [0, 1.9, 7.2], fov: 40, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Rig />
    </Canvas>
  );
}
