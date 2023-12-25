import React from 'react'
import yellow_shirt from './assets/yellow_shirt.jpg'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


export default function ProductDetails() {
    const [value, setValue] = React.useState(2);
    return (
    <div className="container py-3">
                <div className='row'>
                    <div className='col-md-6 mt-5 mb-1'>
                        <img src={yellow_shirt} alt="yellow shirt" style={{height: "500px", width: "500px"}} />
                    </div>
                    <div className='col-md-6 mt-5 mb-1'>
                        <h3>Yellow Shirt</h3><hr/>
                        <p style={{marginTop: "5%"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

                        <p className="card-text display-6 fw-bold" style={{fontSize: "20px"}}>50$</p>

                        <p style={{marginTop: "5%"}}><b>Quantity</b></p>
                        <input type="number" id="quantity" name="quantity" min="1" max="100" />
                        <button type="button" className="btn btn-sm btn-outline-dark mx-2">Add to Cart</button>

                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div className='row'>
                            <div class="card mt-3 mb-1 border border-bottom" style={{height: "150px", width: "500px"}}>
                                <div class="card-body">
                                    <h5 class="card-title">Rating</h5>
                                    <p class="card-text">
                                    <Typography component="legend">Based on 3 reviews</Typography>
                                    <Rating name="read-only" value="2" readOnly />
                                    
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div class="card mt-3 mb-1 border border-bottom" style={{height: "350px", width: "500px"}}>
                                <div class="card-body">
                                <h5 class="card-title">Add Review</h5>
                                    <p class="card-text">
                                    <div className='mt-3'>
                                    <form >
                                        <div className="form-group my-3">
                                            <label className='mb-1' for="title">Title</label>
                                            <input type="text" class="form-control" id="title"  placeholder="Enter title"/>
                                        </div>
                                        <div className="form-group my-3">
                                            <label for="comment">Review</label>
                                            <textarea type="text" class="form-control" id="comment" placeholder="Write Review"/>
                                        </div>
                                        <div className="form-group">
                                                <Rating size='small'
                                                name="simple-controlled"
                                                value={value}
                                                onChange={(event, newValue) => {
                                                setValue(newValue);
                                                }}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-sm btn-outline-dark mx-2 ">Publish Review</button>

                                    </form>
                                    </div>
                                    
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card mt-3 mb-1 border border-bottom">
                            <div class="card-body">
                                <div className='row'>
                                    <div className='col-md-2'>
                                    <img class="avatar avatar-128 bg-light rounded-circle text-white p-2"
                                    src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"/>
                                    </div>
                                    <div className='col-md-8'>
                                    <div className='row'>
                                    
                                        <div className='col-md-8'>
                                            <h5 class="card-title">Review Title</h5>
                                        </div>
                                        <div className='col-md-4 mb-3'>
                                            <p class="card-text">
                                                <Rating name="read-only" value="2" size="small" readOnly />
                                            </p>
                                        </div>
                                    </div>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                                    standard dummy text ever since the 1500s, </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card mt-3 mb-1 border border-bottom">
                            <div class="card-body">
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <h5 class="card-title">Review Title</h5>
                                    </div>
                                    <div className='col-md-4 mb-3'>
                                    <p class="card-text">
                                        <Rating name="read-only" value="2" size="small" readOnly />
                                    </p>
                                    </div>
                                </div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                                standard dummy text ever since the 1500s, </p>
                            </div>
                        </div>

                        <div class="card mt-3 mb-1 border border-bottom">
                            <div class="card-body">
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <h5 class="card-title">Review Title</h5>
                                    </div>
                                    <div className='col-md-4 mb-3'>
                                    <p class="card-text">
                                        <Rating name="read-only" value="2" size="small" readOnly />
                                    </p>
                                    </div>
                                </div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                                standard dummy text ever since the 1500s, </p>
                            </div>
                        </div>

                        <div class="card mt-3 mb-1 border border-bottom">
                            <div class="card-body">
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <h5 class="card-title">Review Title</h5>
                                    </div>
                                    <div className='col-md-4 mb-3'>
                                    <p class="card-text">
                                        <Rating name="read-only" value="2" size="small" readOnly />
                                    </p>
                                    </div>
                                </div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                                standard dummy text ever since the 1500s, </p>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
    )
}
