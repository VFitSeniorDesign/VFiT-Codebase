import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import HumanoidModel from "./components/HumanoidModel";
import { Canvas } from "@react-three/fiber";
import axios from "axios";
import AuthContext from "./components/AuthContext";

function App() {
  const [modelPath, setModelPath] = useState("");
  const [files, setFiles] = useState([]);
  const { authTokens, user } = useContext(AuthContext); // Assuming `user` contains the username

  useEffect(() => {
    const fetchModelPath = async () => {
      if (!authTokens) return;
      try {
        const response = await axios.get("/api/getmodel/", {
          // Make sure to update this URL to match your API endpoint
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });

        const { files } = response.data;
        // Assuming the username is part of the user context and model filenames start with the username
        const modelFileUrl = files.find(
          (file) => file.endsWith(".glb") && file.includes(user.username)
        );

        if (modelFileUrl) {
          setModelPath(modelFileUrl); // Directly setting the full path received from the backend
          setFiles(files);
        } else {
          setModelPath("create");
          setFiles("files");
        }
      } catch (error) {
        console.error("There was an error fetching the model files", error);
        setModelPath("create");
      }
    };

    fetchModelPath();
  }, [authTokens, user.username]); // Depend on authTokens and user.username to re-run when either changes

  return (
    <div className="App">
      <div className="App-SecondaryMainContainer">
        <div className="App-MainContainer">
          <div className="App-ItemContainer">
            <div className="App-SideMenu">Upper Body Apparel</div>
            <div className="App-ModelDisplay">
              {modelPath && modelPath !== "create" ? (
                <HumanoidModel
                  username={user.username}
                  files={files}
                  modelPath={modelPath}
                />
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
