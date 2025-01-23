import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    console.log("Usuario no autenticado. Redirigiendo al login...");
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.id_tipo_usuario !== requiredRole) {
    console.log("Usuario sin permisos. Redirigiendo...");
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.number,
};
