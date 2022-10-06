import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { FC, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { AnimationMixer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

interface IModel {
  model: string;
  visible: boolean;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

const Model: FC<IModel> = ({
  model: modelSrc,
  rotation,
  position,
  visible,
  scale,
}) => {
  const model = useLoader(GLTFLoader, modelSrc);

  let mixer: AnimationMixer;
  if (model.animations.length) {
    mixer = new THREE.AnimationMixer(model.scene);
    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  useFrame((_, delta) => {
    mixer?.update(delta);
  });
  useEffect(() => useGLTF.preload(modelSrc), []);

  return (
    <mesh visible={visible} rotation={rotation} position={position} scale={scale}>
      <primitive object={model.scene} />
    </mesh>
  );
};

export default Model;
