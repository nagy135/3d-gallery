import { useGLTF } from "@react-three/drei";
import { FC } from "react";

interface IModel {
  model: string;
  position: [number,number,number];
  rotation: [number,number,number];
}

const Model: FC<IModel> = ({model, rotation, position}) => {
  const { scene } = useGLTF(model);

  return (
    <mesh rotation={rotation} position={position}>
      <primitive object={scene} />
    </mesh>
  );
};
export default Model;
