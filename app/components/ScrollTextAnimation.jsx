"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';

// Sample data - matches original tutorial
const textData = [
  { id: 1, title: "currents" },
  { id: 2, title: "currents" },
  { id: 3, title: "currents" },
  { id: 4, title: "currents" },
  { id: 5, title: "currents" },
  { id: 6, title: "currents" },
  { id: 7, title: "currents" },
  { id: 8, title: "currents" },
  { id: 9, title: "currents" },
  { id: 10, title: "currents" },
  { id: 11, title: "currents" },
  { id: 12, title: "currents" },
  { id: 13, title: "currents" },
  { id: 14, title: "currents" },
  { id: 15, title: "currents" },
  { id: 16, title: "currents" },
  { id: 17, title: "currents" },
  { id: 18, title: "currents" },
  { id: 19, title: "currents" },
  { id: 20, title: "currents" },
];


// Individual text component - simple circular rotation only
function CircleTextItem({ text, index, totalCount, scrollY, circleSpeed }) {
  const meshRef = useRef();

  // Calculate angle for circular positioning
  const angleCalc = useMemo(() => {
    return ((totalCount / 10) * Math.PI) / totalCount;
  }, [totalCount]);

  // Update position and rotation based on scroll - simple circular motion only
  useFrame(() => {
    if (meshRef.current) {
      const scrollOffset = scrollY * circleSpeed;

      // Simple circular positioning calculations
      const angleX = index * angleCalc - scrollOffset;
      const angleY = index * angleCalc - scrollOffset;
      const rotationZ = (index / totalCount) * 2 * Math.PI - scrollOffset;

      // Position text in circle with radius of 2
      meshRef.current.position.x = Math.cos(angleX) * 2;
      meshRef.current.position.y = Math.sin(angleY) * 2;
      meshRef.current.rotation.z = rotationZ;
    }
  });

  return (
    <Text
      ref={meshRef}
      fontSize={0.4}
      color="#222222"
      anchorX="center"
      anchorY="middle"
      font="/fonts/neuton-regular.ttf"
    >
      {text}
    </Text>
  );
}

// Main 3D scene component - fixed speed
function Scene({ scrollY }) {
  const groupRef = useRef();
  const { size } = useThree();
  const circleSpeed = 0.002; // Fixed slower speed

  // Center the group on screen
  useEffect(() => {
    if (groupRef.current) {
      // Position at center (0, 0, 0)
      groupRef.current.position.x = 0;
      groupRef.current.position.y = 0;
    }
  }, [size]);

  // Add some ambient lighting
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <group ref={groupRef}>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.33}
          color="#333333"
          anchorX="center"
          anchorY="middle"
          font="/fonts/neuton-regular.ttf"
          fontWeight="bold"
        >
          a diy film school
        </Text>

        {textData.map((item, index) => (
          <CircleTextItem
            key={item.id}
            text={item.title}
            index={index}
            totalCount={textData.length}
            scrollY={scrollY}
            circleSpeed={circleSpeed}
          />
        ))}
      </group>
    </>
  );
}

// Simplified scroll hook - just for circular rotation
function useScrollAnimation() {
  const [scrollData, setScrollData] = useState({
    current: 0,
    target: 0
  });

  const lerp = useCallback((start, end, factor) => {
    return start * (1 - factor) + end * factor;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let rafId;

    const handleScroll = () => {
      setScrollData(prev => ({
        ...prev,
        target: window.scrollY
      }));
    };

    const animate = () => {
      setScrollData(prev => {
        const newCurrent = lerp(prev.current, prev.target, 0.1);

        return {
          current: newCurrent,
          target: prev.target
        };
      });

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [lerp]);

  return scrollData;
}

// Main App Component - clean and simple
export default function ScrollTextAnimation() {
  const [mounted, setMounted] = useState(false);
  const scrollData = useScrollAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted on client
  if (!mounted) {
    return (
      <div className="relative bg-stone-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative bg-stone-100 min-h-screen">
      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ alpha: true, antialias: true }}
        >
          <Scene scrollY={scrollData.current} />
        </Canvas>
      </div>

      {/* Invisible scrollable content to enable scrolling */}
      <div className="relative z-0">
        <div className="h-[300vh]"></div>
      </div>
    </div>
  );
}