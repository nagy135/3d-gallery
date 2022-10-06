import { createRoot } from "react-dom/client";
import { Canvas, Vector3 } from "@react-three/fiber";
import { CSSProperties } from "react";
import CircleFormation from "@components/circle-formation";
import "index.css";
import { Cloud, Sky, Stars } from "@react-three/drei";
import GrassFloor from "@components/grass-floor";

import suitcase from "./images/suitcase.jpg";
import benchy from "./images/benchy.jpg";
import cartCoins from "./images/cart_coins.jpg";
import planetaryGearset from "./images/planetary_gearset.jpg";
import nautilusGears from "./images/nautilus_gears.jpg";
import rastaBottle from "./images/rasta_bottle.jpg";
import rotaryToys from "./images/rotary_toys.jpg";
import doubleScrew from "./images/double_screw.jpg";
import gengarBottle from "./images/gengar_bottle.jpg";

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
        intensity={1}
        position={sunPosition}
        // castShadow
      />
      <directionalLight
        intensity={0.5}
        position={[-1, 1, -3]}
      />
      <directionalLight
        intensity={0.5}
        position={[3, 1, -3]}
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
            image: nautilusGears,
            model: "nautilus_gears.gltf",
            lift: -0.5,
            rotation: [0, 0, 2.5*Math.PI/36],
          },
          {
            image: planetaryGearset,
            model: "planetary_gearset_moving.gltf",
            lift: -1,
            scale: [0.8, 0.8, 0.8],
            rotation: [0,  Math.PI  , 0],
          },
          {
            image: benchy,
            model: "benchy.gltf",
            scale: [0.12, 0.12, 0.12],
            lift: -1,
            rotation: [0, Math.PI / 2, 0],
          },
          {
            image: suitcase,
            model: "gamsha.gltf",
            lift: 1,
            rotation: [0, Math.PI / 2, 0],
          },
          {
            image: cartCoins,
            model: "v_cart_coin_v2.gltf",
            lift: -1,
          },
          {
            image: rotaryToys,
            model: null,
          },
          {
            image: doubleScrew,
            model: "double_screw.gltf",
            scale: [0.03, 0.03, 0.03],
            lift: -1,
          },
          {
            image: rastaBottle,
            model: "tikki_bottle.gltf",
            lift: -1,
            rotation: [0, -(Math.PI / 8), 0],
          },
          {
            image: gengarBottle,
            model: null,
          },
        ]}
      />
    </Canvas>
  </div>
);
