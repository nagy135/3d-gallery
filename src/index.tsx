import { createRoot } from "react-dom/client";
import { Canvas, Vector3 } from "@react-three/fiber";
import { CSSProperties } from "react";
import CircleFormation from "@components/circle-formation";
import "index.css";
import { Cloud, Sky, Stars } from "@react-three/drei";
import GrassFloor from "@components/grass-floor";

import img1 from "./images/image1.jpg";
import img2 from "./images/image2.jpg";
import img3 from "./images/image3.jpg";
import img4 from "./images/image4.jpg";
import img5 from "./images/image5.jpg";
import img6 from "./images/image6.jpg";
import img7 from "./images/image7.jpg";
import img8 from "./images/image8.jpg";

const style: CSSProperties = {
  width: "100vw",
  height: "100vh",
};

const sunPosition: Vector3 = [0, 5, 12];

createRoot(document.getElementById("root") as HTMLElement).render(
  <div style={style}>
    <Canvas shadows={false}>
      <Sky
        distance={450000}
        sunPosition={sunPosition}
        inclination={0}
        azimuth={0.25}
      />
      <Cloud
        opacity={0.5}
        speed={0.1} // Rotation speed
        width={3} // Width of the full cloud
        depth={2.5} // Z-dir depth
        segments={20} // Number of particles
        position={[5, 8, 3]}
      />
      <directionalLight
        intensity={0.5}
        position={sunPosition}
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
      <GrassFloor dimensions={3} size={15} />
      <CircleFormation
        content={[
          {
            image: img1,
            model: "gamsha.gltf",
            lift: 1,
            rotation: [0, Math.PI / 2, 0],
          },
          {
            image: img2,
            model: "v_cart_coin.gltf",
            lift: 2,
            rotation: [Math.PI / 2, 0, 0],
          },
          {
            image: img3,
            model: "planetary_gearset_moving.gltf",
            lift: -1,
            rotation: [0, 1.5 * Math.PI  , 0],
          },
          {
            image: img4,
            model: null,
          },
          {
            image: img5,
            model: null,
          },
          {
            image: img6,
            model: null,
          },
          {
            image: img7,
            model: null,
          },
          {
            image: img8,
            model: null,
          },
        ]}
      />
    </Canvas>
  </div>
);
