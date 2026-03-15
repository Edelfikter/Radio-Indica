'use client';

import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import type { Station } from '@/lib/types';

// ── helpers ──────────────────────────────────────────────────────────────────

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

// ── Station blip ─────────────────────────────────────────────────────────────

interface BlipProps {
  station: Station;
  onSelect: (s: Station) => void;
  selected: boolean;
}

function Blip({ station, onSelect, selected }: BlipProps) {
  const pos = useMemo(
    () => latLngToVec3(station.lat, station.lng, 1.02),
    [station.lat, station.lng],
  );
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current && selected) {
      meshRef.current.scale.setScalar(
        1 + 0.3 * Math.sin(clock.getElapsedTime() * 4),
      );
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={pos}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(station);
      }}
    >
      <sphereGeometry args={[0.022, 16, 16]} />
      <meshStandardMaterial
        color={selected ? '#ffd700' : '#ff4444'}
        emissive={selected ? '#ffd700' : '#ff2222'}
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

// ── Globe mesh ────────────────────────────────────────────────────────────────

interface GlobeMeshProps {
  stations: Station[];
  selectedStation: Station | null;
  onSelectStation: (s: Station) => void;
  onAddStation: (lat: number, lng: number) => void;
}

function GlobeMesh({ stations, selectedStation, onSelectStation, onAddStation }: GlobeMeshProps) {
  const { camera } = useThree();
  const globeRef = useRef<THREE.Mesh>(null);
  const lastClick = useRef<number>(0);

  const handleClick = useCallback(
    (e: THREE.Event) => {
      // @ts-expect-error - three fiber event has point
      const point: THREE.Vector3 = e.point;
      if (!point) return;

      const now = Date.now();
      const delta = now - lastClick.current;
      lastClick.current = now;

      if (delta < 350) {
        // double-click → add station
        const normalized = point.clone().normalize();
        const lat = 90 - Math.acos(normalized.y) * (180 / Math.PI);
        const lng = Math.atan2(normalized.z, -normalized.x) * (180 / Math.PI) - 180;
        onAddStation(parseFloat(lat.toFixed(4)), parseFloat(lng.toFixed(4)));
      }
    },
    [onAddStation],
  );

  return (
    <>
      {/* Globe */}
      <Sphere ref={globeRef} args={[1, 64, 64]} onClick={handleClick}>
        <meshStandardMaterial color="#1a3a8f" wireframe={false} />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[1.001, 32, 32]}>
        <meshStandardMaterial
          color="#3a6eff"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Station blips */}
      {stations.map((s) => (
        <Blip
          key={s.id}
          station={s}
          selected={selectedStation?.id === s.id}
          onSelect={onSelectStation}
        />
      ))}
    </>
  );
}

// ── Public component ──────────────────────────────────────────────────────────

interface GlobeProps {
  stations: Station[];
  selectedStation: Station | null;
  onSelectStation: (s: Station) => void;
  onAddStation: (lat: number, lng: number) => void;
}

export default function Globe({ stations, selectedStation, onSelectStation, onAddStation }: GlobeProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />
      <pointLight position={[-5, -3, -5]} intensity={0.3} />

      <GlobeMesh
        stations={stations}
        selectedStation={selectedStation}
        onSelectStation={onSelectStation}
        onAddStation={onAddStation}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
      />
    </Canvas>
  );
}
