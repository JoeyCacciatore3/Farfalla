/* eslint-disable react/no-unknown-property -- R3F's JSX (`mesh`, `primitive`, `geometry`, `attach`) is custom but valid. */
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, ShaderMaterial, PlaneGeometry } from "three";

/**
 * Subtle painterly displacement layered over the hero artwork.
 *
 * What it actually does:
 *   - Loads the same hero JPG as a texture
 *   - Renders it on a fullscreen plane through a fragment shader
 *   - Samples the texture at slowly-shifting UVs perturbed by fbm noise
 *   - Output: the painting "breathes" with a slow, paint-like swimming motion
 *
 * What it deliberately doesn't do: hard distortions, fast motion, particle
 * effects. The brief was calming + smooth + subtle. The displacement is in
 * the 0.005–0.015 UV range — visible on closer inspection, never jarring.
 *
 * Falls back gracefully if WebGL is unavailable (Suspense + the static <img>
 * underneath in CinematicHero remains visible while this layer paints over).
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frag = /* glsl */ `
  precision mediump float;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  // Hash + value-noise + fbm. Cheap and paint-like enough for a subtle wash.
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.05;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float t = uTime * 0.06; // slow time
    vec2 q = vec2(fbm(vUv * 1.4 + vec2(t, 0.0)),
                  fbm(vUv * 1.4 + vec2(0.0, t)));
    vec2 displacedUv = vUv + (q - 0.5) * uIntensity;
    vec4 col = texture2D(uTex, clamp(displacedUv, 0.001, 0.999));
    gl_FragColor = col;
  }
`;

const HeroPlane = ({ src, intensity = 0.012 }) => {
  const tex = useLoader(TextureLoader, src);
  const matRef = useRef();
  const geo = useMemo(() => new PlaneGeometry(2, 2), []);
  const material = useMemo(() => new ShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    uniforms: {
      uTex: { value: tex },
      uTime: { value: 0 },
      uIntensity: { value: intensity },
    },
  }), [tex, intensity]);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  // Use ref binding via primitive mesh
  return (
    <mesh geometry={geo}>
      <primitive object={material} ref={matRef} attach="material" />
    </mesh>
  );
};

export const PaintDisplacement = ({ src }) => {
  // Skip on reduced-motion + on tiny screens where the perf cost isn't worth it.
  if (typeof window !== "undefined") {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
    if (window.innerWidth < 640) return null;
  }
  return (
    <Canvas
      orthographic
      camera={{ zoom: 1, position: [0, 0, 1], near: 0.1, far: 10 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        // Keep the underlying <img> visible if WebGL fails; this canvas just
        // draws over it. If the canvas renders nothing, the photo is still there.
      }}
    >
      <Suspense fallback={null}>
        <HeroPlane src={src} />
      </Suspense>
    </Canvas>
  );
};

export default PaintDisplacement;
