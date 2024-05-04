ENGINEERING ADDENDUM

With the rise of digital technology, exciting developments can be seen in online shopping experiences. With a majority of the population having access to online shopping, traffic has only gone up. One of the most exciting developments in this area could be Virtual Fitting Room, a technology-driven solution designed to enhance the online shopping experience by allowing users to try on clothes virtually before making a purchase. This system leverages cutting-edge technologies, including React, Django, Redux, and Blender, to create a seamless and interactive user interface that simulates the physical experience of trying on different outfits.
The frontend, developed with React, uses a component-based approach to build a highly interactive and modular user interface. This setup is crucial for handling the intricate details of the virtual fitting process. Additionally, we utilize Redux for efficient state management and secure communication with a Django backend through HTTP requests. On the 3D modeling front, Blender is integrated to generate personalized user models and dynamically fit clothing items, enhancing the realism of the virtual try-on experience. Through these technologies, the Virtual Fitting Room not only improves customer satisfaction but also streamlines the online shopping process by providing a more engaging and accurate fitting experience.


The project can be installed by installing blender and the humangen add-on as well as cloning the repository from GitHub. This will install all the required software onto the user’s laptop. To do this, install Blender from https://www.blender.org/download/ , download the blender plugin from https://blendermarket.com/products/humgen3d and clone the GitHub repository by running the following command: 

> git clone git@github.com:VFitSeniorDesign/VFiT-Codebase.git

Switch to the branch ece_day: 

> git checkout ece_day

The repository can be found at https://github.com/VFitSeniorDesign/VFiT-Codebase/tree/main Once all the software is installed, the project can be setup by running the following commands:

> Switch to the repo: cd VFiT-Codebase

Make a virtual environment: 

> python3 -m venv venv

Activate venv: 

(mac)  > source venv/bin/activate 
(windows)  > cd venv/Scripts/activate.bat 
(or activate.ps1 for powershell)

Install requirements: 

> pip install -r r.txt

Activate backend server: 

> cd backend && python3 manage.py runserver

Activate frontend server (new terminal):

 > cd frontend 
 > npm install 
> npm start

Create a directory for the 3D Models: 

> cd backend && mkdir media/savedModels

This will launch the web application at port 3000 and also run a local server. Thus, the project is now set up and the user can login and create their model. The model will be created in Blender and displayed on the website. The user’s latest model will be saved and ready to view upon another login. 

The web application will also alert the user to any errors and ways to fix them.


