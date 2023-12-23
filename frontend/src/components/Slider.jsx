import React from 'react'
import women_banner from './assets/banner_women.png'
import kids_banner from './assets/banner_kids.png'
import men_banner from './assets/banner_mens.png'

export default function Slider() {
  return (
    <div>
     <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
        <div className="carousel-item active">
            <img className="d-block w-100" src={women_banner} alt="First slide"/>
        </div>
        <div className="carousel-item">
            <img className="d-block w-100" src={kids_banner} alt="Second slide"/>
        </div>
        <div className="carousel-item">
            <img className="d-block w-100" src={men_banner} alt="Third slide"/>
        </div>
        </div>
     </div>
    </div>
  );
}
