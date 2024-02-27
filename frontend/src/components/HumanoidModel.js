// HumanoidModel.js
import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useFrame } from '@react-three/fiber';

function HumanoidModel({ modelPath }) {
  const model = useLoader(OBJLoader, modelPath);
  model.position.set(0,-2,0)
  const modelRef = useRef();

  // Optional: Add rotation
  useFrame(() => {
    modelRef.current.rotation.y += 0.01;
  });

  return <primitive object={model} scale={[0.02, 0.02, 0.02]} ref={modelRef} />;
}

export default HumanoidModel;
