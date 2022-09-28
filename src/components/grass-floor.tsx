import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { FC } from "react";
import { Plane } from "@react-three/drei";
import grass from "../images/grass.jpg";

interface IGrassFloor {
  dimensions: number;
  size: number;
}
const GrassFloor: FC<IGrassFloor> = ({ dimensions, size }) => {
  const grassTex = useLoader(THREE.TextureLoader, grass);
  let startPos = -(size * Math.floor(dimensions / 2));
  if (!(dimensions % 2)) startPos += size / 2;
  return (
    <>
      {[...Array(dimensions)].map((_, i) =>
        [...Array(dimensions)].map((_, j) => (
          <Plane
            rotation={[-Math.PI / 2, 0, 0]}
            position={[startPos + i * size, -1, startPos + j * size]}
            args={[size, size]}
          >
            <meshStandardMaterial attach="material" map={grassTex} />
          </Plane>
        ))
      )}
    </>
  );
};

export default GrassFloor;
