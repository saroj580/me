"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

//  Particle System Configuration 
const MAX_PARTICLES = 200;
const PARTICLE_LIFETIME = 0.85; // seconds
const EMIT_RATE = 5; // particles per mouse move
const BURST_COUNT = 18; // particles on mouse click
const GRAVITY = -0.25;

// Radiant glitter color palette
const PALETTE = [
  new THREE.Color("#6366f1"), // Indigo
  new THREE.Color("#8b5cf6"), // Violet
  new THREE.Color("#a855f7"), // Purple
  new THREE.Color("#06b6d4"), // Cyan
  new THREE.Color("#38bdf8"), // Sky
  new THREE.Color("#fbbf24"), // Gold
  new THREE.Color("#ffffff"), // Pure sparkle white
];

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: number;
  rotSpeed: number;
  life: number;
  maxLife: number;
  color: THREE.Color;
  size: number;
}

function spawnParticle(x: number, y: number, isBurst = false): Particle {
  const speed = isBurst ? 0.12 : 0.055;
  const angle = Math.random() * Math.PI * 2;
  const spread = Math.random() * speed;

  return {
    position: new THREE.Vector3(
      x + (Math.random() - 0.5) * 0.04,
      y + (Math.random() - 0.5) * 0.04,
      (Math.random() - 0.5) * 0.08
    ),
    velocity: new THREE.Vector3(
      Math.cos(angle) * spread,
      Math.sin(angle) * spread + (isBurst ? 0.04 : 0.02),
      (Math.random() - 0.5) * 0.04
    ),
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 4,
    life: 1.0,
    maxLife: PARTICLE_LIFETIME * (0.7 + Math.random() * 0.6),
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    size: isBurst ? Math.random() * 8 + 4 : Math.random() * 5.5 + 2.5,
  };
}

// Global mouse tracker in NDC coords [-1, 1]
const mouseState = {
  x: 0,
  y: 0,
  active: false,
  isHovering: false,
  pendingParticles: 0,
};

// ─── Three.js Scene Component 
function CursorScene() {
  const { viewport } = useThree();
  const poolRef = useRef<Particle[]>([]);

  // Geometry attributes
  const posArr = useMemo(() => new Float32Array(MAX_PARTICLES * 3), []);
  const colArr = useMemo(() => new Float32Array(MAX_PARTICLES * 3), []);
  const sizeArr = useMemo(() => new Float32Array(MAX_PARTICLES), []);

  const posAttr = useRef<THREE.BufferAttribute>(null!);
  const colAttr = useRef<THREE.BufferAttribute>(null!);
  const sizeAttr = useRef<THREE.BufferAttribute>(null!);

  // Cursor 3D elements
  const groupRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);

  // Scale target for interactive hovering
  const scaleRef = useRef({ current: 1, target: 1 });

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.033);
    const { width, height } = viewport;

    // Convert NDC [-1, 1] to Three.js world coordinates
    const worldX = (mouseState.x * width) / 2;
    const worldY = (mouseState.y * height) / 2;

    // Smooth cursor follow (lerp)
    if (groupRef.current) {
      groupRef.current.position.x += (worldX - groupRef.current.position.x) * 0.35;
      groupRef.current.position.y += (worldY - groupRef.current.position.y) * 0.35;
      groupRef.current.visible = mouseState.active;

      // Scale on hover
      scaleRef.current.target = mouseState.isHovering ? 1.6 : 1.0;
      scaleRef.current.current += (scaleRef.current.target - scaleRef.current.current) * 0.2;
      groupRef.current.scale.setScalar(scaleRef.current.current);

      if (ringRef.current) {
        ringRef.current.rotation.z += dt * (mouseState.isHovering ? 2.5 : 1.2);
      }
    }

    // Spawn queued particles
    while (mouseState.pendingParticles > 0) {
      mouseState.pendingParticles--;
      const isBurst = mouseState.pendingParticles > EMIT_RATE;
      if (poolRef.current.length < MAX_PARTICLES) {
        poolRef.current.push(spawnParticle(worldX, worldY, isBurst));
      } else {
        const deadIdx = poolRef.current.findIndex((p) => p.life <= 0);
        if (deadIdx !== -1) {
          poolRef.current[deadIdx] = spawnParticle(worldX, worldY, isBurst);
        }
      }
    }

    // Update particles
    let aliveCount = 0;
    for (let i = 0; i < poolRef.current.length; i++) {
      const p = poolRef.current[i];
      if (p.life <= 0) continue;

      p.life -= dt / p.maxLife;
      p.velocity.y += GRAVITY * dt * 0.08;
      p.position.addScaledVector(p.velocity, 1);
      p.rotation += p.rotSpeed * dt;

      const alpha = Math.max(0, p.life);
      // Twinkle effect (subtle pulse based on life & sine wave)
      const twinkle = 0.8 + 0.2 * Math.sin(p.rotation * 3);

      const idx3 = aliveCount * 3;
      posArr[idx3] = p.position.x;
      posArr[idx3 + 1] = p.position.y;
      posArr[idx3 + 2] = p.position.z;

      colArr[idx3] = p.color.r * twinkle;
      colArr[idx3 + 1] = p.color.g * twinkle;
      colArr[idx3 + 2] = p.color.b * twinkle;

      sizeArr[aliveCount] = p.size * alpha;
      aliveCount++;
    }

    // Clear unused slots
    for (let i = aliveCount; i < MAX_PARTICLES; i++) {
      sizeArr[i] = 0;
    }

    if (posAttr.current && colAttr.current && sizeAttr.current) {
      posAttr.current.needsUpdate = true;
      colAttr.current.needsUpdate = true;
      sizeAttr.current.needsUpdate = true;
    }
  });

  return (
    <>
      {/* 3D Cursor indicator */}
      <group ref={groupRef} visible={false}>
        {/* Core glowing dot */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.038, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
        </mesh>

        {/* Outer glowing orbital ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[0.08, 0.007, 12, 36]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.75}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Glittering Sparkles Cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={posAttr}
            attach="attributes-position"
            args={[posArr, 3]}
          />
          <bufferAttribute
            ref={colAttr}
            attach="attributes-color"
            args={[colArr, 3]}
          />
          <bufferAttribute
            ref={sizeAttr}
            attach="attributes-size"
            args={[sizeArr, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          sizeAttenuation={false}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

//  Main Exported Component 
export default function GlitterCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Graceful fallback: Do not enable on touch / coarse pointer devices
    const isTouch =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;

    if (isTouch) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseState.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseState.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseState.active = true;
      mouseState.pendingParticles = Math.min(
        mouseState.pendingParticles + EMIT_RATE,
        MAX_PARTICLES
      );

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest(
            'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
          )
        );
        mouseState.isHovering = isInteractive;
      }
    };

    const handleMouseLeave = () => {
      mouseState.active = false;
      mouseState.isHovering = false;
    };

    const handleClick = () => {
      // Sparkle burst on click
      mouseState.pendingParticles = Math.min(
        mouseState.pendingParticles + BURST_COUNT,
        MAX_PARTICLES
      );
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      id="magical-cursor-canvas"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <CursorScene />
      </Canvas>
    </div>
  );
}
