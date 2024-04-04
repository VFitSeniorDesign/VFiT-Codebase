import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardActions,
  Grid,
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
    setSelectedModel(newIndex);
    onSelectModelPreset(modelPresets[newIndex]);
  };

  const handleClothSelect = (newIndex) => {
    setSelectedCloth(newIndex);
    onSelectClothPreset(clothPresets[newIndex]);
  };

  // Adjust these functions for selecting next and previous images
  const nextPreviousSelection = (array, index, setIndex, increment) => {
    setIndex(
      (prevIndex) => (prevIndex + increment + array.length) % array.length
    );
  };

  return (
    <Grid container padding={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Please select your model preset
        </Typography>
        <Card>
          <CardMedia
            component="img"
            image={modelPresets[selectedModel]} // Assuming modelPresets contains URLs
            alt={`Model Preset ${selectedModel}`}
          />
          <CardActions>
            <IconButton
              onClick={() =>
                nextPreviousSelection(
                  modelPresets,
                  selectedModel,
                  setSelectedModel,
                  -1
                )
              }
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                nextPreviousSelection(
                  modelPresets,
                  selectedModel,
                  setSelectedModel,
                  1
                )
              }
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Please select your cloth selection
        </Typography>
        <Card>
          <CardMedia
            component="img"
            image={clothPresets[selectedCloth]} // Assuming modelPresets contains URLs
            alt={`Model Preset ${selectedCloth}`}
          />
          <CardActions>
            <IconButton
              onClick={() =>
                nextPreviousSelection(
                  clothPresets,
                  selectedCloth,
                  setSelectedCloth,
                  -1
                )
              }
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                nextPreviousSelection(
                  clothPresets,
                  selectedCloth,
                  setSelectedCloth,
                  1
                )
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
