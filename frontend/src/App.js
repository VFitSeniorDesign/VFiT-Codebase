import React from 'react';
import './App.css';
import HumanoidModel from './components/HumanoidModel';
import { Canvas } from '@react-three/fiber'; // Import Canvas

function App() {
  return (
    <div className="App">
      <div className='App-SecondaryMainContainer'>
        <div className='App-MainContainer'>
          <div className = 'App-ItemContainer'>
            
            <div className='App-SideMenu'>
                Upper Body Apparel
            </div>

            <div className="App-ModelDisplay">
                <Canvas camera={{position: [0, 0, 5], fov:50}}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 10, 5]} intensity={1}/>
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <HumanoidModel modelPath="/model.obj"/>
                </Canvas>
            </div>

            <div className = "App-SideMenu">
                Lower Body Apparel
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
