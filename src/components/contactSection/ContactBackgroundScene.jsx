import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

const AnimatedStars = () => {
  const starsRef = useRef();
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0008;
      starsRef.current.rotation.x += 0.0003;
      starsRef.current.rotation.z += 0.0002;
    }
  });

  return (
    <group ref={starsRef}>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
    </group>
  );
};

const Comet = () => {
  const cometRef = useRef();

  useFrame((_, delta) => {
    if (cometRef.current) {
      cometRef.current.position.x += 0.05;
      cometRef.current.position.y =
        Math.sin(cometRef.current.position.x * 0.1) * 10;

      // Reset comet position
      if (cometRef.current.position.x > 50) {
        cometRef.current.position.x = -50;
      }
    }
  });

  return (
    <mesh ref={cometRef} position={[-50, 0, -20]}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color="#0ff" />
    </mesh>
  );
};

const ContactBackgroundScene = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <AnimatedStars />
        <Comet />
      </Canvas>
    </div>
  );
};

export default ContactBackgroundScene;
