import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function ProtectedRoute({ children }) {
  const token = AuthService.getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
