import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8082/api/session/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, first_name, last_name, age, password }),
      });
      if (response.ok) {
        alert('Registro exitoso');
        navigate('/register-success');
      } else {
        const errorData = await response.json();
        console.error('Error en el registro:', errorData);
      }
    } catch (error) {
      console.error('Error en la solicitud fetch:', error);
    }
  };

  return (
    <div className='contenedor'>
    <form onSubmit={handleRegister}>

      <h2>Registro</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Nombre:
        <input
          type="text"
          value={ first_name}
          onChange={(e) => setFirst_name(e.target.value)}
          required
        />
      </label>
      <label>
        Apellido:
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
          required
        />
      </label>
      <label>
        Edad:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </label>
      <label>
        Contraseña:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
    </div>
  );
};

export default Register;
