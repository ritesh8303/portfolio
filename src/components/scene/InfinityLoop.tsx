import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function makeCurve(size: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 160; i += 1) {
    const t = (i / 160) * Math.PI * 2;
    const d = 1 + Math.sin(t) ** 2;
    pts.push(
      new THREE.Vector3(
        (size * Math.cos(t)) / d,
        (size * Math.sin(t) * Math.cos(t)) / d,
        Math.sin(t * 2) * size * 0.06,
      ),
    );
  }
  return new THREE.CatmullRomCurve3(pts, true);
}

export function InfinityLoop({
  size = 1.55,
  tube = 0.028,
  color = "#7dd3fc",
  glow = "#c4b5fd",
  animate = true,
}: {
  size?: number;
  tube?: number;
  color?: string;
  glow?: string;
  animate?: boolean;
}) {
  const curve = useMemo(() => makeCurve(size), [size]);
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 220, tube, 8, true), [curve, tube]);
  const glowGeom = useMemo(() => new THREE.TubeGeometry(curve, 180, tube * 2.1, 8, true), [curve, tube]);
  const pulse = useRef<THREE.Mesh>(null);
  const ribbon = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = (clock.elapsedTime * 0.08) % 1;
    if (pulse.current) pulse.current.position.copy(curve.getPointAt(t));
    if (ribbon.current) ribbon.current.rotation.z = Math.sin(clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <group ref={ribbon}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} transparent opacity={0.85} />
      </mesh>
      <mesh geometry={glowGeom}>
        <meshBasicMaterial color={glow} transparent opacity={0.18} />
      </mesh>
      <mesh ref={pulse}>
        <sphereGeometry args={[tube * 3.2, 12, 12]} />
        <meshBasicMaterial color="#f0abfc" />
      </mesh>
    </group>
  );
}
