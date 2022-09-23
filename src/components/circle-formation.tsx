import { ThreeEvent, useLoader, useThree } from "@react-three/fiber";
import { FC, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import img1 from "../images/image1.jpg";
import img2 from "../images/image2.jpg";
import img3 from "../images/image3.jpg";
import img4 from "../images/image4.jpg";
import img5 from "../images/image5.jpg";
import img6 from "../images/image6.jpg";
import CameraController from "@components/camera-controller";
import { Plane } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface ICircleFormation {
  count: number;
}

const SPREAD_DISTANCE = 3;

const CircleFormation: FC<ICircleFormation> = ({ count }) => {
  const refMap = useRef<Record<number, THREE.Mesh | null>>({});
  const cameraControllerRef = useRef<OrbitControls | null>(null);
  const rotationRef = useRef(0);

  const [clickedImage, setClickedImage] = useState<number | null>(null);
  const [positions, setPositions] = useState<
    { x: number; y: number; z: number }[]
  >([]);

  const tex = useLoader(THREE.TextureLoader, [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
  ]);
  useFrame(() => {
    cameraControllerRef.current?.update();
    if (clickedImage !== null) return;
    for (const mesh of Object.values(refMap.current)) {
      if (!mesh) continue;
      mesh.rotation.y = rotationRef.current;
    }
  });

  const imageClicked = (e: ThreeEvent<MouseEvent>, i: number) => {
    // NOTE: if other one is selected, we ignore events on invisible ones
    if (clickedImage !== null && clickedImage !== i) return;
    e.stopPropagation();
    setClickedImage((prev) => {
      let res: number | null = null;
      if (prev === null || prev !== i) res = i;
      if (res && cameraControllerRef.current)
        cameraControllerRef.current.enabled = res ? true : false;
      return res;
    });
  };

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const radians = ((2 * Math.PI) / count) * i;
      const x = Math.sin(radians);
      const z = Math.cos(radians);
      setPositions((prev) => [
        ...prev,
        { x: x * SPREAD_DISTANCE, y: 0, z: z * SPREAD_DISTANCE },
      ]);
    }
  }, [count]);
  return (
    <>
      <CameraController
        instanceRef={cameraControllerRef}
        onRotate={(x: number) => (rotationRef.current = x)}
      />
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
            visible={clickedImage === null || clickedImage === i}
            onDoubleClick={(e) => imageClicked(e, i)}
            ref={(r) => {
              refMap.current[i] = r;
            }}
            position={clickedImage === i ? [0, 0, 1] : [e.x, e.y, e.z]}
            rotation={[0, rotationRef.current, 0]}
            key={`image-${i}`}
          >
            <planeBufferGeometry attach="geometry" args={[3, 3]} />
            <meshBasicMaterial attach="material" map={tex[i]} />
          </mesh>
        );
      })}
    </>
  );
};

export default CircleFormation;
