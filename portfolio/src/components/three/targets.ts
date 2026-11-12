/**
 * Which 3D object is on stage for each page section, and where it sits.
 * Order matches SECTIONS in lib/store.ts.
 *  obj      0 laptop | 1 server racks | 2 code windows | 3 network | 4 layer stack
 *  x, y     position as a fraction of the viewport (desktop)
 *  my       vertical position fraction on narrow screens
 *  s        scale   |  o  particle opacity   |  a, b  accent colours
 */
export type SceneTarget = {
  obj: number;
  x: number;
  y: number;
  my: number;
  s: number;
  o: number;
  a: string;
  b: string;
};

export const SCENE_TARGETS: SceneTarget[] = [
  // home: laptop
  { obj: 0, x: 0.23, y: 0.0, my: 0.26, s: 1.2, o: 1.0, a: "#c8ff4d", b: "#4d7cff" },
  // about: servers
  { obj: 1, x: -0.26, y: 0.0, my: 0.3, s: 0.95, o: 0.6, a: "#4dffd2", b: "#7c5cff" },
  // experience: code windows
  { obj: 2, x: 0.27, y: 0.0, my: 0.3, s: 0.9, o: 0.55, a: "#ffb84d", b: "#ff4d8d" },
  // projects: network
  { obj: 3, x: 0.0, y: 0.0, my: 0.3, s: 0.9, o: 0.4, a: "#4d9bff", b: "#c8ff4d" },
  // stack: layers
  { obj: 4, x: -0.27, y: 0.0, my: 0.3, s: 0.95, o: 0.6, a: "#c8ff4d", b: "#4dffd2" },
  // contact: laptop again
  { obj: 0, x: 0.0, y: 0.1, my: 0.2, s: 1.15, o: 0.9, a: "#c8ff4d", b: "#ffffff" },
];
