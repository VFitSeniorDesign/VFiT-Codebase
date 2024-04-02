import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Slider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

function Form() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [muscularity, setMuscularity] = useState(5);
  const [skinny, setSkinny] = useState(5);
  const [overweight, setOverweight] = useState(5);
  const [skinColor, setSkinColor] = useState("");
  const [clothingSelection, setClothingSelection] = useState("");

  const sliderStyle = {
    color: "green", // Use your desired color here
  };

  const buttonStyle = {
    backgroundColor: "green", // Use your desired color here
    "&:hover": {
      backgroundColor: "darkgreen", // Darken the color slightly on hover
    },
  };

  const handleSliderChange = (event, newValue, name) => {
    if (name === "muscularity") {
      setMuscularity(newValue);
    } else if (name === "skinny") {
      setSkinny(newValue);
    } else if (name === "overweight") {
      setOverweight(newValue);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({
      age,
      height,
      muscularity,
      skinny,
      overweight,
      skinColor,
      clothingSelection,
    });
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Choose your model's attributes
      </Typography>
      <TextField
        label="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        variant="filled"
      />
      <TextField
        label="Height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        variant="filled"
      />
      <Typography gutterBottom>Muscularity (1-10): {muscularity}</Typography>
      <Slider
        value={muscularity}
        onChange={(e, newValue) =>
          handleSliderChange(e, newValue, "muscularity")
        }
        step={1}
        marks
        min={1}
        max={10}
        valueLabelDisplay="auto"
      />
      <Typography gutterBottom>Skinny (1-10): {skinny}</Typography>
      <Slider
        value={skinny}
        onChange={(e, newValue) => handleSliderChange(e, newValue, "skinny")}
        step={1}
        marks
        min={1}
        max={10}
        valueLabelDisplay="auto"
      />
      <Typography gutterBottom>Overweight (1-10): {overweight}</Typography>
      <Slider
        value={overweight}
        onChange={(e, newValue) =>
          handleSliderChange(e, newValue, "overweight")
        }
        step={1}
        marks
        min={1}
        max={10}
        valueLabelDisplay="auto"
      />

      <Button sx={buttonStyle} variant="contained" onClick={handleSubmit}>
        Create Model
      </Button>
    </Box>
  );
}

export default Form;
