import { useGLTF } from "@react-three/drei";

const Model = ({model} : {model: string}) => {
  const { scene } = useGLTF(model);

  return (
    <mesh rotation={[0, 90,0]} position={[0, 2, 0]}>
      <primitive object={scene} />
    </mesh>
  );
};
export default Model;
