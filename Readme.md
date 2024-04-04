The project can be installed by installing blender and the humangen add-on as well as cloning the repository from GitHub. This will install all the required software onto the user’s laptop. To do this, install Blender from https://www.blender.org/download/ , download the blender plugin from https://blendermarket.com/products/humgen3d and clone the GitHub repository by running the following command: 

> git clone git@github.com:VFitSeniorDesign/VFiT-Codebase.git

Switch to the branch aryaman_testing: 

> git checkout aryaman_testing

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