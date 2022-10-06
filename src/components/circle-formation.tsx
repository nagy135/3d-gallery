import { ThreeEvent, useLoader, useThree } from "@react-three/fiber";
import { FC, Suspense, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CameraController from "@components/camera-controller";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { mapRange } from "../utils";
import Model from "./model";

interface ICircleFormation {
  content: {
    lift?: number;
    image: string;
    model: any;
    rotation?: [number, number, number];
    scale?: [number, number, number];
  }[];
}

const VIEWPORT_SCALING = { min: 0.2, max: 2.0 };
const SPREAD = 4;
const SPREAD_FLASHLIGHT = SPREAD + 2;
const IMAGE_WIDTH = 3;

const CircleFormation: FC<ICircleFormation> = ({ content }) => {
  const refMap = useRef<Record<number, THREE.Mesh | null>>({});
  const cameraControllerRef = useRef<OrbitControls | null>(null);
  const rotationRef = useRef(0);
  const useEventRef = useRef(false);
  const flashlightRef = useRef<THREE.PointLight>(null);

  const { viewport, camera } = useThree();
  const [clicked, setClicked] = useState<boolean[]>(
    new Array(content.length).fill(false)
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

    if (flashlightRef.current) {
      const multiplier = SPREAD_FLASHLIGHT;
      const radians = 2 * Math.PI + 0.5 + rotationRef.current;
      const x = Math.sin(radians);
      const z = Math.cos(radians);
      flashlightRef.current.rotation.x = x * multiplier;
      flashlightRef.current.rotation.y = 1;
      flashlightRef.current.rotation.z = z * multiplier;
    }
  });

  const imageClicked = (i: number) => {
    if (!cameraControllerRef.current) return;
    if (content[i].model === null) return;
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

    for (let i = 0; i < content.length; i++) {
      const multiplier = SPREAD;
      const radians = ((2 * Math.PI) / content.length) * i;
      const x = Math.sin(radians);
      const z = Math.cos(radians);
      setPositions((prev) => [
        ...prev,
        { x: x * multiplier, y: 0, z: z * multiplier },
      ]);
    }
  }, [content, viewport, camera]);

  const handlePointer = (
    e: ThreeEvent<MouseEvent> | null,
    event: "up" | "down" | "drag",
    i?: number
  ) => {
    if (e) e.stopPropagation();
    if (event === "down") {
      useEventRef.current = true;
    } else if (event === "drag") {
      useEventRef.current = false;
    } else if (event === "up") {
      if (useEventRef.current) if (i !== undefined) imageClicked(i);
      useEventRef.current = false;
    }
  };

  return (
    <>
      <Suspense fallback={null}>
        <CameraController
          instanceRef={cameraControllerRef}
          onRotate={(x: number) => {
            rotationRef.current = x;
          }}
        />
        <pointLight ref={flashlightRef} intensity={0.5} position={[0, 0, 0]} />
        {positions.map((e, i) => {
          const texture = tex[i];
          if (!texture || !texture.image) return null;
          const ratio = texture.image.width / texture.image.height;

          return (
            <>
              {content[i].model !== null ? (
                <Model
                  key={`model-${i}`}
                  visible={clicked[i]}
                  model={content[i].model}
                  rotation={content[i].rotation ?? [0, 0, 0]}
                  scale={content[i].scale ?? [1, 1, 1]}
                  position={[e.x, e.y + (content[i].lift ?? 0), e.z]}
                />
              ) : null}
              <mesh
                visible={content[i] === null || !clicked[i]}
                onPointerDown={(e) => handlePointer(e, "down")}
                onPointerUp={(e) => handlePointer(e, "up", i)}
                onPointerMove={() => handlePointer(null, "drag")}
                ref={(r) => {
                  refMap.current[i] = r;
                }}
                position={[e.x, e.y, e.z]}
                rotation={[0, rotationRef.current, 0]}
                key={`image-${i}`}
              >
                <planeBufferGeometry
                  key={`image-plane-${i}`}
                  attach="geometry"
                  args={[IMAGE_WIDTH, IMAGE_WIDTH / ratio]}
                />
                <meshBasicMaterial
                  key={`image-mesh-${i}`}
                  attach="material"
                  map={texture}
                />
              </mesh>
            </>
          );
        })}
      </Suspense>
    </>
  );
};

export default CircleFormation;
