import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import CameraController from "@components/camera-controller";
import { CSSProperties } from "react";
import CircleFormation from "@components/circle-formation";

const style: CSSProperties = {
  width: "50vw",
  height: "50vh",
  margin: "50% 0 0 50%",
  transform: "translate(-50%, -50%)",
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <div style={style}>
    <Canvas>
      <CameraController />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <CircleFormation count={3} />
    </Canvas>
  </div>
);
