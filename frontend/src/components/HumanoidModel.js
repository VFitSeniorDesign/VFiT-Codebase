import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box } from "@mui/material";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function HumanoidModel({ username, files, modelPath }) {
  const threeJsContainerRef = useRef(null); // Create a ref for the container

  useEffect(() => {
    if (!threeJsContainerRef.current) {
      console.warn("Three.js container not found");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("white");
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();

    // Append the renderer to the DOM using the ref
    threeJsContainerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 0).normalize();
    scene.add(directionalLight);

    const gltfLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    textureLoader.encoding = THREE.sRGBEncoding;

    const loadTexture = (path) => {
      const texture = textureLoader.load(path);
      texture.flipY = false;
      texture.encoding = THREE.sRGBEncoding;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return texture;
    };

    gltfLoader.load(modelPath, (gltf) => {
      const model = gltf.scene;
      model.scale.set(3, 3, 3);
      model.position.y = -2;

      model.traverse((child) => {
        console.log(child, child.name);

        if (child.isMesh && child.name.startsWith("HG_")) {
          let material = child.material;
          if (!material.isMeshStandardMaterial) {
            material = new THREE.MeshStandardMaterial();
            child.material = material;
          }

          // Dynamically loading textures for generic named parts
          const textureTypes = {
            map: "base color",
            normalMap: "normal",
            roughnessMap: "roughness",
          };

          Object.keys(textureTypes).forEach((textureKey) => {
            const texturePostfix = textureTypes[textureKey];
            const adaptedChildName = child.name.replace(/(\d+)$/, ".$1");
            const texturePath = `http://localhost:8000/media/savedModels/${username}/${username}_${adaptedChildName}_${texturePostfix}.png`;
            material[textureKey] = loadTexture(texturePath);
          });

          material.needsUpdate = true;
        }

        // // Direct mapping for "HG_Eyes"
        // if (child.isMesh && child.name === "HG_Eyes") {
        //   let material = ensureStandardMaterial(child);
        //   material.map = loadTexture(
        //     `http://localhost:8000/media/savedModels/${username}/${username}_eyes_base color.png`
        //   );
        //   material.needsUpdate = true;
        // }

        // Direct mapping for "HG_Eyes"
        if (child.isMesh && child.name === "Mesh") {
          child.visible = false;
        }

        if (child.isMesh && child.name === "Mesh_1") {
          let material = ensureStandardMaterial(child);
          material.map = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_eyes_base color.png`
          );
          material.needsUpdate = true;
        }

        if (
          child.isMesh &&
          child.name.startsWith("Mesh00") &&
          child.name.includes("_")
        ) {
          let material = ensureStandardMaterial(child);
          // Now apply the textures to the material
          material.map = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hair2Haircards_base color.png`
          );
          material.alphaMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hair2Haircards_alpha.png`
          );
          material.normalMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hair2Haircards_normal.png`
          );
          material.transparent = true;
          material.side = THREE.DoubleSide; // Render both sides
          //   material.alphaTest = 0.5;
          material.needsUpdate = true;
        }

        if (
          child.isMesh &&
          child.name.startsWith("Mesh00") &&
          !child.name.includes("_")
        ) {
          let material = ensureStandardMaterial(child);
          // Now apply the textures to the material
          material.map = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hairHaircards_base color.png`
          );
          material.alphaMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hairHaircards_alpha.png`
          );
          material.normalMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hairHaircards_normal.png`
          );
          material.transparent = true;
          material.side = THREE.DoubleSide; // Render both sides
          //   material.alphaTest = 0.5;
          material.needsUpdate = true;
        }

        if (child.isMesh && child.name == "hair") {
          let material = ensureStandardMaterial(child);
          // Now apply the textures to the material
          material.map = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hairHaircards_base color.png`
          );
          material.alphaMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hairHaircards_alpha.png`
          );
          material.normalMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hairHaircards_normal.png`
          );
          material.transparent = true;
          material.side = THREE.DoubleSide; // Render both sides
          //   material.alphaTest = 0.5;
          material.needsUpdate = true;
        }

        if (child.isMesh && child.name == "hair_1") {
          let material = ensureStandardMaterial(child);
          // Now apply the textures to the material
          material.map = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hair2Haircards_base color.png`
          );
          material.alphaMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hair2Haircards_alpha.png`
          );
          material.normalMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hair2Haircards_normal.png`
          );
          material.transparent = true;
          material.side = THREE.DoubleSide; // Render both sides
          //   material.alphaTest = 0.5;
          material.needsUpdate = true;
        }

        if (child.isMesh && child.name === "HG_Haircap_Brows") {
          let material = ensureStandardMaterial(child);
          // Now apply the textures to the material
          material.map = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hairHG_Haircap_Brows_base color.png`
          );
          material.alphaMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hairHG_Haircap_Brows_alpha.png`
          );
          material.normalMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hairHG_Haircap_Brows_normal.png`
          );
          material.transparent = true;
          material.side = THREE.DoubleSide; // Render both sides
          //   material.alphaTest = 0.5;
          material.needsUpdate = true;
        }

        if (child.isMesh && child.name === "HG_Haircap_Beard") {
          let material = ensureStandardMaterial(child);
          // Now apply the textures to the material
          material.map = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hairHG_Haircap_Beard_base color.png`
          );
          material.alphaMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hairHG_Haircap_Beard_alpha.png`
          );
          material.normalMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_hairHG_Haircap_Beard_normal.png`
          );
          material.transparent = true;
          material.side = THREE.DoubleSide; // Render both sides
          //   material.alphaTest = 0.5;
          material.needsUpdate = true;
        }

        // Direct mapping for "HG_TeethLower"
        if (child.isMesh && child.name === "HG_TeethLower") {
          let material = ensureStandardMaterial(child);
          material.map = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_lower_teeth_base color.png`
          );
          material.normalMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_lower_teeth_normal.png`
          );
          material.roughnessMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_lower_teeth_roughness.png`
          );
          material.needsUpdate = true;
        }

        // Direct mapping for "HG_TeethUpper"
        if (child.isMesh && child.name === "HG_TeethUpper") {
          let material = ensureStandardMaterial(child);
          material.map = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_upper_teeth_base color.png`
          );
          material.normalMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_upper_teeth_normal.png`
          );
          material.roughnessMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_upper_teeth_roughness.png`
          );
          material.needsUpdate = true;
        }

        // Direct mapping for "HG_Body"
        if (child.isMesh && child.name === "HG_Body") {
          let material = ensureStandardMaterial(child);
          material.map = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_body_base color.png`
          );
          material.normalMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_body_normal.png`
          );
          material.roughnessMap = loadTexture(
            `http://localhost:8000/media/savedModels/${username}/${username}_body_roughness.png`
          );
          material.needsUpdate = true;
        }
      });

      scene.add(model);
    });

    // Utility function to ensure a child uses a MeshStandardMaterial
    function ensureStandardMaterial(child) {
      if (!child.material.isMeshStandardMaterial) {
        let material = new THREE.MeshStandardMaterial();
        child.material = material;
        return material;
      }
      return child.material;
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    };

    animate();

    return () => {
      renderer.domElement && renderer.domElement.remove();
    };
  }, []);

  // Ensure you return a div with the ref attached
  return <div id="three-js-container" ref={threeJsContainerRef} />;
}

export default HumanoidModel;
