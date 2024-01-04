import Homepage from "./components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/product/:id" element={<ProductDetails />}/>
            <Route path="/cart/" element={<Cart />}/>


          </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
