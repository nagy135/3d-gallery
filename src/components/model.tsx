import { useGLTF } from "@react-three/drei";
import { FC, useEffect } from "react";

interface IModel {
  model: string;
  visible: boolean;
  position: [number, number, number];
  rotation: [number, number, number];
}

const Model: FC<IModel> = ({ model, rotation, position, visible }) => {
  const { scene } = useGLTF(model);
  useEffect(() => useGLTF.preload(model), []);

  return (
    <mesh visible={visible} rotation={rotation} position={position}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Model;
