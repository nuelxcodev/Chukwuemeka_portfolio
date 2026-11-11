"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

// three.js is client-only and heavy: load it after first paint.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

/** If WebGL is unavailable the page simply falls back to the CSS backdrop. */
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function BackgroundScene() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Boundary>
        <Scene />
      </Boundary>
    </div>
  );
}
