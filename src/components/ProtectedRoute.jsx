import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);

  if (!token) {
    // Si no hay token, redirigir inmediatamente a login
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderizar los componentes hijos (rutas protegidas)
  return <Outlet />;
};

export default ProtectedRoute;
