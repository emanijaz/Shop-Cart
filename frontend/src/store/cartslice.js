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
                if(existingProduct.stock < existingProduct.quantity+newProduct.quantity){
                    existingProduct.message= "No more stock available"
                    return;
                }
                existingProduct.quantity += newProduct.quantity;
            }
            else{ // newly added to cart
                state.productsList.push({
                    id: newProduct.id,
                    quantity: newProduct.quantity,
                    price: newProduct.price,
                    stock: newProduct.stock,
                    url: newProduct.url,
                    name: newProduct.name,
                    message: ""
                })
            }
            state.totalPrice += newProduct.price*newProduct.quantity;
            state.totalQuantity += newProduct.quantity;
        },
        removeFromCart(state, action){
            const givenProduct = action.payload;
            const existingProduct = state.productsList.find((product)=> product.id === givenProduct.id);
            
            if(existingProduct.quantity >=1){
                existingProduct.quantity -= givenProduct.quantity;
                state.totalPrice -= givenProduct.price*givenProduct.quantity;
                state.totalQuantity -= givenProduct.quantity;
            }

            
        },
        deleteItemFromCart(state, action){
            const productToRemove = action.payload;
            state.productsList = state.productsList.filter(product => product.id !== productToRemove.id);
        },
        setShowCart(state){
            state.showCart = true;
        }
    }
})


export const cartActions = cartSlice.actions;
export default cartSlice;