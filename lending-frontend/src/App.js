import * as React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import ProductDetails from './pages/ProuctDetails';

function App() {
  
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route 
          path="/" 
          element={<Home />}
        />
        <Route 
          path="/lend" 
          element={<ProductDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
