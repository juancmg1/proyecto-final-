import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserContext.Provider value={{ email, setEmail, isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};