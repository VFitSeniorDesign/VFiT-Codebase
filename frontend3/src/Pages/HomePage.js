import React from "react";
import { Grid, Paper } from "@mui/material";
import OutfitSelector from "../Components/OutfitSelector";
import ModelViewer from "../Components/ModelViewer";
import Form from "../Components/Form";

function HomePage() {
  return (
    <div style={{ flexGrow: 1, height: "100vh" }}>
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
            }}
          >
            <OutfitSelector />
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
            <ModelViewer modelPath="/Russel123.glb" />
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
            <Form />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
