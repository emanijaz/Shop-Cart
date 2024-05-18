import React from 'react'
import { Link } from 'react-router-dom';


export default function MyOrders() {
  return (
    <div>
        <h5>My Orders</h5>
        <hr/>
        <div class="card mt-3 mb-1 border border-bottom">
            <div class="card-body mx-5">
 
                    <div>
                        <div className='row mb-5'>
                            <div className='col-md-2 d-md-flex justify-content-center'>
                                <img src={`/assets/android1.png`} alt="" style={{height: "200px", width: "200px"}} />

                            </div>
                            <div className='col-md-8'>
                                <div className='row mt-5'>
                                    <div className='col-md-8'>
                                        <h5 class="card-title">Iphone 11</h5>
                                    </div>
                                    <div className='col-md-4 mb-3'>
                                        <p class="card-text">
                                        <Link to="/">
                                        <button 
                                                type="button" 
                                                className="btn btn-dark" 
                                                style={{ 
                                                    width: '100%', 
                                                    padding: '5px', 
                                                    fontSize: '16px', 
                                                    textAlign: 'center'
                                                }}
                                            >
                                                Publish Review
                                            </button>
                                        </Link>
                                        </p>
                                    </div>
                                </div>
                                <p>
                                    <span style={{backgroundColor: '#F0F0F0', padding: '5px', borderRadius: '2px'}}>Quantity: 4 </span>
                                </p>
                                <p>
                                    <span style={{backgroundColor: '#F0F0F0', padding: '5px', borderRadius: '2px'}}>Total Price: $4500 </span>
                                    
                                </p>

                            </div>
                            
                        </div>
                    </div>  
            </div>
            
        </div>
        <div class="card mt-3 mb-1 border border-bottom">
            <div class="card-body mx-5">
 
                    <div>
                        <div className='row mb-5'>
                            <div className='col-md-2 d-md-flex justify-content-center'>
                                <img src={`/assets/android1.png`} alt="" style={{height: "200px", width: "200px"}} />
                            </div>
                            <div className='col-md-8'>
                                <div className='row mt-5'>
                                    <div className='col-md-8'>
                                        <h5 class="card-title">Iphone 11</h5>
                                    </div>
                                    <div className='col-md-4 mb-3'>
                                        <p class="card-text">
                                        <Link to="/">
                                            <button 
                                                type="button" 
                                                className="btn btn-dark" 
                                                style={{ 
                                                    width: '100%', 
                                                    padding: '5px', 
                                                    fontSize: '16px', 
                                                    textAlign: 'center'
                                                }}
                                            >
                                                Publish Review
                                            </button>
                                        </Link>
                                        </p>
                                    </div>
                                </div>
                                <p>
                                    <span style={{backgroundColor: '#F0F0F0', padding: '5px', borderRadius: '2px'}}>Quantity: 4 </span>
                                </p>
                                <p>
                                    <span style={{backgroundColor: '#F0F0F0', padding: '5px', borderRadius: '2px'}}>Total Price: $4500 </span>
                                    
                                </p>
                            </div>
                            
                        </div>
                    </div>  
            </div>
            
        </div>
    </div>
  )
}
