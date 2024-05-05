import Homepage from "./components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProductDetails from "./components/ProductDetails";
import Account from "./components/Account";
import SignUp from "./components/SignUp";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <AuthProvider>
            <Routes>
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path='/' element={<Homepage/>}/>
              </Route>
              <Route exact path='/product/:id' element={<PrivateRoute/>}>
                <Route exact path='/product/:id' element={<ProductDetails/>}/>
              </Route>

              <Route path="/register" element={<SignUp />}/>

              <Route exact path='/cart' element={<PrivateRoute/>}>
                <Route exact path='/cart' element={<Cart/>}/>
              </Route>
              <Route exact path='/product-lists' element={<PrivateRoute/>}>
                <Route exact path='/product-lists' element={<ProductList/>}/>
              </Route>
              <Route exact path='/account' element={<PrivateRoute/>}>
                <Route exact path='/account' element={<Account/>}/>
              </Route>

            </Routes>
          </AuthProvider>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
