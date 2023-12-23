import Homepage from "./components/Homepage";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Homepage />
        <Router>
          <Switch>
            <Route path="/" component={Homepage} />
    
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
