import { Grid, Paper } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import HumanoidModel from "./components/HumanoidModel";
import { Canvas } from "@react-three/fiber";
import axios from "axios";
import AuthContext from "./components/AuthContext";
import CreateModelTest from "./components/CreateModelTest";
import PresetSelector from "./components/PresetSelector";
function Apptest() {
  const [modelPath, setModelPath] = useState("");
  const [files, setFiles] = useState([]);
  const { authTokens, user } = useContext(AuthContext); // Assuming `user` contains the username

  const [modelPreset, setModelPreset] = useState(null);
  const [clothPreset, setClothPreset] = useState(null);

  const handleModelPresetSelect = (preset) => {
    setModelPreset(preset);
    console.log("Selected modelPreset index", modelPreset);
    // This will correctly log the newly selected preset index.
    // Additional logic for when a model preset is selected goes here.
  };

  const handleClothPresetSelect = (preset) => {
    setClothPreset(preset);
    console.log("Selected clothPreset index", clothPreset);
    // This will correctly log the newly selected preset index.
    // Additional logic for when a cloth preset is selected goes here.
  };

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
    <div style={{ flexGrow: 1, height: "100vh", paddingTop: "100px" }}>
      {" "}
      {/* Ensure full height */}
      <Grid container spacing={2} style={{ height: "100%" }}>
        <Grid item xs={4} style={{ height: "100%" }}>
          {" "}
          {/* Change to xs={4} for 1/3 width */}
          <Paper
            style={{
              height: "100%",
              padding: "20px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <PresetSelector
              onSelectModelPreset={handleModelPresetSelect}
              onSelectClothPreset={handleClothPresetSelect}
            />
          </Paper>
        </Grid>
        <Grid item xs={4} style={{ height: "100%" }}>
          {" "}
          {/* Repeat for each section */}
          <Paper
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {modelPath && files.length > 0 ? (
              <HumanoidModel
                username={user.username}
                files={files}
                modelPath={modelPath}
              />
            ) : (
              <div>Loading model...</div> // Provide a loading state or similar feedback
            )}
          </Paper>
        </Grid>
        <Grid item xs={4} style={{ height: "100%" }}>
          <Paper
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CreateModelTest
              chosenPreset={modelPreset}
              chosenClothSelection={clothPreset}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Apptest;
