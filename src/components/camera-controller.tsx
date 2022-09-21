import { useThree } from "@react-three/fiber";
import { FC, MutableRefObject, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface ICameraController {
  onRotate: (change: number) => void;
  instanceRef: MutableRefObject<OrbitControls | null>;
}

const CameraController: FC<ICameraController> = ({ onRotate, instanceRef }) => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    instanceRef.current = controls;

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.minDistance = 3;
    controls.maxDistance = 20;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
    controls.addEventListener("change", () =>
      onRotate(controls.getAzimuthalAngle())
    );

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export default CameraController;
