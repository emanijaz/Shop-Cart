import Homepage from "./components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProductDetails from "./components/ProductDetails";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/product/:id" element={<ProductDetails />}/>
            <Route path="/register" element={<SignUp />}/>

          </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
