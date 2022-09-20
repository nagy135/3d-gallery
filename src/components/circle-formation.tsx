import { useLoader } from "@react-three/fiber";
import { FC, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import img from "../images/test.png";
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
  const texture = useLoader(THREE.TextureLoader, img);
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
            <meshBasicMaterial attach="material" map={texture} />
          </mesh>
        );
      })}
    </>
  );
};

export default CircleFormation;
