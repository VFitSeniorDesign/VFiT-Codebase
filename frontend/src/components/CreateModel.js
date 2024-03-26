import React, { useState, useContext } from "react";
import "./CreateModel.css";
import { Carousel } from "react-responsive-carousel";
import AuthContext from "./AuthContext";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from "react-router-dom";

function CreateModel() {
  let { authTokens } = useContext(AuthContext);
  console.log("authToken: ", authTokens);
  const skinTones = ["#F1C27D", "#FFDBAC", "#E0AC69", "#C68642", "#8D5524"];
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [muscularity, setMuscularity] = useState("");
  const [skinny, setSkinny] = useState("");
  const [overweight, setOverweight] = useState("");
  const [skinColor, setSkinColor] = useState(skinTones[0]); // Default to first skin tone
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submit action
    // Validate inputs
    if (!age || !height || !muscularity || !skinny || !overweight) {
      alert("Please fill in all fields.");
      return;
    }
    // Prepare the data to be sent
    const modelData = {
      age,
      height,
      muscularity,
      skinny,
      overweight,
      skinColor,
    };

    try {
      console.log(`Bearer ${authTokens.access}`);
      const response = await fetch("/api/createmodel/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify(modelData),
      });
      const responseData = await response.json();
      console.log(responseData); // Log the response data
      navigate("/"); // N
    } catch (error) {
      console.error("Failed to create model:", error);
    }
  };

  const handleSkinColorChange = (index) => {
    setSkinColor(skinTones[index]);
  };

  return (
    <div className="CreateModel-MainContainer">
      <form className="CreateModel-OutlineContainer" onSubmit={handleSubmit}>
        <p> Welcome! Come Create Your Own 3D Model! </p>
        <div className="CreateModel-InputContainer">
          <p className="CreateModel-InputCategoryText">Age: </p>
          <input
            type="text"
            className="CreateModel-InputCategoryText"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="CreateModel-InputContainer">
          <p className="CreateModel-InputCategoryText">Height: </p>
          <input
            type="text"
            className="CreateModel-InputCategoryText"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="CreateModel-InputContainer">
          <p className="CreateModel-InputCategoryText">Muscularity (1-10): </p>
          <input
            type="text"
            value={muscularity}
            className="CreateModel-InputCategoryText"
            onChange={(e) => setMuscularity(e.target.value)}
          />
        </div>
        <div className="CreateModel-InputContainer">
          <p className="CreateModel-InputCategoryText">Skinny (1-10): </p>
          <input
            type="text"
            className="CreateModel-InputCategoryText"
            value={skinny}
            onChange={(e) => setSkinny(e.target.value)}
          />
        </div>
        <div className="CreateModel-InputContainer">
          <p className="CreateModel-InputCategoryText">Overweight (1-10): </p>
          <input
            type="text"
            className="CreateModel-InputCategoryText"
            value={overweight}
            onChange={(e) => setOverweight(e.target.value)}
          />
        </div>
        <div className="CreateModel-InputContainer">
          <p className="CreateModel-InputCategoryText">Skin Color: </p>
          <Carousel
            className="CreateModel-Carousel"
            showArrows={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            dynamicHeight={true}
            emulateTouch={true}
            selectedItem={skinTones.indexOf(skinColor)}
            onChange={handleSkinColorChange}
          >
            {skinTones.map((color, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: color,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* You can place an image here or just use the background color */}
                <span style={{ color: "#fff", fontWeight: "bold" }}></span>
              </div>
            ))}
          </Carousel>
        </div>
        <button type="submit" className="CreateModel-CreateButton">
          Create!
        </button>
      </form>
    </div>
  );
}

export default CreateModel;
