"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Stars } from "@react-three/drei"
import { Suspense } from "react"
import { Galaxy } from "./galaxy"

interface GalaxyBackgroundProps {
  className?: string
}

export function GalaxyBackground({ className = "" }: GalaxyBackgroundProps) {
  return (
    <div className={`absolute w-full h-full ${className}`} style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
      <Canvas
        camera={{
          position: [3, 1.5, 3],
          fov: 55,
          near: 0.1,
          far: 1000,
        }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" />

          {/* Environment */}
          <Environment preset="night" />
          <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} fade />

          {/* Galaxy */}
          <Galaxy
            count={70000}
            size={0.008}
            radius={5.5}
            branches={4}
            spin={1}
            randomness={0.2}
            randomnessPower={3}
            insideColor="#47BD79"
            outsideColor="#1a3d2a"
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

