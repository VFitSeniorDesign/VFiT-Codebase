import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardActions,
  Grid,
  CardContent,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const modelPresets = [
  "https://placehold.co/600x400",
  "https://placehold.co/600x400",
];
const clothPresets = [
  "https://placehold.co/600x400",
  "https://placehold.co/600x400",
];

function PresetSelector({ onSelectModelPreset, onSelectClothPreset }) {
  const [selectedModel, setSelectedModel] = useState(0);
  const [selectedCloth, setSelectedCloth] = useState(0);

  const handleModelSelect = (newIndex) => {
    setSelectedModel(newIndex); // This schedules the state to be updated
    onSelectModelPreset(newIndex); // Directly pass the new index
  };

  const handleClothSelect = (newIndex) => {
    setSelectedCloth(newIndex); // This schedules the state to be updated
    onSelectClothPreset(newIndex); // Directly pass the new index
  };

  const nextPreviousSelection = (array, index, setIndex, increment) => {
    setIndex(
      (prevIndex) => (prevIndex + increment + array.length) % array.length
    );
  };
  return (
    <Grid container padding={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: "1rem" }}>
          Please select your model preset
        </Typography>
        <Card sx={{ maxWidth: 345, border: "1px solid #ccc", mb: 2 }}>
          <CardMedia
            component="img"
            height="194" // Adjusting image height
            image={modelPresets[selectedModel]}
            alt={`Model Preset ${selectedModel}`}
          />
          <CardContent />
          <CardActions>
            <IconButton
              onClick={() =>
                handleModelSelect(
                  (selectedModel - 1 + modelPresets.length) %
                    modelPresets.length
                )
              }
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                handleModelSelect((selectedModel + 1) % modelPresets.length)
              }
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: "1rem" }}>
          Please select your cloth selection
        </Typography>
        <Card sx={{ maxWidth: 345, border: "1px solid #ccc", mb: 2 }}>
          <CardMedia
            component="img"
            height="194" // Adjusting image height
            image={clothPresets[selectedCloth]}
            alt={`Cloth Preset ${selectedCloth}`}
          />
          <CardContent />
          <CardActions>
            <IconButton
              onClick={() =>
                handleClothSelect(
                  (selectedCloth - 1 + clothPresets.length) %
                    clothPresets.length
                )
              }
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                handleClothSelect((selectedCloth + 1) % clothPresets.length)
              }
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PresetSelector;
