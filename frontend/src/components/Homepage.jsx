import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Slider from './Slider'; 
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import '../styles.css'; 
import { useAuth } from '../context/AuthContext';

export default function Homepage() {
    const [products, setProducts] = useState([]);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const isLoggedIn = useSelector(state=> state.auth.isLoggedIn);
    // console.log("homepage login : ", isLoggedIn)
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const gradientForm = {
        '@media (min-width: 768px)': {
            height: '100vh !important'
        },
            
    }
    
    useEffect(()=> {
        const fetchAllProducts = async()=>{
            try{
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/products/',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if(data.success){
                    setProducts(data.products);
                    // setIsAuthenticated(true);
                }
                else{
                    // setIsAuthenticated(false);
                    navigate('/register');


                }
            }
            catch(error){
                console.error('Error fetching products:', error);
            }
        }

        fetchAllProducts();
    })

    
    const allProducts = ()=> {
        return products.map((product, index) => {
            // Open a new row for every 4th product
            if (index % 4 === 0) {
                return (
                <div key={product._id} className='row'>
                    <div className='col-md-3 mt-3 mb-1'>
                        <div className="card h-100 text-center border-0 card-hover" style={{ width: "18rem" }} >
                            <img className="card-img-top mt-3" src={`/assets/${product.images[0].url}`} alt="Android 1" style={{ height: "250px" }} />
                            <div className="card-body">
                            <p className="card-text" style={{ fontSize: "16px" }}>{product.name}</p>

                            <p className="card-text" style={{ fontSize: "18px" }}><i className="fa fa-solid fa-tags me-1"></i>{product.price}</p>
                            
                            <Link to={`/product/${product._id}`} key={product._id} className='col-md-3 mt-3 mb-1'>
                                <Button size="small" style={{ color: 'black', borderColor: 'black' }} variant="outlined">Add to Cart</Button>
                            </Link>
                            </div>
                        </div>
                    </div>
    
                    {/* Render the remaining 3 products in the same row */}
                    {products.slice(index + 1, index + 4).map((nextProduct) => (
                    <div key={nextProduct._id} className='col-md-3 mt-3 mb-1'>
                        <div className="card h-100 text-center border-0" style={{ width: "18rem" }}>
                        <img className="card-img-top mt-3" src={`/assets/${nextProduct.images[0].url}`} alt="Android 1" style={{ height: "250px" }} />
                        <div className="card-body">
                            <p className="card-text" style={{ fontSize: "16px" }}>{nextProduct.name}</p>
                            <p className="card-text" style={{ fontSize: "18px" }}><i className="fa fa-solid fa-tags me-1"></i>{nextProduct.price}</p>
                            <Link to={`/product/${nextProduct._id}`} key={nextProduct._id} className='col-md-3 mt-3 mb-1'>
                                <Button size="small" style={{ color: 'black', borderColor: 'black' }} variant="outlined">Add to Cart</Button>
                            </Link>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                );
            }
            return null;
        })
    }

    return (
        <>
        {user &&
            
            <div style={gradientForm}>
                
                    
                        <Navbar />
                        
                        <div id="products">
                            <Slider />
                            { products ? 
                            <div className="container py-3" >
                                <h3 className='d-md-flex justify-content-center mt-5 mb-3'>Featured Products </h3>
                                    {allProducts()}
                            </div> : 
                            
                            <div className='container py-3'>
                                <h3>Loading Products</h3>
                            </div>
                            
                            }
                        </div>
                        {products ? null : (
        
                            <div style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white',
                                zIndex: 9999,
                                }}>
                                <CircularProgress/>
                            </div>
                        )}
                        <div id="contacts">
                            <Footer /> 
                        </div>
                    
            </div>
        }
        </>
    )
}
