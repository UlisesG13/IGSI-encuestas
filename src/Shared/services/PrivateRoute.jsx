import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getCurrentUser } from "./authService";

const PrivateRoute = ({ children, roles }) => {
  const token = getToken();
  const user = getCurrentUser();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.rol)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
