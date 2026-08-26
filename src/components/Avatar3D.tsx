import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { profile } from "../data/profile";
import { usePrefersReducedMotion } from "../hooks/useMedia";
import { InfinityLoop } from "./scene/InfinityLoop";

const BASE = import.meta.env.BASE_URL;

export function HoloBust({
  reduced,
  scale = 1,
  interactive = true,
}: {
  reduced: boolean;
  scale?: number;
  interactive?: boolean;
}) {
  const tex = useTexture(`${BASE}avatar-3d.png`);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const group = useRef<THREE.Group>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uMap: { value: tex } }), [tex]);

  useFrame(({ clock, pointer }) => {
    if (uniforms.uTime) uniforms.uTime.value = clock.elapsedTime;
    if (!group.current) return;
    const t = clock.elapsedTime;
    if (!interactive) {
      group.current.rotation.y = reduced ? 0.12 : 0.18 + Math.sin(t * 0.35) * 0.28;
      return;
    }
    const idle = reduced ? 0 : Math.sin(t * 0.45) * 0.12;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, idle + pointer.x * 0.5, 0.06);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.14, 0.06);
  });

  return (
    <group ref={group} position={[0, 0.12, 0]} scale={scale}>
      <mesh castShadow>
        <boxGeometry args={[1.42, 1.9, 0.14]} />
        <meshStandardMaterial color="#0c101c" roughness={0.4} metalness={0.6} attach="material-0" />
        <meshStandardMaterial color="#0c101c" roughness={0.4} metalness={0.6} attach="material-1" />
        <meshStandardMaterial color="#7dd3fc" roughness={0.2} metalness={0.8} attach="material-2" />
        <meshStandardMaterial color="#0c101c" roughness={0.4} metalness={0.6} attach="material-3" />
        <meshStandardMaterial map={tex} roughness={0.28} metalness={0.12} attach="material-4" />
        <meshStandardMaterial color="#151826" roughness={0.5} attach="material-5" />
      </mesh>

      <mesh position={[0, 0, 0.085]}>
        <planeGeometry args={[1.42, 1.9]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={uniforms}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            varying vec2 vUv;
            void main() {
              float scan = sin((vUv.y + uTime * 0.12) * 90.0) * 0.07;
              float sweep = smoothstep(0.0, 0.08, abs(fract(uTime * 0.08 + vUv.y) - 0.5));
              float edge = smoothstep(0.48, 0.5, abs(vUv.x - 0.5)) + smoothstep(0.48, 0.5, abs(vUv.y - 0.5));
              vec3 holo = vec3(0.45, 0.85, 1.0) * (0.12 + scan);
              holo += vec3(0.75, 0.45, 1.0) * (1.0 - sweep) * 0.08;
              gl_FragColor = vec4(holo, 0.18 + edge * 0.25);
            }
          `}
        />
      </mesh>

      <group position={[0, -1.05, 0]} rotation={[1.2, 0, 0]} scale={0.72}>
        <InfinityLoop size={1.15} tube={0.018} animate={!reduced} />
      </group>
    </group>
  );
}

function MiniFigure() {
  const face = useTexture(`${BASE}avatar.jpg`);
  face.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={[0.95, -0.55, 0.35]} scale={0.42} rotation={[0, -0.35, 0]}>
      <mesh position={[0, 1.18, 0]} castShadow>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial color="#c48a62" roughness={0.55} />
      </mesh>
      <mesh position={[0.02, 1.2, 0.27]}>
        <circleGeometry args={[0.24, 32]} />
        <meshStandardMaterial map={face} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.32, -0.04]} scale={[1.02, 0.58, 1.05]} castShadow>
        <sphereGeometry args={[0.33, 20, 16]} />
        <meshStandardMaterial color="#1a1410" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.04, 0.18]} scale={[0.72, 0.28, 0.42]}>
        <sphereGeometry args={[0.28, 16, 12]} />
        <meshStandardMaterial color="#241c16" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.18, 12]} />
        <meshStandardMaterial color="#c48a62" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.74, 0.72, 0.34]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.45} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.62, 0.14]}>
        <boxGeometry args={[0.22, 0.3, 0.08]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Rig({ reduced, compact }: { reduced: boolean; compact?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <spotLight position={[2.4, 3, 3]} intensity={40} angle={0.45} penumbra={0.6} color="#e8eefc" castShadow />
      <pointLight position={[-2.2, 1.2, 2]} intensity={12} color="#7dd3fc" />
      <pointLight position={[1.6, -0.4, 1.4]} intensity={8} color="#a78bfa" />
      <Float speed={reduced ? 0 : 1.2} floatIntensity={reduced ? 0 : 0.35} rotationIntensity={0}>
        <HoloBust reduced={reduced} />
      </Float>
      {!compact && <MiniFigure />}
      <ContactShadows position={[0, -1.15, 0]} opacity={0.45} scale={4.2} blur={2.4} far={2.2} />
    </>
  );
}

export function Avatar3D({ compact = false }: { compact?: boolean }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={`avatar3d ${compact ? "avatar3d--compact" : ""}`} aria-label={`${profile.name} 3D avatar`}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.15, compact ? 3.8 : 3.35], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <color attach="background" args={["#07080f"]} />
        <Suspense fallback={null}>
          <Rig reduced={reduced} compact={compact} />
        </Suspense>
      </Canvas>
    </div>
  );
}
