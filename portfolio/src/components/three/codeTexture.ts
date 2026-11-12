import * as THREE from "three";

/**
 * Draws a tall, tileable "code editor" bitmap (gutter + coloured tokens) on a
 * canvas. Scrolling its offset makes the screens look like live code.
 * Client-only: it touches `document`.
 */
export function makeCodeTexture(seed: number, accent: string) {
  const w = 640;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#070a12";
  ctx.fillRect(0, 0, w, h);

  let s = seed * 9301 + 49297;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const palette = [accent, "#5b7cff", "#e8e8ea", "#8a8fa3", "#ff9d5c"];

  for (let y = 24; y < h - 10; y += 22) {
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#3a4052";
    ctx.fillRect(14, y, 12, 8);

    let x = 48 + Math.floor(rnd() * 3) * 30;
    const tokens = 2 + Math.floor(rnd() * 4);
    for (let t = 0; t < tokens; t++) {
      const tw = 22 + rnd() * 100;
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = palette[Math.floor(rnd() * palette.length)];
      ctx.fillRect(x, y, tw, 8);
      x += tw + 10;
      if (x > w - 40) break;
    }
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 0.4);
  tex.anisotropy = 4;
  return tex;
}
