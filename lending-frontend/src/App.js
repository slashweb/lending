import * as React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import ProductDetails from './pages/ProuctDetails';
import MyProducts from './pages/MyProducts';

export const routes = [
  {
    path: '/',
    element: <Home />,
    label: 'Home',
  },
  {
    path: '/my-products',
    element: <MyProducts />,
    label: 'My products'
  },
  {
    path: '/product',
    element: <ProductDetails />,
    label: 'Product Details'
  }
]

function App() {
  
  return (
    <BrowserRouter basename="/">
      <Routes>
        {routes.map((route, index) => (
          <Route 
          key={index}
          path={route.path}
          element={route.element}
        />))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
