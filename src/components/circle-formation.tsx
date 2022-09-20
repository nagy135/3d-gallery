import { useLoader } from "@react-three/fiber";
import { FC, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import img1 from "../images/image1.jpg";
import img2 from "../images/image2.jpg";
import img3 from "../images/image3.jpg";
import img4 from "../images/image4.jpg";
import img5 from "../images/image5.jpg";
import img6 from "../images/image6.jpg";
import CameraController from "@components/camera-controller";
import { Plane } from "@react-three/drei";

interface ICircleFormation {
  count: number;
}

const SPREAD_DISTANCE = 3;

const CircleFormation: FC<ICircleFormation> = ({ count }) => {
  const refMap = useRef<Record<number, THREE.Mesh | null>>({});
  useFrame(() => {
    for (const mesh of Object.values(refMap.current)) {
      if (!mesh) continue;
      mesh.rotation.y = rotationRef.current;
    }
  });

  const rotationRef = useRef(0);
  const positions: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const radians = ((2 * Math.PI) / count) * i;
    const x = Math.sin(radians);
    const z = Math.cos(radians);
    positions.push([x * SPREAD_DISTANCE, 0, z * SPREAD_DISTANCE]);
  }
  const tex = useLoader(THREE.TextureLoader, [img1, img2, img3, img4, img5, img6]);
  return (
    <>
      <CameraController onRotate={(x: number) => (rotationRef.current = x)} />
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        args={[1000, 1000]}
      >
        <meshStandardMaterial attach="material" color="black" />
      </Plane>
      {positions.map((e, i) => {
        return (
          <mesh
            ref={(r) => {
              refMap.current[i] = r;
            }}
            position={e}
            rotation={[0, rotationRef.current, 0]}
            key={`image-${i}`}
          >
            <planeBufferGeometry attach="geometry" args={[3, 3]} />
            <meshBasicMaterial attach="material" map={tex[i]} />
          </mesh>
        );
      })}
    </>
  );
};

export default CircleFormation;
