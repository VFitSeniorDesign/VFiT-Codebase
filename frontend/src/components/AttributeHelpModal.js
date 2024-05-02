import React from "react";
import { Box, Typography, IconButton, Modal, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon

function AttributeHelpModal({
  open,
  onClose,
  images,
  currentImage,
  setCurrentImage,
  attributeName,
}) {
  const nextImage = () => {
    setCurrentImage(
      (prevCurrentImage) => (prevCurrentImage + 1) % images.length
    );
  };

  const prevImage = () => {
    setCurrentImage(
      (prevCurrentImage) =>
        (prevCurrentImage - 1 + images.length) % images.length
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={`${attributeName}-help-modal`}
      aria-describedby={`${attributeName}-images-carousel`}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            id={`${attributeName}-help-modal`}
            variant="h6"
            component="h2"
          >
            {`${attributeName} Examples`}
          </Typography>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" align="center" sx={{ my: 2 }}>
          {`${attributeName} Type: ${currentImage + 1}`}
        </Typography>
        <img
          src={images[currentImage]}
          alt={`${attributeName} example ${currentImage + 1}`}
          style={{ width: "100%", height: "auto" }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <IconButton onClick={prevImage}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton onClick={nextImage}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}

export default AttributeHelpModal;
