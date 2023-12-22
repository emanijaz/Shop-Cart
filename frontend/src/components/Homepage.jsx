import React from 'react'
import Navbar from './Navbar'
import Slider from './Slider';
import iphone11promax from './assets/iphone11promax.png'
import iphone12 from './assets/iphone12.png'
import iphone12mini from './assets/iphone12mini.png'
import iphone12pro from './assets/iphone12pro.png'
import yellow_shirt from './assets/yellow_shirt.jpg'
import iphone11pro from './assets/iphone11pro.png'
import iphoneSE from './assets/iphoneSE.png'
import Footer from './Footer';





export default function Homepage() {
    return (
        <div>
            <Navbar />
            <Slider />
            <div className="container py-3">
                <div className='row'>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div class="card h-100 text-center" style={{width: "18rem"}}>
                            <img class="card-img-top mt-5" src={yellow_shirt} alt="Android 1" style={{height: "250px"}}/>
                            <div class="card-body">
                                <p class="card-text" style={{fontSize: "20px"}}><i class="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" class="btn btn-outline-dark mx-2">Buy</button>

                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div class="card h-100 text-center" style={{width: "18rem"}}>
                            <img class="card-img-top" src={iphone11promax} alt="iphone11 pro" style={{height: "300px"}}/>
                            <div class="card-body">
                                <p class="card-text" style={{fontSize: "20px"}}><i class="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" class="btn btn-outline-dark mx-2">Buy</button>

                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div class="card  h-100 text-center"  style={{width: "18rem"}}>
                            <img class="card-img-top mt-5" src={iphone12} alt="Iphone 11 pro" style={{height: "250px"}}/>
                            <div class="card-body">
                                <p class="card-text" style={{fontSize: "20px"}}><i class="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" class="btn btn-outline-dark mx-2">Buy</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div class="card  h-100 text-center"  style={{width: "18rem"}}>
                            <img class="card-img-top mt-5" src={iphone12mini} alt="Iphone 11 pro" style={{height: "250px"}}/>
                            <div class="card-body">
                                <p class="card-text" style={{fontSize: "20px"}}><i class="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" class="btn btn-outline-dark mx-2">Buy</button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div class="card h-100 text-center" style={{width: "18rem"}}>
                            <img class="card-img-top mt-5" src={iphone12pro} alt="Android 1" style={{height: "250px"}}/>
                            <div class="card-body">
                                <p class="card-text" style={{fontSize: "20px"}}><i class="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" class="btn btn-outline-dark mx-2">Buy</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div class="card h-100 text-center" style={{width: "18rem"}}>
                            <img class="card-img-top mt-5" src={iphone11pro} alt="Android 1" style={{height: "250px"}}/>
                            <div class="card-body">
                                <p class="card-text" style={{fontSize: "20px"}}><i class="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" class="btn btn-outline-dark mx-2">Buy</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div class="card h-100 text-center" style={{width: "18rem"}}>
                            <img class="card-img-top mt-5" src={iphoneSE} alt="Android 1" style={{height: "250px"}}/>
                            <div class="card-body">
                                <p class="card-text" style={{fontSize: "20px"}}><i class="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" class="btn btn-outline-dark mx-2">Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            
        </div>
    )
}
