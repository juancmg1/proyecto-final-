// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginSuccess from './pages/LoginSuccess';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import RegisterSuccess from './pages/RegisterSuccess';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerSuccess" element={<RegisterSuccess />} />
          <Route path="/ProductList" element={<ProductList />} />
        </Routes>
        {/* <ProductList /> */}
      </div>
    </Router>
    
  );
};

export default App;

