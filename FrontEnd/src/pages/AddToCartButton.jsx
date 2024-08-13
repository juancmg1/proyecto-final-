import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../components/UserContext';

const AddToCartButton = ({ productId }) => {
  const { email } = useContext(UserContext); 
  console.log(email) // Accede al email del usuario desde el contexto
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddToCart = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Buscar al usuario por email
      const usersResponse = await axios.get('http://localhost:8082/api/users', {
        headers: { Authorization: `Bearer ${token}` }  // Incluye el token en la solicitud GET
      });
      const users = usersResponse.data;
      const user = users.find(user => user.email === email);
      console.log(user)
      console.log(productId)

      if (user) {
       
        const userId = user.cart_id._id;
        console.log("userID",userId)
        const quantity = 1;

        // Realizar la solicitud POST para agregar el producto al carrito
        await axios.post(`http://localhost:8082/api/cart/${userId}/${productId}`, {
          quantity,
        });

        alert('Producto agregado al carrito exitosamente!');
      } else {
        console.log('Usuario no encontrado con ese email.');
      }
    } catch (err) {
      setError('Ocurrió un error al agregar el producto al carrito.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleAddToCart} disabled={isLoading}>
      {isLoading ? 'Agregando...' : 'Agregar Producto'}
      {error && <p>{error}</p>}
    </button>
  );
};

export default AddToCartButton;

