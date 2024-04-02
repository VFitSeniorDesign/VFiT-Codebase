import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box } from "@mui/material";

function Model({ modelPath, scale }) {
  const modelRef = useRef();
  const gltf = useGLTF(modelPath);

  // Update the model on each frame to rotate it
  useFrame((state, delta) => {
    modelRef.current.rotation.y += delta * 0.5; // Controls the speed of rotation
  });

  return <primitive ref={modelRef} object={gltf.scene} scale={scale} />;
}

function ModelViewer({ modelPath }) {
  // Adjust the scale here, for example, to twice the size
  const scale = 2;

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      {" "}
      {/* Adjust the size as needed */}
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model modelPath={modelPath} scale={scale} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </Box>
  );
}

export default ModelViewer;
