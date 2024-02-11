import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Slider from './Slider'; 
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function Homepage() {
    const [products, setProducts] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const gradientForm = {
        '@media (min-width: 768px)': {
            height: '100vh !important'
        },
        background: "#eee"
            
    }
    
    useEffect(()=> {
        const fetchAllProducts = async()=>{
            try{
                const token = localStorage.getItem('token');
                console.log('token in homepage: ', token)
                const response = await fetch('http://localhost:5000/products/',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data)

                if(data.error && data.error === "Authentication failed"){
                    setIsAuthenticated(false);
                }
                else{
                    console.log('setting products')
                    setProducts(data.products);
                    setIsAuthenticated(true);
                }
            }
            catch(error){
                console.error('Error fetching products:', error);
            }
        }

        fetchAllProducts();
    },[])

    
    const allProducts = ()=> {
        return products.map((product, index) => {
            // Open a new row for every 4th product
            if (index % 4 === 0) {
                return (
                <div key={product._id} className='row'>
                    <div className='col-md-3 mt-3 mb-1'>
                        <div className="card h-100 text-center" style={{ width: "18rem" }}>
                            <img className="card-img-top mt-3" src={`/assets/${product.images[0].url}`} alt="Android 1" style={{ height: "250px" }} />
                            <div className="card-body">
                            <p className="card-text" style={{ fontSize: "16px" }}>{product.name}</p>

                            <p className="card-text" style={{ fontSize: "18px" }}><i className="fa fa-solid fa-tags me-1"></i>{product.price}</p>
                            
                            <Link to={`/product/${product._id}`} key={product._id} className='col-md-3 mt-3 mb-1'>
                                <button type="button" className="btn btn-outline-dark mx-2">Buy</button>
                            </Link>
                            </div>
                        </div>
                    </div>
    
                    {/* Render the remaining 3 products in the same row */}
                    {products.slice(index + 1, index + 4).map((nextProduct) => (
                    <div key={nextProduct._id} className='col-md-3 mt-3 mb-1'>
                        <div className="card h-100 text-center" style={{ width: "18rem" }}>
                        <img className="card-img-top mt-3" src={`/assets/${nextProduct.images[0].url}`} alt="Android 1" style={{ height: "250px" }} />
                        <div className="card-body">
                            <p className="card-text" style={{ fontSize: "16px" }}>{nextProduct.name}</p>
                            <p className="card-text" style={{ fontSize: "18px" }}><i className="fa fa-solid fa-tags me-1"></i>{nextProduct.price}</p>
                            <Link to={`/product/${nextProduct._id}`} key={nextProduct._id} className='col-md-3 mt-3 mb-1'>
                                <button type="button" className="btn btn-outline-dark mx-2">Buy</button>
                            </Link>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                );
            }
        })
    }

    return (
        <>
        {!isAuthenticated ? 
            (<Navigate to="/register" />) : (
                <div style={gradientForm}>
                
                    
                        <Navbar />
                        <Slider />
                        { products ? 
                        <div className="container py-3" >
                            <h3 className='d-md-flex justify-content-center mt-5 mb-3'>All Products </h3>
                                {allProducts()}
                        </div> : 
                        
                        <div className='container py-3'>
                            <h3>Loading Products</h3>
                        </div>
                        }
                        <Footer/> 
                    
                
                </div>
            )
        }
        </>
    )
}
