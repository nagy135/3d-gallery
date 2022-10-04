import { ThreeEvent, useLoader, useThree } from "@react-three/fiber";
import { FC, Suspense, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CameraController from "@components/camera-controller";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { mapRange } from "../utils";
import Model from "./model";

interface ICircleFormation {
  count: number;
  content: {
    image: string;
    model: any;
    rotation?: [number, number, number];
  }[];
}

const VIEWPORT_SCALING = { min: 0.2, max: 2.0 };
const SPREAD = 4;
const IMAGE_WIDTH = 3;

const CircleFormation: FC<ICircleFormation> = ({ count, content }) => {
  const refMap = useRef<Record<number, THREE.Mesh | null>>({});
  const cameraControllerRef = useRef<OrbitControls | null>(null);
  const rotationRef = useRef(0);
  const { viewport, camera } = useThree();
  const [clicked, setClicked] = useState<boolean[]>(
    new Array(count).fill(false)
  );

  const [positions, setPositions] = useState<
    { x: number; y: number; z: number }[]
  >([]);

  const tex = useLoader(
    THREE.TextureLoader,
    content.map((e) => e.image)
  );
  useFrame(() => {
    cameraControllerRef.current?.update();
    for (const mesh of Object.values(refMap.current)) {
      if (!mesh) continue;
      mesh.rotation.y = rotationRef.current;
    }
  });

  const imageClicked = (e: ThreeEvent<MouseEvent>, i: number) => {
    if (!cameraControllerRef.current) return;
    e.stopPropagation();
    setClicked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
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
  console.log("================\n", "clicked: ", clicked, "\n================");

  return (
    <>
      <CameraController
        instanceRef={cameraControllerRef}
        onRotate={(x: number) => {
          rotationRef.current = x;
        }}
      />
      {positions.map((e, i) => {
        const texture = tex[i];
        if (!texture || !texture.image) return null;
        const ratio = texture.image.width / texture.image.height;

        return (
          <>
            {content[i].model !== null ? (
              <Suspense fallback={null}>
                <Model
                  key={`model-${i}`}
                  visible={clicked[i]}
                  model={content[i].model}
                  rotation={content[i].rotation ?? [0, 0, 0]}
                  position={[e.x, e.y, e.z]}
                />
              </Suspense>
            ) : null}
            <mesh
              visible={content[i] === null || !clicked[i]}
              onPointerUp={(e) => imageClicked(e, i)}
              ref={(r) => {
                refMap.current[i] = r;
              }}
              position={[e.x, e.y, e.z]}
              rotation={[0, rotationRef.current, 0]}
              key={`image-${i}`}
            >
              <planeBufferGeometry
                attach="geometry"
                args={[IMAGE_WIDTH, IMAGE_WIDTH / ratio]}
              />
              <meshBasicMaterial attach="material" map={texture} />
            </mesh>
          </>
        );
      })}
    </>
  );
};

export default CircleFormation;
