import { useThree } from "@react-three/fiber";
import { FC, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface ICameraController {
  onRotate: (change: number) => void;
}

const CameraController: FC<ICameraController> = ({ onRotate }) => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

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
