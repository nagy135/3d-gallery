import React, { useLayoutEffect }from 'react'; 
 import { useGLTF } from '@react-three/drei'; 
 import * as THREE from 'three'; 
  
const Submarine = ({currentColor}: any) => { 
   const { scene } = useGLTF('./gamsha.gltf'); 
  
  
   return <primitive object={scene} /> 
 }; 
export default Submarine;
