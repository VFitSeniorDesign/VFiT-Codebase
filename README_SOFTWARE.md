Software Report

Our project can be divided into three components that are displayed below as a block diagram (Fig. 2.1). The first component is the web app that the user interacts with. The frontend of the web app is created using ReactJS and has multiple subcomponents. The web app provides the user with a signup and login page. It also interacts with the database using JWT Tokens to authenticate the user.

The user can create a model by submitting a form containing fields that describe how the model should look including height, age, muscularity, skin color, clothing option etc. This makes an API call to the local server which will initialize a local instance of Blender and run a python script with all the parameters to create the model.

In Blender, the python script will use the parameters and the Humangen library to create a human model as per the specifications. Then it will rig the clothing onto the models and apply physical properties to them.

The model is exported as a GLB file. We also bake the textures and export them as PNGs. These files are then sent to the web app which uses three.js to display the 3D model to the user.

2.1. Overview block diagram

![image](https://github.com/VFitSeniorDesign/VFiT-Codebase/assets/85473680/fbda1f25-53bd-4c1c-b99e-2e62a33350ca)

Fig. 2.1 An overview of the system design

Overview of Each Software Module
Django (Backend Server)

Functionality: Django serves as the backend server in this setup. It handles API requests from the React frontend, processes them, and manages the interaction with Blender.
Responsibilities: Managing the API endpoints, receiving body parameter inputs from React, invoking Blender operations, and handling the output (baked and exported models) to be sent back to the client.

React (Frontend)

Functionality: React is used for building the user interface where users input body parameters and view the rendered models.
Responsibilities: Capturing user inputs, sending API requests to the Django server, and displaying the models received from the backend.

Blender with Human Generator Add-On

Functionality: Blender, equipped with the Human Generator add-on, is responsible for creating 3D human models based on parameters received from the Django server.
Responsibilities: Generating, baking, and exporting 3D models as per the specifications received from the Django backend.

React Components Overview
AttributeHelpModal.js

Description: This component provides a user interface for displaying help or information about the different attributes that can be set for a humanoid model.

CreateModel.js and CreateModel.css

Description: These files together make up the component that includes the form or interface where users can input parameters to create a new model.

Humanoid.js and HumanoidModel.js
Description: These components manage the display and the interaction with the 3D humanoid models in the frontend.

LoginPage.js and LoginPage.css
Description: These files make up the component that handles user login functionality.

PresetSelector.js

Description: A component that allows users to select from preset configurations for quickly generating models.

Blender Script Overview
create_human

Description: This function creates a human model in Blender using specified attributes and the Human Generator add-on.

customize_body_settings

Description: Returns a dictionary of body settings based on provided parameters like muscularity, skinniness, and overweight.

main

Description: The main function of the Blender script. It processes command line arguments (which would be sent from the Django backend), generates the human model using the create_human function, saves baked images, and exports the final model in GLB format.

