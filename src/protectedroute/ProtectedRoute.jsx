import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the token exists
 console.log(isAuthenticated,"form protected route ")
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to the login page if not authenticated
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
