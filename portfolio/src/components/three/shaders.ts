/** GLSL for the ambient "data dust" particle field. */

export const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform float uEnergy;
attribute float aRand;
varying float vRand;

void main(){
  vec3 p = position;
  float ang = uTime * (0.03 + aRand * 0.05);
  float c = cos(ang);
  float s = sin(ang);
  p.xz = mat2(c, -s, s, c) * p.xz;
  p *= 1.0 + sin(uTime * 0.5 + aRand * 20.0) * 0.015 + uEnergy * 0.14 * aRand;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPixelRatio * (0.35 + aRand) * (6.0 / -mv.z);
  vRand = aRand;
}
`;

export const particleFragment = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;
uniform float uTime;
varying float vRand;

void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = pow(smoothstep(0.5, 0.0, d), 2.0);
  float twinkle = 0.55 + 0.45 * sin(uTime * 1.5 + vRand * 40.0);
  vec3 col = mix(uColorA, uColorB, vRand);
  gl_FragColor = vec4(col, a * twinkle * uOpacity);
  #include <colorspace_fragment>
}
`;
