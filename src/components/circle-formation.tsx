import { useLoader } from "@react-three/fiber";
import { FC } from "react";
import * as THREE from "three";
import img from '../images/test.png';


interface ICircleFormation {
  count: number;
}

const SPREAD_DISTANCE = 3;

const CircleFormation: FC<ICircleFormation> = ({ count }) => {
  const positions: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const radians = ((2 * Math.PI) / count) * i;
    const x = Math.sin(radians);
    const z = Math.cos(radians);
    positions.push([x * SPREAD_DISTANCE, 0, z * SPREAD_DISTANCE]);
  }
    const texture = useLoader(THREE.TextureLoader, img)
  return (
    <>
      {positions.map((e, i) => {
        return (
          <mesh 
            position={e}
            key={`image-${i}`}>
            <planeBufferGeometry attach="geometry" args={[3, 3]} />
            <meshBasicMaterial attach="material" map={texture} />
          </mesh>
        );
      })}
    </>
  );
};

export default CircleFormation;
