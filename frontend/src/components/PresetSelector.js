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
  `${process.env.PUBLIC_URL}/Presets/0_Luke.jpg`,
  `${process.env.PUBLIC_URL}/Presets/1_Enzo.jpg`,
  `${process.env.PUBLIC_URL}/Presets/2_John.jpg`,
  `${process.env.PUBLIC_URL}/Presets/3_Asian2.jpg`,
  `${process.env.PUBLIC_URL}/Presets/4_Asian3.jpg`,
  `${process.env.PUBLIC_URL}/Presets/5_Asian4.jpg`,
  `${process.env.PUBLIC_URL}/Presets/6_Asian5.jpg`,
  `${process.env.PUBLIC_URL}/Presets/7_Asian6.jpg`,
  `${process.env.PUBLIC_URL}/Presets/8_Asian7.jpg`,
  `${process.env.PUBLIC_URL}/Presets/9_Asian1.jpg`,
  `${process.env.PUBLIC_URL}/Presets/10_David.jpg`,
  `${process.env.PUBLIC_URL}/Presets/11_Jude.jpg`,
  `${process.env.PUBLIC_URL}/Presets/12_Theo.jpg`,
  `${process.env.PUBLIC_URL}/Presets/13_Nico.jpg`,
  `${process.env.PUBLIC_URL}/Presets/14_Julius.jpg`,
  `${process.env.PUBLIC_URL}/Presets/15_Jack.jpg`,
  `${process.env.PUBLIC_URL}/Presets/16_Otto.jpg`,
  `${process.env.PUBLIC_URL}/Presets/17_Peter.jpg`,
  `${process.env.PUBLIC_URL}/Presets/18_Rory.jpg`,
  `${process.env.PUBLIC_URL}/Presets/19_Owen.jpg`,
  `${process.env.PUBLIC_URL}/Presets/20_Caucasian4.jpg`,
  `${process.env.PUBLIC_URL}/Presets/21_Caucasian2.jpg`,
  `${process.env.PUBLIC_URL}/Presets/22_Caucasian3.jpg`,
  `${process.env.PUBLIC_URL}/Presets/23_Caucasian1.jpg`,
  `${process.env.PUBLIC_URL}/Presets/24_Theodore.jpg`,
  `${process.env.PUBLIC_URL}/Presets/25_George.jpg`,
  `${process.env.PUBLIC_URL}/Presets/26_Cole.jpg`,
  `${process.env.PUBLIC_URL}/Presets/27_Kent.jpg`,
  `${process.env.PUBLIC_URL}/Presets/28_Mortimer.jpg`,
  `${process.env.PUBLIC_URL}/Presets/29_Dan.jpg`,
  `${process.env.PUBLIC_URL}/Presets/30_Hugo.jpg`,
  `${process.env.PUBLIC_URL}/Presets/31_Remy.jpg`,
  `${process.env.PUBLIC_URL}/Presets/32_Noah.jpg`,
  `${process.env.PUBLIC_URL}/Presets/killianmcshane.jpeg`,
  `${process.env.PUBLIC_URL}/Presets/ProfessorOsama.jpg`,
  `${process.env.PUBLIC_URL}/Presets/33_Black1.jpg`,
  `${process.env.PUBLIC_URL}/Presets/34_Black3.jpg`,
  `${process.env.PUBLIC_URL}/Presets/35_Black2.jpg`,
  `${process.env.PUBLIC_URL}/Presets/36_Black4.jpg`,
  `${process.env.PUBLIC_URL}/Presets/37_Ben.jpg`,
  `${process.env.PUBLIC_URL}/Presets/38_Liam.jpg`,
  `${process.env.PUBLIC_URL}/Presets/39_Max.jpg`,
  `${process.env.PUBLIC_URL}/Presets/40_Michael.jpg`,
  `${process.env.PUBLIC_URL}/Presets/42_Terrence.jpg`,

  // ... Add additional images as necessary
];

const clothPresets = [
  `${process.env.PUBLIC_URL}/Humangen_Clothing/0_Open_Suit.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/1_Relaxed_Dresscode.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/2_Suit_N_Tie.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/3_Summer_Lawyer.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/4_Stock_Exchange.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/5_New_Intern.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/6_Weekend_Warrior.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/7_Casual_Weekday.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/8_Skinny_Look.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/9_Stylish_Casual.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/10_Relaxed_Office.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/11_Smart_Casual.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/12_Frosty_Evening.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/13_Ontheroad.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/14_RelaxedFit.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/15_GolfDay.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/16_LabTech.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/17_Flight_Suit.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/18_Pirate.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/19_Bomber_look.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/20_MenLarge_Smart_Casual.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/21_large_shirt_v1.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/22_small_shortsleeve_v1.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/23_BBQ_Barry.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/24_Office_Excursion.jpg`,
  `${process.env.PUBLIC_URL}/Humangen_Clothing/25_Beach_Day.jpg`,
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
            sx={{
              width: "auto", // Ensure the width is automatic
              maxHeight: "194px", // Set a maximum height
              objectFit: "contain", // This makes the image fit within the box without stretching it
              margin: "auto", // This centers the image within the CardMedia container
            }}
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
            sx={{
              width: "auto", // Ensure the width is automatic
              maxHeight: "194px", // Set a maximum height
              objectFit: "contain", // This makes the image fit within the box without stretching it
              margin: "auto", // This centers the image within the CardMedia container
            }}
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
