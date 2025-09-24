import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Particles = () => {
  const ref = useRef();
  const count = 1500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y -= 0.0003;
      ref.current.rotation.x += 0.0008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#0ff"
        size={0.3}
        sizeAttenuation
        depthWrite={false}
        transparent
      />
    </points>
  );
};

const ParticleFlowBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 40], fov: 75 }}
        gl={{ preserveDrawingBuffer: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleFlowBackground;
