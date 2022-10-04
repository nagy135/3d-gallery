import { useGLTF } from "@react-three/drei";
import { FC } from "react";

interface IModel {
  model: string;
  visible: boolean;
  position: [number,number,number];
  rotation: [number,number,number];
}

const Model: FC<IModel> = ({model, rotation, position, visible}) => {
  console.log({model, rotation, position, visible});
  const { scene } = useGLTF(model);

  return (
    <mesh visible={visible} rotation={rotation} position={position}>
      <primitive object={scene} />
    </mesh>
  );
};
export default Model;
