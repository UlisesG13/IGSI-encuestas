import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getCurrentUser } from "./authService";

const PrivateRoute = ({ children, roles }) => {
  const token = getToken();
  const user = getCurrentUser();

  // Si no hay sesión iniciada
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay roles definidos y el usuario no tiene permiso
  if (roles && !roles.includes(user.rol)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
