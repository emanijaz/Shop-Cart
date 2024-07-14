import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MyOrders() {
    const [allOrders, setAllOrders] = useState(null);
    const fetchAllOrders =async () => {
        try {
            const token = localStorage.getItem('accessToken');
            console.log('access token : ', token)

            const response = await fetch('http://localhost:5000/orders/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            const data = await response.json();
            if (data.success) {
                console.log('all orders: ', data.orders)
                setAllOrders(data.orders);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

  return (
    // <div>
    //     <h5>Orders Summary</h5>
    //     <hr/>
    //     {allOrders && allOrders.products && allOrders.products.length > 0 ? (
    //         allOrders.products.map((product, index) => (
    //         <div key={index} class="card mt-3 mb-1 border border-bottom">
    //             <div class="card-body mx-5">
    //                 <div>
    //                     <div className='row mb-5'>
    //                         <div className='col-md-2 d-md-flex justify-content-center'>
    //                             <img src={product.url || '/assets/android1.png'} alt="" style={{height: "200px", width: "200px"}} />
    //                         </div>
    //                         <div className='col-md-8'>
    //                             <div className='row mt-5'>
    //                                 <div className='col-md-8'>
    //                                     <h5 class="card-title">{product.name}</h5>
    //                                 </div>
    //                                 <div className='col-md-4 mb-3'>
    //                                     <p class="card-text">
    //                                     <Link to="/">
    //                                     <button 
    //                                             type="button" 
    //                                             className="btn btn-dark" 
    //                                             style={{ 
    //                                                 width: '100%', 
    //                                                 padding: '5px', 
    //                                                 fontSize: '16px', 
    //                                                 textAlign: 'center'
    //                                             }}
    //                                         >
    //                                             Publish Review
    //                                         </button>
    //                                     </Link>
    //                                     </p>
    //                                 </div>
    //                             </div>
    //                             <p>
    //                                 <span style={{backgroundColor: '#F0F0F0', padding: '5px', borderRadius: '2px'}}>Quantity: {product.quantity} </span>
    //                             </p>
    //                             <p>
    //                                 <span style={{backgroundColor: '#F0F0F0', padding: '5px', borderRadius: '2px'}}>Total Price: ${product.price * product.quantity} </span>
                                    
    //                             </p>

    //                         </div>
                            
    //                     </div>
    //                 </div>  
    //             </div>
    //         </div>
    //     )))
    //     : <div>No orders to display</div>}
    // </div>
    <div>
            <h5>Orders Summary</h5>
            <hr/>
            {allOrders && allOrders.length > 0 ? (
                allOrders.map((order, orderIndex) => (
                    <div key={orderIndex} className="card mt-3 mb-1 border border-bottom">
                        <div className="card-body mx-5">
                            <h5>Order ID: {order._id}</h5>
                            <p>User Email: {order.userEmail}</p>
                            <p>Address: {order.address}</p>
                            <p>Status: {order.status}</p>
                            <p>Amount: ${order.amount}</p>
                            {order.products.map((product, productIndex) => (
                                <div key={productIndex} className="row mb-5">
                                    <div className="col-md-2 d-md-flex justify-content-center">
                                        <img src={product.url || '/assets/android1.png'} alt="" style={{ height: "200px", width: "200px" }} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row mt-5">
                                            <div className="col-md-8">
                                                <h5 className="card-title">{product.name || 'Product Name'}</h5>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <p className="card-text">
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
                                            <span style={{ backgroundColor: '#F0F0F0', padding: '5px', borderRadius: '2px' }}>Quantity: {product.quantity} </span>
                                        </p>
                                        <p>
                                            <span style={{ backgroundColor: '#F0F0F0', padding: '5px', borderRadius: '2px' }}>Total Price: ${product.price * product.quantity} </span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div>No orders to display</div>
            )}
        </div>
    
  );
}
