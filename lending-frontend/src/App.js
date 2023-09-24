import * as React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import ProductDetails from './pages/ProuctDetails';
import MyProducts from './pages/MyProducts';
import Rents from './pages/Rents';

export const routes = [
  {
    path: '/',
    element: <Home />,
    label: 'Home',
    enableInNavbar: true,
  },
  {
    path: '/my-products',
    element: <MyProducts />,
    label: 'My products',
    enableInNavbar: true,
  },
  {
    path: '/product/:id',
    element: <ProductDetails />,
    label: 'Product',
    enableInNavbar: false,
  },
  {
    path: '/rents',
    element: <Rents />,
    label: 'Rent',
    enableInNavbar: true,
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
