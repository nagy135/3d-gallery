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
import img7 from "../images/image7.jpg";
import img8 from "../images/image8.jpg";
import CameraController from "@components/camera-controller";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { mapRange } from "../utils";
import GrassFloor from "./grass-floor";

interface ICircleFormation {
  count: number;
}

const VIEWPORT_SCALING = { min: 0.2, max: 2.0 };
const SPREAD = 4;
const IMAGE_WIDTH = 3;

const CircleFormation: FC<ICircleFormation> = ({ count }) => {
  const refMap = useRef<Record<number, THREE.Mesh | null>>({});
  const cameraControllerRef = useRef<OrbitControls | null>(null);
  const rotationRef = useRef(0);
  const canClickRef = useRef(true);
  const { viewport, camera } = useThree();

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
    img7,
    img8,
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
    if (!cameraControllerRef.current) return;
    if (clickedImage !== null) {
      if (clickedImage !== i) return;
      cameraControllerRef.current.enabled = true;
    } else cameraControllerRef.current.enabled = false;
    e.stopPropagation();
    setClickedImage((prev) => {
      let res: number | null = null;
      if (prev === null || prev !== i) res = i;
      return res;
    });
  };

  useEffect(() => {
    if (!viewport) return;
    const newVal = Math.min(
      mapRange(
        viewport.width,
        8,
        21.3,
        VIEWPORT_SCALING.min,
        VIEWPORT_SCALING.max
      ),
      0.8
    );
    camera.zoom = newVal;
    camera.updateProjectionMatrix();

    for (let i = 0; i < count; i++) {
      const multiplier = SPREAD;
      const radians = ((2 * Math.PI) / count) * i;
      const x = Math.sin(radians);
      const z = Math.cos(radians);
      setPositions((prev) => [
        ...prev,
        { x: x * multiplier, y: 0, z: z * multiplier },
      ]);
    }
  }, [count, viewport, camera]);

  return (
    <>
      <CameraController
        instanceRef={cameraControllerRef}
        onRotate={(x: number) => {
          rotationRef.current = x;
          canClickRef.current = false;
        }}
      />
      <GrassFloor dimensions={11} size={3}/>
      {positions.map((e, i) => {
        const texture = tex[i];
        if (!texture || !texture.image) return null;
        const ratio = texture.image.width / texture.image.height;

        return (
          <mesh
            visible={clickedImage === null || clickedImage === i}
            onPointerDown={() => (canClickRef.current = true)}
            onPointerUp={(e) => canClickRef.current && imageClicked(e, i)}
            ref={(r) => {
              refMap.current[i] = r;
            }}
            position={
              clickedImage === i
                ? [
                    Math.sin(rotationRef.current) * SPREAD,
                    0,
                    Math.cos(rotationRef.current) * SPREAD,
                  ]
                : [e.x, e.y, e.z]
            }
            rotation={[0, rotationRef.current, 0]}
            key={`image-${i}`}
          >
            <planeBufferGeometry
              attach="geometry"
              args={[IMAGE_WIDTH, IMAGE_WIDTH / ratio]}
            />
            <meshBasicMaterial attach="material" map={texture} />
          </mesh>
        );
      })}
    </>
  );
};

export default CircleFormation;
