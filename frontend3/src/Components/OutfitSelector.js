import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const outfits = [
  {
    name: "Outfit 1",
    alt: "Outfit 1",
    image:
      "https://www.fashionnova.com/cdn/shop/files/12-29-22Studio5_KJ_SR_11-50-23_39_NSKT4509_OffWhite_1264_ES_468x@2x.jpg?v=1701713767", // Example image URL
  },
  {
    name: "Outfit 2",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQiyuVT9iCRiBlBXY1wjYoqHQZ3L4wrC5iDq63UHpe_tEErDP4ICpTNkL4-1Pg1I2LuiaLkU7tLnQ9oL_NBZaoMHMn-GLYu5ecvUEJsb_vm87hheUppy1iBRvqJh_di9t73hQC26cpGeJ4&usqp=CAc", // Example image URL
  },
  {
    name: "Outfit 3",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTSWI5-5mcjFbJ23QXEnyth8vsX5qAeL7LABMnP-ETdgUACCImzyccFasL85qgk7kKm_Zh-5IZsJxI5k2Va3zlR1odzAC0veJU_R1yQk34i8VeWP-WcLtqE&usqp=CAc", // Example image URL
  },
  // ... your outfit objects
];

const colors = ["Red", "Blue", "Green"]; // Example color options
const patterns = ["Striped", "Solid", "Checked"]; // Example pattern options

function OutfitSelector() {
  const [selectedOutfit, setSelectedOutfit] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPattern, setSelectedPattern] = useState("");

  const handleNext = () => {
    setSelectedOutfit(
      (prevSelectedOutfit) => (prevSelectedOutfit + 1) % outfits.length
    );
  };

  const handleBack = () => {
    setSelectedOutfit(
      (prevSelectedOutfit) =>
        (prevSelectedOutfit - 1 + outfits.length) % outfits.length
    );
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handlePatternChange = (event) => {
    setSelectedPattern(event.target.value);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ width: "100%", height: "auto", maxHeight: "500px" }} // Adjust the size here
        image={outfits[selectedOutfit].image}
        alt={outfits[selectedOutfit].name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {outfits[selectedOutfit].name}
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Color</InputLabel>
          <Select
            value={selectedColor}
            label="Color"
            onChange={handleColorChange}
          >
            {colors.map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Pattern</InputLabel>
          <Select
            value={selectedPattern}
            label="Pattern"
            onChange={handlePatternChange}
          >
            {patterns.map((pattern) => (
              <MenuItem key={pattern} value={pattern}>
                {pattern}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleBack} aria-label="previous outfit">
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton onClick={handleNext} aria-label="next outfit">
          <ArrowForwardIosIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default OutfitSelector;
