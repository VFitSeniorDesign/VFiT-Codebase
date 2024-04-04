import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import {
  Box,
  TextField,
  Slider,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function CreateModelTest() {
  let { authTokens } = useContext(AuthContext);
  console.log("authToken: ", authTokens);
  const skinTones = ["#F1C27D", "#FFDBAC", "#E0AC69", "#C68642", "#8D5524"];
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [muscularity, setMuscularity] = useState(5);
  const [skinny, setSkinny] = useState(5);
  const [overweight, setOverweight] = useState(5);
  const [skinColor, setSkinColor] = useState("");
  const [clothSelection, setClothSelection] = useState("");
  const [preset, setPreset] = useState("");
  const navigate = useNavigate();

  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!age || !height) {
      alert("Please fill in all fields.");
      return;
    }
    const modelData = {
      age,
      height,
      muscularity,
      skinny,
      overweight,
      skinColor,
      clothSelection,
      preset,
    };
    try {
      const response = await fetch("/api/createmodel/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify(modelData),
      });
      const responseData = await response.json();
      console.log(responseData);
      navigate("/");
    } catch (error) {
      console.error("Failed to create model:", error);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" }, padding: 3 }}
    >
      <Typography variant="h5" gutterBottom>
        Welcome! Come Create Your Own 3D Model!
      </Typography>
      <TextField
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        variant="outlined"
      />
      <TextField
        label="Height"
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        variant="outlined"
      />

      {/* For sliders */}
      <Typography id="muscularity-slider" gutterBottom>
        Muscularity
      </Typography>
      <Slider
        aria-labelledby="muscularity-slider"
        value={muscularity}
        onChange={handleSliderChange(setMuscularity)}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
      />
      <Slider
        aria-labelledby="skinnyness-slider"
        value={skinny}
        onChange={handleSliderChange(setSkinny)}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
      />
      <Slider
        aria-labelledby="overweight-slider"
        value={overweight}
        onChange={handleSliderChange(setOverweight)}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
      />
      {/* Repeat for other sliders... */}

      <TextField
        label="Cloth Selection"
        value={clothSelection}
        onChange={(e) => setClothSelection(e.target.value)}
        variant="outlined"
      />
      <TextField
        label="Preset"
        value={preset}
        onChange={(e) => setPreset(e.target.value)}
        variant="outlined"
      />

      <Button type="submit" variant="contained" color="primary">
        Create!
      </Button>
    </Box>
  );
}

export default CreateModelTest;
