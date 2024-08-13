import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaShoppingCart } from 'react-icons/fa'; 
import { UserContext } from './UserContext';

const Navbar = () => {
  const { email, setEmail, isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/session/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify({ email, password }),
      })
      if (response.ok) {
        setIsAuthenticated(true);
        alert('Login exitoso');
        navigate('/ProductList');
      } else {
        const errorData = await response.json();
        console.error('Error en el login:', errorData);
      }
    } catch (error) {
      console.error('Error en la solicitud fetch:', error);
    }
  };

  const handleRegister = () => {
    navigate('/Register');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">MyApp</div>
      <div className="navbar-buttons">
        {!isAuthenticated ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" onClick={handleLogin}>Login</button>
            <button className="button" onClick={handleRegister}>Register</button>
          </>
        ) : (
          <FaShoppingCart className="cart-icon" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
