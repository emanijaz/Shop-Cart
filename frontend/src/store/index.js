import {configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from './rootReducer';


const persistConfig = {
    key: 'root',
    storage,
    // Optionally, you can specify a list of reducer keys to persist
    // whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store=configureStore({
    reducer: persistedReducer,
})
export const persistor = persistStore(store);