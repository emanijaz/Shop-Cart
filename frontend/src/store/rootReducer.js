import { combineReducers } from '@reduxjs/toolkit';
import cartSlice from './cartslice';

const rootReducer = combineReducers({
    cart: cartSlice.reducer
});

export default rootReducer;