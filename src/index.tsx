import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { CSSProperties } from "react";
import CircleFormation from "@components/circle-formation";
import 'index.css';

const style: CSSProperties = {
  width: "100vw",
  height: "100vh",
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <div style={style}>
    <Canvas shadows={false}>
      <directionalLight
        intensity={0.5}
        position={[5,1,0]}
        // castShadow
      />
      <CircleFormation count={6} />
    </Canvas>
  </div>
);
