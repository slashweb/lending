import * as React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';

function App() {
  
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route 
          path="/" 
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
