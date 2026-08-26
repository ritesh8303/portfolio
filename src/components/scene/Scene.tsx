import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useIsMobile, usePrefersReducedMotion } from "../../hooks/useMedia";
import { InfinityLoop } from "./InfinityLoop";

const VERT = `
varying vec3 vN;
varying vec3 vV;
void main() {
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = `
uniform float uTime;
varying vec3 vN;
varying vec3 vV;
void main() {
  float f = pow(1.0 - abs(dot(vN, vV)), 2.4);
  vec3 a = vec3(0.42, 0.88, 0.98);
  vec3 b = vec3(0.62, 0.38, 1.0);
  vec3 c = vec3(0.95, 0.55, 0.85);
  float w = 0.5 + 0.5 * sin(uTime * 0.55);
  vec3 col = mix(mix(a, b, w), c, f * 0.55);
  gl_FragColor = vec4(col * (0.12 + f * 1.55), 0.78 + f * 0.18);
}
`;

function fibSphere(n: number, r: number) {
  const pts: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i += 1) {
    const y = 1 - (i / Math.max(n - 1, 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * rad * r, y * r, Math.sin(theta) * rad * r));
  }
  return pts;
}

function IridescentCore({ reduced }: { reduced: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = reduced ? 0 : clock.elapsedTime;
  });

  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[1.28, 32]} />
        <shaderMaterial
          ref={mat}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={uniforms}
          vertexShader={VERT}
          fragmentShader={FRAG}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshBasicMaterial color="#c4b5fd" wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function NeuralField({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const pts = useMemo(() => fibSphere(count, 2.65), [count]);
  const lines = useMemo(() => {
    const arr: number[] = [];
    pts.forEach((p, i) => {
      const near = pts
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      near.forEach(({ j }) => {
        arr.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z);
      });
    });
    return new Float32Array(arr);
  }, [pts]);

  const path = useMemo(() => {
    const a = pts[0];
    const b = pts[Math.floor(pts.length / 3)];
    return { a, b };
  }, [pts]);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.elapsedTime * 0.08;
    if (pulse.current) {
      const t = (clock.elapsedTime * 0.35) % 1;
      pulse.current.position.lerpVectors(path.a, path.b, t);
    }
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#8b7cff" transparent opacity={0.22} />
      </lineSegments>
      {pts.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color={i % 4 === 0 ? "#7dd3fc" : "#e9d5ff"} />
        </mesh>
      ))}
      <mesh ref={pulse}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshBasicMaterial color="#f0abfc" />
      </mesh>
    </group>
  );
}

function SceneRig({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (!group.current || reduced) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.4, 0.045);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.22, 0.045);
  });

  return (
    <group ref={group} position={mobile ? [0, -1.7, 0] : [1.15, 0.05, 0]} scale={mobile ? 0.72 : 1}>
      <IridescentCore reduced={reduced} />
      <group rotation={[0.55, 0.2, 0.15]} position={[0, 0, 0]}>
        <InfinityLoop size={2.05} tube={0.022} animate={!reduced} />
      </group>
      <NeuralField count={mobile ? 18 : 28} />
    </group>
  );
}

export function Scene({ onReady }: { onReady: () => void }) {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  return (
    <div className="scene-wrap" aria-hidden="true">
      <Canvas
        style={{ pointerEvents: "none" }}
        dpr={mobile ? [1, 1.2] : [1, 1.6]}
        camera={{ position: [0, 0, 8.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={onReady}
      >
        <color attach="background" args={["#05060b"]} />
        <fog attach="fog" args={["#05060b", 8.5, 20]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 2.5, 5]} intensity={16} color="#7dd3fc" distance={16} />
        <pointLight position={[-4, -1, 3]} intensity={12} color="#8b5cf6" distance={14} />
        <SceneRig reduced={reduced} mobile={mobile} />
      </Canvas>
    </div>
  );
}
