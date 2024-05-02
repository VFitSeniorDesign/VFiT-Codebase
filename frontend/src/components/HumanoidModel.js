import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame } from "@react-three/fiber";

function HumanoidModel({ modelPath }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const model = gltf.scene;
  model.position.set(0, -2, 0);
  const modelRef = useRef();

  // Optional: Add rotation
  useFrame(() => {
    modelRef.current.rotation.y += 0.01;
  });

  return <primitive object={model} ref={modelRef} />;
}

export default HumanoidModel;
