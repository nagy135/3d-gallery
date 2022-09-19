import { useLoader } from "@react-three/fiber";
import { FC, useCallback, useState } from "react";
import * as THREE from "three";
import img from "../images/test.png";
import CameraController from "@components/camera-controller";
import { FrontSide } from "three";

interface ICircleFormation {
  count: number;
}

const SPREAD_DISTANCE = 3;

const CircleFormation: FC<ICircleFormation> = ({ count }) => {
  const [rotation, setRotation] = useState(0);
  const positions: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const radians = ((2 * Math.PI) / count) * i;
    const x = Math.sin(radians);
    const z = Math.cos(radians);
    positions.push([x * SPREAD_DISTANCE, 0, z * SPREAD_DISTANCE]);
  }
  const texture = useLoader(THREE.TextureLoader, img);
  return (
    <>
      <CameraController onRotate={setRotation} />
      <mesh position={[0,-2,0]} rotation={[Math.PI/2+Math.PI,0,0]} key={'ground'}>
        <planeBufferGeometry attach="geometry" args={[10, 10]} />
        <meshBasicMaterial attach="material" shadowSide={FrontSide} />
      </mesh>
      {positions.map((e, i) => {
        return (
          <mesh position={e} rotation={[0, rotation, 0]} key={`image-${i}`}>
            <planeBufferGeometry attach="geometry" args={[3, 3]} />
            <meshBasicMaterial attach="material" map={texture} />
          </mesh>
        );
      })}
    </>
  );
};

export default CircleFormation;
