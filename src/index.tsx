import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { CSSProperties } from "react";
import CircleFormation from "@components/circle-formation";
import Box from "@components/box";

const style: CSSProperties = {
  width: "50vw",
  height: "50vh",
  margin: "50% 0 0 50%",
  transform: "translate(-50%, -50%)",
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <div style={style}>
    <Canvas shadows={false}>
      <directionalLight
        intensity={0.5}
        position={[5,1,0]}
        // castShadow
      />
      <CircleFormation count={7} />
    </Canvas>
  </div>
);
