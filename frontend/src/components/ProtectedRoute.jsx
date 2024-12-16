import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  useEffect(() => {
    // Verificar si hay usuario y token directamente desde localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    // Si no hay usuario o token, redirigir a login
    if (!storedUser || !token) {
      <Navigate to="/login" />;
    }
  }, []);

  // Verificación directa de los valores
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!storedUser || !token) {
    return <Navigate to="/login" />;
  }

  return children; // Si hay usuario y token, renderiza el contenido protegido
};

export default ProtectedRoute;
