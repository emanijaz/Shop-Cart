// import {createStore} from 'redux';

// const reducerFn =(state = {counter: 20}, action) => {
//     return state;
// }
// const store =createStore(reducerFn);

// export default store;

import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
// const counterSlice = createSlice({
//     name: 'counter',
//     initialState: {counter: 0},
//     reducers: {
//         increment(state, action){
//             return state.counter++;
//         },
//         decrement(state, action){
//             return state.counter--;

//         },
//         addBy(state, action){
//             return state.counter+= action.payload;

//         }
//     }
// })

const store=configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})
export default store;
// export const actions = counterSlice.actions;