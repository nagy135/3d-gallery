import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { CSSProperties } from "react";
import CircleFormation from "@components/circle-formation";
import "index.css";
import { Cloud, Sky, Stars } from "@react-three/drei";

const style: CSSProperties = {
  width: "100vw",
  height: "100vh",
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <div style={style}>
    <Canvas shadows={false}>
      <Sky
        distance={450000}
        sunPosition={[5, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <Cloud
        opacity={0.5}
        speed={0.1} // Rotation speed
        width={10} // Width of the full cloud
        depth={1.5} // Z-dir depth
        segments={20} // Number of particles
        position={[5, 8, 3]}
      />
      <directionalLight
        intensity={0.5}
        position={[5, 1, 0]}
        // castShadow
      />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <CircleFormation count={6} />
    </Canvas>
  </div>
);
