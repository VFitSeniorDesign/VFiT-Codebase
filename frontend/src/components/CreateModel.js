import React from 'react';
import "./CreateModel.css"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function CreateModel(){
    const skinTones = ['#F1C27D', '#FFDBAC', '#E0AC69', '#C68642', '#8D5524'];
    return(
        <div className = "CreateModel-MainContainer">
            <div className = "CreateModel-OutlineContainer">
                <p> Welcome! Come Create Your Own 3D Model! </p>
                <div className="CreateModel-InputContainer">
                    <p className="CreateModel-InputCategoryText">Age: </p>
                    <input type='string'></input>
                </div>
                <div className = "CreateModel-InputContainer">
                    <p className="CreateModel-InputCategoryText">Height: </p>
                    <input type='string'></input>
                </div>
                <div className = "CreateModel-InputContainer">
                    <p className="CreateModel-InputCategoryText"> Muscularity (1-10): </p>
                    <input type='string'></input>
                </div>
                <div className = "CreateModel-InputContainer">
                    <p className="CreateModel-InputCategoryText">Skinny (1-10): </p>
                    <input type='string'></input>
                </div>
                <div className = "CreateModel-InputContainer">
                    <p className="CreateModel-InputCategoryText">Overweight (1-10): </p>
                    <input type='string'></input>
                </div>
                <div className="CreateModel-InputContainer">
                    <p className="CreateModel-InputCategoryText">Skin Color: </p>
                    <Carousel className='CreateModel-Carousel'
                        showArrows={true} 
                        showStatus={false} 
                        showIndicators={false} 
                        showThumbs={false}
                        dynamicHeight={true}
                        emulateTouch={true}
                    >
                        {skinTones.map((color, index) => (
                            <div key={index} style={{ border: "hidden", borderRadius: "10px", backgroundColor: color, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {/* You can place an image here or just use the background color */}
                                <span style={{color: '#fff', fontWeight: 'bold'}}></span>
                            </div>
                        ))}
                    </Carousel>
                </div>
                

                <button className="CreateModel-CreateButton">Create!</button>
                

            </div>
        </div>
    )
}

export default CreateModel