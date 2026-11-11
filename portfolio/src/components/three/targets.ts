/**
 * Where the 3D object sits and how it looks for each page section.
 * Order matches SECTIONS in lib/store.ts.
 *  x, y     position as a fraction of the viewport (desktop)
 *  my       vertical position fraction on narrow screens
 *  s        scale   |  o  opacity   |  a, b  gradient colours
 */
export type SceneTarget = {
  x: number;
  y: number;
  my: number;
  s: number;
  o: number;
  a: string;
  b: string;
};

export const SCENE_TARGETS: SceneTarget[] = [
  // home
  { x: 0.23, y: 0.0, my: 0.24, s: 1.0, o: 1.0, a: "#c8ff4d", b: "#4d7cff" },
  // about
  { x: -0.26, y: 0.02, my: 0.3, s: 0.78, o: 0.5, a: "#4dffd2", b: "#7c5cff" },
  // experience
  { x: 0.28, y: -0.02, my: 0.3, s: 0.68, o: 0.42, a: "#ffb84d", b: "#ff4d8d" },
  // projects
  { x: 0.0, y: 0.0, my: 0.3, s: 0.55, o: 0.2, a: "#4d9bff", b: "#c8ff4d" },
  // stack
  { x: -0.27, y: 0.0, my: 0.3, s: 0.72, o: 0.45, a: "#c8ff4d", b: "#4dffd2" },
  // contact
  { x: 0.0, y: 0.04, my: 0.18, s: 1.12, o: 0.9, a: "#c8ff4d", b: "#ffffff" },
];
