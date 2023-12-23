import React from 'react'
import yellow_shirt from './assets/yellow_shirt.jpg'

export default function ProductDetails() {
    return (
    <div className="container py-3">
                <div className='row'>
                    <div className='col-md-3 mt-5 mb-1'>
                        <img className="card-img-top mt-5" src={yellow_shirt} alt="yellow shirt" style={{height: "250px"}}/>
                    </div>
                    <div className='col-md-5 mt-5 mb-1'>
                    </div>
                </div>
    </div>
    )
}
