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
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import AttributeHelpModal from "./AttributeHelpModal";

function CreateModelTest({ chosenPreset, chosenClothSelection }) {
  let { authTokens } = useContext(AuthContext);
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [muscularity, setMuscularity] = useState(5);
  const [skinny, setSkinny] = useState(5);
  const [overweight, setOverweight] = useState(5);
  const [skinColor, setSkinColor] = useState("");
  const [clothSelection, setClothSelection] = useState("");
  const [preset, setPreset] = useState("");
  const [muscularityModalOpen, setMuscularityModalOpen] = useState(false);
  const [SkinnyModalOpen, setSkinnyModalOpen] = useState(false);
  const [OverweightModalOpen, setOverweightModalOpen] = useState(false);
  const [currentMuscularityImage, setCurrentMuscularityImage] = useState(0);
  const [currentSkinnyImage, setCurrentSkinnyImage] = useState(0);
  const [currentOverweightImage, setCurrentOverweightImage] = useState(0);
  const navigate = useNavigate();

  const muscularityImages = [
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
  ]; // Placeholder for muscularity images

  const SkinnynessImages = [
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
  ]; // Placeholder for muscularity images

  const Overweightimages = [
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
  ]; // Placeholder for muscularity images

  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue);
  };

  const toggleMuscularityModal = () => {
    setMuscularityModalOpen(!muscularityModalOpen);
  };
  const toggleSkinnyModal = () => {
    setSkinnyModalOpen(!SkinnyModalOpen);
  };

  const toggleOverweightModal = () => {
    setOverweightModalOpen(!OverweightModalOpen);
  };

  const nextMuscularityImage = () => {
    setCurrentMuscularityImage(
      (prevMuscularityCurrentImage) =>
        (prevMuscularityCurrentImage + 1) % muscularityImages.length
    );
  };

  const prevMusularityImage = () => {
    setCurrentMuscularityImage(
      (prevMuscularityCurrentImage) =>
        (prevMuscularityCurrentImage - 1 + muscularityImages.length) %
        muscularityImages.length
    );
  };

  const nextSkinnyImage = () => {
    setCurrentSkinnyImage(
      (prevSkinnyCurrentImage) =>
        (prevSkinnyCurrentImage + 1) % SkinnynessImages.length
    );
  };

  const prevSkinnyImage = () => {
    setCurrentSkinnyImage(
      (prevSkinnyCurrentImage) =>
        (prevSkinnyCurrentImage - 1 + SkinnynessImages.length) %
        SkinnynessImages.length
    );
  };

  const nextOverweightImage = () => {
    setCurrentOverweightImage(
      (prevOverweightCurrentImage) =>
        (prevOverweightCurrentImage + 1) % Overweightimages.length
    );
  };

  console.log(chosenPreset, "model from form ");
  console.log(chosenClothSelection, "cloth from form ");

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
      chosenClothSelection,
      chosenPreset,
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

        <Typography gutterBottom>
          Muscularity
          <IconButton onClick={toggleMuscularityModal}>
            <HelpOutlineIcon />
          </IconButton>
        </Typography>
        <Slider
          value={muscularity}
          onChange={handleSliderChange(setMuscularity)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />

        <Typography gutterBottom>
          Skinnyness{" "}
          <IconButton onClick={toggleSkinnyModal}>
            <HelpOutlineIcon />
          </IconButton>
        </Typography>
        <Slider
          value={skinny}
          onChange={handleSliderChange(setSkinny)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />

        <Typography gutterBottom>
          Overweight{" "}
          <IconButton onClick={toggleOverweightModal}>
            <HelpOutlineIcon />
          </IconButton>
        </Typography>
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
      <AttributeHelpModal
        open={muscularityModalOpen}
        onClose={toggleMuscularityModal}
        images={muscularityImages}
        currentImage={currentMuscularityImage}
        setCurrentImage={setCurrentMuscularityImage}
        attributeName="Muscularity"
      />
      <AttributeHelpModal
        open={SkinnyModalOpen}
        onClose={() => setSkinnyModalOpen(false)}
        images={SkinnynessImages}
        currentImage={currentSkinnyImage}
        setCurrentImage={setCurrentSkinnyImage}
        attributeName="Skinnyness"
      />
      <AttributeHelpModal
        open={OverweightModalOpen}
        onClose={() => setOverweightModalOpen(false)}
        images={Overweightimages}
        currentImage={currentOverweightImage}
        setCurrentImage={setCurrentOverweightImage}
        attributeName="Overweight"
      />
    </Container>
  );
}

export default CreateModelTest;
