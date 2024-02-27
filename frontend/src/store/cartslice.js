import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        productsList: [],
        totalQuantity: 0,
        showCart: false,
        totalPrice: 0
    },
    reducers: {
        addToCart(state, action){
            const newProduct = action.payload;
            const existingProduct = state.productsList.find((product)=> product.id === newProduct.id);
            
            if(existingProduct){
                console.log('adding existing product in cart')
                if(existingProduct.stock < existingProduct.quantity+newProduct.quantity){
                    return;
                }
                existingProduct.quantity += newProduct.quantity;
            }
            else{ // newly added to cart
                console.log('adding new product in cart')
                state.productsList.push({
                    id: newProduct.id,
                    quantity: newProduct.quantity,
                    price: newProduct.price,
                    stock: newProduct.stock,
                    url: newProduct.url,
                    name: newProduct.name
                })
            }
            state.totalPrice += newProduct.price*newProduct.quantity;
            state.totalQuantity += newProduct.quantity;
        },
        removeFromCart(state, action){

        },
        setShowCart(state){
            state.showCart = true;
        }
    }
})


export const cartActions = cartSlice.actions;
export default cartSlice;