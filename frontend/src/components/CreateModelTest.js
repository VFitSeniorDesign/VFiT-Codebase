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
  Container,
  Paper,
} from "@mui/material";

function CreateModelTest({ chosenPreset, chosenClothSelection }) {
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
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
        Enter your attributes !
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          "& .MuiTextField-root": { m: 2 },
          "& .MuiSlider-root": { m: 2 },
          width: "100%",
          maxWidth: 360,
          mx: "auto",
        }}
      >
        <TextField
          fullWidth
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Height"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          variant="outlined"
        />

        <Typography gutterBottom>Muscularity</Typography>
        <Slider
          value={muscularity}
          onChange={handleSliderChange(setMuscularity)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />

        <Typography gutterBottom>Skinnyness</Typography>
        <Slider
          value={skinny}
          onChange={handleSliderChange(setSkinny)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />

        <Typography gutterBottom>Overweight</Typography>
        <Slider
          value={overweight}
          onChange={handleSliderChange(setOverweight)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />

        {/* Repeat for other sliders... */}

        {/* Cloth selection and preset can be textfields or dropdowns based on your data */}

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
        >
          Create!
        </Button>
      </Box>
    </Container>
  );
}

export default CreateModelTest;
