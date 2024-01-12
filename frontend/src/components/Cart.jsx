import React from 'react'
import Navbar from './Navbar';



export default function Cart() {
    return (
    <div>
        <Navbar />
        <div className='container mt-5'>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            <img src="/assets/yellow_shirt.jpg" alt="yellow shirt" style={{height: "250px", width: "250px"}} />

                        </th>
                        <td>50$</td>
                        <td>
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm-4 col-sm-offset-4">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <button class="btn btn-dark btn-sm" id="minus-btn"><i class="fa fa-minus"></i></button>
                                            </div>
                                            <input type="number" id="qty_input" class="form-control form-control-sm" value="1" min="1"/>
                                            <div class="input-group-prepend">
                                                <button class="btn btn-dark btn-sm" id="plus-btn"><i class="fa fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>$50</td>
                    </tr>
                    <tr>
                    <th scope="row">
                            <img src="/assets/yellow_shirt.jpg" alt="yellow shirt" style={{height: "250px", width: "250px"}} />

                        </th>
                        <td>50$</td>
                        <td>
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm-4 col-sm-offset-4">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <button class="btn btn-dark btn-sm" id="minus-btn"><i class="fa fa-minus"></i></button>
                                            </div>
                                            <input type="number" id="qty_input" class="form-control form-control-sm" value="1" min="1"/>
                                            <div class="input-group-prepend">
                                                <button class="btn btn-dark btn-sm" id="plus-btn"><i class="fa fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>$50</td>
                    </tr>
                    
                </tbody>
            </table>
            <div class="card border-light mt-3 mb-3" style={{maxWidth:  "30rem", marginLeft: "auto"}}>
                <div className='card-body row fw-bold' style={{fontSize: "20px"}}>
                    <div className='col-md-8'>
                        <div class="card-text">Total</div>
                    </div>
                    <div className='col-md-4'>
                        <div class="card-text">50$</div>
                    </div>
                </div>
                <div className='card-body row' style={{fontSize: "15px"}}>
                    <div className='col-md-8'>
                        <div class="card-text">Shipping</div>
                    </div>
                    <div className='col-md-4'>
                        <div class="card-text">0$</div>
                    </div>
                </div>
                <div className='card-body row' style={{fontSize: "15px"}}>
                    <div className='col-md-12'>
                        <div class="card-text">
                            <button type="button" class="btn btn-dark">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
    )
}
