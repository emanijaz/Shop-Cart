import Homepage from "./components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/product/:id" element={<ProductDetails />}/>

          </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
