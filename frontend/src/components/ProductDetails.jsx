import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Avatar from 'react-avatar';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cartslice';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [productQuantity, setProductQuantity] = useState(1);

    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewComment, setReviewComment] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const [alertColor, setAlertColor] = useState('success');
    const dispatch = useDispatch();

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        console.log('stock: ', product.stock)
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            console.log('setting new quant')
            setProductQuantity(newQuantity);
            setShowAlert(false);
        }
        else{
            setShowAlert(true);
        }

    };

    const addToCart = () => {
        dispatch(cartActions.addToCart({
            id: id,
            name: product.name,
            price: product.price,
            quantity: Number(productQuantity),
            stock: product.stock,
            url: product.images[0].url
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault() // prevent page from getting reloaded on submitting form
        const newReview = {
            title: reviewTitle,
            comment: reviewComment,
            rating: reviewRating
        };

        const updatedProduct = {
            ...product,
            reviews: [...product.reviews, newReview],
            numOfReviews: product.numOfReviews +1

        };

        try {
            const response = await fetch(`http://localhost:5000/products/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });
            if(response.status === 200){
                setProduct(updatedProduct);
                setAlertMessage('Review Published successfully');
                setAlertColor('success');
            }
            else{
                setAlertMessage('Failed publishing review');
                setAlertColor('danger');
            }
        } catch (error) {
            setAlertMessage("Failed publishing review");
            setAlertColor('danger');
        } finally {
            setTimeout(() => {
              setAlertMessage('');
            }, 2000);
        }
    }
    useEffect(()=> {

        const getProductDetails = async() => {
            try{
                const response = await fetch(`http://localhost:5000/products/${id}`);
                const data = await response.json();
                setProduct(data.product);
            }
            catch(error){
                console.error('Error fetching products:', error);
            }
        }
        getProductDetails();
    })

    const addProductQuantity = () =>{
        console.log(product.stock)
        if(productQuantity < product.stock){
            setProductQuantity(productQuantity+1);
        }
    }
    const decreaseProductQuantity = () =>{
        if(productQuantity >1){
            setProductQuantity(productQuantity-1);

        }
    }
    // const handleFocus = () => {
    //     // Store the original quantity when the input field gains focus
    //     setOriginalQuantity(productQuantity);
    // };

    const handleBlur = () => {
        // Reset the quantity to the original value if the entered value is invalid
        if (productQuantity < 1 || productQuantity > product.stock) {
            setProductQuantity(1);
        }
    };

    return (
    <>
        <Navbar />
        {alertMessage && (
            <div className={`alert alert-${alertColor}`} role="alert">
            {alertMessage}
            </div>
        )}
        {showAlert && (
                <Alert severity="error">Please enter a quantity between 1 and {product.stock}.</Alert>
        )}
        {product && 
            <div className="container py-3">
                <div className='row'>
                    <div className='col-md-6 mt-5 mb-1'>
                        <img src={`/assets/${product.images[0].url}`} alt="" style={{height: "500px", width: "500px"}} />
                    </div>
                    <div className='col-md-6 mt-5 mb-1'>
                        <h3>{product.name}</h3><hr/>
                        <p style={{marginTop: "5%"}}>{product.description}</p>

                        <p className="card-text display-6 fw-bold" style={{fontSize: "20px"}}>{product.price}$</p>
                        <p style={{marginTop: "5%"}}><b>Quantity</b></p>
                        {/* <div class="input-group-prepend mr-3">
                            <button onClick={decreaseProductQuantity}class="btn btn-dark btn-sm" id="minus-btn"><i class="fa fa-minus"></i></button>
                        </div>
                        <input type="text" class="form-control form-control-sm" value={productQuantity} placeholder={`Stock Available: ${product.stock}`} min="1" max={`${product.stock}`} disabled/>
                        <div class="input-group-append ml-3">
                            <button onClick={addProductQuantity} class="btn btn-dark btn-sm" id="plus-btn"><i class="fa fa-plus"></i></button>
                        </div> */}
                        <TextField
                            id="outlined-number"
                            label="Number"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            min="1"
                            max={product.stock}
                            onChange={handleQuantityChange}
                            // onFocus={handleFocus}
                            onBlur={handleBlur}
                            
                        />
                        {/* <input onChange={e=>{setProductQuantity(e.target.value)}} type="number" id="quantity" name="quantity" placeholder={`Stock Available: ${product.stock}`} min="1" max={product.stock} /> */}
                        
                        <button onClick={addToCart} type="button" className="btn btn-sm btn-outline-dark mx-2">Add to Cart</button>

                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div className='row'>
                            {product.numOfReviews > 0 ? 
                            <div class="card mt-3 mb-1 border border-bottom" style={{height: "150px", width: "500px"}}>
                                <div class="card-body">
                                    <h5 class="card-title">Rating</h5>
                                    <p class="card-text">
                                        <Typography component="legend">Based on {product.numOfReviews} reviews</Typography>
                                        <Rating name="read-only" value={product.numOfReviews} readOnly />
                                    </p>
                                </div>
                            </div>
                            : "No Reviews"
                            }
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
                                                    <input type="text" class="form-control" id="title"  placeholder="Enter title"  onChange={(e) => setReviewTitle(e.target.value)}/>
                                                </div>
                                                <div className="form-group my-3">
                                                    <label for="comment">Review</label>
                                                    <textarea type="text" class="form-control" id="comment" placeholder="Write Review" onChange={(e) => setReviewComment(e.target.value)}/>
                                                </div>
                                                <div className="form-group">
                                                        <Rating size='small'
                                                        name="simple-controlled"
                                                        value={reviewRating}
                                                        onChange={(event, newValue) => {
                                                        setReviewRating(newValue);
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <button onClick={handleSubmit} className="btn btn-sm btn-outline-dark mt-2">Publish Review</button>
                                                </div>
                                            </form>
                                        </div>
                                    
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                    {
                        product.reviews.map((review)=>{
                            return (
                            <div key={review.title} class="card mt-3 mb-1 border border-bottom">
                                <div class="card-body">
                                    <div className='row'>
                                        <div className='col-md-2 d-md-flex justify-content-center mt-md-4'>
                                            <Avatar src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" size="40" round={true} />
                                        </div>
                                        <div className='col-md-8'>
                                        <div className='row'>
                                            <div className='col-md-8'>
                                                <h5 class="card-title">{review.title}</h5>
                                            </div>
                                            <div className='col-md-4 mb-3'>
                                                <p class="card-text">
                                                    <Rating name="read-only" value={review.rating} size="small" readOnly />
                                                </p>
                                            </div>
                                        </div>
                                        <p>{review.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                    </div>
                </div>
            </div>
        }
    </>
    )
}
