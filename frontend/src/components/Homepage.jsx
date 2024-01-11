import React, { useEffect, useState } from 'react'
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
    const [products, setProducts] = useState([]);
    useEffect(()=> {
        const fetchAllProducts = async()=>{
            try{
                const response = await fetch('http://localhost:5000/products/');
                const data = await response.json();
                console.log(data.products)
                setProducts(data.products);
            }
            catch(error){
                console.error('Error fetching products:', error);
            }
        }

        fetchAllProducts();
    },[])
    return (
        <div>
            <Navbar />
            <Slider />
            { products ? 
            <div className="container py-3">
                { 
                    products.map((product)=>{
                        return(
                        <div key={product._id} className='row'>
                        <div className='col-md-3 mt-5 mb-1'>
                            <div className="card h-100 text-center" style={{width: "18rem"}}>
                                <img className="card-img-top mt-5" src="./assets/android1.png" alt="Android 1" style={{height: "250px"}}/>
                                <div className="card-body">
                                    <p className="card-text" style={{fontSize: "20px"}}><i className="fa fa-solid fa-tags me-1"></i>{product.price}</p>
                                    <button type="button" className="btn btn-outline-dark mx-2">Buy</button>

                                </div>
                            </div>
                        </div>
                        </div>)
                    })
                }
                {/* <div className='row'>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div className="card h-100 text-center" style={{width: "18rem"}}>
                            <img className="card-img-top mt-5" src={yellow_shirt} alt="Android 1" style={{height: "250px"}}/>
                            <div className="card-body">
                                <p className="card-text" style={{fontSize: "20px"}}><i className="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" className="btn btn-outline-dark mx-2">Buy</button>

                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div className="card h-100 text-center" style={{width: "18rem"}}>
                            <img className="card-img-top" src={iphone11promax} alt="iphone11 pro" style={{height: "300px"}}/>
                            <div className="card-body">
                                <p className="card-text" style={{fontSize: "20px"}}><i className="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" className="btn btn-outline-dark mx-2">Buy</button>

                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div className="card  h-100 text-center"  style={{width: "18rem"}}>
                            <img className="card-img-top mt-5" src={iphone12} alt="Iphone 11 pro" style={{height: "250px"}}/>
                            <div className="card-body">
                                <p className="card-text" style={{fontSize: "20px"}}><i className="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" className="btn btn-outline-dark mx-2">Buy</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div className="card  h-100 text-center"  style={{width: "18rem"}}>
                            <img className="card-img-top mt-5" src={iphone12mini} alt="Iphone 11 pro" style={{height: "250px"}}/>
                            <div className="card-body">
                                <p className="card-text" style={{fontSize: "20px"}}><i className="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" className="btn btn-outline-dark mx-2">Buy</button>

                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <div className='row'>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div className="card h-100 text-center" style={{width: "18rem"}}>
                            <img className="card-img-top mt-5" src={iphone12pro} alt="Android 1" style={{height: "250px"}}/>
                            <div className="card-body">
                                <p className="card-text" style={{fontSize: "20px"}}><i className="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" className="btn btn-outline-dark mx-2">Buy</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div className="card h-100 text-center" style={{width: "18rem"}}>
                            <img className="card-img-top mt-5" src={iphone11pro} alt="Android 1" style={{height: "250px"}}/>
                            <div className="card-body">
                                <p className="card-text" style={{fontSize: "20px"}}><i className="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" className="btn btn-outline-dark mx-2">Buy</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mt-5 mb-1'>
                        <div className="card h-100 text-center" style={{width: "18rem"}}>
                            <img className="card-img-top mt-5" src={iphoneSE} alt="Android 1" style={{height: "250px"}}/>
                            <div className="card-body">
                                <p className="card-text" style={{fontSize: "20px"}}><i className="fa fa-solid fa-tags me-1"></i>50$</p>
                                <button type="button" className="btn btn-outline-dark mx-2">Buy</button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div> : 
            
            <div className='container py-3'>
                <h3>Loading Products</h3>
            </div>
            }
            <Footer/>
            
        </div>
    )
}
