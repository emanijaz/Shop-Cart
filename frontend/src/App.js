import Homepage from "./components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProductDetails from "./components/ProductDetails";

import SignUp from "./components/SignUp";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/product/:id" element={<ProductDetails />}/>

            <Route path="/register" element={<SignUp />}/>

            <Route path="/cart/" element={<Cart />}/>
            <Route path="/product-lists/" element={<ProductList />}/>




          </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
