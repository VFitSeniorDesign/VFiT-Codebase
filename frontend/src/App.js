import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import HumanoidModel from "./components/HumanoidModel";
import { Canvas } from "@react-three/fiber"; // Import Canvas
import axios from "axios"; // Ensure axios is installed for making HTTP requests
import AuthContext from "./components/AuthContext";

function App() {
  const [modelPath, setModelPath] = useState("");
  const { authTokens } = useContext(AuthContext); // Use AuthContext

  useEffect(() => {
    const fetchModelPath = async () => {
      if (!authTokens) return; // If there are no auth tokens, return early
      try {
        const response = await fetch('/api/getmodel/', {
          method: 'GET', // Specifies the request method
          headers: {
            'Content-Type': 'application/json', // Indicates the content type of the request
            'Authorization': `Bearer ${authTokens.access}`, // Use auth token for authorization
          },
        });
  
        const data = await response.json(); // Parses the JSON response
  
        if (data.model_path) {
          const fullPath = `http://127.0.0.1:8000/media/${data.model_path}`;
          setModelPath(fullPath);
        } else {
          setModelPath("create");
        }
      } catch (error) {
        console.error("There was an error fetching the model path", error);
        setModelPath("create");
      }
    };
  
    fetchModelPath();
  }, [authTokens]); // Depend on authTokens to re-run when tokens change

  return (
    <div className="App">
      <div className="App-SecondaryMainContainer">
        <div className="App-MainContainer">
          <div className="App-ItemContainer">
            <div className="App-SideMenu">Upper Body Apparel</div>
            <div className="App-ModelDisplay">
              {modelPath && modelPath !== "create" ? (
                <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[0, 10, 5]} intensity={1} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <pointLight position={[-10, -10, -10]} />
                  <HumanoidModel modelPath={modelPath} />
                </Canvas>
              ) : (
                <p>Create a model.</p>
              )}
            </div>
            <div className="App-SideMenu">Lower Body Apparel</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
