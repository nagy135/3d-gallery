import * as THREE from "three";
import { useFrame, ThreeElements } from "@react-three/fiber";
import { useRef, useState } from "react";

const Box = (props: ThreeElements["mesh"]) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame(() => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={ref}
      castShadow={true}
      scale={clicked ? 2.5 : 2}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

export default Box;
