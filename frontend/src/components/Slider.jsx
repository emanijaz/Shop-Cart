import React from 'react'


export default function Slider() {

  const imageStyle = {
    height: "600px", // Set the desired height
    width: "100%",   // Set the width to 100% for responsiveness
    objectFit: "cover", // Maintain aspect ratio and cover the entire container
  };

  return (
    <div>
     <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
        <div className="carousel-item active">
            <img className="d-block w-100" src="/assets/cover1.jpg" alt="First slide" style={imageStyle} />
        </div>
        <div className="carousel-item">
            <img className="d-block w-100" src="/assets/banner_kids.png" alt="Second slide"/>
        </div>
        <div className="carousel-item">
            <img className="d-block w-100" src="/assets/banner_mens.png" alt="Third slide"/>
        </div>
        </div>
     </div>
    </div>
  );
}
