import React, { createContext, useState } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    try {
      setLoading(true);
      // Llama a /login. La baseURL ya es http://127.0.0.1:8000/api
      const response = await api.post('/login', credentials);
      
      // Ajusta esto dependiendo de la respuesta exacta de tu backend
      const responseToken = response.data.token || response.data.access_token; 
      const responseUser = response.data.user;
      
      if (responseToken) {
          setToken(responseToken);
          localStorage.setItem('token', responseToken);
      }
      
      if (responseUser) setUser(responseUser);
      
      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
